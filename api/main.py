from fastapi import FastAPI, HTTPException, status, Query
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
# from db_connect import session, engine
# from config import settings
from models.users import User
# , UserSchema
# , UserAccountSchema, UserBaseSchema
from supabase import create_client, Client
from models.base import Base
from models.pets import Pets
import random



from db_supabase.supabaseClient import create_supabase_client, url, key
import bcrypt

supabase = create_supabase_client()

# def create_tables():
#     Base.metadata.create_all(bind=engine)

# def start_app():
#     app = FastAPI(title=settings.PROJECT_NAME, version=settings.PROJECT_VERSION)
#     create_tables()
#     return app

app = FastAPI()
supabase: Client = create_client(url, key)

origins = [
    "http://localhost",
    "http://localhost:5173",
    "http://localhost:8000",
    "http://127.0.0.1:8000",
    
]
# def user_exists(key: str = "email", value: str = None):
#     user = supabase.from_("users").select("*").eq(key, value).execute()
#     return len(user.data) > 0

app.add_middleware(
    CORSMiddleware,
    allow_origins = origins,
    allow_credentials = True,
    allow_methods = ["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return{"message": "root route"}

@app.get('/users')
def get_user():
    response = supabase.table('profile').select("*").execute()
    return response


  
@app.post('/users/add', status_code=status.HTTP_201_CREATED)
def create_user(email:str, password:str):
    
    res = supabase.auth.sign_up({
        # "id": id,
        "email": email,
        "password": password
    })
    
    return res

@app.post('/login')
def login_user(request: User):
    print(request)
    result = supabase.auth.sign_in_with_password({
        "email": request.email,
        "password": request.password
    })
    return result

@app.post('/profile')
def add_pet(insert: Pets):
    print(insert)
    result = supabase.table('pets').insert({
        "name": insert.name,
        "age": insert.age,
        "species": insert.species,
        "color": insert.color,
        # "owner": insert.owner_id,
        
    }).execute()
    return result

# @app.get('/logout')
# def sign_out(token):
    
#         result = supabase.auth.sign_out({
#             "token": token
       
        
#     })
#         return result
    
    





# @app.post('/users/add')
# def register_user(payload: UserAccountSchema):
#     payload.hashed_password = User.hash_password(payload.hashed_password)
#     return create_user(user=payload)

    
# @app.get('/pets')
# def get_pets():
#     name= session.query(Pets)
#     return name.all()

# @app.post('/users/add')
# def create_user(user: User):
    



# @app.post('/user')
# def create_new_user(user:User):
#     try:
#         user_email = user.email.lower()
#         hashed_password = bcrypt.hashpw(user.password.encode(), bcrypt.gensalt()).decode()
#         # user_id = user.id()
        
#         if user_exists(value = user_email):
#             return{"user exitsts already"}
        
#         user = supabase.from_("users")\
#             .insert({"name":user.name, "email": user_email, "password": hashed_password})\
#             .execute()
            
#         if user:
#             return{"sucessful add"}
#         else:
#             return{"error, not added"}
        
#     except Exception as e:
#         return{"user creation failed"}
    

                
        
            