import azure.functions as func
import logging
import os
import azure.cognitiveservices.speech as speechsdk
import uuid
import tempfile
import time

# Initialize the Function App
app = func.FunctionApp()

# Get credentials from environment variables
speech_key = os.getenv("SPEECH_KEY")
speech_region = os.getenv("SPEECH_REGION")


@app.function_name(name="function_transcript")
@app.blob_trigger(
    arg_name="myblob", path="audio-uploads/{name}", connection="AzureWebJobsStorage"
)
@app.blob_output(
    arg_name="outputblob",
    path="audio-transcriptions/{name}-transcription.txt",
    connection="AzureWebJobsStorage",
)
def audio_transcription(myblob: func.InputStream, outputblob: func.Out[str]):
    """
    Azure Function that transcribes audio files using Azure Speech-to-Text service.

    This function is triggered when an audio file is uploaded to the 'audio-uploads' container.
    It processes the audio file, transcribes it, and saves the transcription to the
    'audio-transcriptions' container with the same filename plus "-transcription.txt" suffix.

    Parameters:
        myblob (func.InputStream): The input stream containing the uploaded audio file.
        outputblob (func.Out[str]): The output stream where the transcription will be written.

    Notes:
        - Requires SPEECH_KEY and SPEECH_REGION environment variables to be set.
        - Creates a temporary file to process the audio.
        - Uses continuous recognition for better handling of longer audio files.
    """

    audio_id = str(uuid.uuid4())  # Generate unique ID for correlation
    logging.info(f"Starting transcript for audio: {myblob.name} with ID: {audio_id}\n")

    try:
        # Create a temporary file to store the audio
        # This is necessary because the Speech SDK requires a file path
        with tempfile.NamedTemporaryFile(
            delete=False, suffix=os.path.splitext(myblob.name)[1]
        ) as temp_file:
            temp_file.write(myblob.read())
            temp_file_path = temp_file.name
        logging.info(f"Temporary audio file created at: {temp_file_path}")

        # Perform audio transcription
        transcription_text = recognize_from_file(temp_file_path)

        # Save the transcription to the output container
        outputblob.set(transcription_text)

        logging.info(f"Transcription completed for: {myblob.name} with ID: {audio_id}")

    except Exception as e:
        # Log any errors that occur during processing
        error_message = f"Error processing audio {myblob.name}: {str(e)}"
        logging.error(error_message)
        # Save the error message to the output container for visibility
        outputblob.set(f"ERROR: {error_message}")

    finally:
        # Clean up temporary files regardless of success or failure
        if "temp_file_path" in locals():
            try:
                os.remove(temp_file_path)
                logging.info(f"Temporary file deleted: {temp_file_path}")
            except Exception as e:
                logging.warning(f"Could not delete temporary file: {str(e)}")


def recognize_from_file(audio_file_path: str) -> str:
    """
    Transcribes audio using Azure's Speech-to-Text service.

    This function uses continuous recognition to handle audio files of various lengths.
    It collects all recognized segments and combines them into a single transcription.

    Parameters:
        audio_file_path (str): Path to the audio file to be transcribed.

    Returns:
        str: The transcribed text from the audio file. If no text is recognized,
             returns an error message.

    Raises:
        ValueError: If SPEECH_KEY or SPEECH_REGION environment variables are not set.
        Exception: If an error occurs during the transcription process.
    """

    # Validate environment variables
    if not speech_key or not speech_region:
        logging.info("Did you set the speech resource key and region values?")
        raise ValueError(
            "Environment variables SPEECH_KEY and SPEECH_REGION must be configured."
        )

    try:
        # Configure the speech service
        speech_config = speechsdk.SpeechConfig(
            subscription=speech_key, region=speech_region
        )
        # Set recognition language - change as needed
        speech_config.speech_recognition_language = "en-US"

        # Configure audio input
        audio_config = speechsdk.audio.AudioConfig(filename=audio_file_path)
        speech_recognizer = speechsdk.SpeechRecognizer(
            speech_config=speech_config, audio_config=audio_config
        )
    except Exception as e:
        logging.error(f"Error during speech recognition setup or execution: {str(e)}")
        return "Error in speech recognition service."

    # Container to accumulate recognized text
    all_results = []

    # Flag to signal the end of recognition
    done = False

    def stop_cb(evt):
        nonlocal done
        logging.info(f"Session stopped/canceled: {evt}")
        done = True

    # Callback to capture recognized speech results
    def recognized_cb(evt):
        if evt.result.reason == speechsdk.ResultReason.RecognizedSpeech:
            logging.info(f"Recognized: {evt.result.text}")
            all_results.append(evt.result.text)
        elif evt.result.reason == speechsdk.ResultReason.NoMatch:
            logging.error("No speech could be recognized in a segment.")

    # Connect callbacks to events
    speech_recognizer.recognized.connect(recognized_cb)
    speech_recognizer.session_stopped.connect(stop_cb)
    speech_recognizer.canceled.connect(stop_cb)

    try:
        # Start continuous recognition
        speech_recognizer.start_continuous_recognition()
        # Wait until the recognition session signals it is done
        while not done:
            time.sleep(0.5)
        speech_recognizer.stop_continuous_recognition()
    except Exception as e:
        logging.error(f"Error during continuous recognition: {str(e)}")
        return "Error during continuous recognition."

    # Return the combined transcription text
    return " ".join(all_results)
