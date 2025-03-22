<p align="center">
  <img src="https://raw.githubusercontent.com/G6-Code/InclusivAI/refs/heads/main/docs/banner/banner.png" alt="Banner">
</p>

# InclusivAI
A tool to empower job coaches to unlock the full potential of supported employment.

**Less Paperwork, More Impact**

[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/G6-Code/InclusivAI)

## Screenshots

![Home Screenshot](/docs/screenshots/home.png)
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

6. **External API (www.usajobs.gov)**: 
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

13. **Azure OpenAI GPT4o-mini**: 
    - Powers the chat assistant (InclusivAI Assistant), providing conversational help for job coaches.

14. **CI/CD, Identity, Monitoring & Secrets**:
    - **Microsoft Entra ID**: Manages user authentication and access control.
    - **Azure Monitor & Application Insights**: Ensures optimal performance and monitoring of all services.
    - **Azure Key Vault**: Safeguards secrets and encryption keys.
    - **Azure DevOps & GitHub**: Supports continuous integration/deployment and code versioning.

15. **Frontend Technologies**
    - Web apps for job coaches (developed with modern frameworks such as Next.js and deployed on Azure Web Apps).

## Architecture Diagram

Here's a high level architecture diagram that illustrates these components. These are all contained within a single [resource group](https://docs.microsoft.com/azure/azure-resource-manager/management/manage-resource-groups-portal)

![Architecture Diagram](/docs/architecture-diagram/architecture-diagram.jpg)

## Demo Video

The following video shows the user interface.

[![Watch the video](/docs/screenshots/thumbnail.png)](https://www.youtube.com/watch?v=RENtcP0bCGU)


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

## Backend
### Deploy Azure Functions

The backend logic for InclusivAI is implemented using Azure Functions, located in the `/services` directory. Follow these steps to deploy and configure the Azure Functions:

#### Prerequisites
- Azure CLI installed
- An active Azure account
- Python (`>= 3.10`)
- Azure Functions Core Tools

#### Steps to Deploy

1. **Navigate to the Services Directory**
   ```bash
   cd services
   ```

2. **Create a Virtual Environment** Create and activate a virtual environment for the Azure Functions:  
    ```bash
    python -m venv .venv
    source .venv/bin/activate  # On Windows: .venv\Scripts\activate
    ```

3. **Install Dependencies** Install the required Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. **Create a Local Settings File** Create a local.settings.json file in the /services directory to define the required environment variables:
   ```json
    {
      "IsEncrypted": false,
      "Values": {
        "AzureWebJobsStorage": "<AZURE_STORAGE_CONNECTION_STRING>",
        "FUNCTIONS_WORKER_RUNTIME": "python",
        "API_URL": "<YOUR_API_URL>",
        "SUBSCRIPTION_KEY": "<YOUR_SUBSCRIPTION_KEY>"
      }
    }
   ```

5. Test Locally Run the Azure Functions locally to ensure they work as expected:

6. Login to Azure Authenticate with your Azure account:

7. Create a Resource Group Create a resource group to host the Azure Functions:

8. Create a Function App Create a Function App in Azure:

9. Deploy the Functions Deploy the Azure Functions to the created Function App:

10. **Verify Deployment** Go to the Azure Portal, navigate to the Function App, and verify that the functions are deployed and running.

####Notes
- Replace <AZURE_STORAGE_CONNECTION_STRING>, <YOUR_API_URL>, <YOUR_SUBSCRIPTION_KEY>, <LOCATION>, and <STORAGE_ACCOUNT_NAME> with your actual values.
- Ensure that the Azure Functions have the necessary permissions to access the required Azure resources.
For more details, refer to the Azure Functions Documentation(```markdown
### Deploy Azure Functions

The backend logic for InclusivAI is implemented using Azure Functions, located in the `/services` directory. Follow these steps to deploy and configure the Azure Functions:

#### Prerequisites
- Azure CLI installed (`npm install -g azure-cli`)
- An active Azure account
- Python (`>= 3.10`)
- Azure Functions Core Tools (`npm install -g azure-functions-core-tools@4`)
- Virtual environment tool (`python -m pip install virtualenv`)

#### Steps to Deploy

1. **Navigate to the Services Directory**
   ```bash
   cd services
   ```

2. **Create a Virtual Environment**
   Create and activate a virtual environment for the Azure Functions:
   ```bash
   python -m venv .venv
   source .venv/bin/activate  # On Windows: .venv\Scripts\activate
   ```

3. **Install Dependencies**
   Install the required Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. **Create a Local Settings File**
   Create a `local.settings.json` file in the `/services` directory to define the required environment variables:
   ```json
   {
     "IsEncrypted": false,
     "Values": {
       "AzureWebJobsStorage": "<AZURE_STORAGE_CONNECTION_STRING>",
       "FUNCTIONS_WORKER_RUNTIME": "python",
       "API_URL": "<YOUR_API_URL>",
       "SUBSCRIPTION_KEY": "<YOUR_SUBSCRIPTION_KEY>"
     }
   }
   ```

5. **Test Locally**
   Run the Azure Functions locally to ensure they work as expected:
   ```bash
   func start
   ```

6. **Login to Azure**
   Authenticate with your Azure account:
   ```bash
   az login
   ```

7. **Create a Resource Group**
   Create a resource group to host the Azure Functions:
   ```bash
   az group create --name InclusivAIResourceGroup --location <LOCATION>
   ```

8. **Create a Function App**
   Create a Function App in Azure:
   ```bash
   az functionapp create --resource-group InclusivAIResourceGroup --consumption-plan-location <LOCATION> --runtime python --functions-version 4 --name InclusivAIFunctionApp --storage-account <STORAGE_ACCOUNT_NAME>
   ```

9. **Deploy the Functions**
   Deploy the Azure Functions to the created Function App:
   ```bash
   func azure functionapp publish InclusivAIFunctionApp
   ```

10. **Verify Deployment**
    Go to the Azure Portal, navigate to the Function App, and verify that the functions are deployed and running.

#### Notes
- Replace `<AZURE_STORAGE_CONNECTION_STRING>`, `<YOUR_API_URL>`, `<YOUR_SUBSCRIPTION_KEY>`, `<LOCATION>`, and `<STORAGE_ACCOUNT_NAME>` with your actual values.
- Ensure that the Azure Functions have the necessary permissions to access the required Azure resources.

For more details, refer to the [Azure Functions Documentation](https://learn.microsoft.com/en-us/azure/azure-functions/).
 

## Contribution
If you want to contribute, follow these steps:
1. **Fork** the repository.
2. Create a new branch (`git checkout -b feature/new-feature`).
3. Make changes and commit them (`git commit -m "Add new feature"`).
4. Push the branch (`git push origin feature/new-feature`).
5. Open a **Pull Request** on GitHub.

## License
This project is licensed under the [**MIT**](/LICENSE) license.

## Authors

- [Gaby Mora](https://github.com/gabybot)
- [Freddy Pinto](https://www.github.com/FreddyPinto)
- [Hazel Tellez](https://github.com/HazelAmaT)
- [Akatzin Baldovinos](https://github.com/AkatzinBH)
- [Emmanuel Franco](https://github.com/cefd-escolar)