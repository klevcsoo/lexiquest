from fastapi import FastAPI
import models
from database import engine, SessinLocal
from routes.word import word
from routes.user import user

app = FastAPI()
app.include_router(word)
app.include_router(user)
models.Base.metadata.create_all(bind = engine)