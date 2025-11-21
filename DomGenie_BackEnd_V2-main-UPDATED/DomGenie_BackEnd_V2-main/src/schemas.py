from typing import Any,Optional,List,Dict
from datetime import datetime, date 

from pydantic import BaseModel, UUID4, validator, EmailStr,conint, conlist,constr


class UserBase(BaseModel):
    email: EmailStr
    full_name: str
    password: str
    role_id: Optional[int]  # Make role_id optional
    phone: Optional[str]    # Make phone optional
    otp: Optional[int] = 0
    photo: Optional[str] = "default_photo_value"
    is_active: bool = True
    google_drive_folder_id: Optional[str] = None  # Mark as optional with a default value of None
    is_google_drive: int = 0

class RegisterResponse(BaseModel):
    message: str
    user_id: UUID4
class VerifyOtpRequest(BaseModel):
    user_id: UUID4
    otp: int
class VerifyOtpResponse(BaseModel):
    message: str
class UserCreate(UserBase):
    password: str


class User(UserBase):
    id: UUID4


    class Config:
        orm_mode = True
        exclude = {"otp", "phone"}

    @validator("id")
    def convert_to_str(cls, v, values, **kwargs):
        return str(v) if v else v


class UserRegister(UserBase):
    password: str
    confirm_password: str

    @validator("confirm_password")
    def verify_password_match(cls, v, values, **kwargs):
        password = values.get("password")

        if v != password:
            raise ValueError("The two passwords did not match.")

        return v


class UserLogin(BaseModel):
    email: EmailStr
    password: str

    # grant_type: str | None

class UserLoginModel(BaseModel):
    username: str
    password: str
    grant_type: str | None

class UserFacebook(UserBase):
    id: UUID4
    email: EmailStr
    full_name: str
    otp: Optional[conint(ge=0)]  # Ensure otp is a non-negative integer or None
    photo: Optional[str]
    class Config:
        orm_mode = True
class JwtTokenSchema(BaseModel):
    token: str
    payload: dict
    expire: datetime


class TokenPair(BaseModel):
    access: JwtTokenSchema
    refresh: JwtTokenSchema


class RefreshToken(BaseModel):
    refresh: str


class SuccessResponseScheme(BaseModel):
    msg: str


class BlackListToken(BaseModel):
    id: UUID4
    expire: datetime

    


class MailBodySchema(BaseModel):
    token: str
    type: str


class EmailSchema(BaseModel):
    recipients: list[EmailStr]
    subject: str
    body: MailBodySchema


class MailTaskSchema(BaseModel):
    user: User
    body: MailBodySchema


class ForgotPasswordSchema(BaseModel):
    email: EmailStr


class PasswordResetSchema(BaseModel):
    password: str
    confirm_password: str

    @validator("confirm_password")
    def verify_password_match(cls, v, values, **kwargs):
        password = values.get("password")

        if v != password:
            raise ValueError("The two passwords did not match.")

        return v


class PasswordUpdateSchema(PasswordResetSchema):
    old_password: str


class OldPasswordErrorSchema(BaseModel):
    old_password: bool

    @validator("old_password")
    def check_old_password_status(cls, v, values, **kwargs):
        if not v:
            raise ValueError("Old password is not corret")


class ArticleCreateSchema(BaseModel):
    title: str
    content: str


class ArticleListScheme(ArticleCreateSchema):
    id: UUID4
    author_id: UUID4

class ImageUploadSchema(BaseModel):
    filename: str
class ItemCreateSchema(BaseModel):
    name: str
    description: str   
    

class ImageUploadSchema(BaseModel):
    filename: str

class QueryRequest(BaseModel):
    query: str
    user_id:str
    chat_id:str 
    chat_history: List[str]
    output: str
    intermediate_steps: List[str]
    file_names: List[Dict[str, str]]
    file_new_upload:int
    table_extract:Optional[bool]
    language:Optional[str]
    relationship: Optional[List[str]] = []
    node: Optional[List[str]] = []
    relationship: Optional[List[str]] = []
    tokens_with_semantics: Optional[List[str]] = []
    categories: List=[]
    keyword_search:int
    class Config:
        schema_extra = {
            "example": {
                "query": "example query",
                "user_id": "example_user_id",
                "chat_id":"example_chat_id",
                "chat_history": [],
                "output": "example_output",
                "intermediate_steps": ['step1', 'step2'],
                "file_new_upload": 1,
                "table_extract":True,
                "language":"en",
                "node":[],
                "relationship":[],
                "tokens_with_semantics":[],
                "file_names": [
                    {
                        "filename": "",
                        "base_64_content": "base64_encoded_content_here"
                    }
                    
                ],
                "categories": [],
                "keyword_search":0,
            }
        }
class QueryRequest1(BaseModel):
    query: str
    chat_id: str
    class Config:
        schema_extra = {
            "example": {
                "query": "example query",
                "chat_id": "example chat id",
            }
        }
class GetChatId(BaseModel):
    chat_id: str
    class Config:
        schema_extra = {
            "example": {
                "chat_id": "example query",
            }
        }
class Add_subscription(BaseModel):
    subscription_id: int
    coupon_code: str
    is_accept: int
    class Config:
        schema_extra = {
            "example": {
                "subscription_id":0,
                "coupon_code":"",
                "is_accept":0
            }
        }
class Check_coupon(BaseModel):
    coupon_code: str
    subscription_id: int
    class Config:
        schema_extra = {
            "example": {
                "coupon_code":"",
                "subscription_id":0
            }
        }
class Update_subscription(BaseModel):
    is_subscription: int
    class Config:
        schema_extra = {
            "example": {
                "is_subscription":0,
            }
        }
class Update_card(BaseModel):
    is_accept: int
    class Config:
        schema_extra = {
            "example": {
                "is_accept":0,
            }
        }
class CustomerSubscriptionSchema(BaseModel):
    id: Optional[int] = None
    user_id: int
    subscription_id: int
    start_date: date
    end_date: date
    status: int
class MoveFile(BaseModel):
   file_id:UUID4
   category_name:str
   category_color:str
class ItemCreateSchema(BaseModel):
    name: str
    description: str   


    class Config:
        orm_mode = True
        exclude = {"otp", "phone"}
class UserUpdateSchema(BaseModel):
    full_name: Optional[str] = None
    email: Optional[EmailStr] = None
    photo: Optional[str] = None  # Base64 encoded string
    photo_name: Optional[str] = None
class UserProfileSchema(BaseModel):
    id: UUID4
    full_name: str
    email: str
    photo:str
    # photo_name: Optional[str] = None
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True 
# commit