from pydantic import BaseModel, Field
from typing import Optional

from .models import AcCategory, HeaterType, InternetType, ForRentPurchase  # Import enums

class PropertyBase(BaseModel):
    name: str = Field(..., examples=["The Wonky Window Manor"])
    address: str = Field(..., examples=["123 Silly Street"])
    zip: str = Field(..., examples=["90210"])
    state: str = Field(..., examples=["CA"])
    city: str = Field(..., examples=["Los Angeles"])
    county: str = Field(..., examples=["Los Angeles County"])
    unit: Optional[str] = Field(None, examples=["2B"])
    for_rent_purchase: ForRentPurchase = Field(..., examples=["RENT"])
    bedrooms: int = Field(..., examples=[3])
    bathrooms: float = Field(..., examples=[2.5])
    studio: bool = Field(..., examples=[False])
    square_feet: int = Field(..., examples=[1800])
    cat_friendly: bool = Field(..., examples=[True])
    dog_friendly: bool = Field(..., examples=[False])
    washer_dryer: bool = Field(..., examples=[True])
    ac: AcCategory = Field(..., examples=["CENTRAL"])
    garage: int = Field(..., examples=[2])
    parking: int = Field(..., examples=[1])
    street_parking: bool = Field(..., examples=[True])
    dishwasher: bool = Field(..., examples=[True])
    microwave: bool = Field(..., examples=[True])
    refrigerator: bool = Field(..., examples=[True])
    heater: HeaterType = Field(..., examples=["BASEBOARD"])
    internet: InternetType = Field(..., examples=["FIBER"])
    rent: float = Field(..., examples=[1500.0])
    pet_fee: float = Field(..., examples=[50.0])
    security_deposit: float = Field(..., examples=[1500.0])
    pet_deposit: float = Field(..., examples=[200.0])
    move_in: float = Field(..., examples=[3250.0])
    manager: str = Field(..., examples=["Candy Cane Realty"])
    contact: str = Field(..., examples=["555-1212"])


class PropertyCreate(PropertyBase):
    pass  # Additional fields for creation if needed


class PropertyUpdate(PropertyBase):
    pass  # Fields that can be updated

class PropertyRead(PropertyBase):
    id: int