from fastapi import FastAPI
import models
from database import engine, SessinLocal
from routes.word import word
from routes.user import user
from routes.validate import validate

app = FastAPI()
app.include_router(word)
app.include_router(user)
app.include_router(validate)
models.Base.metadata.create_all(bind = engine)