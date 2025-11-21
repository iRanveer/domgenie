from typing import Annotated,List
from datetime import datetime
from pydantic import BaseModel
from fastapi.staticfiles import StaticFiles
from fastapi import FastAPI, APIRouter, HTTPException, Depends, BackgroundTasks, Response, Cookie,UploadFile, File,Header,status,Form
from fastapi.responses import JSONResponse
from fastapi.responses import FileResponse
from datetime import datetime
import os
import io
import base64
import urllib.parse
from docx2pdf import convert
from datetime import datetime
from fastapi.exceptions import RequestValidationError
from fastapi.security import OAuth2PasswordBearer,OAuth2PasswordRequestForm
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from fastapi.responses import StreamingResponse
from sqlalchemy import update
from sqlalchemy import delete
from fastapi.routing import APIRouter
from pydantic import ValidationError
from sqlalchemy.exc import IntegrityError
import pdfkit
import requests
import json
import logging
import base64
from fpdf import FPDF
from googleapiclient.http import MediaIoBaseUpload
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from google_auth_oauthlib.flow import Flow
from google.auth.transport.requests import Request
import re
from httpx import AsyncClient
import asyncio
import logging
import httpx
import concurrent.futures
import uuid
from uuid import UUID
from magic import Magic
from src.dependencies import get_db
from src import schemas, models
from src.core.hash import get_password_hash, verify_password
from src.core.google import  generate_google_access_token,get_google_flow,authenticate_and_get_profile
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
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph
from reportlab.lib.units import inch
from reportlab.lib.styles import getSampleStyleSheet
from src.exceptions import BadRequestException, NotFoundException, ForbiddenException
from src.tasks import (
    user_mail_event,
)

from docx import Document
import boto3
from botocore.exceptions import NoCredentialsError, PartialCredentialsError
from botocore.client import Config
from io import BytesIO
from PyPDF2 import PdfFileMerger
from PIL import Image
from src.models import User_response
from pptx import Presentation
from fastapi.middleware.cors import CORSMiddleware
# from src.controllers.auth import router as auth_router
from src.controllers.s3_utils import get_images_from_bucket,get_summary_from_bucket,get_chat_history_from_bucket,save_chat_history_to_s3,get_chat_history_from_bucket,get_images_from_bucket1
router = APIRouter()
logging.basicConfig(level=logging.ERROR, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")
FACEBOOK_CLIENT_ID = "1476496809335733"
FACEBOOK_CLIENT_SECRET = "8486fe4b1d8fe4b27e9c02af99762be1"
FACEBOOK_REDIRECT_URI = "http://docchats.ai/handleFacebookCallback"
GOOGLE_CLIENT_ID = "937612823524-q73pal5k252uuu9lfqkd43c1ueoiru5s.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET = "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"
GOOGLE_REDIRECT_URI = "http://docchats.ai/handleOAuthCallback"
# commit new file
Ai_model_url="http://3.108.57.25:8000"
SCOPE = "email"
app = FastAPI()
session = boto3.session.Session()
client = session.client(
    's3',
    region_name='us-east-1',
    aws_access_key_id='AKIA3C6FMJ5UJFFPWIGK',
    aws_secret_access_key='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'
)

task_results = {}
user_events = {}

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3001"],  # Update with your frontend domain
    allow_credentials=True,
    allow_methods=["*"],  # You can restrict this to specific methods like ["GET"]
    allow_headers=["*"],  # You can restrict this to specific headers
)
@router.get("/login/google")
def login_google():
    flow = get_google_flow()  # Implement this function to get OAuth2 flow
    authorization_url, state = flow.authorization_url(
        access_type="offline",
        include_granted_scopes="false",
        state="random_state",
    )
    return {"authorization_url": authorization_url}

