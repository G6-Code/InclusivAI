# PDF Form Filler Azure Function

This Azure Function is designed to process data from a Cosmos DB trigger, fill a PDF form template with the extracted data, and save the filled PDF to Azure Blob Storage.

## Features

- **Cosmos DB Trigger**: Automatically triggers when new documents are added to a specified Cosmos DB container.
- **PDF Form Filling**: Uses the `PyPDFForm` library to populate a PDF template with data extracted from the Cosmos DB documents.
- **Blob Storage Integration**: Reads the PDF template from Azure Blob Storage and saves the filled PDF back to Blob Storage.
- **Error Handling**: Logs warnings and errors for invalid document structures or processing issues.

## How It Works

1. **Trigger**: The function is triggered by changes in a Cosmos DB container.
2. **Data Extraction**: Extracts fields from the Cosmos DB document and maps them to the corresponding fields in the PDF form.
3. **PDF Processing**:
   - Loads the PDF template from Blob Storage.
   - Fills the form fields with the extracted data.
   - Saves the filled PDF temporarily.
4. **Blob Storage Output**: Uploads the filled PDF to a specified Blob Storage container.
5. **Cleanup**: Deletes temporary files created during the process.

## File Structure

- **`function_app.py`**: Contains the Azure Function logic.
- **PDF Template**: The PDF form template is stored in the `forms` container in Azure Blob Storage.
- **Filled PDFs**: The filled PDFs are saved in the `forms-filled` container in Azure Blob Storage.

## Configuration

### Cosmos DB Trigger

- **Database Name**: `TranscriptionAnalysis`
- **Container Name**: `AnalysisResults`
- **Connection String**: `cosmosinclusivaidev_DOCUMENTDB`

### Blob Storage

- **Input Path**: `forms/0009 - Positive Personal Profile Summary.pdf`
- **Output Path**: `forms-filled/Sample Form 0009 Filled - Positive Personal Profile Summary-003.pdf`
- **Connection String**: `AzureWebJobsStorage`

## Dependencies

- **Azure Functions SDK**: For creating and managing Azure Functions.
- **PyPDFForm**: For filling PDF forms.
- **Azure SDK**: For interacting with Cosmos DB and Blob Storage.

Install the required Python packages using:

```bash
pip install azure-functions PyPDFForm