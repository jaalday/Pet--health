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
from models.history import History



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
    print(response)
    return response

@app.get('/pets{id}')
def get_pets():
    response = supabase.table('pets').select("*").execute()
    print(response)
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
     
         "owner_id": insert.owner_id,
        
    }).execute()
    return result

@app.post('/profile{owner_id}')
def add_history(insert: History):
    print(insert)
    result = supabase.table('history').insert({
        "pet_name": insert.pet_name,
        "owner_id_history": insert.owner_id_history,
        "id": id,
        "medications": insert.medications,
        "surgeries": insert.surgeries,
        "food": insert.food,
        "conditions": insert.conditions,
        "vaccinations": insert.vaccinations,
        
        
        
        
    }).execute()
    return result


@app.get('/petprofile1')
def get_profile_data():
    response = supabase.table('pets').select("*").execute()
    return response

@app.get('/logout')
def sign_out():
    
    result = supabase.auth.sign_out()
              
    return result  

@app.get('/history')
def get_history():
    response = supabase.table('history').select("medication","pet_name", "surgeries", "food", "vaccinations", "conditions").execute()
    return response

@app.put('/history/put')
def update_history( id:str, update: History):
    print(update)
    result = supabase.table('history').update({
    
       "medication": update.medication, 
       "surgeries": update.surgeries,
       "food": update.food,
       "conditions": update.conditions,
       "vaccinations": update.vaccinations,
       "pet_name": update.pet_name,
       
    }).eq('id', id).execute()
    return result
       
    


  
#         return result
# @ app.get("/logout")
# def logout(request: User):
#    response = supabase.auth.sign_out
#    response.delete_cookie("Authorization", domain="localtest.me")
#    return response
    
    






    



    

                
        
            