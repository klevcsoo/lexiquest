from fastapi import Depends, status, APIRouter, HTTPException
from database import engine, SessinLocal
from typing import Annotated
import models
from schema.wordbase import WordBase
from sqlalchemy.orm import Session
from utilities.dictionary_reader import read_dictionary_file
from utilities.word_picker import get_daly_word_index
from datetime import date

word = APIRouter()

def get_db():
    db= SessinLocal()
    try:
        yield db
    finally:
        db.close()

db_dependency = Annotated[Session, Depends(get_db)]

@word.post("/word/load", status_code=status.HTTP_201_CREATED)
async def load_words(db: db_dependency):
    szotar = read_dictionary_file("szotar.dic")
    for word in szotar:
        db_word = models.Word(**word.dict())
        db.add(db_word)
        db.commit()
        print(f"The '{word}' word is saved")


@word.get("/get-daily-word", status_code=status.HTTP_200_OK)
async def get_daily_word(uid: int,db: Session = Depends(get_db)):
    # Létezik-e a felhasználó
    user = db.query(models.User).filter(models.User.id == uid).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    # A user mai probálkozásai 
    user_today_validates = db.query(models.Validate).filter(
        models.Validate.uid == uid, models.Validate.date == date.today())
    has_used_all_attemps = len(user_today_validates.all()) >= 6
    has_correct_guess = len(user_today_validates.filter(models.Validate.result == "1;1;1;1;1").all()) != 0
    if not has_used_all_attemps and not has_correct_guess:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="User must solve or attempt the puzzle six "
                                                                          "times to access the daily word.")
    words = db.query(models.Word).all()
    return words[get_daly_word_index(len(words))].content
