import uuid
from datetime import datetime
from sqlalchemy import select, ForeignKey, Text,LargeBinary,Column,Integer,String,DateTime,Float,Numeric,Date
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.ext.asyncio import AsyncSession
from src.database import Base
from src.core.hash import verify_password
from src.utils import utcnow
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.sql import func
from uuid import UUID
Base = declarative_base()
class User(Base):
    __tablename__ = "users"
    id: Mapped[uuid.UUID] = mapped_column(
        primary_key=True, index=True, default=uuid.uuid4
    )
    email: Mapped[str] = mapped_column(unique=True, index=True)
    full_name: Mapped[str]
    password: Mapped[str]
    role_id: Mapped[int]
    phone: Mapped[str]
    otp: Mapped[int]
    photo: Mapped[str]
    is_active: Mapped[bool] = mapped_column(default=False)
    created_at: Mapped[datetime] = mapped_column(server_default=func.now())
    updated_at: Mapped[datetime] = mapped_column(
        server_default=func.now(), server_onupdate=func.now()
    )
    google_drive_folder_id = mapped_column(String, nullable=True)
    is_google_drive = mapped_column(Integer, default=0)

    tokens = relationship("UserToken", back_populates="user")
    @classmethod
    async def authenticate(cls, db: AsyncSession, email: str, password: str):
        user = await cls.find_by_email(db=db, email=email)
        if not user or not verify_password(password, user.password):
            return False
        return user
    @classmethod
    async def find_by_email(cls, db: AsyncSession, email: str):
        query = select(cls).where(cls.email == email)
        result = await db.execute(query)
        return result.scalars().first()

    
    @classmethod
    async def find_user_by_id(cls, db: AsyncSession, user_id):
        if isinstance(user_id, str):
            try:
                user_id = UUID(user_id)
            except ValueError:
                return None
        print(user_id)
        query = select(cls).where(cls.id == user_id)
        result = await db.execute(query)
        print(result)
        return result.scalar_one_or_none()

    # articles: Mapped[list["Article"]] = relationship(back_populates="author")
class UserToken(Base):
    __tablename__ = "users_token"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    access_token = Column(String)
    refresh_token = Column(String)

    user = relationship("User", back_populates="tokens")
class BlackListToken(Base):
    __tablename__ = "blacklisttokens"
    id: Mapped[uuid.UUID] = mapped_column(
        primary_key=True, index=True, default=uuid.uuid4
    )
    expire: Mapped[datetime]
    created_at: Mapped[datetime] = mapped_column(server_default=utcnow())


class Article(Base):
    __tablename__ = "sessions"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(100))
    content = Column(Text)
    author_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("users.id", ondelete="CASCADE")
    )
    # author_id=user_id
    # Define a relationship with the User model assuming User is defined somewhere
    @classmethod
    async def create(cls, db: AsyncSession, title: str, content: str, user_id):
        article = cls(title=title, content=content)
        db.add(article)
        await db.commit()
        await db.refresh(article)
        return article

class UserFile(Base):
    __tablename__ = "user_files"

    id: Mapped[uuid.UUID] = mapped_column(
        primary_key=True, index=True, default=uuid.uuid4
    )
    user_id = Column(Integer, ForeignKey("users.id"))
    filename = Column(String)
    category_name = Column(String)
    category_color = Column(String)
    chat_id_new = Column(Integer) # user = relationship("User", back_populates="user_files") 
    created_at: Mapped[datetime] = mapped_column(server_default=utcnow())
class User_Chat(Base):
    __tablename__ = "chat_history"
    chat_id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    file_name = Column(String)
    user_query = Column(String)
    is_delete= Column(Integer)
    intermediate_step= Column(String)
    created_at: Mapped[datetime] = mapped_column(server_default=utcnow())
class User_response(Base):
    __tablename__ = "query_response"
    response_id = Column(Integer, primary_key=True, autoincrement=True)
    response = Column(String)
    is_like= Column(Integer)
    is_copy= Column(Integer)
    is_regenerate= Column(Integer)
    created_at: Mapped[datetime] = mapped_column(server_default=utcnow())
