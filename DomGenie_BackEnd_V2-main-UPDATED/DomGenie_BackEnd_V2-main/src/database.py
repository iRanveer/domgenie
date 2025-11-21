from typing import Any

from fastapi import HTTPException, status
# from pydantic import PostgresDsn
from sqlalchemy import select
from sqlalchemy import create_engine
from sqlalchemy.ext.asyncio import (
    AsyncAttrs,
    async_sessionmaker,
    create_async_engine,
    AsyncSession,
)
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import sessionmaker
from sqlalchemy.orm import DeclarativeBase
# import aiomysql

from .core import config


# PG_URL = PostgresDsn.build(
#     scheme="postgresql+asyncpg",
#     user=config.POSTGRES_USER,
#     password=config.POSTGRES_PASSWORD,
#     host=config.POSTGRES_HOST,
#     port=config.POSTGRES_PORT,
#     path=f"/{config.POSTGRES_DB}",
# )

# engine = create_async_engine("mysql+asyncmy://user:pass@hostname/dbname?charset=utf8mb4")
MYSQL_URL = f"mysql+asyncmy://{config.MYSQL_USER}:{config.MYSQL_PASSWORD}@{config.MYSQL_HOST}:{config.MYSQL_PORT}/{config.MYSQL_DB}?charset=utf8mb4"
engine = create_async_engine(MYSQL_URL, future=True, echo=True)
print(f"MYSQL_URL ={MYSQL_URL}")
# SessionFactory = aiomysql.create_pool(
#     host=config.MYSQL_HOST,
#     port=config.MYSQL_PORT,  # default MySQL port
#     user=config.MYSQL_USER,
#     password=config.MYSQL_PASSWORD,
#     db=config.MYSQL_DB,
#     autocommit=True  # Set autocommit to True if desired
# )


SessionFactory = async_sessionmaker(engine, autoflush=False, expire_on_commit=False)
# engine = create_engine(
#     MYSQL_URL
# )
# SessionFactory = sessionmaker(autocommit=False, autoflush=False, bind=engine)

class Base(AsyncAttrs, DeclarativeBase):
    async def save(self, db: AsyncSession):
        """
        :param db:
        :return:
        """
        try:
            db.add(self)
            return await db.commit()
        except SQLAlchemyError as ex:
            raise HTTPException(
                status_code=status.HTTP_422_UNPROCESSABLE_ENTITY, detail=repr(ex)
            ) from ex

    @classmethod
    async def find_by_id(cls, db: AsyncSession, id: str):
        query = select(cls).where(cls.id == id)
        result = await db.execute(query)
        return result.scalars().first()
