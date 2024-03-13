from sqlalchemy import Column, Integer, String, UniqueConstraint, ForeignKey
from pydantic import BaseModel, Field

from sqlalchemy.orm import mapped_column

# from config import settings
from models.base import Base
import bcrypt

class User(BaseModel):
    
    
   
    email: str
    password:str
    

    


   
    
#     UniqueConstraint("email", name="uq_user_email")
    
#     def __repr__(self):
#         return f"<User {self.email!r}>"
    
#     @staticmethod
#     def hash_password(password) -> str:
#         return bcrypt.hashpw(password.encode(), bcrypt.gensalt()).decode()
#     def validate_password(self, pwd):
#         return bcrypt.checkpw(password=pwd.encode(), hashed_password=self.hashed_password.encode())
    
    
# class UserBaseSchema(BaseModel):
#     email: str
   
   
    
# class UserSchema(UserBaseSchema):
#     id: int
    
#     class Config:
#         populate_by_name = True
        
        
# class UserAccountSchema(UserBaseSchema):
#     hashed_password: str = Field(alias = "password")