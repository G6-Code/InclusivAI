# Audio Transcription Azure Function

## Overview
This Azure Function automatically transcribes audio files uploaded to an Azure Storage container. When an audio file is uploaded to the 'audio-uploads' container, this function is triggered, processes the audio using Azure's Speech-to-Text service, and stores the resulting transcription in the 'audio-transcriptions' container.

## Architecture
The solution uses:
- Azure Functions with Python SDK v2
- Azure Blob Storage (for audio files and transcriptions)
- Azure Cognitive Services Speech-to-Text

## Prerequisites
- Azure account with an active subscription
- Azure Storage account with two containers:
  - `audio-uploads` (for source audio files)
  - `audio-transcriptions` (for resulting text transcriptions)
- Azure Cognitive Services Speech resource

## Environment Variables
The following environment variables must be set:
- `SPEECH_KEY`: Your Azure Speech service subscription key
- `SPEECH_REGION`: The region of your Azure Speech service (e.g., "westus", "eastus")
- `AzureWebJobsStorage`: Connection string for your Azure Storage account (set automatically by Azure Functions)

## Function Workflow
1. The function is triggered when an audio file is uploaded to the 'audio-uploads' container
2. The audio file is temporarily saved to the local filesystem
3. The Azure Speech-to-Text service transcribes the audio
4. The transcription is saved to the 'audio-transcriptions' container with the same filename plus "-transcription.txt"
5. The temporary file is deleted

## Speech Recognition
The function uses continuous recognition to handle audio files of various lengths. This approach is more robust than single-shot recognition, especially for longer recordings.

Default language is set to Spanish ("es-ES"), but can be modified by changing the `speech_config.speech_recognition_language` value.

## Error Handling
- All errors are logged for troubleshooting
- If transcription fails, an error message is stored in the output blob instead
- Temporary files are cleaned up regardless of success or failure

## Deployment
1. Clone this repository
2. Set up the required environment variables
3. Deploy to Azure Functions using Azure CLI, Visual Studio Code, or Azure Portal

```bash
# Example deployment using Azure Functions Core Tools
func azure functionapp publish <YourFunctionAppName>
```

## Testing
To test the function:
1. Upload an audio file to the 'audio-uploads' container
2. Check the function logs in the Azure Portal
3. Verify that a transcription file appears in the 'audio-transcriptions' container

## Limitations
- The function works best with clear audio in the configured language
- Very long audio files may require additional processing time
- Supported audio formats include WAV, MP3, OGG, and other formats supported by Azure Speech Service

## Performance Considerations
- For production use with large audio files, consider adjusting the function timeout settings
- The default timeout is 5 minutes, which may be insufficient for lengthy audio files

# Audio Transcription Function - Code Documentation

## Main Function: `audio_transcription`

```python
@app.function_name(name="transcribe_audio")
@app.blob_trigger(
    arg_name="myblob", 
    path="audio-uploads/{name}", 
    connection="AzureWebJobsStorage"
)
@app.blob_output(
    arg_name="outputblob", 
    path="audio-transcriptions/{name}-transcription.txt", 
    connection="AzureWebJobsStorage"
)
def audio_transcription(myblob: func.InputStream, outputblob: func.Out[str]):
```

### Description
This is the main Azure Function that's triggered when a new audio file is uploaded to the 'audio-uploads' container. It processes the audio and outputs the transcription.

### Parameters
- `myblob`: Input stream representing the uploaded audio file
- `outputblob`: Output stream where the transcription will be written

### Behavior
1. Generates a unique ID for the current execution
2. Logs the start of the transcription process
3. Creates a temporary file to store the audio
4. Calls the speech recognition service
5. Writes the transcription to the output blob
6. Cleans up temporary files
7. Handles and logs any exceptions

### Decorators
- `@app.function_name`: Names the function "transcribe_audio"
- `@app.blob_trigger`: Configures the function to trigger on blob uploads
- `@app.blob_output`: Configures where to write the output

## Helper Function: `recognize_from_file`

```python
def recognize_from_file(audio_file_path: str) -> str:
```

### Description
Handles the audio transcription using Azure's Speech-to-Text service.

### Parameters
- `audio_file_path`: Path to the audio file that needs to be transcribed

### Return Value
- `str`: The transcribed text from the audio file

### Behavior
1. Validates that required environment variables are set
2. Configures the speech recognition service
3. Sets up event handlers for continuous recognition
4. Starts the recognition process
5. Waits for completion
6. Concatenates all recognized text segments
7. Returns the final transcription

### Speech Recognition Process
- Uses continuous recognition to handle longer audio files
- Collects all recognized segments and combines them
- Handles session end and cancellation events

## Error Handling
The function implements comprehensive error handling:

1. Validates environment variables
2. Uses try-except blocks to catch and log exceptions
3. Ensures temporary files are deleted in the `finally` block
4. Provides meaningful error messages in logs and output

## Service Configuration
The Speech-to-Text service is configured with:
- Subscription key from environment variable
- Region from environment variable
- Language set to Spanish ("es-ES")

## Event Handlers
- `handle_final_result`: Collects recognized text segments
- `stop_cb`: Signals when the recognition process is complete

## Performance Considerations
- Uses continuous recognition for better handling of longer audio files
- Uses temporary files for efficient memory usage
- Cleans up resources properly to prevent leaks