class Compare_file(Base):
    __tablename__ = "compare_files"

    id: Mapped[uuid.UUID] = mapped_column(
        primary_key=True, index=True, default=uuid.uuid4
    )
    user_id = Column(Integer, ForeignKey("users.id"))
    filename1 = Column(String)
    filename2 = Column(String)
    response = Column(String)
    status = Column(Integer)    # user = relationship("User", back_populates="user_files")
    date_created: Mapped[datetime] = mapped_column(server_default=utcnow())
class User_Chat_files(Base):
    __tablename__ = "chat_files"
    file_id = Column(Integer, primary_key=True, autoincrement=True)
    chat_id = Column(Integer, ForeignKey("chat_history.chat_id"))
    user_id = Column(Integer, ForeignKey("users.id"))
    file_name = Column(String)
    is_delete= Column(Integer)
    created_at: Mapped[datetime] = mapped_column(server_default=utcnow())
class SubscriptionPlan(Base):
    __tablename__ = "subscription"

    id= Column(Integer, primary_key=True, index=True, autoincrement=True)
    subscription_name = Column(String, nullable=False)
    subscription_type = Column(String, nullable=False)
    total_query_per_day = Column(Integer)
    amount = Column(Float)
    subscription_days = Column(Integer)
    is_sequence = Column(Integer)
class CustomerSubscription(Base):
    __tablename__ = "customer_subscription"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    subscription_id = Column(Integer, ForeignKey("subscription.id"), nullable=False)
    start_date = Column(DateTime, nullable=False, default=datetime.utcnow)  # Correctly set as a callable
    end_date = Column(DateTime, nullable=False, default=datetime.utcnow)  # Correctly set as a callable
    order_reference = Column(String, nullable=False)
    cardholder_name = Column(String, nullable=False)
    card_method = Column(String, nullable=False)
    card_type = Column(String, nullable=False)
    card_pan = Column(String, nullable=False)
    payment_token = Column(String, nullable=False)
    card_expiry = Column(String, nullable=False)
    is_subscription = Column(Integer, default=1)
    amount = Column(Float)
    status = Column(Integer, default=1)
class CustomerSubscription_history(Base):
    __tablename__ = "customer_subscription_history"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    subscription_id = Column(Integer, ForeignKey("subscription.id"), nullable=False)
    start_date = Column(DateTime, nullable=False, default=datetime.utcnow)  # Correctly set as a callable
    end_date = Column(DateTime, nullable=False, default=datetime.utcnow)  # Correctly set as a callable
    order_reference = Column(String, nullable=False)
    amount = Column(Float)
    status = Column(Integer, default=1)
    subscription = relationship("SubscriptionPlan_new", backref="subscription_histories")
class SubscriptionPlan_new(Base):
    __tablename__ = "subscription"
class Coupon(Base):
    __tablename__ = "coupons"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    coupons_code = Column(String, unique=True, nullable=False)  # e.g., 'NEWUSER50'
    coupons_type = Column(String, unique=True, nullable=False)
    coupons_value = Column(Numeric(10, 2), nullable=False)     # Discount amount
    start_date = Column(Date, nullable=False)
    end_date = Column(Date, nullable=False)
    is_user_specific = Column(Integer, default=1)
    is_subscription_specific = Column(Integer, default=0)
    subscription_id = Column(Integer, default=1)
    status = Column(Integer, default=1)
class CustomerHistory(Base):
    __tablename__ = "customer_history"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    total_query =Column(Integer, nullable=False)  # Correctly set as a callable
    created_date = Column(DateTime, nullable=False, default=datetime.utcnow)
class GoogleCredentials(Base):
    __tablename__ = "google_credentials"
    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    credentials_json = Column(String, nullable=False)
    @classmethod
    async def find_by_author(cls, db: AsyncSession, author: User):
        query = select(cls).where(cls.author_id == author.id)
        result = await db.execute(query)
        return result.scalars().all()

    
    
