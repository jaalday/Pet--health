from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import mapped_column
from models.base import Base
# from db_connect import engine
from pydantic import BaseModel


class History(Base):
    __tablename__ = 'history'
    
    id = Column(Integer, primary_key=True)
    medications = Column(String)
    surgeries = Column(String)
    food = Column(String)
    vaccinations = Column(String)
    conditions = Column(String)
    pet_name = Column(String)
    owner_id = Column(String, ForeignKey('pets.owner_id'))
    pet_id = Column(String,  ForeignKey('pets.id'))
    
    
class History(BaseModel):
   
  
  
    medications: str
    surgeries: str
    food: str
    vaccinations: str
    conditions: str
    pet_name: str
    owner_id: str
    
    
class Config:
    populate_by_name = True