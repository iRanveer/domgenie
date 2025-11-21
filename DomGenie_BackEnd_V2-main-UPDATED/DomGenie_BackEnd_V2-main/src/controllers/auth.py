from typing import Annotated,List
from datetime import datetime,timedelta
from pydantic import BaseModel
from fastapi.staticfiles import StaticFiles
from fastapi import FastAPI, APIRouter, HTTPException, Depends, BackgroundTasks, Response, Cookie,UploadFile, File,Header,status,Form
from fastapi.responses import JSONResponse
from fastapi.responses import FileResponse
from datetime import datetime
import os
import io
import base64
from datetime import datetime
from fastapi.exceptions import RequestValidationError
from fastapi.security import OAuth2PasswordBearer,OAuth2PasswordRequestForm
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from botocore.response import StreamingBody
from fastapi.responses import StreamingResponse
from sqlalchemy import update
from fastapi.routing import APIRouter
from pydantic import ValidationError
from sqlalchemy.exc import IntegrityError
import pdfkit
import requests
import json
import logging
import base64
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
from src.exceptions import BadRequestException, NotFoundException, ForbiddenException
from src.tasks import (
    user_mail_event,
)
from src.controllers.s3_utils import get_profile_image,save_base64_image_to_s3
from docx import Document
import boto3
from botocore.exceptions import NoCredentialsError, PartialCredentialsError
from botocore.client import Config
from PyPDF2 import PdfReader
# smtp
import traceback
import random
import smtplib
from jinja2 import Environment, FileSystemLoader
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
router = APIRouter()
logging.basicConfig(level=logging.ERROR, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")
session = boto3.session.Session()
client = session.client(
            's3',
            region_name='ap-south-1',
            aws_access_key_id='AKIASFUIRWHYIWX7Q64K',
            aws_secret_access_key='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'
            
)
SMTP_SERVER = "smtp.zoho.com"  # Change this for Outlook/Yahoo/etc.
SMTP_PORT = 587  # 465 for SSL, 587 for TLS
SMTP_USERNAME = "support@domgenie.ai"
SMTP_PASSWORD = "1FUMWX2uKx7W"
env = Environment(loader=FileSystemLoader("templates"))
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
@router.post("/register", response_model=schemas.RegisterResponse)
async def register(
    data: schemas.UserRegister,
    bg_task: BackgroundTasks,
    db: AsyncSession = Depends(get_db),
):
    """Registers a new user and sends OTP via a background task."""
    # Check if the email is already registered
    user = await models.User.find_by_email(db=db, email=data.email)
    if user:
        raise HTTPException(status_code=400, detail="Email has already been registered")

    # Generate OTP
    otp = str(random.randint(100000, 999999))

    # Hash password
    user_data = data.dict(exclude={"confirm_password"})
    user_data["password"] = get_password_hash(user_data["password"])
    user_data["otp"] = otp  # Store OTP in user table
    user_data["is_active"] = False  # User is not verified yet

    # Save user to DB
    user = models.User(**user_data)
    db.add(user)
    await db.commit()
    await db.refresh(user)  # Ensure user ID is available after commit

    # ✅ Add task to send OTP email asynchronously
    # bg_task.add_task(send_otp_email, user.email, user.full_name, otp)
    bg_task.add_task(send_email, user.email, "OTP Verification for Your DomGenie Account", "otp_email.html", {"name": user.full_name, "otp": otp})

    # Return success message with user ID
    return {"message": "OTP sent to your email. Please verify your account.", "user_id": user.id}
@router.post("/verify-otp", response_model=schemas.VerifyOtpResponse)
async def verify_otp(
    data: schemas.VerifyOtpRequest,
    bg_task: BackgroundTasks,
    db: AsyncSession = Depends(get_db),
):
    """Verifies OTP and activates user account, then sends a welcome email."""

    # Fetch user by ID
    user = await db.get(models.User, data.user_id)

    if not user:
        raise HTTPException(status_code=400, detail="User not found")

    if user.otp != data.otp:
        raise HTTPException(status_code=400, detail="Invalid OTP")

    # ✅ OTP is correct → Activate the user
    user.is_active = True
    user.otp = None  # Clear OTP after verification
    db.add(user)
    await db.commit()
    await db.refresh(user)

    # ✅ Send welcome email in background
    bg_task.add_task(
        send_email,
        user.email,
        "Welcome to DomGenie – Your AI Expert in Card Payments!",
        "welcome_email.html",
        {"name": user.full_name},
    )

    return {"message": "OTP verified successfully! Your account is now active."}

@router.post("/login")
async def login(
    data: schemas.UserLogin,
    response: Response,
    db: AsyncSession = Depends(get_db),
):
    try:
        # Authenticate user
        user = await models.User.authenticate(
            db=db, email=data.email, password=data.password
        )

        if not user:
            raise BadRequestException(detail="Incorrect email or password")

        if not user.is_active:
            raise ForbiddenException()

        # Fetch additional user information like name and photo
        user_with_details = await db.execute(
            select(models.User).where(models.User.id == user.id)
        )
        user = user_with_details.scalar_one()

        # Convert to schema object
        user_schema = schemas.User.from_orm(user)

        # Generate token pair
        token_pair = create_token_pair(user=user_schema)

        # Update or insert user token
        existing_token = await db.execute(
            select(models.UserToken).
            filter(models.UserToken.user_id == user.id)
        )
        existing_token = existing_token.scalar_one_or_none()

        if existing_token:
            # If a row already exists, update it
            await db.execute(
                update(models.UserToken).
                where(models.UserToken.user_id == user.id).
                values(
                    access_token=token_pair.access.token,
                    refresh_token=token_pair.refresh.token
                )
            )
        else:
            # If no row exists, insert a new row
            db_token = models.UserToken(
                user_id=user.id,
                access_token=token_pair.access.token,
                refresh_token=token_pair.refresh.token
            )
            db.add(db_token)

        await db.commit()
    
        # Set the refresh token as a cookie in the response
        add_refresh_token_cookie(response=response, token=token_pair.refresh.token)
        await add_subscription(user_id=user.id, subscription_id=1, db=db)
        
        # Construct the response object with additional user information
        response_data = {
            "status": 1,
            "message": "Login successfully",
            "access_token": token_pair.access.token,
            "refresh_token": token_pair.refresh.token,
            "token_type": "bearer",
            "name": user_schema.full_name,
            "google_drive_folder_id": user_schema.google_drive_folder_id,
            "is_google_drive": user_schema.is_google_drive,
        }

        return response_data

    except BadRequestException as e:
        raise HTTPException(status_code=400, detail=str(e))
    
    except ForbiddenException as e:
        print(e)
        raise HTTPException(status_code=403, detail=str(e))
    
    except Exception as e:
        print("Internal Server Error:", str(e))  # Print error in console
        traceback.print_exc()  # Print full stack trace for debugging
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")
@router.post("/refresh")
async def refresh(token: str = Header(...), db: AsyncSession = Depends(get_db)):
    if not token.startswith("Bearer "):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token format")

    # Extract the token part from the header
    token1 = token.split(" ")[1]
    
    # Decode the access token and verify its payload
    payload = decode_access_token(token=token1, db=db)
    # print(payload)
    
    # Get the new access token using the refresh token
    new_access_token = refresh_token_state(db, token1)
    
    # print(f"token data:{new_access_token}")
    
    # Return the access token from the dictionary
    return {"access_token": new_access_token.get("token")}
@router.post("/logout")
async def logout(
    token: str = Header(...),
    db: AsyncSession = Depends(get_db),
):
    if not token.startswith("Bearer "):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token format")

    access_token = token.split(" ")[1]

    # Fetch the corresponding row from the users_token table using the access token
    token_row = await db.execute(
        select(models.UserToken).where(models.UserToken.access_token == access_token)
    )
    token_row = token_row.scalars().first()

    if not token_row:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Access token not found")

    # Decode the payload of the access token
    try:
        payload = decode_access_token(token=access_token, db=db)
        print("Payload:", payload)
    except ExpiredSignatureError:
        # If the token is expired, refresh it using the refresh token
        new_access_token = refresh_token_state(db, token_row.refresh_token)
        return {"msg": "Logot succesfully"}

    return {"msg": "Successfully logged out"} 
@router.post("/forgot-password", response_model=schemas.SuccessResponseScheme)
async def forgot_password(
    data: schemas.ForgotPasswordSchema,
    bg_task: BackgroundTasks,
    db: AsyncSession = Depends(get_db),
):
    user = await models.User.find_by_email(db=db, email=data.email)
    if user:
        user_schema = schemas.User.from_orm(user)
        reset_token = mail_token(user_schema)

        mail_task_data = schemas.MailTaskSchema(
            user=user_schema,
            body=schemas.MailBodySchema(type="password-reset", token=reset_token),
        )
        # bg_task.add_task(user_mail_event, mail_task_data)
        bg_task.add_task(send_email,user.email,"Forgot passoword for Your DomGenie Account","forgot_password.html",{"data": mail_task_data})   

    return {"msg": "Reset token sended successfully your email check your email"}


# @router.post("/password-reset", response_model=schemas.SuccessResponseScheme)
# async def password_reset_token(
#     token: str,
#     data: schemas.PasswordResetSchema,
#     db: AsyncSession = Depends(get_db),
# ):
#     try:
#         payload = decode_access_token(token=token, db=db)  # Decodes and checks expiry
#         user = await models.User.find_user_by_id(db=db, user_id=payload["sub"])
        
#         if not user:
#             raise HTTPException(status_code=404, detail="User not found")

#         # Update user's password
#         user.password = get_password_hash(data.password)

#         # Commit changes
#         await db.commit()
#         await db.refresh(user)  # Refresh user object with updated values

#         return {"msg": "Password successfully updated"}

#     except jwt.ExpiredSignatureError:
#         raise HTTPException(status_code=400, detail="Password reset link has expired. Please request a new one.")
    
#     except jwt.InvalidTokenError:
#         raise HTTPException(status_code=400, detail="Invalid password reset token.")
@router.post("/password-reset", response_model=schemas.SuccessResponseScheme)
async def password_reset_token(
    token: str,
    data: schemas.PasswordResetSchema,
    db: AsyncSession = Depends(get_db),
):
    try:
        payload = decode_access_token(token=token, db=db)  # Decodes and checks expiry
        user = await models.User.find_user_by_id(db=db, user_id=payload["sub"])
        
        if not user:
            raise HTTPException(status_code=404, detail="User not found")

        # Update user's password
        user.password = get_password_hash(data.password)

        # Commit changes
        await db.commit()
        await db.refresh(user)  # Refresh user object with updated values

        return {"msg": "Password successfully updated"}

    except ExpiredSignatureError:
        # raise HTTPException(status_code=400, detail="Password reset link has expired. Please request a new one.")
        return {"msg": "Password reset link has expired. Please request a new one"}
    
    except JWTError:
        return {"msg": "Password reset link has expired. Please request a new one"}


@router.post("/password-update", response_model=schemas.SuccessResponseScheme)
async def password_update(
    data: schemas.PasswordUpdateSchema,
    token: str = Header(...),
    db: AsyncSession = Depends(get_db),
):
    # Validate token format
    if not token.startswith("Bearer "):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token format"
        )
    
    access_token = token.split(" ")[1]
    print("harsh acess token",access_token)
    # Decode token and extract user ID
    try:
        payload = decode_access_token(token=access_token, db=db)
        user_id = payload["sub"]  # Ensure "sub" contains user ID
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid or expired token"
        )

    # Fetch user by ID
    user = await models.User.find_user_by_id(db=db, user_id=user_id)
    if not user:
        raise NotFoundException(detail="User not found")

    # Check if old password matches
    if not verify_password(data.old_password, user.password):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail={"old_password": "Incorrect old password"}
        )

    # Update password and commit changes
    user.password = get_password_hash(data.password)
    await db.commit()
    
    return {"msg": "Your new password updated successfully"}
