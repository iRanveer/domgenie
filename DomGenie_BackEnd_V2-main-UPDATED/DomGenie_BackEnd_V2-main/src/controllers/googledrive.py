from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from google_auth_oauthlib.flow import Flow
from google.auth.transport.requests import Request
from googleapiclient.discovery import build
import os
from typing import Annotated,List
from datetime import datetime
from pydantic import BaseModel
from fastapi.staticfiles import StaticFiles
from fastapi import FastAPI, APIRouter, HTTPException, Depends, BackgroundTasks, Response, Cookie,UploadFile, File,Header,status,Form
from sqlalchemy.ext.asyncio import AsyncSession
import os
import uuid
from io import BytesIO
from src.dependencies import get_db
from fastapi.responses import RedirectResponse
from fastapi.requests import Request
from src import schemas, models
from jose.exceptions import ExpiredSignatureError,JWTError
from src.core.jwt import (
    create_token_pair,
    refresh_token_state,
    decode_access_token,
    mail_token,
    add_refresh_token_cookie,
    SUB,
    JTI,
    EXP,
)
# from .utils import decode_base64, convert_docx_to_pdf, convert_image_to_pdf, convert_ppt_to_pdf, convert_txt_to_pdf, send_request_to_ai_endpoint
from googleapiclient.http import MediaIoBaseUpload
from fastapi.middleware.cors import CORSMiddleware
from io import BytesIO
import logging
import json
import base64
from fpdf import FPDF
from httpx import AsyncClient
import uuid
import concurrent.futures
from uuid import UUID
from googleapiclient.http import MediaFileUpload
import tempfile
from sqlalchemy.future import select
from sqlalchemy import create_engine
from sqlalchemy import update
router = APIRouter()
logger = logging.getLogger(__name__)
SCOPES = ['https://www.googleapis.com/auth/drive.file']
app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://your-production-domain.com"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

async def authenticate_google_drive(user_id: int, db: AsyncSession):
    try:
        print("Fetching credentials for user ID:", user_id)

        # Step 1: Fetch credentials from the database based on the user ID
        stmt = select(models.GoogleCredentials.credentials_json).where(
            models.GoogleCredentials.user_id == user_id
        ).order_by(
            models.GoogleCredentials.user_id.desc()
        ).limit(1)

        result = await db.execute(stmt)
        db_creds = result.fetchone()

        # Check if credentials exist in the database
        if db_creds:
            creds_json = db_creds[0]
            print("Credentials JSON:", creds_json)

            # Load the credentials from the JSON stored in the database
            creds = Credentials.from_authorized_user_info(eval(creds_json), scopes=SCOPES)
            print("Loaded credentials with scopes:", creds)

            # If the credentials object is missing required fields, reinitialize it properly
            if not creds or not creds.valid:
                creds = Credentials(
                    token=creds.token,
                    refresh_token=creds.refresh_token,
                    token_uri=creds.token_uri,
                    client_id=creds.client_id,
                    client_secret=creds.client_secret,
                    scopes=SCOPES,
                )
        else:
            print("No credentials found in the database for user ID:", user_id)
            creds = None
    except Exception as e:
        print(f"Error loading credentials from database: {e}")
        creds = None

    # Step 2: If no valid credentials, initiate OAuth flow to generate an authorization URL
    if creds and creds.expired and creds.refresh_token:
        try:
            # Use a proper Request context for refreshing credentials
            request = Request()
            creds.refresh(request)  # Attempt to refresh the token
            print("Refreshed credentials successfully:", creds)
        except Exception as e:
            print(f"Error refreshing credentials: {e}")
            creds = None
    elif not creds:
        try:
            # Initiate OAuth flow to get new credentials if no refresh token is available
            from google_auth_oauthlib.flow import Flow

            flow = Flow.from_client_secrets_file('credentials.json', scopes=SCOPES)
            flow.redirect_uri = 'https://docchats.ai/handleDriveCallback'

            # Generate authorization URL
            auth_url, _ = flow.authorization_url(prompt='consent')
            print("OAuth flow initiated, redirecting to:", auth_url)

            # Return the authorization URL so that the user can authenticate
            return {"auth_url": auth_url}
        except Exception as e:
            print(f"Error during OAuth flow: {e}")
            return None

    print("Returning credentials:", creds)
    return creds
