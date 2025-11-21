from typing import Annotated,List
from datetime import datetime,timedelta
from pydantic import BaseModel
from fastapi.staticfiles import StaticFiles
from fastapi import FastAPI, APIRouter, HTTPException, Depends, BackgroundTasks, Response, Cookie,UploadFile, File,Header,status,Form
from fastapi.responses import JSONResponse
from fastapi.responses import FileResponse
from datetime import datetime
from sqlalchemy.orm import aliased
from sqlalchemy.engine import Row
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
from sqlalchemy.exc import IntegrityError,SQLAlchemyError, OperationalError
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
import traceback
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
from sqlalchemy import select, and_
from sqlalchemy.orm import joinedload
# from src.controllers.auth import router as auth_router
from src.controllers.s3_utils import get_images_from_bucket,get_summary_from_bucket,get_chat_history_from_bucket,save_chat_history_to_s3,get_chat_history_from_bucket,get_images_from_bucket1
router = APIRouter()
logging.basicConfig(
    filename='subscription_renewal.log',
    level=logging.ERROR,
    format='%(asctime)s:%(levelname)s:%(message)s'
)
logger = logging.getLogger(__name__)
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")
FACEBOOK_CLIENT_ID = "1476496809335733"
FACEBOOK_CLIENT_SECRET = "8486fe4b1d8fe4b27e9c02af99762be1"
FACEBOOK_REDIRECT_URI = "http://docchats.ai/handleFacebookCallback"
GOOGLE_CLIENT_ID = "223197930284-i9cu53449611bal1tbm5nnutuis6g6r5.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET = "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"
GOOGLE_REDIRECT_URI = "https://domgenie.ai/handleOAuthCallback"
SMTP_SERVER = "smtp.zoho.com"  # Change this for Outlook/Yahoo/etc.
SMTP_PORT = 587  # 465 for SSL, 587 for TLS
SMTP_USERNAME = "support@domgenie.ai"
SMTP_PASSWORD = "1FUMWX2uKx7W"
# commit new file
Ai_model_url="http://prod-chat-bot-lb-1633524894.ap-south-1.elb.amazonaws.com"
SCOPE = "email"
app = FastAPI()
session = boto3.session.Session()
client_object = session.client(
            's3',
            region_name='ap-south-1',
            aws_access_key_id='AKIASFUIRWHYIWX7Q64K',
            aws_secret_access_key='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'
            
)
# API_KEY = "NTQ2NmRlYTYtNDFlZi00NTI3LWI0ZGUtMjNlNzA0NDRiNWYxOjU5OTMyM2ZiLTkwMGUtNDQ5Yi05NTcwLWU4ODdkM2ZjYzE1MQ=="
# OUTLET_ID = "6764b931-9450-40c5-a338-7f03ebda6e34"
API_KEY = "ZDZhN2M4OWYtOTFkYy00YjAzLWI0OWItNWFmMGMzODM4NjNmOjczOWJjYzBmLTFmYTItNDg1ZS1iZjIxLTRmM2QxNzE2NTEwNA=="
OUTLET_ID = "3e00cce8-b944-456e-b2a0-58ec19f6ac9d"
OUTLET_ID_without_card = "977fa145-ac6d-4445-99ba-581be9527a1f"
REDIRECT_URL = "https://domgenie.ai/paymentredirect"
task_results = {}
user_events = {}

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3001", "http://3.108.57.25"],  # Add frontend URL
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods (GET, POST, PUT, DELETE, etc.)
    allow_headers=["*"],  # Allow all headers
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
    code: str, state: str,bg_task: BackgroundTasks, db: AsyncSession = Depends(get_db)
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
            await add_subscription_for_free(user_id=new_user.id, subscription_id=1, db=db)
            bg_task.add_task(
                send_email,
                new_user.email,
                "Welcome to DomGenie - Your AI Expert in Card Payments!",
                "welcome_email.html",
                {"name": new_user.full_name},
            )
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
def send_email(to_email: str, subject: str, template_name: str, context: dict):
    try:
        template = env.get_template(template_name)
        email_content = template.render(context)

        msg = MIMEMultipart()
        msg["From"] = SMTP_USERNAME
        msg["To"] = to_email
        msg["Subject"] = subject
        msg.attach(MIMEText(email_content, "html"))

        server = smtplib.SMTP(SMTP_SERVER, SMTP_PORT, timeout=10)
        server.starttls()
        server.login(SMTP_USERNAME, SMTP_PASSWORD)
        server.sendmail(SMTP_USERNAME, to_email, msg.as_string())
        server.quit()
        print(f"✅ Email sent to {to_email}")

    except Exception as e:
        print(f"❌ Email error: {str(e)}")

    except Exception as e:
        print(f"❌ Error sending OTP to {to_email}: {str(e)}")  
        traceback.print_exc()  # Logs the full traceback for debugging

# @router.post("/send_prompt")
# async def send_data_to_api(
#     data: schemas.QueryRequest1,
#     token: str = Header(...),
#     db: AsyncSession = Depends(get_db)
# ):
#     if not token.startswith("Bearer "):
#         raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token format")

#     access_token = token.split(" ")[1]
#     payload = decode_access_token(token=access_token, db=db)
#     user_id_new = payload["sub"]
    
#     data_json = {
#         'prompt': data.query,
#         "userid": user_id_new
#     }
    
#     url = f"{Ai_model_url}/ask"  # Replace with your API endpoint
#     file_id = uuid.uuid4()

#     # Check usage limits
#     limit_per_day = await check_history(user_id_new, db)
    
