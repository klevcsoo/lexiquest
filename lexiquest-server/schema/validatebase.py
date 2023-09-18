from pydantic import BaseModel
from datetime import date

class ValidateBase(BaseModel):
    uid: int
    date: date
    guess: str
    result: str