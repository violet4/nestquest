import { useState, useEffect } from "react";
import { getProperties } from "../api";
import { Property } from "../types";
import PropertyItem from "./PropertyItem";
import PropertyForm from "./PropertyForm";

function PropertyList() {
  const [properties, setProperties] = useState<Property[]>([]);

  useEffect(() => {
    getProperties().then((res) => setProperties(res.data));
  }, []);

  const handleAddProperty = (newProperty: Property) => {
    setProperties([newProperty, ...properties]);
  };

  return (
    <div>
      <h2>Properties</h2>
      <PropertyForm onAdd={handleAddProperty} />
      <ul>
        {properties.map((property) => (
          <PropertyItem key={property.id} property={property} />
        ))}
      </ul>
    </div>
  );
}

export default PropertyList;