#     # Ensure limit_per_day contains required keys
#     if limit_per_day.get('total_limit_exceed') == 0:
#         try:
#             # Chat ID logic
#             if not data.chat_id:
#                 chat_entry = models.User_Chat(
#                     chat_id=file_id,
#                     user_id=user_id_new,
#                     user_query=data.query,
#                     file_name="",
#                     is_delete=0,  # Assuming 0 indicates not deleted
#                     created_at=datetime.utcnow()
#                 )
#                 db.add(chat_entry)
#                 await db.commit()
#                 await db.refresh(chat_entry)
#                 chat_id = chat_entry.chat_id
#             else:
#                 chat_id = data.chat_id
            
#             data_json['chat_id'] = chat_id

#             # Send data to AI endpoint
#             response = requests.post(url, json=data_json)
#             response.raise_for_status()

#             if response.status_code == 200:
#                 response_json = response.json()  # Keep this unchanged
#                 print(response_json)

#                 # Add additional fields while keeping response_json intact
#                 response_json['chat_id'] = chat_id
#                 response_json['query'] = data.query

#                 # Prepare chat history for S3 upload
#                 chat_history = [{"query": data.query, "answer": response_json.get("answer", "")}]
#                 bucket_name = 'domgenies'
#                 s3_file_name = f"chat_history/{user_id_new}/chat_history_{chat_id}.json"
#                 save_chat_history_to_s3(chat_history, bucket_name, s3_file_name)
                
#                 # Update user's history
#                 await add_history(user_id_new, db)
#                 limit_per_day_new = await check_history(user_id_new, db)
#                 # Update response_json with limit status
#                 response_json['limit_exceed'] = limit_per_day_new.get("limit_exceed", 1)
                
#                 return {"message": response_json}
#             else:
#                 raise HTTPException(status_code=response.status_code, detail="Failed to send data to the AI endpoint")

#         except requests.RequestException as e:
#             raise HTTPException(status_code=500, detail=f"Failed to send request: {e}") 

#     else:
#         # Preserve response_json format but return an empty query & answer when limit is exceeded
#         response_json = {
#             "query": "",
#             "answer": "",
#             "limit_exceed": limit_per_day.get("total_limit_exceed", 1)
#         }
#         return {"message": response_json}
async def save_error_log_to_s3(error_message, user_id):
    """
    Save the error log to an S3 bucket as a text file.
    """
    bucket_name = "domgenies"  # Replace with your S3 bucket name
    timestamp = datetime.utcnow().strftime("%Y-%m-%d_%H-%M-%S")
    s3_file_name = f"error_logs/{user_id}/error_log_{timestamp}.txt"
    
    error_content = f"Timestamp: {timestamp}\nUser ID: {user_id}\nError: {error_message}\n"
    
    try:
        client.put_object(
            Bucket=bucket_name,
            Key=s3_file_name,
            Body=error_content,
            ContentType="text/plain"
        )
        print(f"Error log saved to S3: {s3_file_name}")
    except Exception as s3_error:
        print("Failed to save error log to S3:", s3_error)
@router.post("/send_prompt")
async def send_data_to_api(
    data: schemas.QueryRequest1,
    token: str = Header(...),
    db: AsyncSession = Depends(get_db)
):
    # Validate token
    if not token.startswith("Bearer "):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token format")

    access_token = token.split(" ")[1]
    payload = decode_access_token(token=access_token, db=db)
    user_id_new = payload["sub"]

    # Prepare data to send to AI API
    data_json = {
        'prompt': data.query,
        'userid': user_id_new
    }

    url = f"{Ai_model_url}/ask"  # AI model endpoint
    file_id = uuid.uuid4()

    # Check user's usage limits
    limit_per_day = await check_history(user_id_new, db)

    # If user does not have an active subscription
    if limit_per_day.get("is_subscription", 1) == 0:
        response_json = {
            "query": "",
            "answer": "",
            "chat_id": data.chat_id,
            "limit_exceed": limit_per_day.get("total_limit_exceed", 1),
            "is_subscription": limit_per_day.get('is_subscription', 1)
        }
        return {"message": response_json}

    # Proceed only if limits are not exceeded
    if limit_per_day.get("total_limit_exceed") == 0:
        try:
            # Create a new chat entry if chat_id is not provided
            if not data.chat_id:
                chat_entry = models.User_Chat(
                    chat_id=file_id,
                    user_id=user_id_new,
                    user_query=data.query,
                    file_name="",
                    is_delete=0,
                    created_at=datetime.utcnow()
                )
                db.add(chat_entry)
                await db.commit()
                await db.refresh(chat_entry)
                chat_id = chat_entry.chat_id
            else:
                # Use existing chat_id and update if created_at is outdated
                chat_id = data.chat_id
                result = await db.execute(
                    select(models.User_Chat.created_at).where(models.User_Chat.chat_id == chat_id)
                )
                existing_created_at = result.scalar()

                if existing_created_at:
                    existing_date = existing_created_at.date()
                    today_date = datetime.utcnow().date()

                    if existing_date < today_date:
                        stmt = (
                            update(models.User_Chat)
                            .where(models.User_Chat.chat_id == chat_id)
                            .values(user_query=data.query, created_at=datetime.utcnow())
                        )
                        await db.execute(stmt)
                        await db.commit()

            data_json["chat_id"] = chat_id

            # Send prompt to AI model
            response = requests.post(url, json=data_json)
            response.raise_for_status()

            if response.status_code == 200:
                response_json = response.json()
                response_json["chat_id"] = chat_id
                response_json["query"] = data.query

                # Prepare chat history to upload to S3
                chat_history = [{"query": data.query, "answer": response_json.get("answer", "")}]
                bucket_name = "domgenies"
                s3_file_name = f"chat_history/{user_id_new}/chat_history_{chat_id}.json"
                save_chat_history_to_s3(chat_history, bucket_name, s3_file_name)

                # Add history entry
                await add_history(user_id_new, db)
                limit_per_day_new = await check_history(user_id_new, db)
                response_json["limit_exceed"] = limit_per_day_new.get("limit_exceed", 1)

                return {
                    "message": response_json,
                    "is_subscription": limit_per_day.get("is_subscription", 1)
                }

            else:
                raise HTTPException(
                    status_code=response.status_code,
                    detail="Failed to send data to the AI endpoint"
                )

        except requests.RequestException as e:
            raise HTTPException(status_code=500, detail=f"Failed to send request: {e}")

    # If limit is exceeded
    response_json = {
        "query": "",
        "answer": "",
        "limit_exceed": limit_per_day.get("total_limit_exceed", 1),
        "is_subscription": limit_per_day.get("is_subscription", 1),
        "chat_id": data.chat_id
    }
    return {"message": response_json}
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
    bucket_name = 'domgenies'
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
async def convert_to_dict(result):
    """Convert SQLAlchemy query result to a list of dictionaries."""
    return [{"chat_id": row[0], "user_query": row[1]} for row in result] if result else []

