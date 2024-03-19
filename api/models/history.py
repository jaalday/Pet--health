from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import mapped_column
from models.base import Base
# from db_connect import engine
from pydantic import BaseModel


class History(Base):
    __tablename__ = 'history'
    
    id = Column(Integer, primary_key=True)
    medication = Column(String)
    pet_name = Column(String)
    surgeries = Column(String)
    food = Column(String)
    # underlying_conditions = Column(String)
   
    vaccinations = Column(String)
    conditions = Column(String)
    
    
class History(BaseModel):
   
    medication: str
    pet_name: str
    surgeries: str
    food: str
    # underlying_conditions: str
    vaccinations: str
    conditions: str
    
    
class Config:
    populate_by_name = True