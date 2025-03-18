import azure.functions as func
import os
from azure.storage.blob import BlobServiceClient

# Create the Function App with anonymous HTTP access.
app = func.FunctionApp(http_auth_level=func.AuthLevel.ANONYMOUS)

@app.function_name(name="retrieve_transcript")
@app.route(route="retrieve_transcript")
def retrieve_transcript(req: func.HttpRequest) -> func.HttpResponse:
    """
    HTTP-triggered function to retrieve a transcription file from blob storage.
    Expects a query parameter 'filename' with the name of the file to retrieve.
    """
    blob_connection_str = os.getenv("AzureWebJobsStorage")
    container_name = "audio-transcriptions"
    filename = req.params.get("filename")
    if not filename:
        return func.HttpResponse("Missing 'filename' parameter", status_code=400)
    
    try:
        blob_service_client = BlobServiceClient.from_connection_string(blob_connection_str)
        blob_client = blob_service_client.get_blob_client(container=container_name, blob=filename)
        transcription = blob_client.download_blob().readall().decode('utf-8')
        return func.HttpResponse(transcription, status_code=200)
    except Exception as e:
        return func.HttpResponse(f"Error retrieving transcription: {str(e)}", status_code=500)
