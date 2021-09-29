from model import User, Item, Invoice
from bson import ObjectId
import motor.motor_asyncio

client = motor.motor_asyncio.AsyncIOMotorClient('mongodb://localhost:27017')

database = client.Laundry
users = database.users
items = database.items
invoices = database.invoices

# User methods        
async def fetch_one_user(name):
    item = await users.find_one({"name":name})
    return item

async def fetch_all_users():
    usersList = []
    cursor = users.find({})
    async for user in cursor:
        usersList.append(User(**user))
    return usersList

async def create_user(user):            # should you really create a document?
    result = await users.insert_one(user)
    return user

async def update_user(name, price, desc):
    await users.update_one({"name": name}, {"$set": {
        "price": price,
        "desc": desc
    }})
    document = await users.find_one({"name": name})
    return document

async def remove_user(name):
    delete_result = await users.delete_one({"name": name})
    return delete_result

# Item methods
async def fetch_one_item(name):
    item = await items.find_one({"name":name})
    print(type(item['_id']))
    return item

async def fetch_all_items():
    itemsList = []
    cursor = items.find({})
    async for item in cursor:
        itemsList.append(Item(**item))
    return itemsList

async def create_item(item):            # should you really create a document?
    result = await items.insert_one(item)
    return item

async def update_item(name, price, desc):
    update_result = await items.update_one({"name": name},{"$set": {
        "price": price,
        "desc": desc
    }})

    if update_result.modified_count == 1:
        updated_item = await items.find_one({"name": name})
        return updated_item
    

async def remove_item(name):
    delete_result = await items.delete_one({"name": name})
    return delete_result


async def fetch_one_invoice(id):
    print(type(ObjectId(id)))
    invoice = await invoices.find_one({"_id": ObjectId(id)})
    print(invoice)
    return invoice

async def fetch_all_invoices():
    invoicesList = []
    cursor = invoices.find({})
    async for invoice in cursor:
        invoicesList.append(Invoice(**invoice))     # Invoice is defined in model.py
    return invoicesList

async def create_invoice(invoice):
    result = await invoices.insert_one(invoice)
    return invoice

async def update_invoice(id, items):
    update_result = await invoices.update_one({"id": id},{"$set": {
        "items": items
    }})
    if update_result.modified_count == 1:
        updated_invoice = await invoices.find_one({"id": id})
        return updated_invoice


    