@router.post("/get_last_chat_id/")
async def get_last_chat_id(
    token: str = Header(...),
    db: AsyncSession = Depends(get_db)
):
    try:
        # Verify and decode the token
        if not token.startswith("Bearer "):
            raise HTTPException(status_code=401, detail="Invalid token format")
        access_token = token.split(" ")[1]
        payload = decode_access_token(access_token, db)
        user_id = payload["sub"]

        # Define time ranges
        now = datetime.utcnow()
        start_of_today = datetime(now.year, now.month, now.day)
        start_of_yesterday = start_of_today - timedelta(days=1)
        start_of_week = start_of_today - timedelta(days=start_of_today.weekday())
        start_of_month = datetime(now.year, now.month, 1)
        start_of_last_week = start_of_today - timedelta(days=7)  # Get last 7 days (excluding today & yesterday)
        Subscription = aliased(models.SubscriptionPlan)
        CustomerSub = aliased(models.CustomerSubscription)
        user_history_query = select(
            models.User_Chat.chat_id
        ).where(
            models.User_Chat.user_id == user_id,
        ).order_by(
            models.User_Chat.created_at.desc()
        ).limit(1)

        result = await db.execute(user_history_query)
        user_history = result.fetchone()
        chat_id = user_history.chat_id if user_history else ""
        user_subscription = select(
            Subscription.id,
            Subscription.subscription_name,
            Subscription.subscription_type,
            CustomerSub.start_date,
            CustomerSub.end_date,
            CustomerSub.cardholder_name,
            CustomerSub.card_expiry,
            CustomerSub.card_method,
            CustomerSub.card_type,
            CustomerSub.card_pan,
            CustomerSub.is_subscription,
            Subscription.is_sequence
        ).join(
            CustomerSub, Subscription.id == CustomerSub.subscription_id
        ).where(
            CustomerSub.user_id == user_id,
            CustomerSub.status == "1"
        ).order_by(
            CustomerSub.start_date.desc()
        ).limit(1)

        subscription_result = await db.execute(user_subscription)
        subscription_history = subscription_result.fetchone()

        def row_to_dict(row: Row):
            return dict(row._mapping) if row else {}
        subscription_history_dict = row_to_dict(subscription_history)
        # Query for latest chat (including user_query)
        latest_chat_query = select(
            models.User_Chat.chat_id, models.User_Chat.user_query
        ).where(
            models.User_Chat.user_id == user_id
        ).order_by(
            models.User_Chat.created_at.desc()
        ).limit(1)

        # Queries for different time ranges
        def get_time_range_query(start_date, end_date=None):
            query = select(
                models.User_Chat.chat_id, models.User_Chat.user_query
            ).where(
                and_(
                    models.User_Chat.user_id == user_id,
                    models.User_Chat.created_at >= start_date
                )
            ).order_by(models.User_Chat.created_at.desc())
            if end_date:
                query = query.where(models.User_Chat.created_at < end_date)
            return query

        # Define queries
        query_today = get_time_range_query(start_of_today)
        query_yesterday = get_time_range_query(start_of_yesterday, start_of_today)
        query_last_week = get_time_range_query(start_of_last_week, start_of_yesterday)  # Last 7 days except today/yesterday
        query_this_month = get_time_range_query(start_of_month, start_of_last_week)

        # Execute queries asynchronously
        latest_chat_result = await db.execute(latest_chat_query)
        today_result = await db.execute(query_today)
        yesterday_result = await db.execute(query_yesterday)
        week_result = await db.execute(query_last_week)
        month_result = await db.execute(query_this_month)

        # Convert database results to dictionary format
        def convert_to_dict(results):
            return [{"chat_id": row.chat_id, "user_query": row.user_query} for row in results] if results else []

        latest_chat = latest_chat_result.fetchone()
        latest_chat_data = {"chat_id": latest_chat.chat_id, "user_query": latest_chat.user_query} if latest_chat else {}

        today_chats = convert_to_dict(today_result.fetchall())
        yesterday_chats = convert_to_dict(yesterday_result.fetchall())
        week_chats = convert_to_dict(week_result.fetchall())  # Last 7 days except today & yesterday
        month_chats = convert_to_dict(month_result.fetchall())
        limit_per_day = await check_history(user_id, db)
        is_subscription=limit_per_day.get('is_subscription',1)
        today = datetime.utcnow().date()
        coupon_query = select(models.Coupon).where(
            models.Coupon.start_date <= today,
            models.Coupon.end_date >= today,
            models.Coupon.status == 1
        )
        coupon_result = await db.execute(coupon_query)
        active_coupon = coupon_result.scalars().first()
        if active_coupon:
            coupon_data = {
                "id": active_coupon.id,
                "coupons_code": active_coupon.coupons_code,
                "coupons_type":active_coupon.coupons_type,
                "amount": active_coupon.coupons_value,
                "start_date": str(active_coupon.start_date),
                "end_date": str(active_coupon.end_date)
            }
        else:
            coupon_data = {}
        # Final structured response
        last_chat = {
            "chat_id":chat_id,
            # "latest_chat": latest_chat_data,
            "today_chats": today_chats,
            "yesterday_chats": yesterday_chats,
            "week_chats": week_chats,
            "month_chats": month_chats,
            "subscription_history": subscription_history_dict,
            "coupon_data":coupon_data,
            "is_subscription":is_subscription
        }

        return {"status": 1, "message": "Last chat data retrieved successfully", "last_chat": last_chat}
    
    except HTTPException as e:
        raise e
    except Exception as e:
        print(f"Unexpected error occurred: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")
