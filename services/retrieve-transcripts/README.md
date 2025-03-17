# Azure Function: Retrieve Transcription

This Azure Function is an HTTP-triggered service that retrieves transcription files from Azure Blob Storage. The function is built using the Azure Functions Python SDK V2 and leverages the Azure Storage Blob SDK to access transcription files stored in the `audio-transcriptions` container.

## Overview

The `retrieve_transcript` function expects an HTTP GET request with a query parameter `filename` that specifies the name of the transcription file to retrieve (for example, `transcript-form0009-001.txt`). If the parameter is missing, the function returns a 400 error. When the file exists, the function reads the blob content and returns the transcription text as the HTTP response.

## Requirements

- **Azure Functions Core Tools v4**  
- **Python 3.8 or higher** (tested with Python 3.11)  
- **Azure Storage Account** with a Blob Container named `audio-transcriptions`
- **AzureWebJobsStorage** connection string configured in your environment

## Installation

1. Clone the repository:
    ```bash
    git clone https://your-repository-url.git
    cd services/audio-transcriptions
    ```

2. Install the required dependencies:
    ```bash
    pip install -r requirements.txt
    ```

## Configuration

Make sure the following environment variables are set before running the function:

- `AzureWebJobsStorage` – Your Azure Storage connection string.
- Optionally, if you have additional configurations, add them to your local settings file (local.settings.json) as needed.

Example `local.settings.json`:
```json
{
  "IsEncrypted": false,
  "Values": {
    "AzureWebJobsStorage": "YourAzureStorageConnectionString",
    "FUNCTIONS_WORKER_RUNTIME": "python"
  }
}
```

## Usage

### Running Locally

1. Start the Azure Functions host:
    ```bash
    func start
    ```

2. Make an HTTP GET request to retrieve a transcription:
    ```
    http://localhost:7071/api/retrieve_transcript?filename=transcript-form0009-001.txt
    ```
   This will return the transcription content of the specified file from the `audio-transcriptions` container.

### Deployment

Deploy your function to Azure using your preferred method (Azure CLI, VS Code, GitHub Actions, etc.). Ensure that the required environment variables are configured in your Azure Function App settings.

## Code Structure

- **`function_app.py`**  
  Contains the function app definition using the Azure Functions Python SDK V2.

- **Function Definition**  
  The function is decorated with `@app.function_name` and `@app.route` to define its name and route. It retrieves the `filename` parameter, connects to the Blob Storage, reads the file, and returns its content.

## Troubleshooting

- **Missing `filename` Parameter:**  
  If you see an error message stating "Missing 'filename' parameter", make sure your request URL includes the parameter. For example:
  ```
  http://localhost:7071/api/retrieve_transcript?filename=transcript-form0009-001.txt
  ```

- **Blob Not Found:**  
  Ensure that the file exists in the `audio-transcriptions` container and that your storage connection string is correct.

- **Local Environment Issues:**  
  Verify your Python version and that all dependencies are installed correctly.