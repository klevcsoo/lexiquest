from fastapi import FastAPI, HTTPException,  Depends, status, APIRouter
from database import engine, SessinLocal
from typing import Annotated
import models
from schema.validatebase import ValidateBase
from schema.guess import Guess
from sqlalchemy.orm import Session
from datetime import date
from utilities.word_picker import get_daly_word_index
from utilities.guess_validator import get_validation_result

validate = APIRouter()

def get_db():
    db= SessinLocal()
    try:
        yield db
    finally:
        db.close()

db_dependency = Annotated[Session, Depends(get_db)]


@validate.post("/validate/", status_code=status.HTTP_201_CREATED)
async def validatetion(guess: Guess, db: db_dependency):
    # Létezik-e a felhasználó
    user = db.query(models.User).filter(models.User.id == guess.uid).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    # Validáció
    words = db.query(models.Word).all()
    validate = ValidateBase(
        uid = guess.uid,
        date = date.today(),
        guess = guess.word,
        result = get_validation_result(guess.word,  words[get_daly_word_index(len(words))].content))
    db_validate = models.Validate(**validate.dict())
    db.add(db_validate)
    db.commit()
    return validate.result

@validate.get("/get-user-today-attempts", status_code=status.HTTP_200_OK)
async def get_user_today_attempts(uid: int,db: Session = Depends(get_db)):
    # Létezik-e a felhasználó
    user = db.query(models.User).filter(models.User.id == uid).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    # A user mai probálkozásai 
    return db.query(models.Validate).filter(models.Validate.uid == uid, models.Validate.date == date.today()).all()