@router.get("/google-auth")
async def google_auth(request: Request,token: str = Header(...), db: AsyncSession = Depends(get_db)):
    # Call authenticate_google_drive and pass the user_id
    if not token.startswith("Bearer "):
            raise HTTPException(status_code=401, detail="Invalid token format")
    access_token = token.split(" ")[1]
    payload = decode_access_token(access_token, db)
    user_id = payload["sub"]
    auth_url = await authenticate_google_drive(user_id, db)
    
    if auth_url:
        return {"auth_url": auth_url}
    else:
        return {"message": "Google Drive is already authenticated or an error occurred."}
    # if auth_url:
    #     return RedirectResponse(url=auth_url)
    # else:
    #     return {"error": "Authentication failed"}

@router.get("/google-auth/callback")
async def google_auth_callback(code: str, request: Request, token: str = Header(...), db: AsyncSession = Depends(get_db)):
    try:
        # Initialize the OAuth flow
        flow = Flow.from_client_secrets_file('credentials.json', scopes=SCOPES)
        flow.redirect_uri = 'https://docchats.ai/handleDriveCallback'
        flow.fetch_token(code=code)

        # Fetch the credentials and convert them to JSON
        creds = flow.credentials
        creds_json = creds.to_json()
        print("token data",token)
        # Validate the token format
        if not token.startswith("Bearer "):
            raise HTTPException(status_code=401, detail="Invalid token format")

        # Extract access token and decode it
        access_token = token.split(" ")[1]
        print("access",access_token)
        payload =  decode_access_token(access_token, db)  # Ensure this function is async if accessing DB
        user_id = payload["sub"]
        if not user_id:
            raise HTTPException(status_code=400, detail="User ID not found in token payload")

        # Perform an asynchronous query using AsyncSession and select()
        result = await db.execute(select(models.GoogleCredentials).filter_by(user_id=user_id))
        db_creds = result.scalars().first()  # Extract the first result

        # Save or update credentials in the database
        if db_creds:
            db_creds.credentials_json = creds_json  # Update existing credentials
        else:
            # Create a new record for the user
            new_creds = models.GoogleCredentials(user_id=user_id, credentials_json=creds_json)
            db.add(new_creds)

        await db.commit()  # Commit the transaction to save the credentials

        # Convert user ID to UUID if necessary
        try:
            user_uuid = uuid.UUID(user_id)
        except ValueError:
            raise HTTPException(status_code=400, detail="Invalid user ID format")

        # Fetch the user's Google Drive folder details
        stmt = (
                update(models.User)
                .where(models.User.id == user_uuid)
                .values(
                   
                    is_google_drive="1",
                    # created_at=datetime.utcnow()  # Only include fields that exist in the `User` model
                )
            )

            # Print the statement for debugging
        print(f"Executing update statement: {stmt}")

        await db.execute(stmt)
        await db.commit()

        # user_drive_query = select(
        #     models.User.google_drive_folder_id,
        #     models.User.is_google_drive
        # ).where(models.User.id == user_uuid).limit(1)
        
        # user_drive_data = await db.execute(user_drive_query)
        # get_drive_data = user_drive_data.fetchone()

        # Return the response with the user drive data
        return {"message": "Google authenticated successfully", "is_drive": "1"}

    except HTTPException as he:
        # Re-raise HTTP exceptions with detailed message
        raise he
    except Exception as e:
        # Catch and log any other exceptions for debugging
        return {"error": f"Error during OAuth callback: {str(e)}"}


def get_or_create_folder(service, folder_name, parent_folder_id=None):
    """Get the folder ID for a given folder name, or create it if it doesn't exist."""
    query = f"name = '{folder_name}' and mimeType = 'application/vnd.google-apps.folder'"
    if parent_folder_id:
        query += f" and '{parent_folder_id}' in parents"
    
    response = service.files().list(q=query, spaces='drive', fields="files(id, name)").execute()
    files = response.get('files', [])

    if files:
        return files[0]['id']  # Return the first matching folder ID

    # Create a new folder if not found
    folder_metadata = {
        'name': folder_name,
        'mimeType': 'application/vnd.google-apps.folder'
    }
    if parent_folder_id:
        folder_metadata['parents'] = [parent_folder_id]

    folder = service.files().create(body=folder_metadata, fields='id').execute()
    return folder.get('id')

def create_drive_folder(service, folder_name):
    file_metadata = {
        'name': folder_name,
        'mimeType': 'application/vnd.google-apps.folder'
    }
    folder = service.files().create(body=file_metadata, fields='id').execute()
    return folder.get('id')
def decode_base64(data):
    """Decodes base64, padding being optional."""
    missing_padding = len(data) % 4
    if missing_padding:
        data += '=' * (4 - missing_padding)
    return base64.b64decode(data)   
