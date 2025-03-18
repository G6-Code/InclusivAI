# Transcription Analysis Function

## Overview

This Azure Function automates the analysis of transcription files using the Azure Content Understanding service. When a new transcription file is uploaded to the specified Azure Blob Storage container, the function processes it and stores the analysis results in a Cosmos DB collection.

## Features

- **Automated Triggering**: Monitors a blob container for new transcription files
- **Content Analysis**: Leverages Azure Content Understanding for detailed document analysis
- **Persistent Storage**: Stores analysis results in Cosmos DB for later retrieval
- **Error Handling**: Comprehensive error handling with detailed logging
- **Asynchronous Processing**: Uses polling pattern to handle long-running analysis operations

## Prerequisites

- Azure Functions environment
- Azure Storage Account
- Azure Cosmos DB Account
- Azure Content Understanding service access

## Configuration

The function requires the following environment variables:

| Variable | Description |
|----------|-------------|
| `AZURE_CONTENT_UNDERSTANDING_ENDPOINT` | Endpoint URL for the Content Understanding service |
| `CONTENT_UNDERSTANDING_API_VERSION` | API version (defaults to "2024-12-01-preview") |
| `AZURE_CONTENT_UNDERSTANDING_SUBSCRIPTION_KEY` | Subscription key for authentication |
| `CONTENT_UNDERSTANDING_ANALYZER_ID` | Analyzer ID to use |
| `AzureWebJobsStorage` | Connection string for Azure Storage |
| `CosmosDbConnectionSetting` | Connection string for Cosmos DB |
| `CONTAINER_SAS_TOKEN`| Container sas token value |
| `BLOB_STORAGE_URL`| Blob Storage URL |

## Usage

1. Deploy the function to your Azure Functions environment
2. Configure the required environment variables
3. Upload transcription files to the `audio-transcriptions` container in your Azure Storage Account
4. The function will automatically process new files and store results in the `AnalysisResults` container in Cosmos DB

## Architecture

```
[Blob Storage] --> [Azure Function] --> [Content Understanding API] --> [Cosmos DB]
```

## Error Handling

The function handles various error scenarios:
- Configuration errors (missing environment variables)
- HTTP errors (API communication issues)
- Timeout errors (when processing takes too long)
- Runtime errors (from the Content Understanding service)
- Unexpected errors (all other exceptions)

All errors are logged and stored in Cosmos DB with appropriate status information.

## Development Notes

- The `Settings` class validates required credentials and provides token management
- The `AzureContentUnderstandingClient` class handles communication with the Content Understanding API
- The function uses polling to wait for analysis completion, with configurable timeout and polling interval

## Troubleshooting

Common issues:
- Missing environment variables
- Invalid credentials
- Networking issues preventing API access
- Malformed transcription files

Check logs for detailed error messages and status information in the Cosmos DB collection.
