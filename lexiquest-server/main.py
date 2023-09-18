from fastapi import FastAPI
import models
from database import engine, SessinLocal
from routes.word import word

app = FastAPI()
app.include_router(word)
models.Base.metadata.create_all(bind = engine)