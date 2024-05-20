import csv
import enum
from typing import List, Optional

from sqlalchemy import Boolean, Column, Enum, ForeignKey, Integer, String, Float, create_engine
from sqlalchemy.orm import declarative_base, relationship, sessionmaker, Session

Base = declarative_base()

class AcCategory(enum.Enum):
    CENTRAL = "CENTRAL"
    UNIT = "UNIT"
    NONE = "NONE"

class HeaterType(enum.Enum):
    BASEBOARD = "BASEBOARD"
    CENTRAL = "CENTRAL"
    WALL_UNIT = "WALL UNIT"

class InternetType(enum.Enum):
    CABLE = "CABLE"
    SATELLITE = "SATELLITE"
    FIBER = "FIBER"

class ForRentPurchase(enum.Enum):
    RENT = "RENT"
    PURCHASE = "PURCHASE"

class Property(Base):
    __tablename__ = "properties"

    id = Column(Integer, primary_key=True)
    name = Column(String, unique=True, nullable=False)
    address = Column(String)
    zip = Column(String)
    state = Column(String)
    city = Column(String)
    county = Column(String)
    unit = Column(String, nullable=True)
    for_rent_purchase = Column(Enum(ForRentPurchase))
    bedrooms = Column(Integer)
    bathrooms = Column(Float)  # Allow for half-baths
    studio = Column(Boolean)
    square_feet = Column(Integer)
    cat_friendly = Column(Boolean)
    dog_friendly = Column(Boolean)
    washer_dryer = Column(Boolean)
    ac = Column(Enum(AcCategory))
    garage = Column(Integer)
    parking = Column(Integer)
    street_parking = Column(Boolean)
    dishwasher = Column(Boolean)
    microwave = Column(Boolean)
    refrigerator = Column(Boolean)
    heater = Column(Enum(HeaterType))
    internet = Column(Enum(InternetType))
    rent = Column(Float)
    pet_fee = Column(Float)
    security_deposit = Column(Float)
    pet_deposit = Column(Float)
    move_in = Column(Float)
    manager = Column(String)
    contact = Column(String)  # Could be phone or email


engine = create_engine("sqlite:///properties.db", echo=True)  # Change database path as needed
Base.metadata.create_all(engine)

SessionMaker = sessionmaker(bind=engine)

def clean_key(key:str):
    return key.lower().replace(' ', '_').replace('-', '_').replace('/', '_')

def clean_enum(val:str):
    return val.strip().upper()

with SessionMaker() as session, open("tests/homes_a.csv", "r") as file:
    reader = csv.DictReader(file)
    for row in reader:
        # Enum conversion and type casting
        row['for_rent_purchase'] = ForRentPurchase(clean_enum(row.pop('For Rent/Purchase')))  # Strip extra whitespace
        row['ac'] = AcCategory(clean_enum(row.pop('AC')))
        row['heater'] = HeaterType(clean_enum(row.pop('Heater')))
        row['internet'] = InternetType(clean_enum(row.pop('Internet')))
        # ... convert other enum types similarly

        for key in ["Name", "Address", "ZIP", "State", "City", "County", "Manager", "Contact"]:
            row[clean_key(key)] = row.pop(key, None)
        # Handle Yes/No fields
        for key in ["Studio", "Cat Friendly", "Dog Friendly", "Washer/Dryer", "Street Parking", "Dishwasher", "Microwave", "Refrigerator"]:
            row[clean_key(key)] = row.pop(key).lower() == 'yes'
        # Handle optional/nullable fields
        for key in ["Unit"]:
            row[clean_key(key)] = row.pop(key, None) or None  # Replace empty strings with None
        # Handle numeric fields
        for key in ['Bedrooms', 'Bathrooms', 'Square Feet', 'Rent', 'Pet Fee', 'Pet Deposit', 'Security Deposit', 'Move-In', 'Garage', 'Parking']:
            value = row.pop(key).replace('$', '')
            row[clean_key(key)] = float(value) if value else 0

        for k in list(row.keys()):
            if k != k.lower():
                del row[k]

        property = Property(**row)  # Unpack the dictionary into the model
        session.add(property)

    session.commit()

# Fetch and print the first two records
with SessionMaker() as session:
    properties = session.query(Property).limit(2).all()
    for prop in properties:
        print(prop.name, prop.address)  # Print property name and address