@router.post("/get_subscription")
async def get_subscription(db: AsyncSession = Depends(get_db)):
    query = select(
        models.SubscriptionPlan.id,
        models.SubscriptionPlan.subscription_name,
        models.SubscriptionPlan.subscription_type,
        models.SubscriptionPlan.amount,
        models.SubscriptionPlan.is_sequence
    ).order_by(models.SubscriptionPlan.is_sequence)
    result = await db.execute(query)
    subscriptions = result.fetchall()  # Fetch all rows

    # Convert to a list of dictionaries
    subscriptions_list = [
        {"plan_id": row.id, "subscription_name": row.subscription_name, "subscription_type": row.subscription_type,"amount":row.amount,"is_sequence":row.is_sequence}
        for row in subscriptions
    ]

    return {"subscriptions": subscriptions_list}
@router.post("/add_subscription")
async def add_subscription(
    data: schemas.Add_subscription,
    token: str = Header(...),
    db: AsyncSession = Depends(get_db)
):
    if not token.startswith("Bearer "):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token format")

    access_token = token.split(" ")[1]
    payload = decode_access_token(token=access_token, db=db)

    user_id = payload.get("sub")
    if not user_id:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid user token")

    subscription_id = data.subscription_id  

    # Fetch subscription plan details
    query = select(models.SubscriptionPlan).where(models.SubscriptionPlan.id == subscription_id)
    result = await db.execute(query)
    subscription_data = result.scalars().first()

    if not subscription_data:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Subscription not found")

    subscription_days = subscription_data.subscription_days
    amount = subscription_data.amount  # Dynamic amount
    actual_amount=amount
    # Check for active coupon
    today = datetime.utcnow().date()
    coupon_query = select(models.Coupon).where(
        models.Coupon.coupons_code== data.coupon_code
        
    )
    coupon_result = await db.execute(coupon_query)
    active_coupon = coupon_result.scalars().first()

    if active_coupon:
        if active_coupon.coupons_type == "flat":
            amount = max(0, amount - active_coupon.coupons_value)
        elif active_coupon.coupons_type == "percent":
            discount = (active_coupon.coupons_value / 100) * amount
            amount = max(0, amount - discount)
        else:
            raise HTTPException(status_code=400, detail="Invalid coupon type")  # Ensure amount doesn't go below 0

    # Call payment_check to create an order
    # return {"amount":amount}
    payment_response = await payment_check(amount,data.is_accept)
    print("payment_response", payment_response)
    if not payment_response or "order_reference" not in payment_response or "payment_page_url" not in payment_response:
        return JSONResponse(content={"error": "Payment order creation failed"}, status_code=400)

    order_reference = payment_response["order_reference"]
    payment_link = payment_response["payment_page_url"]
    outlet_id = payment_response["OUTLET_ID"]

    start_date = today
    end_date = start_date + timedelta(days=subscription_days - 1)

    # Check if the user already has an active subscription
    check_query = select(models.CustomerSubscription).where(
        models.CustomerSubscription.user_id == user_id
    )
    check_result = await db.execute(check_query)
    existing_subscription = check_result.scalars().first()

    

    # Add to subscription history
    new_subscription_history = models.CustomerSubscription_history(
        user_id=user_id,
        subscription_id=subscription_id,
        start_date=start_date,
        end_date=end_date,
        order_reference=order_reference,
        amount=amount,
        status=0
    )
    db.add(new_subscription_history)
    await db.commit()

    return {"payment_page_url": payment_link,"outlet_id":outlet_id}

async def add_history(user_id: int, db: AsyncSession):
    if not user_id:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid user ID")

    # Fetch history for today
    query = select(models.CustomerHistory).where(
        models.CustomerHistory.user_id == user_id,
        models.CustomerHistory.created_date == datetime.utcnow().date()
    )
    result = await db.execute(query)
    history_data = result.scalars().first()

    # Initialize total_query
    total_query = 1 if not history_data else history_data.total_query + 1

    if history_data:
        # Update existing history record
        update_query = update(models.CustomerHistory).where(
            models.CustomerHistory.user_id == user_id,
            models.CustomerHistory.created_date == datetime.utcnow().date()
        ).values(total_query=total_query)
        await db.execute(update_query)
    else:
        # Insert new history record
        new_history = models.CustomerHistory(
            user_id=user_id,
            total_query=total_query,
            created_date=datetime.utcnow().date()
        )
        db.add(new_history)

    await db.commit()
    return {"message": "Added successfully"}
