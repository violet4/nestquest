from fastapi import FastAPI, HTTPException, Depends, APIRouter
from pydantic import BaseModel, Field
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from .models import Property, SessionMaker, AcCategory, HeaterType, InternetType, ForRentPurchase
from typing import List, Optional

app = FastAPI()

router = APIRouter()

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
    pass

class PropertyRead(PropertyBase):
    id: int

    class Config:
        from_attributes = True

class PropertyUpdate(PropertyBase):
    pass

# Dependency for database session
def get_db():
    db = SessionMaker()
    try:
        yield db
    finally:
        db.close()

@router.get("/properties/", response_model=List[PropertyRead])
def read_properties(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    properties = db.query(Property).offset(skip).limit(limit).all()
    return [PropertyRead.model_validate(p) for p in properties]

@router.get("/properties/{property_id}", response_model=PropertyRead)
def read_property(property_id: int, db: Session = Depends(get_db)):
    property = db.query(Property).filter(Property.id == property_id).first()
    if property is None:
        raise HTTPException(status_code=404, detail="Property not found")
    return PropertyRead.model_validate(property)

@router.post("/properties/", response_model=PropertyRead)
def create_property(property: PropertyCreate, db: Session = Depends(get_db)):
    db_property = Property(**property.model_dump())
    db.add(db_property)
    try:
        db.commit()
    except IntegrityError as e:
        raise HTTPException(404, str(e.orig))

    db.refresh(db_property)
    return PropertyRead.model_validate(db_property)

@router.put("/properties/{property_id}", response_model=PropertyRead)
def update_property(property_id: int, property: PropertyUpdate, db: Session = Depends(get_db)):
    db_property = db.query(Property).filter(Property.id == property_id).first()
    if db_property is None:
        raise HTTPException(status_code=404, detail="Property not found")
    for attr, value in property.model_dump().items():
        setattr(db_property, attr, value)
    db.commit()
    db.refresh(db_property)
    return PropertyRead.model_validate(db_property)

@router.delete("/properties/{property_id}")
def delete_property(property_id: int, db: Session = Depends(get_db)):
    db_property = db.query(Property).filter(Property.id == property_id).first()
    if db_property is None:
        raise HTTPException(status_code=404, detail="Property not found")
    db.delete(db_property)
    db.commit()
    return {"message": "Property deleted"}


app.include_router(router, prefix='/api')
