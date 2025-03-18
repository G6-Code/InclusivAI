import azure.functions as func
import logging
import json
import os
import tempfile
from PyPDFForm import FormWrapper

# Create an Azure Function App instance
app = func.FunctionApp()

# Define the Azure Function name
@app.function_name(name="pdf_filler")
# Define a Cosmos DB trigger, blob input, and blob output bindings
@app.cosmos_db_trigger(arg_name="documents", 
                      database_name="TranscriptionAnalysis",
                      container_name="AnalysisResults",
                      connection="cosmosinclusivaidev_DOCUMENTDB",
                      create_lease_container_if_not_exists=True)
@app.blob_input(arg_name="pdfTemplate", 
               path="forms/0009 - Positive Personal Profile Summary.pdf",
               connection="AzureWebJobsStorage",
               data_type="binary")
@app.blob_output(arg_name="filledForm", 
                path="forms-filled/Sample Form 0009 Filled - Positive Personal Profile Summary-003.pdf",
                connection="AzureWebJobsStorage")                
def pdf_filler(documents: func.DocumentList, pdfTemplate: func.InputStream, filledForm: func.Out[bytes]):
    """
    Azure Function to fill a PDF form with data extracted from a Cosmos DB trigger.
    """
    # Log the number of documents being processed
    logging.info(f'Python Cosmos DB trigger processing {len(documents)} documentos')
    
    try:
        for doc in documents:
            # Convert the document to a dictionary
            document = json.loads(doc.to_json())
            document_id = document.get('id', 'default-id')
            logging.info(f"Processing document with ID: {document_id}")
            
            # Check if the document has the expected structure
            if 'result' not in document or 'contents' not in document['result']:
                logging.warning(f"Document {document_id} does not have the expected structure")
                continue

            # Extract fields from the document
            extracted_fields = document['result']['contents'][0]['fields']
            
            # Load the PDF template as a temporary file
            try:
                with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as temp_file:
                    temp_file.write(pdfTemplate.read())
                    temp_pdf_path = temp_file.name
                
                logging.info(f"Temporary PDF saved at: {temp_pdf_path}")
                
                # Define mappings for radio buttons and checkboxes
                relationship_mapping = {
                    "family_member": 1,
                    "friend_peer": 2,
                    "service_provider": 3,
                    "other": 4
                }

                duration_mapping = {
                    "less_than_one": 1,
                    "one_to_three": 2,
                    "three_to_five": 3,
                    "five_to_ten": 4,
                    "more_than_ten": 5
                }

                # Parse collected information (checkboxes)
                information_collected_values = extracted_fields.get("information_collected", {}).get("valueString", "").split()
                information_collected = {
                    "one_on_one": "one_on_one" in information_collected_values,
                    "observing_in_group": "observing_in_group" in information_collected_values,
                    "file_review": "file_review" in information_collected_values,
                    "observe_on_job": "observe_on_job" in information_collected_values,
                    "interview_professionals": "interview_professionals" in information_collected_values,
                    "interview_family": "interview_family" in information_collected_values,
                    "observe_at_home": "observe_at_home" in information_collected_values,
                    "standardized_tests": "standardized_tests" in information_collected_values,
                    "observe_in_community": "observe_in_community" in information_collected_values,
                    "work_simulations": "work_simulations" in information_collected_values,
                    "other_3": "other" in information_collected_values
                }

                # Map extracted fields to PDF form fields
                form_data = {
                    # Basic text fields
                    "jobseeker_name": extracted_fields.get("jobseeker_name", {}).get("valueString", ""),
                    "form_date_1": extracted_fields.get("form_date", {}).get("valueString", ""),
                    "form_date_2": extracted_fields.get("form_date", {}).get("valueString", ""),
                    "career_specialist_1": extracted_fields.get("career_specialist", {}).get("valueString", ""),
                    "career_specialist_2": extracted_fields.get("career_specialist", {}).get("valueString", ""),
                    "position_title": extracted_fields.get("position_title", {}).get("valueString", ""),
                    "reporting_period": extracted_fields.get("reporting_period", {}).get("valueString", ""),
                    
                    # Interviewee name based on relationship
                    "interviewee_name_1": extracted_fields.get("interviewee_name", {}).get("valueString", "") if extracted_fields.get("relationship_jobseeker", {}).get("valueString", "") == "family_member" else "",
                    "interviewee_name_2": extracted_fields.get("interviewee_name", {}).get("valueString", "") if extracted_fields.get("relationship_jobseeker", {}).get("valueString", "") == "friend_peer" else "",
                    "interviewee_name_3": extracted_fields.get("interviewee_name", {}).get("valueString", "") if extracted_fields.get("relationship_jobseeker", {}).get("valueString", "") == "service_provider" else "",
                    "interviewee_name_4": extracted_fields.get("interviewee_name", {}).get("valueString", "") if extracted_fields.get("relationship_jobseeker", {}).get("valueString", "") == "other" else "",
                    
                    # Radio buttons for relationship
                    "interviewee": relationship_mapping.get(extracted_fields.get("relationship_jobseeker", {}).get("valueString", ""), 0),
                    
                    # Radio buttons for duration
                    "interviewee_duration": duration_mapping.get(extracted_fields.get("interviewee_duration", {}).get("valueString", ""), 0),
                    
                    # Fields for interests and activities
                    "interests_activities": extracted_fields.get("interests_activities", {}).get("valueString", ""),
                    "leisure_activities": extracted_fields.get("leisure_activities", {}).get("valueString", ""),
                    "environmental_conditions": extracted_fields.get("environmental_conditions", {}).get("valueString", ""),
                    "talents": extracted_fields.get("talents", {}).get("valueString", ""),
                    "learning_methods": extracted_fields.get("learning_methods", {}).get("valueString", ""),
                    "other_interests": extracted_fields.get("additional_information", {}).get("valueString", ""),
                    
                    # Fields for experience and skills
                    "work_experiences": extracted_fields.get("work_experiences", {}).get("valueString", ""),
                    "household_chores": extracted_fields.get("household_chores", {}).get("valueString", ""),
                    "community_activities": extracted_fields.get("community_activities", {}).get("valueString", ""),
                    "vocational_training": extracted_fields.get("vocational_training", {}).get("valueString", ""),
                    "academic_skills": extracted_fields.get("academic_skills", {}).get("valueString", ""),
                    "Other comments life and work experiences": "",
                    
                    # Fields for preferences and dislikes
                    "dislikes": extracted_fields.get("dislikes", {}).get("valueString", ""),
                    "situations_to_avoid": extracted_fields.get("situations_to_avoid", {}).get("valueString", ""),
                    "Other comments dislikes etc": "",
                    
                    # Fields for services and supports
                    "current_services": extracted_fields.get("current_services", {}).get("valueString", ""),
                    "necessary_accommodations": extracted_fields.get("necessary_accommodations", {}).get("valueString", ""),
                    "support_needs": extracted_fields.get("support_needs", {}).get("valueString", ""),
                    "Other comments accommodation and support needs": "",
                    
                    # Fields for transportation
                    "transportation_methods": extracted_fields.get("transportation_methods", {}).get("valueString", ""),
                    "transportation_resources": extracted_fields.get("transportation_resources", {}).get("valueString", ""),
                    "Other comments transportation": "",
                    
                    # Fields for characteristics and personality
                    "temperament_1": extracted_fields.get("temperament", {}).get("valueString", ""),
                    "temperament_2": extracted_fields.get("temperament", {}).get("valueString", ""),
                    "admired_characteristics": extracted_fields.get("admired_characteristics", {}).get("valueString", ""),
                    "dream_job": extracted_fields.get("dream_job", {}).get("valueString", ""),
                    "habits_routines": extracted_fields.get("habits_routines", {}).get("valueString", ""),
                    "additional_information": extracted_fields.get("additional_information", {}).get("valueString", ""),
                    "Other comments skills and knowledge": "",
                    
                    # Checkbox for "met benefits specialist"
                    "met_benefits_specialist": 1 if extracted_fields.get("met_benefits_specialist", {}).get("valueString", "") == "yes" else 0,
                    
                    # Other fields
                    "other": "",
                    "other_2": "",
                    "signature": ""
                }

                # Add checkboxes for collected information
                form_data.update(information_collected)

                logging.info("Filling PDF form...")
                
                # Fill the PDF form
                filled_form = FormWrapper(temp_pdf_path).fill(
                    form_data,
                    flatten=False,  # Keep the form editable
                    adobe_mode=True  # Use Adobe mode for compatibility
                )

                # Save the filled PDF temporarily
                with tempfile.NamedTemporaryFile(delete=False, suffix='.pdf') as temp_output_file:
                    temp_output_path = temp_output_file.name
                    temp_output_file.write(filled_form.read())
                
                logging.info(f"Filled PDF temporarily saved at: {temp_output_path}")
                
                # Read the filled PDF and upload it to blob storage
                with open(temp_output_path, "rb") as filled_pdf:
                    filledForm.set(filled_pdf.read())
                
                logging.info(f"Filled PDF saved to forms-filled/{document_id}.pdf")
                
                # Clean up temporary files
                try:
                    os.unlink(temp_pdf_path)
                    os.unlink(temp_output_path)
                    logging.info("Temporary files deleted successfully")
                except Exception as e:
                    logging.warning(f"Error deleting temporary files: {str(e)}")
                
            except Exception as e:
                logging.error(f"Error processing the PDF: {str(e)}")
                raise
            
    except Exception as e:
        logging.error(f"Error processing documents: {str(e)}")
        raise