# @router.post("/check_history")
# async def check_history(user_id: int, db: AsyncSession):
#     # Extract user_id from token
#     if not user_id:
#         raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid user ID")

#     user_id = user_id
#     if not user_id:
#         raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid user ID")

#     # Get today's date
#     start_of_today = datetime.utcnow().date()
#     Subscription = aliased(models.SubscriptionPlan)
#     CustomerSub = aliased(models.CustomerSubscription)
#     # Fetch the user's active subscription details
#     user_subscription = select(
#         Subscription.id,
#         Subscription.subscription_name,
#         Subscription.subscription_type,
#         Subscription.total_query_per_day,
#         CustomerSub.start_date,
#         CustomerSub.end_date
#     ).join(
#         CustomerSub, Subscription.id == CustomerSub.subscription_id
#     ).where(
#         CustomerSub.user_id == user_id,
#         CustomerSub.status == "1"
#     ).order_by(
#         CustomerSub.start_date.desc()
#     ).limit(1)

#     subscription_result = await db.execute(user_subscription)
#     subscription_history = subscription_result.fetchone()

#     # Convert row to dictionary
#     def row_to_dict(row: Row):
#         return dict(row._mapping) if row else {}

#     subscription_history_dict = row_to_dict(subscription_history)

#     # Check if the subscription is expired
#     if not subscription_history_dict or subscription_history_dict.get("end_date") < start_of_today:
#         subscription_type = "free"

#         # Fetch the free plan details dynamically from DB
#         free_subscription_query = select(
#             Subscription.total_query_per_day
#         ).where(
#             Subscription.subscription_type == "free"
#         ).limit(1)

#         free_subscription_result = await db.execute(free_subscription_query)
#         free_subscription = free_subscription_result.fetchone()

#         if free_subscription:
#             total_query_per_day = free_subscription.total_query_per_day
#         else:
#             raise HTTPException(status_code=500, detail="Free subscription plan not found in the database.")
#     else:
#         subscription_type = subscription_history_dict.get("subscription_type", "free")
#         total_query_per_day = subscription_history_dict.get("total_query_per_day", 0)  # Fetch dynamically

#     # Fetch user's history for today
#     query = select(models.CustomerHistory.total_query).where(
#         models.CustomerHistory.user_id == user_id,
#         models.CustomerHistory.created_date == start_of_today
#     )
#     result = await db.execute(query)
#     history_data = result.scalars().first()

#     # Get the number of queries made today
#     total_queries_today = history_data if history_data else 0

#     # Check if the user has exceeded the query limit
#     limit_exceed = 1 if total_queries_today + 1 > total_query_per_day else 0
#     total_limit_exceed = 1 if total_queries_today  >= total_query_per_day else 0

#     return {"limit_exceed": limit_exceed,"total_limit_exceed":total_limit_exceed}
async def check_history(user_id: int, db: AsyncSession):
    if not user_id:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid user ID")

    # Get today's date
    start_of_today = datetime.utcnow().date()

    Subscription = aliased(models.SubscriptionPlan)
    CustomerSub = aliased(models.CustomerSubscription)

    # Fetch the user's active subscription details
    user_subscription_query = select(
        Subscription.id,
        Subscription.subscription_name,
        Subscription.subscription_type,
        Subscription.total_query_per_day,
        CustomerSub.start_date,
        CustomerSub.end_date
    ).join(
        CustomerSub, Subscription.id == CustomerSub.subscription_id
    ).where(
        CustomerSub.user_id == user_id,
        CustomerSub.status == "1"
    ).order_by(
        CustomerSub.id.desc()
    ).limit(1)

    subscription_result = await db.execute(user_subscription_query)
    subscription_data = subscription_result.fetchone()

    # Convert row to dictionary
    def row_to_dict(row: Row):
        return dict(row._mapping) if row else {}

    subscription_info = row_to_dict(subscription_data)

    # If no subscription is found or expired, return an error
    if not subscription_info or subscription_info.get("end_date") < start_of_today:
        return {"limit_exceed": 0, "total_limit_exceed":0,"is_subscription":0}
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="No active subscription found")

    total_query_per_day = subscription_info.get("total_query_per_day", 0)  # Fetch dynamically

    # Fetch user's history for today
    query = select(models.CustomerHistory.total_query).where(
        models.CustomerHistory.user_id == user_id,
        models.CustomerHistory.created_date == start_of_today
    )
    result = await db.execute(query)
    history_data = result.scalars().first()

    # Get the number of queries made today
    total_queries_today = history_data if history_data else 0

    # Check if the user has exceeded the query limit
    limit_exceed = 1 if total_queries_today + 1 > total_query_per_day else 0
    total_limit_exceed = 1 if total_queries_today >= total_query_per_day else 0

    return {"limit_exceed": limit_exceed, "total_limit_exceed": total_limit_exceed,"is_subscription":1}

async def get_access_token():
    """ Fetch the authentication token """
    auth_url = "https://api-gateway.ngenius-payments.com/identity/auth/access-token"
    headers_auth = {
        "accept": "application/vnd.ni-identity.v1+json",
        "authorization": f"Basic {API_KEY}",
        "content-type": "application/vnd.ni-identity.v1+json"
    }
    # auth_payload = json.dumps({"realmName": "ni"})

    response = requests.post(auth_url, headers=headers_auth)

    if response.status_code == 200:
        return response.json().get("access_token")
    else:
        return None
