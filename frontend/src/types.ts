export enum ForRentPurchase {
  RENT = 'RENT',
  PURCHASE = 'PURCHASE'
}

export enum AC {
  CENTRAL = 'CENTRAL',
  UNIT = 'UNIT',
  NONE = 'NONE'
}

export enum Heater {
  BASEBOARD = 'BASEBOARD',
  CENTRAL = 'CENTRAL',
  WALL_UNIT = 'WALL_UNIT'
}

export enum Internet {
  CABLE = 'CABLE',
  SATELLITE = 'SATELLITE',
  FIBER = 'FIBER'
}

export interface Property {
  id: number;
  name: string;
  address: string;
  zip: string;
  state: string;
  city: string;
  county: string;
  for_rent_purchase: ForRentPurchase;
  bedrooms: number;
  bathrooms: number;
  studio: boolean;
  square_feet: number;
  cat_friendly: boolean;
  dog_friendly: boolean;
  washer_dryer: boolean;
  ac: AC;
  garage: number;
  parking: number;
  street_parking: boolean;
  dishwasher: boolean;
  microwave: boolean;
  refrigerator: boolean;
  heater: Heater;
  internet: Internet;
  rent: number;
  pet_fee: number;
  security_deposit: number;
  pet_deposit: number;
  move_in: number;
  manager: string;
  contact: string;
}
