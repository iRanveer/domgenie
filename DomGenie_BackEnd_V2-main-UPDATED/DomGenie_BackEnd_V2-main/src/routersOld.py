from typing import Annotated,List
from datetime import datetime
from pydantic import BaseModel
from fastapi.staticfiles import StaticFiles
from fastapi import FastAPI, APIRouter, HTTPException, Depends, BackgroundTasks, Response, Cookie,UploadFile, File,Header,status,Form
from fastapi.responses import JSONResponse
from fastapi.responses import FileResponse
from datetime import datetime
import os
import base64
from datetime import datetime
from fastapi.exceptions import RequestValidationError
from fastapi.security import OAuth2PasswordBearer,OAuth2PasswordRequestForm
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
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
from docx import Document
import boto3
from botocore.client import Config

router = APIRouter()
logging.basicConfig(level=logging.ERROR, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")
FACEBOOK_CLIENT_ID = "1476496809335733"
FACEBOOK_CLIENT_SECRET = "8486fe4b1d8fe4b27e9c02af99762be1"
FACEBOOK_REDIRECT_URI = "http://159.223.207.160:3300/facebook/callback"
Ai_model_url="http://159.223.207.160:4200"
SCOPE = "email"
app = FastAPI()
session = boto3.session.Session()
s3_client = session.client(
    's3',
    region_name='sfo3',  # Replace with your region
    endpoint_url='https://sfo3.digitaloceanspaces.com',
    aws_access_key_id='DO00HJ27F3J3KEMER2ZV',  # Replace with your actual access key
    aws_secret_access_key='eUviKyjL/YQDfN5JubDJX6w08d0RmeOumn/3UHQESzk',  # Replace with your actual secret key
)
# upload_directory = "/data/file_uploads"
# app.mount("/data/file_uploads", StaticFiles(directory=upload_directory), name="file_uploads")
# Mount the uploads directory
# app.mount("/code/uploads", StaticFiles(directory="uploads"), name="uploads")
task_results = {}
user_events = {}
@router.post("/register", response_model=schemas.User)
async def register(
    data: schemas.UserRegister,
    bg_task: BackgroundTasks,
    db: AsyncSession = Depends(get_db),
):
    print(data.email)
    user = await models.User.find_by_email(db=db, email=data.email)
    if user:
        raise HTTPException(status_code=400, detail="Email has already registered")

    # hashing password
    user_data = data.dict(exclude={"confirm_password"})
    user_data["password"] = get_password_hash(user_data["password"])

    # save user to db
    user = models.User(**user_data)
    user.is_active = False
    db.add(user)

    # commit the session to save changes to the database
    await db.commit()
    
    # send verify email
    user_schema = schemas.User.from_orm(user)
    verify_token = mail_token(user_schema)

    mail_task_data = schemas.MailTaskSchema(
        user=user_schema, body=schemas.MailBodySchema(type="verify", token=verify_token)
    )
    bg_task.add_task(user_mail_event, mail_task_data)

    return user_schema


@router.post("/login")
async def login(
    data: schemas.UserLogin,
    response: Response,
    db: AsyncSession = Depends(get_db),
):
    user = await models.User.authenticate(
        db=db, email=data.email, password=data.password
    )

    if not user:
        raise BadRequestException(detail="Incorrect email or password")

    if not user.is_active:
        raise ForbiddenException()

    user = schemas.User.from_orm(user)

    token_pair = create_token_pair(user=user)

    # Check if a row already exists for this user in the user_token table
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

    return {"status":1,"message": "Login successfully", "access_token": token_pair.access.token,"refresh_token":token_pair.refresh.token,"token_type": "bearer"}
    


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
        bg_task.add_task(user_mail_event, mail_task_data)

    return {"msg": "Reset token sended successfully your email check your email"}


@router.post("/password-reset", response_model=schemas.SuccessResponseScheme)
async def password_reset_token(
    token: str,
    data: schemas.PasswordResetSchema,
    db: AsyncSession = Depends(get_db),
):
    payload = await decode_access_token(token=token, db=db)
    user = await models.User.find_by_id(db=db, id=payload[SUB])
    if not user:
        raise NotFoundException(detail="User not found")

    user.password = get_password_hash(data.password)
    await user.save(db=db)

    return {"msg": "Password succesfully updated"}


@router.post("/password-update", response_model=schemas.SuccessResponseScheme)
async def password_update(
    token: Annotated[str, Depends(oauth2_scheme)],
    data: schemas.PasswordUpdateSchema,
    db: AsyncSession = Depends(get_db),
):
    payload = await decode_access_token(token=token, db=db)
    user = await models.User.find_by_id(db=db, id=payload[SUB])
    if not user:
        raise NotFoundException(detail="User not found")

    # raise Validation error
    if not verify_password(data.old_password, user.password):
        try:
            schemas.OldPasswordErrorSchema(old_password=False)
        except ValidationError as e:
            raise RequestValidationError(e.raw_errors)
    user.password = get_password_hash(data.password)
    await user.save(db=db)

    return {"msg": "Successfully updated"}

@router.post("/upload/" , response_model=schemas.SuccessResponseScheme)
async def upload_image(
    file: UploadFile,
    token: str = Header(...),
    db: AsyncSession = Depends(get_db)
):
    try:
        # Decode and verify the token
        payload = decode_access_token(token=token, db=db)
        user = await models.User.find_user_by_id(db=db, user_id=payload[SUB])
        if not user:
            raise NotFoundException(detail="User not found")

        # Create directory if not exists
        date_today = datetime.now().strftime('%Y-%m-%d')
        directory = f'./uploads/{date_today}'
        if not os.path.exists(directory):
            os.makedirs(directory)

        # Save the file with the date and time included in the filename
        date_time_now = datetime.now().strftime('%H%M%S%f')
        filename = f"{date_time_now}_{file.filename}"
        file_location = f"{directory}/{filename}"
        with open(file_location, "wb+") as file_object:
            file_object.write(file.file.read())

        # Save filename in MySQL database
        # Assuming you have a UserFile model with a filename field
        new_file = models.UserFile(user_id=user.id, filename=filename)
        db.add(new_file)
        await db.commit()

        return {"msg": "Image uploaded successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
@router.get("/login/google")
def login_google():
    flow = get_google_flow()
    authorization_url, state = flow.authorization_url(
        access_type="offline",
        include_granted_scopes="false",
        state="random_state",
        
    )
    return {"authorization_url": authorization_url}

@router.get("/callback/google")
async def callback_google(code: str, state: str):
    # credentials = authenticate_google_user(code)
    profile = authenticate_and_get_profile(code)
    return {"profile": profile}

@router.post("/upload_any_format/")
async def upload_file(file: UploadFile = File(...)):
    # Prepare the folder for storing PDF files
    date_today = datetime.now().strftime('%Y-%m-%d')
    directory = f'./pdf_folder/{date_today}'
    if not os.path.exists(directory):
        os.makedirs(directory)

    # Save the uploaded file
    file_path = os.path.join(directory, file.filename)
    with open(file_path, "wb") as buffer:
        buffer.write(await file.read())

    # Remove the last extension of the filename
    file_root, _ = os.path.splitext(file.filename)

    # Check if the uploaded file is not already a PDF
    if not file.filename.endswith('.pdf'):
        # Convert the file to PDF using pdfkit
        pdf_file_path = f"{os.path.join(directory, file_root)}.pdf"
        pdfkit.from_file(file_path, pdf_file_path, configuration=pdfkit.configuration(wkhtmltopdf='/usr/bin/wkhtmltopdf'))

        # Check if PDF conversion was successful
        if os.path.exists(pdf_file_path):
            return {"filename": os.path.basename(pdf_file_path), "message": "File converted and saved successfully to PDF folder."}
        else:
            return {"filename": file.filename, "message": "File could not be converted to PDF."}
    else:
        # If the file is already a PDF, simply save it to the PDF folder
        with open(os.path.join(directory, file.filename), "wb") as buffer:
            buffer.write(await file.read())
        return {"filename": file.filename, "message": "File saved successfully to PDF folder."}
@router.get("/login/facebook")
async def login_with_facebook():
    # Redirect users to Facebook login page
    redirect_uri = f"https://www.facebook.com/v13.0/dialog/oauth?client_id={FACEBOOK_CLIENT_ID}&redirect_uri={FACEBOOK_REDIRECT_URI}&scope={SCOPE}"
    return {"redirect_uri": redirect_uri}
@router.get("/facebook/callback")
async def login_with_facebook_callback(code: str, db: AsyncSession = Depends(get_db)):
    try:
        token_response = requests.get(
            "https://graph.facebook.com/v13.0/oauth/access_token",
            params={
                "client_id": FACEBOOK_CLIENT_ID,
                "client_secret": FACEBOOK_CLIENT_SECRET,
                "redirect_uri": FACEBOOK_REDIRECT_URI,
                "code": code,
            },
        ).json()

        # Check for errors in the token response
        if "error" in token_response:
            raise HTTPException(status_code=400, detail=token_response["error"]["message"])

        # Check if 'access_token' is present in the token response
        access_token = token_response.get("access_token")
        if not access_token:
            raise HTTPException(status_code=400, detail="Access token not found in response from Facebook API")

        user_profile_response = requests.get(
            "https://graph.facebook.com/me",
            params={"fields": "id,name,email", "access_token": access_token},
        ).json()

        # Check if user with provided email already exists in the database
        existing_user = await db.execute(select(models.User).filter(models.User.email == user_profile_response.get("email")))
        existing_user = existing_user.scalar_one_or_none()

        if existing_user:
            # If user with provided email already exists, create and return access token
            user = schemas.UserFacebook.from_orm(existing_user)
            token_pair = create_token_pair(user=user)
            return {"token": token_pair.access.token}

        # Get user profile from Facebook
        user_data = {
            "email": user_profile_response.get("email"),
            "full_name": user_profile_response["name"],
            "phone": "default_phone_value",  # Provide a default value or get it from user_profile_response
            "role_id": 1,  # Provide a default value or get it from user_profile_response
            "is_active": True,
           
        }
        user = models.User(**user_data)
        db.add(user)
        await db.commit()

        user = schemas.UserFacebook.from_orm(user)
        token_pair = create_token_pair(user=user)

        return {"token": token_pair.access.token}
        
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

def save_chat_history_as_json(chat_history, json_file_path):
    if os.path.exists(json_file_path):
        with open(json_file_path, 'r') as f:
            existing_data = json.load(f)
    else:
        existing_data = {"chat_history": []}

    # Append new entries to the existing chat history
    existing_data["chat_history"].extend(chat_history)

    with open(json_file_path, 'w') as f:
        json.dump(existing_data, f, indent=4)


@router.post("/send_prompt_bucket")
async def send_data_to_api(
    data: schemas.QueryRequest,
    token: str = Header(...),
    db: AsyncSession = Depends(get_db)
):
    if not token.startswith("Bearer "):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token format")

    access_token = token.split(" ")[1]
    payload = decode_access_token(token=access_token, db=db)
    
    url = f"{Ai_model_url}/ai/model/run"  # Replace with your API endpoint
    data_json = data.dict()
    data_json["user_id"] = payload["sub"]
    file_id = uuid.uuid4()
    try:
        if not data.chat_id:
            chat_entry = models.User_Chat(
                chat_id=file_id,
                user_id=payload["sub"],
                user_query=data.query,
                file_name="",
                is_delete=0,
                intermediate_step=data.intermediate_steps[0],
                created_at=datetime.utcnow()
            )
            db.add(chat_entry)
            await db.commit()
            await db.refresh(chat_entry)
            await db.commit()
            chat_id = chat_entry.chat_id
        else:
            chat_id = data.chat_id
        
        data_json['chat_id'] = chat_id
        response = requests.post(url, json=data_json)
        response.raise_for_status()
        response_json = response.json()
        intermediate_steps = response_json.get("intermediate_steps")
        
        if intermediate_steps and isinstance(intermediate_steps, list) and len(intermediate_steps) > 0:
            intermediate_step = intermediate_steps[0]
        else:
            intermediate_step = "search"
        
        chat_history = []
        directory = f"./chat_history/{chat_id}"
        
        
        json_file_path = os.path.join(directory, f"chat_history_{chat_id}.json")
        chat_history.append({"content": data.query})
        chat_history.append({"content": response_json["output"]})
        save_chat_history_as_json(chat_history, json_file_path)
        
        if not data.chat_id:
            chat_entry.file_name = json_file_path
            chat_entry.intermediate_step = intermediate_step
            await db.commit()
        
        # Upload the file to DigitalOcean Spaces
        bucket_name = 'ai-server-bucket'
        object_key = f"chat_history/{chat_id}/chat_history_{chat_id}.json"
        s3_client.upload_file(json_file_path, bucket_name, object_key)
        
        return {"message": "Data sent and chat history saved as PDF.", "response": response_json}
    
    except requests.RequestException as e:
        raise HTTPException(status_code=500, detail=f"Failed to send request: {e}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: {e}")
@router.post("/send_prompt")
async def send_data_to_api(
    data: schemas.QueryRequest,
    token: str = Header(...),
    db: AsyncSession = Depends(get_db)
):
    if not token.startswith("Bearer "):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token format")

    access_token = token.split(" ")[1]
    payload = decode_access_token(token=access_token, db=db)
    
    url = f"{Ai_model_url}/ai/model/run"  # Replace with your API endpoint
    data_json = data.dict()
    data_json["user_id"] = payload["sub"]
    file_id = uuid.uuid4()  
    print(f"steps_send",data.intermediate_steps[0])
    try:
        if not data.chat_id:
            chat_entry = models.User_Chat(
                chat_id=file_id,
                user_id=payload["sub"],
                user_query=data.query,
                file_name="",
                is_delete=0,  # Assuming 0 indicates not deleted
                intermediate_step=data.intermediate_steps[0],
                created_at=datetime.utcnow()
            )
            
            # Add entry to DB session and commit
            db.add(chat_entry)
            await db.commit()
            await db.refresh(chat_entry)
            await db.commit()
            # Generate the directory path including the chat entry ID
            chat_id = chat_entry.chat_id
        else:
            chat_id=data.chat_id
            
        # Send the POST request
        data_json['chat_id']=chat_id
        response = requests.post(url, json=data_json)
        response.raise_for_status()

        response_json = response.json()
        intermediate_steps = response_json.get("intermediate_steps")

# Check if intermediate_steps is not None and is a list with at least one element
        if intermediate_steps and isinstance(intermediate_steps, list) and len(intermediate_steps) > 0:
            # Extract the first element (string) from the list
            intermediate_step = intermediate_steps[0]
            print("First intermediate step:", intermediate_step)
        else:
            intermediate_step = "search"
            print("No intermediate steps found or list is empty.")
        # print(f"get data:{data.query}")
        chat_history = []
        
        # Create a new User_Chat entry
        # print("chat_id",chat_id)
        directory = f"./uploads/chat_history/{chat_id}"
        # Create the directory if it doesn't exist
        if not os.path.exists(directory):
           os.makedirs(directory)
        #  os.makedirs(directory)
        
        # Generate the file path for the PDF
        json_file_path = os.path.join(directory, f"chat_history_{chat_id}.json")
        chat_history.append({"content": data.query})
        chat_history.append({"content": response_json["output"]})
        save_chat_history_as_json(chat_history, json_file_path)
        
        # Update the chat entry with the file path
        if not data.chat_id:
            chat_entry.file_name = json_file_path
            chat_entry.intermediate_step = intermediate_step
            await db.commit()
        
        
        return {"message": "Data sent and chat history saved as PDF.","response":response_json}
    
    except requests.RequestException as e:
        raise HTTPException(status_code=500, detail=f"Failed to send request: {e}")
def convert_to_pdf(input_file_path: str, output_file_path: str):
    try:
        pdfkit.from_file(input_file_path, output_file_path, configuration=pdfkit.configuration(wkhtmltopdf='/usr/bin/wkhtmltopdf'))
        return True
    except Exception as e:
        print(f"Error converting file to PDF: {e}")
        return False
def send_file_with_data(data: schemas.QueryRequest):
    files = {"file": open(pdf_file_path, "rb")}
    response = requests.post("http://159.223.207.160:4200/ai/model/run",data=data)
    return response




def determine_file_extension(file_content):
    # Check the magic bytes to determine the file type
    # Add more file types as needed
    if file_content.startswith(b'\xFF\xD8'):
        return 'jpg'  # JPEG image
    elif file_content.startswith(b'\x89PNG'):
        return 'png'  # PNG image
    elif file_content.startswith(b'%PDF-'):
        return 'pdf'  # PDF document
    elif file_content.startswith(b'GIF8'):
        return 'gif'  # GIF image
    elif file_content.startswith(b'PK\x03\x04'):
        return 'zip'  # ZIP archive
    # Add more file types as needed

    # If file type is unknown, default to ".bin"
    return '.bin'
def decode_base64(encoded_data):
    try:
        # Decode the base64 encoded data with validation
        decoded_data = base64.b64decode(encoded_data, validate=True)
        return decoded_data
    except base64.binascii.Error:
        # Handle the incorrect padding error
        raise HTTPException(status_code=400, detail="Incorrect padding in base64 encoded data")
@router.post("/upload_multiple_base64/")
async def upload_images(
    data: schemas.QueryRequest,
    token: str = Header(...),
    db: AsyncSession = Depends(get_db)
):
    try:
        # Verify token format
        if not token.startswith("Bearer "):
            raise HTTPException(status_code=401, detail="Invalid token format")

        # Extract access token and decode it to get payload
        access_token = token.split(" ")[1]
        payload = decode_access_token(access_token, db)
        user_id = payload["sub"]

        # Create a user directory if it doesn't exist
        user_directory = f'./uploads/{user_id}'
        os.makedirs(user_directory, exist_ok=True)

        # Initialize list to keep track of successfully uploaded files
        uploaded_files = []

        # Process each file in the request
        for idx, file_data in enumerate(data.file_names):
            # Access the filename and base_64_content from the dictionary
            filename = file_data.get('filename')
            base_64_content = file_data.get('base_64_content')

            # Check if filename and base_64_content are provided
            if not filename or not base_64_content:
                raise HTTPException(status_code=400, detail=f"Missing filename or base_64_content for file #{idx}")

            # Decode the base64-encoded content
            decoded_content = decode_base64(base_64_content)

            # File location path
            file_location = os.path.join(user_directory, filename)
            print(f"file location:{file_location}")

            # Save the decoded content to the file
            with open(file_location, "wb") as file_object:
                file_object.write(decoded_content)

            print(f"file location1:{file_location}")
            uploaded_files.append(file_location)
            print(f"new files:{uploaded_files}")

            # Create a new UserFile instance with UUID, user_id, filename, and current time
            file_id = uuid.uuid4()
            current_time = datetime.now()
            print('test1')
            
            new_file = models.UserFile(
                id=file_id,
                user_id=user_id,
                filename=filename,
                chat_id_new="",
                created_at=current_time
            )
            print("db:", new_file)

            # Add the new file to the database session and commit
            db.add(new_file)
            await db.commit()
            await db.refresh(new_file)

        # Ensure at least one file was successfully uploaded
        if not uploaded_files:
            raise HTTPException(status_code=500, detail="No files were successfully uploaded")

        # Update data dictionary with uploaded files
        data.file_names = uploaded_files

        # Return success message and uploaded file paths
        return {
            "message": "Files uploaded successfully",
            "file_names": uploaded_files
        }

    except HTTPException as e:
        raise e

    except Exception as e:
        # Log unexpected errors and raise HTTPException
        logger.error(f"Unexpected error occurred: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@router.get("/user_files/")
async def get_user_files(
    token: str = Header(...),
    db: AsyncSession = Depends(get_db)
):
    # Verify the token format
    if not token.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Invalid token format")
    
    # Extract and decode the access token
    access_token = token.split(" ")[1]
    payload = decode_access_token(access_token, db)
    user_id = payload["sub"]

    # Query the UserFile table for files associated with the user_id
    # user_files_query = select(models.UserFile.id, models.UserFile.filename).where(models.UserFile.user_id == user_id)
    # result = await db.execute(user_files_query)
    
    # # Retrieve the list of tuples from the query result
    # user_files = result.fetchall()
    user_files_query = select(
        models.UserFile.id,
        models.UserFile.filename,
        models.UserFile.chat_id_new
    ).where(
        models.UserFile.user_id == user_id,
        models.UserFile.chat_id_new == ""
    ).order_by(
        models.UserFile.created_at.desc()  # Assuming 'created_at' is the timestamp field
    )
    result = await db.execute(user_files_query)
    
    ## Retrieve the list of tuples from the query result
    user_files = result.fetchall()


    # Create a list to store file details
    files_list = []
    for file_id, filename,chat_id_new in user_files:
        files_list.append({
            "id": file_id,
            "filename": filename,
            "chat_id":chat_id_new
        })

    user_files_query_new = select(
        models.UserFile.id,
        models.UserFile.filename,
        models.UserFile.chat_id_new
    ).where(
        models.UserFile.user_id == user_id,
        models.UserFile.chat_id_new != ""
    ).order_by(
        models.UserFile.created_at.desc()  # Assuming 'created_at' is the timestamp field
    )
    result_new = await db.execute(user_files_query_new)
    
    ## Retrieve the list of tuples from the query result
    user_files_new = result_new.fetchall()


    # Create a list to store file details
    files_list_new = []
    for file_id, filename,chat_id_new in user_files_new:
        files_list_new.append({
            "id": file_id,
            "filename": filename,
            "chat_id":chat_id_new
        })

    user_history_query = select(
    models.User_Chat.chat_id,
    models.User_Chat.user_query,
    models.User_Chat.intermediate_step
    ).where(
        models.User_Chat.user_id == user_id,
        models.User_Chat.intermediate_step == "search"
    ).order_by(
        models.User_Chat.created_at.desc()  # Assuming 'created_at' is the timestamp field
    ).limit(10)
    result = await db.execute(user_history_query)
    
    # Retrieve the list of tuples from the query result
    user_history = result.fetchall()
    
    # Create a list to store file details
    chat_history = []
    for chat_id, user_query,intermediate_step in user_history:
        chat_history.append({
            "chat_id": chat_id,
            "user_query": user_query,
            "intermediate_step":intermediate_step
        })
    # Return the list of files with id and filename
    return {"status": 1, "message": "All user files", "files": files_list,"summrized_files":files_list_new,"user_chat_history":chat_history}
@router.get("/downloads/{user_id}/{chat_id}/{filename}")
async def download_file(
    user_id: str,
    chat_id: str,
    filename: str
):
    # Path to the user's file
    file_path = f'./uploads/{user_id}/{chat_id}/{filename}'
    if not os.path.exists(file_path):
        raise HTTPException(status_code=404, detail="File not found")

    # Determine the MIME type of the file
    mime_type = "application/octet-stream"
    if filename.endswith(".jpg"):
        mime_type = "image/jpeg"
    elif filename.endswith(".png"):
        mime_type = "image/png"

    # Serve the file
    return FileResponse(file_path, media_type=mime_type)
def create_file_url(base_url: str, user_id: str, filename: str) -> str:
    # Create the full URL by concatenating the base URL with the file path
    file_url = f"{base_url}/uploads/{user_id}/{filename}"
    return file_url

@router.post("/pdf_summarize1/")
async def summarize_pdf(
    data: schemas.QueryRequest,
    token: str = Header(...),
    db: AsyncSession = Depends(get_db)
):
    try:
        # Extract and decode the access token
        if not token.startswith("Bearer "):
            raise HTTPException(status_code=401, detail="Invalid token format")
        
        access_token = token.split(" ")[1]
        payload = decode_access_token(access_token, db)
        user_id = payload["sub"]
        file_id = uuid.uuid4()
        if not data.chat_id:
            chat_entry = models.User_Chat(
                chat_id=file_id,
                user_id=payload["sub"],
                user_query=data.query,
                file_name="",
                is_delete=0,  # Assuming 0 indicates not deleted
                intermediate_step="",
                created_at=datetime.utcnow()
            )
            
            # Add entry to DB session and commit
            db.add(chat_entry)
            await db.commit()
            await db.refresh(chat_entry)
            await db.commit()
            # Generate the directory path including the chat entry ID
            chat_id = chat_entry.chat_id
        else:
            chat_id=data.chat_id
        # Prepare the AI endpoint URL
        ai_endpoint_url = "http://159.223.207.160:4200/ai/model/summarize"
        base_path = "/data/file_uploads"  # Update to your server's base URL

        # Prepare data dictionary
        data_dict = data.dict()
        data_dict["user_id"] = user_id
        data_dict['chat_id']=chat_id
        # Process file_names data
        file_names = []
        for file_data in data.file_names:
            # Access the filename and base64 content from the dictionary
            filename = file_data.get('filename')
            base_64_content = file_data.get('base_64_content')
            
            if not filename or not base_64_content:
                raise HTTPException(status_code=422, detail="Filename or base64 content is missing in the request")
            
            # Create a dictionary for each file with the expected keys
            file_info = {
                "filename": f'{base_path}/{user_id}/{filename}',
                "base_64_content": base_64_content
            }
            file_names.append(file_info)

        # Update data_dict with the list of file dictionaries
        data_dict['file_names'] = file_names
        
        # Send the data dictionary to the AI endpoint
        async with httpx.AsyncClient(timeout=500) as client:
            response = await client.post(ai_endpoint_url, json=data_dict)

        if response.status_code == 200:
            response_json = response.json()
            intermediate_steps = response_json.get("intermediate_steps")

# Check if intermediate_steps is not None and is a list with at least one element
            
            intermediate_step = "chat_with_pdf"
            summary = response_json.get("summary")
            
            ## Create a new User_Chat entry
            print("chat_id",chat_id)
            directory = f"./uploads/chat_history/{chat_id}"
            print("directory",directory)
            # Create the directory if it doesn't exist
            if not os.path.exists(directory):
                os.makedirs(directory)
            
            # Generate the file path for the PDF
            json_file_path = os.path.join(directory, f"chat_history_{chat_id}.json")
            
            # Save chat history as PDF file
            save_chat_history_as_json(summary, json_file_path)
            
            # Update the chat entry with the file path
            if not data.chat_id:
                chat_entry.file_name = json_file_path
                chat_entry.intermediate_step = intermediate_step
                await db.commit()
            
            
            return {"message": "Data sent and chat history saved as PDF.","response":response_json}
        else:
            raise HTTPException(status_code=response.status_code, detail=f"Failed to send data to the AI endpoint: {response.text}")

    except HTTPException as e:
        raise HTTPException(status_code=response.status_code, detail=f"api Time out: {e}")
    except Exception as e:
        # Log unexpected errors for debugging
        logger.error(f"Unexpected error occurred: {e}", exc_info=True)
        raise HTTPException(status_code=500, detail="Internal server error")
# Define the parallel_summarization function
@router.post("/parallel_summarization/")
async def parallel_summarization(data_dicts, ai_endpoint_url):
    async with AsyncClient() as client:
        # Create a list of tasks to be executed concurrently
        tasks = [request_summarize(client, ai_endpoint_url, data_dict) for data_dict in data_dicts]
        
        # Execute tasks concurrently and gather results
        results = await asyncio.gather(*tasks)
        
        return results

# Example function for making an async request to the AI endpoint
async def request_summarize(client, ai_endpoint_url, data_dict):
    response = await client.post(ai_endpoint_url, json=data_dict)
    if response.status_code == 200:
        return response.json()
    else:
        raise HTTPException(status_code=response.status_code, detail="Failed to send data to the AI endpoint")


@router.post("/get_chat_history")
async def get_chat_history(
    data: schemas.QueryRequest,
    token: str = Header(...),
    db: AsyncSession = Depends(get_db)
    ):
    access_token = token.split(" ")[1]
    payload = decode_access_token(access_token, db)
    user_id = payload["sub"]
    if not token.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Invalid token format")
    # Define the file path based on the chat_id
    json_file_path = f"./uploads/chat_history/{data.chat_id}/chat_history_{data.chat_id}.json"
    # if(data.intermediate_steps[0]=='chat_with_table'):
    #     json_file_path = f"./uploads/chat_history_table/{data.chat_id}/chat_history_table_{data.chat_id}.json"
    # else:
    #     json_file_path = f"./uploads/chat_history/{data.chat_id}/chat_history_{data.chat_id}.json"
    txt_file_path = f"./uploads/summarize_doc_into_txt/{user_id}_{data.chat_id}/summary.txt"
    base_url = "http://159.223.207.160:3300"
    base_path1 = f"./uploads"
    images = []
    images_directory = f"{base_path1}/{user_id}/{data.chat_id}"
    images = get_images_from_directory(images_directory, base_url, user_id, data.chat_id)
    # Check if the file exists
    if not os.path.exists(json_file_path):
        chat_history=[]
    else:
        with open(json_file_path, 'r') as file:
            chat_history = json.load(file)["chat_history"]

    if os.path.isfile(txt_file_path):
        summary = open(txt_file_path, "r").read()
    else:
        summary =""
    return {
            "message": "Data sent and chat history saved as JSON.",
            "summary":summary,
            "chat_history": chat_history,
            "table_images": images
            
        }
    # Return the JSON response

@router.post("/pdf_chat/")
async def pdf_chat(
    data: schemas.QueryRequest,
    token: str = Header(...),
    db: AsyncSession = Depends(get_db)
):
    try:
        # Extract and decode the access token
        access_token = token.split(" ")[1]
        payload = decode_access_token(access_token, db)
        user_id = payload["sub"]
        
        # Verify token format
        if not token.startswith("Bearer "):
            raise HTTPException(status_code=401, detail="Invalid token format")
        
        # if(data.intermediate_steps[0]=="chat_with_pdf"):
        #     ai_endpoint_url = "http://159.223.207.160:4200/ai/model/chat_with_pdf"
        # else:
        #     ai_endpoint_url = "http://159.223.207.160:4200/ai/model/chat_with_table"
        data_dict = data.dict()
        ai_endpoint_url_router = "http://159.223.207.160:4200/ai/model/router"
        response_router = requests.post(ai_endpoint_url_router, json=data_dict)
        response_json_router = response_router.json()
        print("json router",response_json_router)
        if response_router.status_code == 200:
            ai_endpoint_url = f"http://159.223.207.160:4200/ai/model/{response_json_router['topic']}"

        else:
            raise HTTPException(status_code=response.status_code, detail="Failed to send data to the AI endpoint")
        data_dict["user_id"] = user_id
        data_dict['table_extract']=data.table_extract
        file_names = []
        for file_data in data.file_names:
            # Access the filename and base64 content from the dictionary
            filename = file_data.get('filename')
            base_64_content = file_data.get('base_64_content')
            
            # if not filename or not base_64_content:
            #     raise HTTPException(status_code=422, detail="Filename or base64 content is missing in the request")
            
            # Create a dictionary for each file with the expected keys
            file_info = {
                "filename": filename,
                "base_64_content": base_64_content
            }
            file_names.append(file_info)

        # Update data_dict with the list of file dictionaries
        data_dict['chat_id']=data.chat_id
        data_dict['file_names'] = file_names
        # Make a request to the AI endpoint
        response = requests.post(ai_endpoint_url, json=data_dict)
        directory = f"./uploads/chat_history/{data.chat_id}"
        if not os.path.exists(directory):
            os.makedirs(directory)
        json_file_path = os.path.join(directory, f"chat_history_{data.chat_id}.json")
        # if(data.intermediate_steps[0]=="chat_with_table"):
        #     directory = f"./uploads/chat_history_table/{data.chat_id}"
        #     if not os.path.exists(directory):
        #         os.makedirs(directory)
        #     json_file_path = os.path.join(directory, f"chat_history_table_{data.chat_id}.json")
        # else:
        #     directory = f"./uploads/chat_history/{data.chat_id}"
        #     if not os.path.exists(directory):
        #         os.makedirs(directory)
        #     json_file_path = os.path.join(directory, f"chat_history_{data.chat_id}.json")
        

        if response.status_code == 200:
            response_json = response.json()
            chat_history=[]
            # chat_history = response_json["chat_history"]
            # if "summary" in response_json and response_json["summary"]:
            #     summary_content = response_json["summary"]
            #     chat_history.append({"summary": summary_content})

            # Save the updated chat history
            # save_chat_history_as_json(chat_history, json_file_path)
            chat_history.append({"content": data.query})
            chat_history.append({"content": response_json["output"]})
            save_chat_history_as_json(chat_history, json_file_path)
            return {"message": response_json}
        else:
            raise HTTPException(status_code=response.status_code, detail="Failed to send data to the AI endpoint")

    except HTTPException as e:
        raise e
    except Exception as e:
        # Log unexpected errors and raise HTTPException with 500 Internal server error
        logger.error(f"Unexpected error occurred: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")
@router.post("/chat_with_table/")
async def chat_with_table(
    data: schemas.QueryRequest,
    token: str = Header(...),
    db: AsyncSession = Depends(get_db)
):
    try:
        # Extract and decode the access token
        access_token = token.split(" ")[1]
        payload = decode_access_token(access_token, db)
        user_id = payload["sub"]
        
        # Verify token format
        if not token.startswith("Bearer "):
            raise HTTPException(status_code=401, detail="Invalid token format")

        ai_endpoint_url = "http://159.223.207.160:4200/ai/model/chat_with_table"
        data_dict = data.dict()
        data_dict["user_id"] = user_id
        data_dict['table_extract']=data.table_extract
        file_names = []
        for file_data in data.file_names:
            # Access the filename and base64 content from the dictionary
            filename = file_data.get('filename')
            base_64_content = file_data.get('base_64_content')
            
            # if not filename or not base_64_content:
            #     raise HTTPException(status_code=422, detail="Filename or base64 content is missing in the request")
            
            # Create a dictionary for each file with the expected keys
            file_info = {
                "filename": filename,
                "base_64_content": base_64_content
            }
            file_names.append(file_info)

        # Update data_dict with the list of file dictionaries
        data_dict['chat_id']=data.chat_id
        data_dict['file_names'] = file_names
        # Make a request to the AI endpoint
        response = requests.post(ai_endpoint_url, json=data_dict)
        if response.status_code == 200:
            response_json = response.json()
            return {"message": response_json}
        else:
            raise HTTPException(status_code=response.status_code, detail="Failed to send data to the AI endpoint")

    except HTTPException as e:
        raise e
    except Exception as e:
        # Log unexpected errors and raise HTTPException with 500 Internal server error
        logger.error(f"Unexpected error occurred: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")
async def send_request_to_ai_endpoint(ai_endpoint_url, data_dict):
    async with httpx.AsyncClient(timeout=500) as client:
        response = await client.post(ai_endpoint_url, json=data_dict)
    if response.status_code == 200:
        return response.json()
    else:
        raise HTTPException(status_code=response.status_code, detail=f"Failed to send data to the AI endpoint: {response.text}")

@router.post("/pdf_summarize/")
async def process_pdf_and_table(
    data: schemas.QueryRequest,
    token: str = Header(...),
    db: AsyncSession = Depends(get_db)
):
    try:
        # Extract and decode the access token
        if not token.startswith("Bearer "):
            raise HTTPException(status_code=401, detail="Invalid token format")
        
        access_token = token.split(" ")[1]
        payload = decode_access_token(access_token, db)
        user_id = payload["sub"]
        file_id = uuid.uuid4()
        chat_entry = models.User_Chat(
                chat_id=file_id,
                user_id=user_id,
                user_query=data.query,
                file_name="",
                is_delete=0,  # Assuming 0 indicates not deleted
                intermediate_step=data.intermediate_steps[0],
                created_at=datetime.utcnow()
            )
            
            # Add entry to DB session and commit
        db.add(chat_entry)
        await db.commit()
        await db.refresh(chat_entry)
        chat_id = chat_entry.chat_id
        # if not data.chat_id:
        #     chat_entry = models.User_Chat(
        #         chat_id=file_id,
        #         user_id=user_id,
        #         user_query=data.query,
        #         file_name="",
        #         is_delete=0,  # Assuming 0 indicates not deleted
        #         intermediate_step=data.intermediate_steps[0],
        #         created_at=datetime.utcnow()
        #     )
            
        #     # Add entry to DB session and commit
        #     db.add(chat_entry)
        #     await db.commit()
        #     await db.refresh(chat_entry)
        #     chat_id = chat_entry.chat_id
        # else:
        #     chat_id = data.chat_id

        # Prepare base path for files
        base_path = "/data/file_uploads"  # Update to your server's base URL
        
        # Prepare data dictionary
        data_dict = data.dict()
        data_dict["user_id"] = user_id
        data_dict['chat_id'] = chat_id

        # Process file_names data
        file_names = []
        for file_data in data.file_names:
            filename = file_data.get('filename')
            base_64_content = file_data.get('base_64_content')
            file_uuid = uuid.UUID(base_64_content)
            chat_data=chat_id    
            if not filename or not base_64_content:
                raise HTTPException(status_code=422, detail="Filename or base64 content is missing in the request")
            
            print(f"harsh---------",chat_data)
            print(f"anupam---------",file_uuid)
            result = await db.execute(
                    update(models.UserFile)
                    .where(models.UserFile.id == file_uuid)
                    .values(chat_id_new=chat_data)
            ) 
            await db.commit() 
            file_info = {
                "filename": f'{base_path}/{user_id}/{filename}',
                "base_64_content": base_64_content
            }
            file_names.append(file_info)
        
        data_dict['file_names'] = file_names

        # Define AI endpoint URLs
        ai_chat_with_table_url = "http://159.223.207.160:4200/ai/model/chat_with_table"
        data_dict['table_extract']=data.table_extract
        # Now send the request to the chat_with_table endpoint
        chat_with_table_response_json = await send_request_to_ai_endpoint(ai_chat_with_table_url, data_dict)
        ai_summarize_url = "http://159.223.207.160:4200/ai/model/summarize"
        

        # Send request to the summarize endpoint first
        summarize_response_json = await send_request_to_ai_endpoint(ai_summarize_url, data_dict)

        # Process the summarize response
        intermediate_steps = summarize_response_json.get("intermediate_steps")
        intermediate_step = "chat_with_pdf"
        summary = summarize_response_json.get("summary")

        # Save chat history as JSON file
        directory = f"./uploads/chat_history/{chat_id}"
        if not os.path.exists(directory):
            os.makedirs(directory)
        
        json_file_path = os.path.join(directory, f"chat_history_{chat_id}.json")
        # save_chat_history_as_json(summary, json_file_path)
        
        # Update the chat entry with the file path
        if not data.chat_id:
            chat_entry.file_name = json_file_path
            chat_entry.intermediate_step = intermediate_step
            
        
        directory1 = f'{base_path}/{user_id}/{chat_id}'
        images = []
        base_url = "http://159.223.207.160:3300"
        base_path1 = f"./uploads"
        if chat_with_table_response_json.get("output") == "Extraction Complete!":
            images_directory = f"{base_path1}/{user_id}/{chat_id}"
            images = get_images_from_directory(images_directory, base_url, user_id, chat_id)
            # check_image="i ma in"
        return {
            "message": "Data sent and chat history saved as JSON.",
            "response": summarize_response_json,
            "chat_with_table_response": chat_with_table_response_json,
            "images": images,
            
        }

    except HTTPException as e:
        raise e
    except Exception as e:
        # Log unexpected errors for debugging
        logger.error(f"Unexpected error occurred: {e}", exc_info=True)
        raise HTTPException(status_code=500, detail="Internal server error")
def get_images_from_directory(directory_path, base_url, user_id, chat_id):
    images = []
    if os.path.exists(directory_path) and os.path.isdir(directory_path):
        for filename in os.listdir(directory_path):
            if filename.endswith(('.png', '.jpg', '.jpeg', '.gif')):
                file_url = f'{base_url}/downloads/{user_id}/{chat_id}/{filename}'
                images.append({
                    "filename": filename,
                    "url": file_url
                })
    return images
# def save_chat_history_as_json(summary, file_path):
#     with open(file_path, 'w') as f:
#         json.dump(summary, f, indent=4)

@router.get("/api/getImages/{userId}/{chatId}/{fileId}")
def get_image(userId: str,chatId: str,fileId: str):
    dirname=f"./data/file_uploads"
    image_path = os.path.join(dirname, userId,chatId,fileId)
    if os.path.exists(image_path):
        return FileResponse(image_path)
    else:
        raise HTTPException(status_code=404, detail="Image not found")
async def process_chat_with_table(task_id, data_dict, base_path1, base_url, user_id, chat_id):
    ai_chat_with_table_url = "http://159.223.207.160:4200/ai/model/chat_with_table"
    chat_with_table_response_json = await send_request_to_ai_endpoint(ai_chat_with_table_url, data_dict)
    images = []
    if chat_with_table_response_json.get("output") == "Extraction Complete!":
        images_directory = f"{base_path1}/{user_id}/{chat_id}"
        images = get_images_from_directory(images_directory, base_url, user_id, chat_id)
    
    # Store the results in the task_results dictionary
    task_results[task_id] = {
        "chat_with_table_response": chat_with_table_response_json,
        "images": images,
        "status": "complete"
    }

@router.post("/pdf_summarize_new/")
async def process_pdf_and_table(
    data: schemas.QueryRequest,
    token: str = Header(...),
    db: AsyncSession = Depends(get_db)
):
    global task_results  # Ensure task_results is accessible in this scope

    try:
        # Extract and decode the access token
        if not token.startswith("Bearer "):
            raise HTTPException(status_code=401, detail="Invalid token format")
        
        access_token = token.split(" ")[1]
        payload = decode_access_token(access_token, db)
        user_id = payload["sub"]
        file_id = uuid.uuid4()
        
        if not data.chat_id:
            chat_entry = models.User_Chat(
                chat_id=file_id,
                user_id=user_id,
                user_query=data.query,
                file_name="",
                is_delete=0,  # Assuming 0 indicates not deleted
                intermediate_step="",
                created_at=datetime.utcnow()
            )
            
            # Add entry to DB session and commit
            db.add(chat_entry)
            await db.commit()
            await db.refresh(chat_entry)
            chat_id = chat_entry.chat_id
        else:
            chat_id = data.chat_id

        # Prepare base path for files
        base_path = "/data/file_uploads"  # Update to your server's base URL
        
        # Prepare data dictionary
        data_dict = data.dict()
        data_dict["user_id"] = user_id
        data_dict['chat_id'] = chat_id

        # Process file_names data
        file_names = []
        for file_data in data.file_names:
            filename = file_data.get('filename')
            base_64_content = file_data.get('base_64_content')
            
            if not filename or not base_64_content:
                raise HTTPException(status_code=422, detail="Filename or base64 content is missing in the request")
            
            file_info = {
                "filename": f'{base_path}/{user_id}/{filename}',
                "base_64_content": base_64_content
            }
            file_names.append(file_info)
        
        data_dict['file_names'] = file_names

        # Define AI endpoint URLs
        ai_summarize_url = "http://159.223.207.160:4200/ai/model/summarize"

        # Send request to the summarize endpoint first
        summarize_response_json = await send_request_to_ai_endpoint(ai_summarize_url, data_dict)

        # Process the summarize response
        intermediate_steps = summarize_response_json.get("intermediate_steps")
        intermediate_step = "chat_with_pdf"
        summary = summarize_response_json.get("summary")

        # Save chat history as JSON file
        directory = f"./uploads/chat_history/{chat_id}"
        if not os.path.exists(directory):
            os.makedirs(directory)
        
        json_file_path = os.path.join(directory, f"chat_history_{chat_id}.json")
        save_chat_history_as_json(summary, json_file_path)
        
        # Update the chat entry with the file path
        if not data.chat_id:
            chat_entry.file_name = json_file_path
            chat_entry.intermediate_step = intermediate_step
            await db.commit()

        # Start the chat_with_table task in the background
        task_id = str(uuid.uuid4())
        data_dict['table_extract'] = True
        base_url = "http://159.223.207.160:3300"
        base_path1 = f"./uploads"
        task_results[task_id] = {"status": "in_progress"}
        asyncio.create_task(process_chat_with_table(task_id, data_dict, base_path1, base_url, user_id, chat_id))

        # Return the summarize response immediately along with the task ID
        return {
            "message": "Data sent and chat history saved as JSON.",
            "response": summarize_response_json,
            "task_id": task_id
        }

    except HTTPException as e:
        raise e
    except Exception as e:
        # Log unexpected errors for debugging
        logger.error(f"Unexpected error occurred: {e}", exc_info=True)
        raise HTTPException(status_code=500, detail="Internal server error")


@router.post("/get_last_chat_id/")
async def get_last_chat_id(
    data: schemas.QueryRequest,
    token: str = Header(...),
    db: AsyncSession = Depends(get_db)
):
    # Verify the token format
    if not token.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Invalid token format")
    
    # Extract and decode the access token
    access_token = token.split(" ")[1]
    payload = decode_access_token(access_token, db)
    user_id = payload["sub"]

    # Query the UserFile table for files associated with the user_id
    # user_files_query = select(models.UserFile.id, models.UserFile.filename).where(models.UserFile.user_id == user_id)
    # result = await db.execute(user_files_query)
    
    # # Retrieve the list of tuples from the query result
    # user_files = result.fetchall()
    
    user_history_query = select(
    models.User_Chat.chat_id,
    models.User_Chat.user_query,
    models.User_Chat.intermediate_step
    ).where(
        models.User_Chat.user_id == user_id,
        models.User_Chat.intermediate_step == data.intermediate_steps[0]
    ).order_by(
        models.User_Chat.created_at.desc()  # Assuming 'created_at' is the timestamp field
    ).limit(1)
    result = await db.execute(user_history_query)
    
    # Retrieve the list of tuples from the query result
    user_history = result.fetchall()
    
    # Create a list to store file details
    chat_history = []
    for chat_id, user_query,intermediate_step in user_history:
        chat_history.append({
            "chat_id": chat_id,
            "user_query": user_query,
            "intermediate_step": intermediate_step,
        })
    # Return the list of files with id and filename
    return {"status": 1, "message": "All user files","last_chat":chat_history}
# Endpoint to check the status of the background task
