from pydantic import BaseModel, Field, EmailStr
from datetime import datetime
from bson import ObjectId
from typing import List
class PyObjectId(ObjectId):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, v):
        if not ObjectId.is_valid(v):
            raise ValueError("Invalid objectid")
        return ObjectId(v)

    @classmethod
    def __modify_schema__(cls, field_schema):
        field_schema.update(type="string")

class User:
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    name: str = Field(...)
    contact_number: str = Field(...)
    email: EmailStr = Field(...)
    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
class Item:
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    name: str = Field(...)
    price: float = Field(..., gt=0.0)
    desc: str = Field(...)

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
class Invoice(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    date: datetime.datetime = Field(...)
    customer_id: User = Field(...)
    items_list: List[Item] = Field(...)
    total: int = Field(..., gt=0)

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}