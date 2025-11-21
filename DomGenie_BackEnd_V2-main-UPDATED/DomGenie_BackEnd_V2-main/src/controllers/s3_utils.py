import boto3
from botocore.exceptions import NoCredentialsError, PartialCredentialsError
from fastapi import HTTPException
from fastapi.responses import JSONResponse
from fastapi.responses import FileResponse
from docx import Document
import base64
import os
import json 
from botocore.exceptions import NoCredentialsError, PartialCredentialsError
from botocore.client import Config
from PyPDF2 import PdfReader
session = boto3.session.Session()
# endpoint_url='https://sfo3.digitaloceanspaces.com',
# commit new file
client = session.client(
            's3',
            region_name='ap-south-1',
            aws_access_key_id='AKIASFUIRWHYIWX7Q64K',
            aws_secret_access_key='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'
            
)

def get_images_from_bucket(bucket_name, prefix, base_url, user_id, chat_id):
    images = []
    try:
        response = client.list_objects_v2(Bucket=bucket_name, Prefix=prefix)
        for obj in response.get('Contents', []):
            file_url = f"{base_url}/{bucket_name}/{obj['Key']}"
            images.append(file_url)
    except NoCredentialsError:
        raise HTTPException(status_code=500, detail="Credentials not available")
    except PartialCredentialsError:
        raise HTTPException(status_code=500, detail="Incomplete credentials provided")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")
    return images
def get_summary_from_bucket(bucket_name, txt_file_key):
    
    try:
        response = client.get_object(Bucket=bucket_name, Key=txt_file_key)
        summary = response['Body'].read().decode('utf-8')
    except client.exceptions.NoSuchKey:
        summary = ""
    except NoCredentialsError:
        raise HTTPException(status_code=500, detail="Credentials not available")
    except PartialCredentialsError:
        raise HTTPException(status_code=500, detail="Incomplete credentials provided")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")
    return summary
def get_chat_history_from_bucket(bucket_name, json_file_key):
    
    try:
        response = client.get_object(Bucket=bucket_name, Key=json_file_key)
        chat_history = json.loads(response['Body'].read().decode('utf-8'))["chat_history"]
    except client.exceptions.NoSuchKey:
        chat_history = []
    except NoCredentialsError:
        raise HTTPException(status_code=500, detail="Credentials not available")
    except PartialCredentialsError:
        raise HTTPException(status_code=500, detail="Incomplete credentials provided")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")
    return chat_history
def save_chat_history_to_s3(chat_history, bucket_name, s3_file_name):
    # s3 = boto3.client('s3')
    
    # Check if the file already exists in the bucket
    try:
        response = client.get_object(Bucket=bucket_name, Key=s3_file_name)
        existing_data = json.loads(response['Body'].read().decode('utf-8'))
    except client.exceptions.NoSuchKey:
        existing_data = {"chat_history": []}
    except NoCredentialsError:
        print("Credentials not available")
        raise HTTPException(status_code=500, detail="Credentials not available")
    
    existing_data["chat_history"].extend(chat_history)
    
    updated_data = json.dumps(existing_data, indent=4)
    client.put_object(Bucket=bucket_name, Key=s3_file_name, Body=updated_data)
    print(f"File {s3_file_name} saved/updated in bucket {bucket_name}")
def get_chat_history_from_bucket(bucket_name, json_file_key):
    
    try:
        response = client.get_object(Bucket=bucket_name, Key=json_file_key)
        chat_history = json.loads(response['Body'].read().decode('utf-8'))["chat_history"]
    except client.exceptions.NoSuchKey:
        chat_history = []
    except NoCredentialsError:
        raise HTTPException(status_code=500, detail="Credentials not available")
    except PartialCredentialsError:
        raise HTTPException(status_code=500, detail="Incomplete credentials provided")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")
    return chat_history
def get_images_from_bucket1(bucket_name, directory_path, base_url, user_id, chat_id):
    # s3 = boto3.client('s3')
    images = []
    
    try:
        # List objects within the specified directory in the S3 bucket
        response = client.list_objects_v2(Bucket=bucket_name, Prefix=directory_path)
        
        if 'Contents' in response:
            for obj in response['Contents']:
                key = obj['Key']
                if key.endswith(('.png', '.jpg', '.jpeg', '.gif')):
                    filename = os.path.basename(key)
                    file_url = f'{base_url}/downloads/{user_id}/{chat_id}/{filename}'
                    images.append({
                        "filename": filename,
                        "url": file_url
                    })
    except client.exceptions.NoSuchKey:
        print(f"No such key found in bucket {bucket_name}")
    except NoCredentialsError:
        print("Credentials not available")
        raise HTTPException(status_code=500, detail="Credentials not available")
    
    return images
def save_base64_image_to_s3(base64_image, bucket_name, s3_file_name):
    try:
        # ✅ Step 1: Remove metadata if present
        if "," in base64_image:
            metadata, base64_image = base64_image.split(",", 1)
        else:
            metadata = ""

        # ✅ Step 2: Ensure correct padding
        missing_padding = len(base64_image) % 4
        if missing_padding:
            base64_image += "=" * (4 - missing_padding)

        # ✅ Step 3: Decode base64 data
        try:
            image_data = base64.b64decode(base64_image, validate=True)
        except (base64.binascii.Error, ValueError):
            raise HTTPException(status_code=400, detail="Invalid base64 photo format")

        # ✅ Step 4: Determine ContentType dynamically
        content_type = "image/png"  # Default
        if metadata.startswith("data:image"):
            content_type = metadata.split(";")[0].split(":")[1]
        elif s3_file_name.lower().endswith(("jpg", "jpeg")):
            content_type = "image/jpeg"
        elif s3_file_name.lower().endswith("png"):
            content_type = "image/png"

        # ✅ Step 5: Upload image to S3
        client.put_object(
            Bucket=bucket_name,
            Key=s3_file_name,
            Body=image_data,
            ContentType=content_type
        )

        print(f"✅ File {s3_file_name} successfully uploaded to bucket {bucket_name}")

    except NoCredentialsError:
        print("❌ AWS credentials not available")
        raise HTTPException(status_code=500, detail="AWS credentials not available")

    except Exception as e:
        print(f"❌ Error uploading image to S3: {e}")
        raise HTTPException(status_code=500, detail=str(e))
def get_profile_image(bucket_name, directory_path, base_url, user_id):
    try:
        response = client.list_objects_v2(Bucket=bucket_name, Prefix=directory_path)

        if 'Contents' in response:
            for obj in response['Contents']:
                key = obj['Key']
                if key.endswith(('.png', '.jpg', '.jpeg', '.gif')):
                    filename = os.path.basename(key)
                    return f'{base_url}/auth/downloads/{user_id}/{filename}'
                    
    except client.exceptions.NoSuchKey:
        print(f"No such key found in bucket {bucket_name}")
    except NoCredentialsError:
        print("Credentials not available")
        raise HTTPException(status_code=500, detail="Credentials not available")
    
    return "" 