from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import models
from database import engine, SessinLocal
from routes.word import word
from routes.user import user
from routes.validate import validate

app = FastAPI()
app.include_router(word)
app.include_router(user)
app.include_router(validate)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],

)
models.Base.metadata.create_all(bind = engine)