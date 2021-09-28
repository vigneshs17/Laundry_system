from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from database import *
app = FastAPI()

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


# User methods

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

# @app.get("/api/invoices")
# async def get_invoices():
#     return 1

# @app.get("/api/invoices{id}")
# async def get_invoice_by_id(id):
#     return 1

# @app.post("/api/invoice")
# async def post_invoice(invoice):
#     return 1

# @app.put("/api/invoice{id}")
# async def put_invoice(id, data):
#     return 1