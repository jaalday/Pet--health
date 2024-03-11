from fastapi import FastAPI, HTTPException, status
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from db_connect import session, engine
from config import settings
from models.users import User, UserSchema, UserAccountSchema
from models.base import Base
from models.pets import Pets
from services import create_user, get_user_data


def create_tables():
    Base.metadata.create_all(bind=engine)

def start_app():
    app = FastAPI(title=settings.PROJECT_NAME, version=settings.PROJECT_VERSION)
    create_tables()
    return app

app = start_app()

origins = [
    "http://localhost",
    "http://localhost:5173",
    "http://localhost:8000",
    "http://127.0.0.1:8000",
    
]

app.add_middleware(
    CORSMiddleware,
    allow_origins = origins,
    allow_credentials = True,
    allow_methods = ["*,"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return{"message": "root route"}

@app.get('/users')
def get_user():
    email = session.query(User)
    return email.all()

@app.post('/users/add', response_model=UserSchema)
def register_user(payload: UserAccountSchema):
    payload.hashed_password = User.hash_password(payload.hashed_password)
    return create_user(user=payload)
  
    
    
@app.get('/pets')
def get_pets():
    name= session.query(Pets)
    return name.all()
