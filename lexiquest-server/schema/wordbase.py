from pydantic import BaseModel

class WordBase(BaseModel):
    content: str
    length: int