@router.post("/upload_multiple_base64/")
async def upload_images(
    data: schemas.QueryRequest,
    token: str = Header(...),
    db: AsyncSession = Depends(get_db),
):
    try:
        # Validate and decode the access token
        if not token.startswith("Bearer "):
            raise HTTPException(status_code=401, detail="Invalid token format")
        access_token = token.split(" ")[1]
        payload = decode_access_token(access_token, db)

        # Ensure user_id is a UUID
        user_id = payload["sub"]
        user_uuid = uuid.UUID(user_id)
        # Authenticate Google Drive service dynamically
        creds = await authenticate_google_drive(user_id, db)
        if not creds:
            raise HTTPException(status_code=500, detail="Google Drive authentication failed")

        # Create the Google Drive service using the valid credentials
        service = build('drive', 'v3', credentials=creds)

        # Create or retrieve the user-specific folder on Google Drive
        folder_id = get_or_create_folder(service, f'doc_chat/{user_id}')
        print("folder id",folder_id)
        # Ensure the local directory exists
        user_directory = f'./uploads/{user_id}'
        os.makedirs(user_directory, exist_ok=True)

        uploaded_files = []

        for idx, file_data in enumerate(data.file_names):
            filename = file_data.get('filename')
            base_64_content = file_data.get('base_64_content')

            if not filename or not base_64_content:
                raise HTTPException(status_code=400, detail=f"Missing filename or base_64_content for file #{idx}")

            # Decode the base64 content
            decoded_content = decode_base64(base_64_content)
            file_extension = os.path.splitext(filename)[1].lower()
            pdf_buffer = BytesIO(decoded_content)

            # Prepare the output filename
            output_filename = f"{os.path.splitext(filename)[0]}.pdf"

            # Convert files to PDF if necessary
            if file_extension in ['.doc', '.docx']:
                pdf_buffer = convert_docx_to_pdf(decoded_content)
            elif file_extension in ['.jpg', '.jpeg', '.png']:
                pdf_buffer = convert_image_to_pdf(decoded_content)
            elif file_extension in ['.ppt', '.pptx']:
                pdf_buffer = convert_ppt_to_pdf(decoded_content)
            elif file_extension == '.txt':
                pdf_buffer = convert_txt_to_pdf(decoded_content)
            elif file_extension == '.pdf':
                pdf_buffer = BytesIO(decoded_content)
            else:
                raise HTTPException(status_code=400, detail=f"Unsupported file type: {file_extension}")

            pdf_buffer.seek(0)

            # Save file locally with the original filename
            file_location = os.path.join(user_directory, output_filename)
            with open(file_location, "wb") as file_object:
                file_object.write(pdf_buffer.getvalue())

            # Upload to Google Drive using the dynamic folder ID
            mime_type = 'application/pdf'
            drive_file_id = upload_file_to_drive(file_location, mime_type, folder_id, service)

            # Append the uploaded file's path
            uploaded_files.append(file_location)

            # Store file metadata in the database with the original filename
            file_id = uuid.uuid4()
            new_file = models.UserFile(
                id=file_id,
                user_id=user_id,
                filename=filename,  # Use the original filename here
                chat_id_new="",
                created_at=datetime.utcnow()  # Use built-in UTC function from `datetime` module
            )
            db.add(new_file)
            await db.commit()
            await db.refresh(new_file)

        # Update the user's folder_id and is_google_drive fields
        try:
            # Use datetime.utcnow() from `datetime` module to avoid compilation errors
            stmt = (
                update(models.User)
                .where(models.User.id == user_uuid)
                .values(
                    google_drive_folder_id=folder_id, 
                    is_google_drive="1",
                    # created_at=datetime.utcnow()  # Only include fields that exist in the `User` model
                )
            )

            # Print the statement for debugging
            print(f"Executing update statement: {stmt}")

            await db.execute(stmt)
            await db.commit()

            print(f"User {user_id} successfully updated with folder ID {folder_id} and Google Drive status set to 1")

        except Exception as e:
            await db.rollback()  # Rollback in case of error
            raise HTTPException(status_code=500, detail=f"Failed to update user: {e}")

        if not uploaded_files:
            raise HTTPException(status_code=500, detail="No files were successfully uploaded")

        return {
            "message": "Files uploaded successfully",
            "file_names": uploaded_files,
            "folder_id": folder_id,  # Include folder ID in the response
        }

    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal server error: {e}")
def upload_file_to_drive(file_path, mime_type, folder_id, service):
    # Use the file_path to upload to Google Drive
    file_metadata = {
        'name': os.path.basename(file_path),
        'parents': [folder_id]
    }
    media = MediaFileUpload(file_path, mimetype=mime_type)

    # Upload to Google Drive using the service
    file = service.files().create(body=file_metadata, media_body=media, fields='id').execute()

    # Return the file ID
    return file.get('id')