from pydantic import BaseModel
from datetime import date

class LogBase(BaseModel):
    uid: int
    timestamp: date
    content: str