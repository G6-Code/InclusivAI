<p align="center">
  <img src="https://raw.githubusercontent.com/G6-Code/InclusivAI/refs/heads/main/docs/banner/banner.png" alt="Banner">
</p>

# InclusivAI

[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/G6-Code/InclusivAI)

## Descripción
InclusivAI es una solución desarrollada para el **Innovation Challenge March 2025 de Microsoft**, dentro del desafío **AI for Supported Employment Job Coaches**. Su propósito es asistir a entrenadores laborales en la recopilación, gestión y transcripción de sesiones con sus clientes mediante herramientas de inteligencia artificial en Azure.

El frontend de InclusivAI está desarrollado con **React y NextJS**, mientras que el backend está alojado en **Azure**, donde se procesan las transcripciones y se almacenan los datos.

## Screenshots

![Home Screenshot]()
![Chatbot Screenshot](/docs/screenshots/chatbot.png)
![Recommender System Screenshot](/docs/screenshots/recommender-system.png)


### **Services Used and Their Roles**
1. **Azure Web App**: 
   - Hosts the application.
   - Provides functionality for the ingestion, recommendation system, and chat assistant, allowing job coaches to interact seamlessly.

2. **Azure Blob Storage**: 
   - Serves as a repository for data such as images (JPG), documents (PDF), text files (TXT), and audio files (WAV).
   - Stores processed outputs like transcriptions and completed forms.

3. **Speech-to-Text Service**: 
   - Converts audio files (WAV) into text for processing and understanding.

4. **Content Understanding Service**: 
   - Processes various formats (images, PDFs, text files, audio) to extract meaningful data.

5. **Azure AI Content Understanding**: 
   - Extracts text and fields from uploaded documents for further processing.

6. **External API (job-recommend)**: 
   - Interfaces with Azure Machine Learning models to recommend jobs based on extracted data.

7. **Azure Machine Learning**: 
   - Processes the extracted fields and provides personalized job recommendations.

8. **Azure CosmosDB**: 
   - Stores extracted fields and other relevant data in a scalable manner for retrieval and analysis.

9. **Form-Filler Service**: 
   - Automatically populates forms using the extracted data.
   - Stores completed forms in Azure Blob Storage.

10. **Azure Synapse Analytics**: 
    - Analyzes the data stored in Azure CosmosDB and Azure SQL Database for insights.

11. **Azure SQL Database**: 
    - Maintains structured data for recommendation system and data analysis purposes.

12. **Azure AI Search**: 
    - Offers efficient search functionalities across the stored datasets.

13. **Azure OpenAI GPT40-mini**: 
    - Powers the chat assistant (InclusivAI Assistant), providing conversational help for job coaches.

14. **CI/CD, Identity, Monitoring & Secrets**:
    - **Microsoft Entra ID**: Manages user authentication and access control.
    - **Azure Monitor & Application Insights**: Ensures optimal performance and monitoring of all services.
    - **Azure Key Vault**: Safeguards secrets and encryption keys.
    - **Azure DevOps & GitHub**: Supports continuous integration/deployment and code versioning.

### **Frontend Technologies**
Web apps for job coaches (developed with modern frameworks such as Next.js and deployed on Azure Web Apps).

## Architecture Diagram

Here's a high level architecture diagram that illustrates these components. These are all contained within a single [resource group](https://docs.microsoft.com/azure/azure-resource-manager/management/manage-resource-groups-portal)

![Architecture Diagram](/docs/architecture-diagram/architecture-diagram.jpg)

## Demo Video

The following video shows the user interface.

[![Watch the video]()]()

## Installation and Execution

## Frontend

### Prerequisites
- Node.js (`>= 18`)
- Vercel CLI (`pnpm add -g vercel`)
- Azure account with access to storage and audio transcription services

### Clone the Repository
```bash
git clone https://github.com/user/inclusivai.git
cd inclusivai
```

### Configure Environment Variables
Create a `.env.local` file in the root of the project and define the following variables:
```ini
NEXT_PUBLIC_API_URL=<AZURE_API_URL>
NEXT_PUBLIC_SUBSCRIPTION_KEY=<SUBSCRIPTION_KEY>
```

### Install Dependencies
```bash
pnpm install
```

### Run in Development Mode
```bash
pnpm run dev
```
Access the application at `http://localhost:3000`

### Deploy to Vercel
```bash
vercel
```

## Contribution
If you want to contribute, follow these steps:
1. **Fork** the repository.
2. Create a new branch (`git checkout -b feature/new-feature`).
3. Make changes and commit them (`git commit -m "Add new feature"`).
4. Push the branch (`git push origin feature/new-feature`).
5. Open a **Pull Request** on GitHub.

## License
This project is licensed under the [**MIT**](/LICENSE) license.
