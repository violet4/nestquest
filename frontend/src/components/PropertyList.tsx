import { useState, useEffect } from "react";
import { getProperties, deleteProperty } from "../api";
import { Property } from "../types";
import PropertyItem from "./PropertyItem";
import PropertyForm from "./PropertyForm";

function PropertyList() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [editingPropertyId, setEditingPropertyId] = useState<number | null>(null);

  useEffect(() => {
    getProperties().then(res => setProperties(res.data));
  }, []);

  const handleDeleteProperty = async (propertyId: number) => {
    try {
      await deleteProperty(propertyId);
      setProperties(properties.filter(p => p.id !== propertyId));
    } catch (error) {
      console.error("Error deleting property:", error);
      // Handle errors, show a user-friendly message
    }
  };

  const handleEditClick = (property: Property) => {
    setEditingPropertyId(property.id);
  };

  const handleCancelEdit = () => {
    setEditingPropertyId(null);
  };

  const editingProperty = properties.find(p => p.id === editingPropertyId) || null;

  return (
    <div>
      <h2>Properties</h2>
      <PropertyForm
        property={editingProperty}
        onCancel={handleCancelEdit}
      />
      <ul>
        {properties.map((property) => (
          <PropertyItem
            key={property.id}
            property={property}
            onEdit={() => handleEditClick(property)}
            onDelete={() => handleDeleteProperty(property.id)}
            disabled={editingPropertyId !== null && editingPropertyId !== property.id}
          />
        ))}
      </ul>
    </div>
  );
}

export default PropertyList;