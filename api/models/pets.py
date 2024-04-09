from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import mapped_column
from models.base import Base
# from db_connect import engine
from pydantic import BaseModel


class Pets(Base):
    __tablename__ = 'pets'
    
    id = Column(Integer, primary_key=True)
    name = Column(String)
    age = Column(String)
    species = Column(String)
    color = Column(String)
    gender = Column(String)
    owner_id = Column(String)
   
    
    

    
    
class Pets(BaseModel):
    
    name: str
    age: str
    species: str
    color: str
    gender: str
    owner_id: str
 
   
    
class Config:
    populate_by_name = True