# @router.post("/payment_check")
async def payment_check(amount: float,is_accept:int):
    """Create a payment order with a dynamic amount and return payment link"""
    access_token = await get_access_token()
    if not access_token:
        return {"error": "Failed to fetch access token"}
    if is_accept==1:
        OUTLET_ID_new=OUTLET_ID
    else :
        OUTLET_ID_new=OUTLET_ID_without_card
    order_url = f"https://api-gateway.ngenius-payments.com/transactions/outlets/{OUTLET_ID}/orders"

    headers_order = {
        "Authorization": f"Bearer {access_token}",
        "Content-Type": "application/vnd.ni-payment.v2+json",
        "Accept": "application/vnd.ni-payment.v2+json"
    }

    order_payload = {
        "action": "PURCHASE",
        "amount": {
            "currencyCode": "AED",
            "value": str(int(amount * 100))
        },
        "merchantAttributes": {
            "skipConfirmationPage": True,
            "redirectUrl": "https://domgenie.ai/paymentredirect"
            # "skip3DS": True
        }
    }

    import requests
    response = requests.post(order_url, headers=headers_order, json=order_payload)

    if response.status_code == 201:
        order_data = response.json()
        return {
            "OUTLET_ID":OUTLET_ID_new,
            "order_reference": order_data.get("reference"),
            "payment_page_url": order_data.get("_links", {}).get("payment", {}).get("href")
        }
    else:
        return {"error": "Error creating order", "details": response.text}



@router.get("/payment-status")
async def get_payment_status(outlet_id: str, orderReference: str, db: AsyncSession = Depends(get_db)):
    """Fetch the payment status using orderReference and update subscription if successful"""
    access_token = await get_access_token()
    if not access_token:
        return JSONResponse(content={"error": "Failed to fetch access token"}, status_code=400)
    
    status_url = f"https://api-gateway.ngenius-payments.com/transactions/outlets/{OUTLET_ID}/orders/{orderReference}"
    headers_status = {
        "Authorization": f"Bearer {access_token}",
        "Accept": "application/vnd.ni-payment.v2+json"
    }

    response = requests.get(status_url, headers=headers_status)

    if response.status_code == 200:
        data = response.json()
        print("order data", data)

        # Extract payment data safely
        payment_list = data.get("_embedded", {}).get("payment", [])
        payment_data = payment_list[0] if payment_list else {}

        # Fetch subscription history
        result1 = await db.execute(
            select(models.CustomerSubscription_history).filter_by(order_reference=orderReference)
        )
        subscription1 = result1.scalars().first()

        # Handle missing payment data
        if not payment_data:
            if subscription1:
                subscription1.status = 0
                await db.commit()
            return {"msg": "No payment data found, subscription marked as failed"}

        payment_status = payment_data.get("state", "UNKNOWN")

        if payment_status == "PURCHASED":
            saved_card = payment_data.get("savedCard", {})
            card_token = saved_card.get("cardToken")

            payment_method = payment_data.get("paymentMethod", {})
            cardholder_name = payment_method.get("cardholderName")
            card_name = payment_method.get("name")
            card_type = payment_method.get("cardType")
            card_pan = payment_method.get("pan")
            expiry = payment_method.get("expiry")

            # Fetch subscription plan
            query = select(models.SubscriptionPlan).where(models.SubscriptionPlan.id == subscription1.subscription_id)
            result = await db.execute(query)
            subscription_data = result.scalars().first()

            if not subscription_data:
                raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Subscription not found")

            subscription_days = subscription_data.subscription_days
            start_date = datetime.utcnow().date()
            end_date = start_date + timedelta(days=subscription_days - 1)

            # Fetch active subscription
            result = await db.execute(
                select(models.CustomerSubscription).filter_by(user_id=subscription1.user_id)
            )
            subscription = result.scalars().first()
            update_query = update(models.CustomerSubscription).where(
            models.CustomerSubscription.user_id == subscription1.user_id
            ).values(
                subscription_id=subscription1.subscription_id,
                start_date=start_date,
                end_date=end_date,
                order_reference=orderReference
            )
            await db.execute(update_query)
            await db.commit()
            if subscription and outlet_id==OUTLET_ID:
                subscription.status = 1
                subscription.amount = subscription_data.amount
                subscription.cardholder_name = cardholder_name
                subscription.card_method = card_name
                subscription.card_type = card_type
                subscription.card_pan = card_pan
                subscription.payment_token = card_token
                subscription.card_expiry = expiry
                subscription.subscription_id = subscription1.subscription_id
                subscription.start_date = start_date
                subscription.end_date = end_date
                subscription.is_subscription=1
                await db.commit()

                if subscription1:
                    subscription1.status = 1
                    await db.commit()

                return {
                    "msg": "Payment successful, subscription updated with card details",
                    "order data": data
                }
            else:
                subscription.cardholder_name = ""
                subscription.amount = subscription_data.amount
                subscription.card_method = ""
                subscription.card_type = ""
                subscription.card_pan = ""
                subscription.payment_token = ""
                subscription.card_expiry = ""
                subscription.status = 1
                subscription.subscription_id = subscription1.subscription_id
                subscription.start_date = start_date
                subscription.is_subscription=0
                subscription.end_date = end_date
                await db.commit()

                if subscription1:
                    subscription1.status = 1
                    await db.commit()
                return {
                    "msg": "Payment successful, subscription updated with card details",
                    "order data": data
                }

            return {"msg": "Payment successful, but no matching subscription found"}

    return JSONResponse(content={"error": "Failed to fetch payment status", "details": response.text}, status_code=400)