@router.get("/callback/google")
async def login_with_google_callback(
    code: str, state: str, db: AsyncSession = Depends(get_db)
):
    if not code or not state:
        raise HTTPException(status_code=400, detail="Invalid code or state parameter")

    try:
        async with httpx.AsyncClient() as client:
            # Exchange authorization code for access token
            token_response = await client.post(
                "https://oauth2.googleapis.com/token",
                data={
                    "client_id": GOOGLE_CLIENT_ID,
                    "client_secret": GOOGLE_CLIENT_SECRET,
                    "redirect_uri": GOOGLE_REDIRECT_URI,
                    "code": code,
                    "grant_type": "authorization_code",
                }
            )
            token_response_data = token_response.json()
            print("Token Response Data:", token_response_data)  # For debugging

            if "error" in token_response_data:
                raise HTTPException(status_code=400, detail=token_response_data.get("error_description", "Unknown error"))

            access_token = token_response_data.get("access_token")
            if not access_token:
                raise HTTPException(status_code=400, detail="Access token not found")

            # Fetch user profile information
            user_profile_response = await client.get(
                "https://www.googleapis.com/oauth2/v2/userinfo",
                params={"access_token": access_token}
            )
            user_profile_data = user_profile_response.json()
            print("User Profile Data:", user_profile_data)  # For debugging

            # Check if user exists in the database
            query = select(models.User).filter(models.User.email == user_profile_data.get("email"))
            result = await db.execute(query)
            existing_user = result.scalar_one_or_none()

            if existing_user:
                token_pair = create_token_pair(user=existing_user)
                user_data = {
                    "email": existing_user.email,
                    "full_name": existing_user.full_name,
                    "phone": existing_user.phone,
                    "role_id": existing_user.role_id,
                }
                return {
                    "access_token": token_pair.access.token,
                    "refresh_token": token_pair.refresh.token,
                    "user_data": user_data,
                }

            # Handle user creation if not exist
            user_data = {
                "email": user_profile_data.get("email"),
                "full_name": user_profile_data.get("name"),
                "phone": "default_phone_value",  # Ensure this matches your schema (nullable or default)
                "role_id": 1,  # Ensure this matches your schema
                "password": "default_password",  # Ensure this matches your schema and consider hashing passwords
                "is_active": True  # Ensure this matches your schema
            }
            new_user = models.User(**user_data)
            db.add(new_user)
            await db.commit()

            token_pair = create_token_pair(user=new_user)
            user_data = {
                "email": new_user.email,
                "full_name": new_user.full_name,
                "phone": new_user.phone,
                "role_id": new_user.role_id,
            }
            return {
                "access_token": token_pair.access.token,
                "refresh_token": token_pair.refresh.token,
                "user_data": user_data,
            }

    except httpx.HTTPStatusError as e:
        print("HTTP Status Error:", e)  # For debugging
        raise HTTPException(status_code=e.response.status_code, detail=e.response.text)
    except Exception as e:
        print("Exception:", str(e))  # For debugging
        raise HTTPException(status_code=500, detail=str(e))
@router.post("/send_prompt")
async def send_data_to_api(
    data: schemas.QueryRequest1,
    token: str = Header(...),
    db: AsyncSession = Depends(get_db)
):
    if not token.startswith("Bearer "):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token format")

    access_token = token.split(" ")[1]
    payload = decode_access_token(token=access_token, db=db)
    data_json=dict()
    url = f"{Ai_model_url}/ask"  # Replace with your API endpoint
    data_json['prompt'] = data.query
    data_json["userid"] = payload["sub"]
    file_id = uuid.uuid4()
    # response = requests.post(url, json=data_json)
    # response_json=response.json()
    # return {"message": response_json}
    try:
        if not data.chat_id:
            chat_entry = models.User_Chat(
                chat_id=file_id,
                user_id=payload["sub"],
                user_query=data.query,
                file_name="",
                is_delete=0,  # Assuming 0 indicates not deleted
                # intermediate_step=data.intermediate_steps[0] if data.intermediate_steps else "",
                created_at=datetime.utcnow()
            )
            
            db.add(chat_entry)
            await db.commit()
            await db.refresh(chat_entry)
            chat_id = chat_entry.chat_id
        else:
            chat_id = data.chat_id
            
        data_json['chat_id'] = chat_id
        response = requests.post(url, json=data_json)

        response.raise_for_status()
        if response.status_code == 200:
            try:
        # Create the response data and serialize it
                response_json=response.json()
                print(response_json)
                response_data_response = {"response":  response_json["answer"]}
                # return {"message": response_json}
                response_data_response_serialized = json.dumps(response_data_response)
                file_id = uuid.uuid4()

                
                

            except Exception as e:
              raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}") 
            chat_history=[]
            # chat_history = response_json["chat_history"]
            # if "summary" in response_json and response_json["summary"]:
            #     summary_content = response_json["summary"]
            #     chat_history.append({"summary": summary_content})

            # Save the updated chat history
            # save_chat_history_as_json(chat_history, json_file_path)
            user_id_new=payload["sub"]
            bucket_name = 'domgenies3'
            s3_file_name = f"chat_history/{user_id_new}/chat_history_{chat_id}.json"
            chat_history.append({"query": data.query,"answer":  response_json["answer"]})
            response_json['chat_id']=chat_id
            # chat_history.append({"answer": response_json["output"]})
            save_chat_history_to_s3(chat_history, bucket_name, s3_file_name)
            return {"message": response_json}
        else:
            raise HTTPException(status_code=response.status_code, detail="Failed to send data to the AI endpoint")
        # response_json = response.json()
        # intermediate_steps = response_json.get("intermediate_steps", [])
        # intermediate_step = intermediate_steps[0] if intermediate_steps else "search"

        # chat_history = [
        #     {
        #     "query": data.query,
        #     "answer": response_json["output"],
        #     "response_id":""
        #     }
        # ]
        
        # # Define S3 bucket and file name in S3
        # bucket_name = 'ai-server-bucket'
        # s3_file_name = f"chat_history/{chat_id}/chat_history_{chat_id}.json"
        # save_chat_history_to_s3(chat_history, bucket_name, s3_file_name)
        
        if not data.chat_id:
            chat_entry.file_name = s3_file_name
            chat_entry.intermediate_step = intermediate_step
            await db.commit()
        
        return {"message": "Data sent and chat history saved/updated in S3.", "response": response_json}
    
    except requests.RequestException as e:
        raise HTTPException(status_code=500, detail=f"Failed to send request: {e}")
