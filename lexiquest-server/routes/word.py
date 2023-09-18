from fastapi import Depends, status, APIRouter
from database import engine, SessinLocal
from typing import Annotated
import models
from schema.wordbase import WordBase
from sqlalchemy.orm import Session
from utilities.dictionary_reader import read_dictionary_file
from utilities.word_picker import get_daly_word_index

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
async def get_daily_word(db: Session = Depends(get_db)):
    words = db.query(models.Word).all()
    return words[get_daly_word_index(len(words))].content