async def add_subscription_for_free(user_id: UUID, subscription_id: int, db: AsyncSession):
    if not user_id:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid user ID")

    # Fetch subscription plan details
    query = select(models.SubscriptionPlan).where(models.SubscriptionPlan.id == subscription_id)
    result = await db.execute(query)
    subscription_data = result.scalars().first()

    if not subscription_data:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Subscription not found")

    subscription_days = subscription_data.subscription_days
    start_date = datetime.utcnow().date()
    end_date = start_date + timedelta(days=subscription_days -1)

    # Check if the user already has a subscription
    check_query = select(models.CustomerSubscription).where(
        models.CustomerSubscription.user_id == str(user_id)
    )
    check_result = await db.execute(check_query)
    existing_subscription = check_result.scalars().first()
    print("susb",existing_subscription)
    if existing_subscription:
        # If the subscription exists but is expired, do nothing
        
        
        # If the subscription is still active, update the end date
        # update_query = update(models.CustomerSubscription).where(
        #     models.CustomerSubscription.user_id == user_id
        # ).values(
        #     subscription_id=subscription_id,
        #     end_date=end_date
        # )
        # await db.execute(update_query)
        # await db.commit()
        return {"message": "Subscription updated successfully"}

    # If no subscription exists, insert a new one
    new_subscription = models.CustomerSubscription(
        user_id=user_id,
        subscription_id=subscription_id,
        start_date=start_date,
        end_date=end_date,
        is_subscription=0,
        status=1  # Set the status as active
    )
    db.add(new_subscription)
    await db.commit()
    new_subscription_history = models.CustomerSubscription_history(
        user_id=user_id,
        subscription_id=subscription_id,
        start_date=start_date,
        end_date=end_date,
        status=1  # Set the status as active
    )
    db.add(new_subscription_history)
    await db.commit()
    return {"message": "New subscription added successfully"}

@router.post("/auto_renew/")
async def auto_renew_subscriptions(db: AsyncSession = Depends(get_db)):
    access_token = await get_access_token()
    if not access_token:
        return {"error": "Failed to fetch access token"}

    # Fetch all expired subscriptions that have a saved payment token
    result = await db.execute(
        select(models.CustomerSubscription).where(
            models.CustomerSubscription.end_date < datetime.utcnow(),
            models.CustomerSubscription.payment_token.isnot(None),
            models.CustomerSubscription.payment_token != "",
            models.CustomerSubscription.is_subscription == 1
        )
    )
    expired_subscriptions = result.scalars().all()
    renewed = []

    for subscription in expired_subscriptions:
        # Fetch the related subscription plan dynamically
        query = select(models.SubscriptionPlan).where(
            models.SubscriptionPlan.id == subscription.subscription_id
        )
        plan_result = await db.execute(query)
        subscription_data = plan_result.scalars().first()

        if not subscription_data:
            print(f"Subscription plan not found for subscription {subscription.id}")
            continue  # Skip if no plan found

        amount = subscription_data.amount
        subscription_days = subscription_data.subscription_days

        # Check if any active coupon is valid for today
        today = datetime.utcnow().date()
        # coupon_query = select(models.Coupon).where(
        #     models.Coupon.start_date <= today,
        #     models.Coupon.end_date >= today,
        #     models.Coupon.status == 1
        # )
        # coupon_result = await db.execute(coupon_query)
        # active_coupon = coupon_result.scalars().first()

        # if active_coupon:
        #     coupon_amount = active_coupon.coupons_amount
        #     amount = max(0, amount - coupon_amount)  # Ensure amount doesn't go below 0

        headers_order = {
            "Authorization": f"Bearer {access_token}",
            "Content-Type": "application/vnd.ni-payment.v2+json",
            "Accept": "application/vnd.ni-payment.v2+json"
        }

        order_payload = {
            "action": "PURCHASE",
            "amount": {
                "currencyCode": "AED",
                "value": str(int(amount * 100)),  # Convert to minor units
            },
            "merchantAttributes": {
                "skip3DS": True
            }
        }

        order_url = f"https://api-gateway.ngenius-payments.com/transactions/outlets/{OUTLET_ID}/orders/"
        response = requests.post(order_url, headers=headers_order, json=order_payload)

        if response.status_code == 201:
            order_data = response.json()
            payment_info = order_data.get("_embedded", {}).get("payment", [{}])[0]
            saved_card_url = payment_info.get("_links", {}).get("payment:saved-card", {}).get("href")
            print("Saved card URL:", saved_card_url)

            if saved_card_url:
                save_card_payload = {
                    "maskedPan": subscription.card_pan,
                    "expiry": subscription.card_expiry,
                    "cardholderName": subscription.cardholder_name,
                    "scheme": subscription.card_method,
                    "cardToken": subscription.payment_token,
                    "recaptureCsc": True
                }

                save_card_response = requests.put(
                    saved_card_url,
                    headers=headers_order,
                    json=save_card_payload
                )
                print("Save card response:", save_card_response)

                if save_card_response.status_code in [200, 201, 204]:
                    new_subscription_history = models.CustomerSubscription_history(
                        user_id=subscription.user_id,
                        subscription_id=subscription.subscription_id,
                        start_date=datetime.utcnow(),
                        end_date=datetime.utcnow() + timedelta(days=subscription_days - 1),
                        order_reference=order_data.get("reference"),
                        status=1  # Set the status as active
                    )
                    db.add(new_subscription_history)
                    await db.commit()

                    # Update subscription
                    subscription.order_reference = order_data.get("reference")
                    subscription.status = 1
                    subscription.start_date = datetime.utcnow()
                    subscription.end_date = datetime.utcnow() + timedelta(days=subscription_days - 1)

                    await db.commit()
                    renewed.append(subscription.id)
                else:
                    print(f"Failed to save card for subscription {subscription.id}: {save_card_response.text}")
            else:
                print(f"Saved card URL missing in order response for subscription {subscription.id}")
        else:
            print(f"Order creation failed for subscription {subscription.id}: {response.text}")

    return {"msg": f"{len(renewed)} subscriptions renewed", "renewed_ids": renewed}
