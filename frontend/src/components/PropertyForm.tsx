import React, { useState } from "react";
import { AC, ForRentPurchase, Heater, Internet, Property } from "../types";
import { addProperty } from "../api"; // Assuming you have an api function for POST

function PropertyForm({ onAdd }: { onAdd: (property: Property) => void }) {
  const [newProperty, setNewProperty] = useState<Property>({
    id: 0, // Placeholder ID, will be replaced by the server
    name: "",
    address: "",
    zip: "",
    state: "",
    city: "",
    county: "",
    for_rent_purchase: ForRentPurchase.RENT,
    bedrooms: 0,
    bathrooms: 0,
    studio: true,
    square_feet: 0,
    cat_friendly: true,
    dog_friendly: true,
    washer_dryer: true,
    ac: AC.CENTRAL,
    garage: 0,
    parking: 0,
    street_parking: true,
    dishwasher: true,
    microwave: true,
    refrigerator: true,
    heater: Heater.CENTRAL,
    internet: Internet.FIBER,
    rent: 0,
    pet_fee: 0,
    security_deposit: 0,
    pet_deposit: 0,
    move_in: 0,
    manager: "",
    contact: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const target = e.target as HTMLInputElement;
    const {name, type, checked, value} = target;
    const newValue = type === 'checkbox' ? checked : value;
    setNewProperty({ ...newProperty, [name]: newValue });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const addedProperty = await addProperty(newProperty);
      onAdd(addedProperty.data);
      setNewProperty({
        id: 0, // Placeholder ID, will be replaced by the server
        name: "",
        address: "",
        zip: "",
        state: "",
        city: "",
        county: "",
        for_rent_purchase: ForRentPurchase.RENT,
        bedrooms: 0,
        bathrooms: 0,
        studio: true,
        square_feet: 0,
        cat_friendly: true,
        dog_friendly: true,
        washer_dryer: true,
        ac: AC.CENTRAL,
        garage: 0,
        parking: 0,
        street_parking: true,
        dishwasher: true,
        microwave: true,
        refrigerator: true,
        heater: Heater.CENTRAL,
        internet: Internet.FIBER,
        rent: 0,
        pet_fee: 0,
        security_deposit: 0,
        pet_deposit: 0,
        move_in: 0,
        manager: "",
        contact: "",
      });
    } catch (error) {
      // Handle errors (display an error message, etc.)
      console.error("Error adding property:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <ul>
        <li>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={newProperty.name}
            onChange={handleChange}
          />
        </li>
        <li>
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={newProperty.address}
            onChange={handleChange}
          />
        </li>
        <li>
          <input
            type="text"
            name="city"
            placeholder="City"
            value={newProperty.city}
            onChange={handleChange}
          />
        </li>
        <li>
          <input
            type="text"
            name="state"
            placeholder="State"
            value={newProperty.state}
            onChange={handleChange}
          />
        </li>
        <li>
          <input
            type="text"
            name="zip"
            placeholder="Zip"
            value={newProperty.zip}
            onChange={handleChange}
          />
        </li>
        <li>
          <input
            type="text"
            name="county"
            placeholder="County"
            value={newProperty.county}
            onChange={handleChange}
          />
        </li>
        <li>
          <input
            type="text"
            name="manager"
            placeholder="Manager"
            value={newProperty.manager}
            onChange={handleChange}
          />
        </li>
        <li>
          <input
            type="text"
            name="contact"
            placeholder="Contact"
            value={newProperty.contact}
            onChange={handleChange}
          />
        </li>
        <li>
          <input
            type="number"
            name="bedrooms"
            placeholder="Bedrooms"
            value={newProperty.bedrooms}
            onChange={handleChange}
          /> Bedrooms
        </li>
        <li>
          <input
            type="number"
            name="bathrooms"
            placeholder="Bathrooms"
            value={newProperty.bathrooms}
            onChange={handleChange}
          /> Bathrooms
        </li>
        <li>
          <input
            type="number"
            name="square_feet"
            placeholder="Square Feet"
            value={newProperty.square_feet}
            onChange={handleChange}
          /> Square Feet
        </li>
        <li>
          <input
            type="number"
            name="garage"
            placeholder="Garage"
            value={newProperty.garage}
            onChange={handleChange}
          /> Garage
        </li>
        <li>
          <input
            type="number"
            name="parking"
            placeholder="Parking"
            value={newProperty.parking}
            onChange={handleChange}
          /> Parking
        </li>
        <li>
          <input
            type="number"
            name="rent"
            placeholder="Rent"
            value={newProperty.rent}
            onChange={handleChange}
          /> Rent
        </li>
        <li>
          <input
            type="number"
            name="pet_fee"
            placeholder="Pet Fee"
            value={newProperty.pet_fee}
            onChange={handleChange}
          /> Pet Fee
        </li>
        <li>
          <input
            type="number"
            name="security_deposit"
            placeholder="Security Deposit"
            value={newProperty.security_deposit}
            onChange={handleChange}
          /> Security Deposit
        </li>
        <li>
          <input
            type="number"
            name="pet_deposit"
            placeholder="Pet Deposit"
            value={newProperty.pet_deposit}
            onChange={handleChange}
          /> Pet Deposit
        </li>
        <li>
          <input
            type="number"
            name="move_in"
            placeholder="Move-In Total"
            value={newProperty.move_in}
            onChange={handleChange}
          /> Move-In Total
        </li>
        <li>
          <label htmlFor="studio">
            <input
              type="checkbox"
              id="studio"
              name="studio"
              placeholder="Studio"
              checked={newProperty.studio}
              onChange={handleChange}
            /> Studio
          </label>
        </li>
        <li>
          <label htmlFor="cat_friendly">
            <input
              type="checkbox"
              id="cat_friendly"
              name="cat_friendly"
              placeholder="Cat-Friendly"
              checked={newProperty.cat_friendly}
              onChange={handleChange}
            /> Cat-Friendly
          </label>
        </li>
        <li>
          <label htmlFor="dog_friendly">
            <input
              type="checkbox"
              id="dog_friendly"
              name="dog_friendly"
              placeholder="Dog-Friendly"
              checked={newProperty.dog_friendly}
              onChange={handleChange}
            /> Dog-Friendly
          </label>
        </li>
        <li>
          <label htmlFor="washer_dryer">
            <input
              type="checkbox"
              id="washer_dryer"
              name="washer_dryer"
              placeholder="Washer/Dryer"
              checked={newProperty.washer_dryer}
              onChange={handleChange}
            /> Washer/Dryer
          </label>
        </li>
        <li>
          <label htmlFor="street_parking">
            <input
              type="checkbox"
              id="street_parking"
              name="street_parking"
              placeholder="Street Parking"
              checked={newProperty.street_parking}
              onChange={handleChange}
            /> Street Parking
          </label>
        </li>
        <li>
          <label htmlFor="dishwasher">
            <input
              type="checkbox"
              id="dishwasher"
              name="dishwasher"
              placeholder="Dishwasher"
              checked={newProperty.dishwasher}
              onChange={handleChange}
            /> Dishwasher
          </label>
        </li>
        <li>
          <label htmlFor="microwave">
            <input
              type="checkbox"
              id="microwave"
              name="microwave"
              placeholder="Microwave"
              checked={newProperty.microwave}
              onChange={handleChange}
            /> Microwave
          </label>
        </li>
        <li>
          <label htmlFor="refrigerator">
            <input
              type="checkbox"
              id="refrigerator"
              name="refrigerator"
              placeholder="Refrigerator"
              checked={newProperty.refrigerator}
              onChange={handleChange}
            /> Refrigerator
          </label>
        </li>
      </ul>
{/* for_rent_purchase ac heater internet   */}
      <button type="submit">Add Property</button>
    </form>
  );
}

export default PropertyForm;