@router.post("/get_user_profile", response_model=schemas.UserProfileSchema)  # Use a proper schema
async def get_user_profile(
    token: str = Header(...),
    db: AsyncSession = Depends(get_db),
):
    # Validate token format
    if not token.startswith("Bearer "):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token format"
        )
    
    access_token = token.split(" ")[1]
    print("harsh access token", access_token)

    # Decode token and extract user ID
    try:
        payload = decode_access_token(token=access_token, db=db)
        user_id = payload["sub"]  # Ensure "sub" contains user ID
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid or expired token"
        )

    # Fetch user by ID
    user = await models.User.find_user_by_id(db=db, user_id=user_id)
    images_prefix = f"profile_image/{user_id}/{user.photo}"
    print(images_prefix)
    base_url = "http://15.206.242.245"
    bucket_name = 'domgenies'
    profile_image = get_profile_image(bucket_name, images_prefix, base_url, user_id) or ""
    if not user:
        raise NotFoundException(detail="User not found")

    # Return user profile (excluding password)
    return {
        "id": user.id,
        "full_name": user.full_name,
        "email": user.email,
        "photo":profile_image,
        "created_at": user.created_at,
        "updated_at": user.updated_at
    }
@router.post("/update_profile", response_model=schemas.UserProfileSchema)  
async def update_profile(
    data: schemas.UserUpdateSchema,  # Use a dedicated schema for updating profile
    token: str = Header(...),
    db: AsyncSession = Depends(get_db),
):
    # Validate token format
    if not token.startswith("Bearer "):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token format"
        )
    
    access_token = token.split(" ")[1]
    print("harsh access token", access_token)

    # Decode token and extract user ID
    try:
        payload = decode_access_token(token=access_token, db=db)
        user_id = payload["sub"]  # Ensure "sub" contains user ID
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid or expired token"
        )

    # Fetch user by ID
    user = await models.User.find_user_by_id(db=db, user_id=user_id)
    if not user:
        raise NotFoundException(detail="User not found")

    # Update user details (if provided)
    if data.full_name:
        user.full_name = data.full_name
    if data.email:
        user.email = data.email

    # Handle base64-encoded photo and save the actual file name
    if data.photo and data.photo_name:
        try:
            # Decode base64 photo and save it as binary data
            # user.photo = base64.b64decode(data.photo)
            user.photo = data.photo_name  # Save actual file name in DB
            bucket_name = 'domgenies'
            s3_file_name = f"profile_image/{user_id}/{data.photo_name}"
            save_base64_image_to_s3(data.photo, bucket_name, s3_file_name)
        except Exception:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid base64 photo format"
            )

    # Commit changes
    await db.commit()
    await db.refresh(user)  # Refresh to get updated values

    # Return updated user profile (excluding password)
    return {
        "id": user.id,
        "full_name": user.full_name,
        "email": user.email,
        "photo": user.photo,  # Return the same base64 string
        # "photo_name": user.photo_name,  # Return actual file name
        "created_at": user.created_at,
        "updated_at": user.updated_at
    }
@router.get("/downloads/{user_id}/{filename}")
async def download_file(user_id: str, filename: str):
    bucket_name = 'domgenies'
    object_key = f'profile_image/{user_id}/{filename}'
    
    try:
        response = client.get_object(Bucket=bucket_name, Key=object_key)
        image_data: StreamingBody = response['Body']
    except client.exceptions.NoSuchKey:
        raise HTTPException(status_code=404, detail="Image not found")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")
    
    mime_type, _ = mimetypes.guess_type(filename)
    mime_type = mime_type or "application/octet-stream"

    return StreamingResponse(image_data, media_type=mime_type, headers={
        "Content-Disposition": f"inline; filename={filename}"  # Changed to inline
    })
async def add_subscription(user_id: UUID, subscription_id: int, db: AsyncSession):
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