@router.post("/is_subscription")
async def update_subscription(
    data: schemas.Update_subscription,
    token: str = Header(...),
    db: AsyncSession = Depends(get_db)
):
    if not token.startswith("Bearer "):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token format")

    access_token = token.split(" ")[1]
    payload = decode_access_token(token=access_token, db=db)

    user_id = payload.get("sub")
    if not user_id:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid user token")
    
    update_query = update(models.CustomerSubscription).where(
        models.CustomerSubscription.user_id == user_id
    ).values(
        is_subscription=data.is_subscription,
        cardholder_name="",
        card_method="",
        card_type="",
        card_pan="",  # Store payment reference
        card_expiry="",
        payment_token=""
       
    )
    await db.execute(update_query)
    await db.commit()

    if data.is_subscription == 0:
        msg = "Customer subscription cancel successfully"
    else:
        msg = "Customer subscription renew successfully"

    return {"msg": msg}
@router.get("/get_subscription_history")
async def get_subscription_history(
    token: str = Header(...),
    db: AsyncSession = Depends(get_db)
):
    if not token.startswith("Bearer "):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token format")

    access_token = token.split(" ")[1]
    payload = decode_access_token(token=access_token, db=db)

    user_id = payload.get("sub")
    if not user_id:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid user token")

    # 👉 Correct joinedload on relationship "subscription"
    query = (
        select(models.CustomerSubscription_history)
        .options(joinedload(models.CustomerSubscription_history.subscription))  
        .where(
            models.CustomerSubscription_history.user_id == user_id,
            models.CustomerSubscription_history.status == 1
        )
    )
    result = await db.execute(query)
    subscription_history = result.scalars().all()

    history_list = []
    for history in subscription_history:
        subscription_name = history.subscription.subscription_name if history.subscription else None
        subscription_amount = f"{history.subscription.amount:.2f}" if history.subscription else None  
        history_list.append({
            "id": history.id,
            "subscription_name": subscription_name,
            "subscription_amount": subscription_amount,
            "start_date": history.start_date,
            "end_date": history.end_date,
            "order_reference": history.order_reference,
            "status": "Failed" if history.status == 0 else "Success"
        })

    return {"history": history_list}
@router.post("/update_card_detail")
async def update_card_detail(
    data: schemas.Update_card,
    token: str = Header(...),
    db: AsyncSession = Depends(get_db)
):
    if not token.startswith("Bearer "):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token format")

    access_token = token.split(" ")[1]
    payload = decode_access_token(token=access_token, db=db)
    print("value data", data.is_accept)

    user_id = payload.get("sub")
    if not user_id:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid user token")

    if data.is_accept == 0:
        # Update existing subscription to remove card details
        update_query = update(models.CustomerSubscription).where(
            models.CustomerSubscription.user_id == user_id
        ).values(
            cardholder_name="",
            card_method="",
            card_type="",
            card_pan="",
            card_expiry="",
            payment_token="",
            is_subscription=0
        )
        await db.execute(update_query)
        await db.commit()
        return {"msg": "Reject"}
    else:
        # Update only subscription flag
        update_query = update(models.CustomerSubscription).where(
            models.CustomerSubscription.user_id == user_id
        ).values(
            is_subscription=1
        )
        await db.execute(update_query)
        await db.commit()
        return {"msg": "done"}

@router.post("/check_coupon")
async def check_coupon(
    data: schemas.Check_coupon,
    token: str = Header(...),
    db: AsyncSession = Depends(get_db)
):
    if not token.startswith("Bearer "):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token format")

    access_token = token.split(" ")[1]
    payload =  decode_access_token(token=access_token, db=db)

    user_id = payload.get("sub")
    if not user_id:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid user token")

    today = datetime.utcnow().date()

    # Check if the coupon exists and is active
    coupon_query = select(models.Coupon).where(
        models.Coupon.coupons_code == data.coupon_code,
        models.Coupon.start_date <= today,
        models.Coupon.end_date >= today,
        models.Coupon.status == 1
       
    )
    coupon_result = await db.execute(coupon_query)
    coupon = coupon_result.scalars().first()

    if not coupon:
        raise HTTPException(status_code=200, detail="This coupon code is not valid or has expired")

    # If coupon is user-specific, ensure it belongs to this user
    
    if coupon.is_user_specific == 1:
        try:
            coupon_user_id = UUID(str(coupon.user_id))
            current_user_id = UUID(str(user_id))
        except ValueError:
            raise HTTPException(status_code=200, detail="Invalid UUID format")

        if coupon_user_id != current_user_id:
            raise HTTPException(status_code=200, detail="This coupon code is not valid or has expired")

    if coupon.is_subscription_specific == 1:
        try:
            coupon_subscription_id = coupon.subscription_id
            current_subscription_id = data.subscription_id
        except ValueError:
            raise HTTPException(status_code=200, detail="Invalid subscrition id")

        if coupon_subscription_id != current_subscription_id:
            raise HTTPException(status_code=200, detail="This coupon code is not valid or has expired")
    # Apply coupon amount
    coupon_value = coupon.coupons_value

    # Example: you should fetch the amount from the plan (not frontend)
    # amount = get_amount_from_plan(data.plan_id)
    # discounted_amount = max(0, amount - coupon_amount)



    return {
        "coupons_code": coupon.coupons_code,
        "coupons_type": coupon.coupons_type,
        "coupon_amount": coupon_value
       
    }
