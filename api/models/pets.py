from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import mapped_column
from models.base import Base
# from db_connect import engine
from pydantic import BaseModel




    
    
class Pets(BaseModel):
    
    name: str
    
    age: str
    species: str
    color: str
   
    
class Config:
    populate_by_name = True