from sqlalchemy import Boolean, Column, Integer, String, DateTime, ForeignKey
from database import Base

class Word(Base):
    __tablename__= "word"
    id = Column(Integer, primary_key=True, index=True)
    content = Column(String(10))
    length = Column(Integer)

class User(Base):
    __tablename__= "user"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(50), unique=True)

class Validate(Base):
    __tablename__= "validate"
    id = Column(Integer, primary_key=True, index=True)
    uid = Column(Integer, ForeignKey('user.id'))
    date = Column(DateTime)
    guess = Column(String(50))
    result = Column(String(50))

class Log(Base):
    __tablename__= "log"
    id = Column(Integer, primary_key=True, index=True)
    uid = Column(Integer, ForeignKey('user.id'))
    timestamp = Column(DateTime)
    content = Column(String(255))