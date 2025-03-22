from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import numpy as np
import pandas as pd
from geopy.geocoders import Nominatim
from sklearn.neighbors import BallTree
from sentence_transformers import SentenceTransformer
import logging
import os
from datetime import datetime

# Configuración inicial
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})  # CORS más restrictivo para producción

# Configurar logging avanzado
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('server.log'),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)

class EnhancedJobRecommender:
    def __init__(self, data_path='preprocessed_data'):
        try:
            logger.info("Inicializando recomendador...")
            
            # Cargar datos
            self.jobs_data = pd.read_parquet(os.path.join(data_path, 'jobs_preprocessed.parquet'))
            self.embeddings = np.load(os.path.join(data_path, 'embeddings.npy'))
            
            # Inicializar modelos
            self.geolocator = Nominatim(user_agent="enhanced_job_recommender", timeout=10)
            self.geo_cache = {}
            self.model = SentenceTransformer('paraphrase-multilingual-MiniLM-L12-v2')
            
            # Construir índices
            self._build_geo_index()
            
            logger.info(f"Recomendador listo con {len(self.jobs_data)} empleos cargados")
            
        except Exception as e:
            logger.error(f"Error de inicialización: {str(e)}")
            raise

    def _build_geo_index(self):
        """Construir índice geoespacial optimizado"""
        coords = np.deg2rad(self.jobs_data[['Latitude', 'Longitude']].dropna().values)
        self.geo_index = BallTree(coords, metric='haversine', leaf_size=40)

    def _get_coordinates(self, location_str):
        """Geocodificación con caché y reintentos"""
        if not location_str:
            return None
            
        if location_str in self.geo_cache:
            return self.geo_cache[location_str]
        
        try:
            location = self.geolocator.geocode(location_str, exactly_one=True)
            if location:
                coords = (location.latitude, location.longitude)
                self.geo_cache[location_str] = coords
                logger.info(f"Geocodificado: {location_str} -> {coords}")
                return coords
            return None
        except Exception as e:
            logger.warning(f"Error en geocodificación: {str(e)}")
            return None

    def recommend(self, user_query, user_location, top_n=5):
        """Generar recomendaciones con validación mejorada"""
        try:
            # Validación de entrada
            if not user_query or not user_location:
                raise ValueError("Parámetros incompletos")
                
            # Geocodificación
            start_time = datetime.now()
            coords = self._get_coordinates(user_location)
            if not coords:
                return []
            
            # Búsqueda geoespacial
            distances, indices = self.geo_index.query(
                np.deg2rad([coords]), 
                k=min(1000, len(self.jobs_data))
            )
            
            # Procesamiento semántico
            query_embedding = self.model.encode([user_query])
            candidate_embeddings = self.embeddings[indices[0]]
            
            # Cálculo de similitud
            text_scores = np.dot(candidate_embeddings, query_embedding.T).flatten()
            geo_scores = 1 / (1 + (distances * 6371).flatten())  # Conversión a km
            
            # Combinación de puntuaciones
            combined_scores = 0.7 * text_scores + 0.3 * geo_scores
            
            # Selección de resultados
            valid_n = min(top_n, len(indices[0]))
            top_indices = np.argsort(combined_scores)[-valid_n:][::-1]
            
            # Formateo de resultados
            results = self.jobs_data.iloc[indices[0][top_indices]].copy()
            results['Match_Score'] = (combined_scores[top_indices]).round(2)
            
            logger.info(f"Recomendación generada en {(datetime.now()-start_time).total_seconds():.2f}s")
            return results[['JobCategory', 'Latitude', 'Longitude', 'Avg_salary', 'URL']].to_dict('records')
            
        except Exception as e:
            logger.error(f"Error en recomendación: {str(e)}", exc_info=True)
            return []

# Inicialización del sistema
recommender = EnhancedJobRecommender()

# Endpoints
@app.route('/')
def serve_interface():
    """Servir la interfaz web local"""
    return send_file('static/index.html')


@app.route('/api/recommend', methods=['POST'])
def handle_recommendation():
    try:
        data = request.get_json()
        
        # Validación de parámetros
        if not data or 'description' not in data or 'location' not in data:
            return jsonify({
                "error": "Parámetros requeridos: 'description' y 'location'",
                "example_request": {
                    "description": "Job description or skills",
                    "location": "City, State or Country"
                }
            }), 400

        # Procesar recomendación
        recommendations = recommender.recommend(
            user_query=data['description'],
            user_location=data['location'],
            top_n=5
        )
        
        return jsonify({
            "count": len(recommendations),
            "results": recommendations,
            "status": "success"
        })

    except KeyError as ke:
        return jsonify({
            "error": f"Campo faltante en los datos: {str(ke)}"
        }), 400
        
    except Exception as e:
        app.logger.error(f"Error interno: {str(e)}")
        return jsonify({
            "error": "Error procesando la solicitud",
            "details": str(e)
        }), 500

@app.route('/health')
def health_check():
    """Endpoint de verificación de salud"""
    return jsonify({
        "status": "OK",
        "timestamp": datetime.now().isoformat(),
        "jobs_loaded": len(recommender.jobs_data)
    })

if __name__ == '__main__':
    if os.getenv("AZURE_FUNCTIONS_ENVIRONMENT") != "Production":
        from waitress import serve
        logger.info("Iniciando servidor Flask localmente...")
        serve(app, host="0.0.0.0", port=5000, threads=4)