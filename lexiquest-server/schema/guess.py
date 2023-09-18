from pydantic import BaseModel

class Guess(BaseModel):
    uid: int
    word: str