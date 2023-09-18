from fastapi import FastAPI, HTTPException,  Depends, status, APIRouter
from database import engine, SessinLocal
from typing import Annotated
import models
from schema.userbase import UserBase
from sqlalchemy.orm import Session

user = APIRouter()

def get_db():
    db= SessinLocal()
    try:
        yield db
    finally:
        db.close()

db_dependency = Annotated[Session, Depends(get_db)]

@user.post("/create-user", status_code=status.HTTP_201_CREATED)
async def create_user(user_name: str, db: db_dependency):
    # Létezik-e már a user
    existing_user= db.query(models.User).filter(models.User.name == user_name).first()
    if existing_user:
        return existing_user.id
    # ha még nem létezok akkor létrehozzuk
    user = UserBase(name=user_name)
    db_user = models.User(**user.dict())
    db.add(db_user)
    db.commit()
    return db_user.id