def decode_base64(data):
    """Decodes base64, padding being optional."""
    missing_padding = len(data) % 4
    if missing_padding:
        data += '=' * (4 - missing_padding)
    return base64.b64decode(data)
@router.post("/get_chat_history")
async def get_chat_history(
    data: schemas.GetChatId,
    token: str = Header(...),
    db: AsyncSession = Depends(get_db)
):
    # Verify the token format
    if not token.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Invalid token format")
    
    access_token = token.split(" ")[1]
    payload = decode_access_token(access_token, db)
    user_id = payload["sub"]

    # Define file paths
    bucket_name = 'domgenies3'
    user_id_new=payload["sub"]
    json_file_key = f"chat_history/{user_id_new}/chat_history_{data.chat_id}.json"
    # txt_file_key = f"file_uploads/summarize_doc_into_txt/{user_id}_{data.chat_id}/summary.txt"
    # images_prefix = f"file_uploads/{user_id}/{data.chat_id}"
    # base_url = "http://api.docchats.ai"

    # Fetch chat history from the bucket
    chat_history = get_chat_history_from_bucket(bucket_name, json_file_key)

    # Fetch summary from the bucket
    # summary = get_summary_from_bucket(bucket_name, txt_file_key)

    # Fetch images from the bucket
    # images = get_images_from_bucket1(bucket_name, images_prefix, base_url, user_id, data.chat_id)

    # Fetch comparison files associated with the user_id
    

    # Update the chat history's timestamp
    stmt = (
        update(models.User_Chat)
        .where(models.User_Chat.chat_id == data.chat_id)
        .values(created_at=datetime.utcnow())
    )
    await db.execute(stmt)
    await db.commit()

    # Return the structured response
    return {
        "message": "Data sent and chat history saved as JSON.",
        "chat_history": chat_history,
       
    }
@router.post("/get_last_chat_id/")
async def get_last_chat_id(
    # data: schemas.QueryRequest1,
    token: str = Header(...),
    db: AsyncSession = Depends(get_db)
):
    try:
        # Verify the token format
        if not token.startswith("Bearer "):
            raise HTTPException(status_code=401, detail="Invalid token format")
        
        # Extract and decode the access token
        access_token = token.split(" ")[1]
        payload = decode_access_token(access_token, db)
        user_id = payload["sub"]

        # Query the User_Chat table for the last chat_id with intermediate_step from data
        user_history_query = select(
            models.User_Chat.chat_id
        ).where(
            models.User_Chat.user_id == user_id,
            
        ).order_by(
            models.User_Chat.created_at.desc()  # Assuming 'created_at' is the timestamp field
        ).limit(1)
        
        result = await db.execute(user_history_query)
        user_history = result.fetchone()
        print(f"user_history result: {user_history}")

        # Query the User_Chat table for the last chat_id with intermediate_step as "search_keyword"
        # user_keyword_query = select(
        #     models.User_Chat.chat_id
        # ).where(
        #     models.User_Chat.user_id == user_id,
        #     models.User_Chat.intermediate_step == "search_keyword"
        # ).order_by(
        #     models.User_Chat.created_at.desc()  # Assuming 'created_at' is the timestamp field
        # ).limit(1)
        
        
        # result1 = await db.execute(user_keyword_query)
        # user_keyword1 = result1.fetchone()
        # print(f"user_keyword1 result: {user_keyword1}")
        
        if user_history is None:
            return {"status": 0, "message": "No chat history found"}
        
        chat_id = user_history[0] if user_history is not None else ""
       
        
        # If chat_id is blank, log an informative message
        if not chat_id:
            print(f"No chat history found for intermediate_step: {data.intermediate_steps[0]}")
        
        # If keyword_chat_id is blank, log an informative message
        
        
        # Query the UserFile table for the corresponding file_name using the chat_id
        
        
        # Structure the final response
        last_chat = {
            "chat_id": chat_id,
        }
        
        return {"status": 1, "message": "Last chat file names", "last_chat": last_chat}
    
    except HTTPException as e:
        raise e
    except Exception as e:
        # Log unexpected errors for debugging
        logger.error(f"Unexpected error occurred: {e}", exc_info=True)
        raise HTTPException(status_code=500, detail="Internal server error")