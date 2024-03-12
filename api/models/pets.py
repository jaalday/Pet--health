from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import mapped_column
from models.base import Base
# from db_connect import engine
from pydantic import BaseModel



class Pets(Base):
    __tablename__= "pets"
    
    id = Column(Integer, primary_key=True)
    name = Column(String)
    age = Column(String)
    species = Column(String)
    health_history = Column(String)
    
    
class PetsSchema(BaseModel):
    
    name: str
    
    age: str
    species: str
    health_history: str
    
class Config:
    populate_by_name = True