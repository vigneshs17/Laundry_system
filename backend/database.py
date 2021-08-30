from model import User, Item, Invoice

import motor.motor_asyncio

client = motor.motor_asyncio.AsyncIOMotorClient('mongodb://localhost:27017')

database = client.Laundry
users = database.users
items = database.items
invoices = database.invoices