from fastapi import FastAPI
from fastapi.responses import ORJSONResponse

from src.controllers.routers import router
from src.controllers.auth import router as auth_router
# from src.controllers.googledrive import router as googledrive 
app = FastAPI(default_response_class=ORJSONResponse)

app.include_router(router)
app.include_router(auth_router, prefix="/auth", tags=["Authentication"])
# app.include_router(googledrive, prefix="/googledrive",tags=["googledrive"])
