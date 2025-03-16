# InclusivAI

## Descripción
InclusivAI es una solución desarrollada para el **Innovation Challenge March 2025 de Microsoft**, dentro del desafío **AI for Supported Employment Job Coaches**. Su propósito es asistir a entrenadores laborales en la recopilación, gestión y transcripción de sesiones con sus clientes mediante herramientas de inteligencia artificial en Azure.

El frontend de InclusivAI está desarrollado con **React y NextJS**, mientras que el backend está alojado en **Azure**, donde se procesan las transcripciones y se almacenan los datos.

## Funcionalidades

### Captura de Información del Usuario
- Registro del nombre del entrenador laboral y del cliente.
- Selección del tipo de sesión:
  - Entrevista Inicial
  - Visita al Sitio de Trabajo
  - Reunión con Empleador
  - Sesión de Capacitación
  - Seguimiento
- Entrada de notas adicionales.

### Gestión de Archivos de Audio
- Carga de archivos de audio en formatos compatibles (`.wav`, `.mp3`).
- Grabación de audio en tiempo real utilizando el micrófono del dispositivo.
- Indicación visual del estado de grabación.
- Almacenamiento automático de la grabación.

### Procesamiento de Transcripción
- Envío de audio a un servicio en la nube para su transcripción.
- Indicador de carga mientras el audio se procesa.
- Visualización de la transcripción generada.
- Manejo de errores en caso de fallas en la transcripción.

### Integración con Azure
- Envío de datos capturados a una API en Azure mediante una solicitud HTTP POST.
- Autenticación mediante una clave de suscripción (`Ocp-Apim-Subscription-Key`) si es necesario.
- Recepción y despliegue de la transcripción del audio desde la API.

### Interfaz de Usuario y Experiencia
- Diseño intuitivo y accesible para usuarios con discapacidad.
- Interfaz adaptable a dispositivos móviles y de escritorio.
- Identificación clara de botones y campos de entrada.
- Opción para limpiar los datos antes de enviarlos.

## Requisitos Técnicos

### Requisitos Funcionales
- Compatibilidad con navegadores modernos: **Chrome, Edge, Firefox, Safari**.
- Cumplimiento con los permisos del navegador para la grabación de audio.
- Tiempo de respuesta del servicio de transcripción inferior a **10 segundos** en promedio.
- Seguridad de datos garantizada mediante **cifrado en tránsito (HTTPS)**.
- Optimización para manejar archivos de audio de hasta **10 MB**.

## Instalación y Ejecución

### Requisitos Previos
- Node.js (`>= 18`)
- Vercel CLI (`pnpm add -g vercel`)
- Cuenta de Azure con acceso a los servicios de almacenamiento y transcripción de audio

### Clonar el Repositorio
```bash
git clone https://github.com/usuario/inclusivai.git
cd inclusivai
```

### Configurar Variables de Entorno
Crear un archivo `.env.local` en la raíz del proyecto y definir las siguientes variables:
```ini
NEXT_PUBLIC_API_URL=<URL_DE_LA_API_AZURE>
NEXT_PUBLIC_SUBSCRIPTION_KEY=<CLAVE_DE_SUSCRIPCIÓN>
```

### Instalar Dependencias
```bash
pnpm install
```

### Ejecutar en Desarrollo
```bash
pnpm run dev
```
Acceder a la aplicación en `http://localhost:3000`

### Desplegar en Vercel
```bash
vercel
```

## Contribución
Si deseas contribuir, sigue estos pasos:
1. **Fork** el repositorio
2. Crea una nueva rama (`git checkout -b feature/nueva-funcionalidad`)
3. Realiza los cambios y confirma los commits (`git commit -m "Agrega nueva funcionalidad"`)
4. Sube la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un **Pull Request** en GitHub

## Licencia
Este proyecto está bajo la licencia **MIT**.

## este es un test para el mirroring desde local ##