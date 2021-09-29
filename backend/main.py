from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from database import *

app = FastAPI()


# oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

origins = ['http://localhost:3000']

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"Hello":"World"}



# def fake_decode_token(token):
#     return User(
#         username=token + "fakedecoded", email="john@example.com", name="John Doe"
#     )

# def fake_hashed_password(password: str):
#     return "fakehashed" + password
# User methods

# def get_user(db, username: str):
#     if username in db:
#         user_dict = db[username]
#         return UserInDB(**user_dict)

# def fake_decode_token(token):
#     user = get_user(users, token)
#     return user

# async def get_current_user(token: str = Depends(oauth2_scheme)):
#     user = fake_decode_token(token)
#     if not user:
#         raise HTTPException(
#             status_code=status.HTTP_401_UNAUTHORIZED,
#             detail="Invalid authentication credentials",
#             headers={"WWW-Authenticate": "Bearer"},
#         )
#     return user

# async def get_current_active_user(current_user: User = Depends(get_current_user)):
#     if current_user.disabled:
#         raise HTTPException(status_code=400, detail="Inactive user")
#     return current_user

# @app.get("/users/me")
# async def read_users_me(current_user: User = Depends(get_current_user)):
#     return current_user

# @app.post("/token")
# async def login(form_data: OAuth2PasswordRequestForm = Depends()):
#     user_dict = await get_user_dict(form_data)
#     if not user_dict:
#         raise HTTPException(status_code=400, detail="Incorrect username or password")
#     print(dir(user_dict.values))
#     user = get_user_from_UserInDB(user_dict)
#     print(type(user))
#     print(user.hashed_password)
#     hashed_password = fake_hashed_password(form_data.password)
#     if not hashed_password == user.hashed_password:
#         raise HTTPException(status_code=400, detail="Incorrect username or password")
#     return {"access_token": user.username, "token_type": "bearer"}

@app.get("/users")
async def get_users():
    response = await fetch_all_users()
    return response

@app.get("/users/{name}", response_model=Item)
async def get_user_by_name(name: str):
    response = await fetch_one_user(name)
    if response:
        return response
    raise HTTPException(404, "User not found")

@app.post("/users/", response_model=Item)
async def post_user(user:User):
    response = await create_user(user.dict())
    if response:
        return response
    raise HTTPException(400, "Something went wrong")

# @app.put("api/users/{name}/", response_model=User)
# async def put_user(name: str, price: float, desc: str):
#     update_result = await update_item(name, price, desc)
#     if update_result.modified_count == 1:
#         updated_item = await items.find_one({"name": name})
#         return update_item
#     raise HTTPException(404, "Item not found")

@app.delete("/users/{name}")
async def delete_user(name):
    response = await remove_user(name)
    if response.deleted_count == 1:
        return "Successfully deleted item"
    raise HTTPException(404, "Item not found")


# Item methods

@app.get("/items")
async def get_items():
    response = await fetch_all_items()
    return response

@app.get("/items/{name}", response_model=Item)
async def get_item_by_name(name: str):
    response = await fetch_one_item(name)
    if response:
        return response
    raise HTTPException(404, "Item not found")

@app.post("/items/", response_model=Item)
async def post_item(item:Item):
    response = await create_item(item.dict())
    if response:
        return response
    raise HTTPException(400, "Something went wrong")

@app.put("/items/{name}", response_model=Item)
async def put_item(item:Item):
    response = await update_item(item.name, item.price, item.desc)
    if response:
        return response
    raise HTTPException(404, "Item not found")

@app.delete("/items/{name}")
async def delete_item(name):
    response = await remove_item(name)
    if response.deleted_count==1:
        return "Successfully deleted item"
    raise HTTPException(404, "Item not found")


# Invoice methods

@app.get("/invoices")
async def get_invoices():
    response = await fetch_all_invoices()
    print(response)
    return response

@app.get("/invoices/{id}", response_model=Invoice)
async def get_invoice_by_id(id: str):
    response = await fetch_one_invoice(id)
    print(response)
    if response:
        return response
    raise HTTPException(404, "Invoice not found")

@app.post("/invoices/", response_model=Invoice)
async def post_invoice(invoice:Invoice):
    response = await create_invoice(invoice.dict())
    if response:
        return response
    raise HTTPException(400, "Something went wrong")

# @app.put("/invoices/{id}", response_model=Invoice)
# async def put_item(invoice:Invoice):
#     response = await update_invoice(item.name, item.price, item.desc)
#     if response:
#         return response
#     raise HTTPException(404, "Item not found")