from pydantic import BaseModel, Field, EmailStr, BaseConfig
from datetime import datetime
from bson import ObjectId
from typing import List

BaseConfig.arbitrary_types_allowed = True

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
class User(BaseModel):
    name: str = Field(...)
    contact_number: str = Field(...)
    email: EmailStr = Field(...)
    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
class Item(BaseModel):
    # id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    name: str = Field(...)
    price: float = Field(..., gt=0.0)
    desc: str = Field(...)

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}