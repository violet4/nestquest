import React, { useState, useEffect } from "react";
import { getProperties, addProperty, updateProperty, deleteProperty } from "../api";
import { Property } from "../types";
import PropertyItem from "./PropertyItem";
import PropertyForm from "./PropertyForm";

function PropertyList() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [editingPropertyId, setEditingPropertyId] = useState<number | null>(null);

  useEffect(() => {
    getProperties().then((res) => setProperties(res.data));
  }, []);

  const handleAddProperty = (newProperty: Property) => {
    setProperties([newProperty, ...properties]);
    setEditingPropertyId(null); // Clear editing state
  };

  const handleEditProperty = (propertyId: number) => {
    setEditingPropertyId(propertyId);
  };

  const handleCancelEdit = () => {
    setEditingPropertyId(null); // Clear editing state
  };

  const handleDeleteProperty = async (propertyId: number) => {
    if (window.confirm("Are you sure you want to delete this property?")) {
      try {
        await deleteProperty(propertyId);
        setProperties(properties.filter((p) => p.id !== propertyId));
      } catch (error) {
        console.error("Error deleting property:", error);
      }
    }
  };

  const handleSaveProperty = async (updatedProperty: Property) => {
    try {
      if (editingPropertyId) {
        await updateProperty(editingPropertyId, updatedProperty);
        setProperties(
          properties.map((p) =>
            p.id === editingPropertyId ? updatedProperty : p
          )
        );
      } else {
        await addProperty(updatedProperty);
        setProperties([updatedProperty, ...properties]);
      }
      setEditingPropertyId(null);
    } catch (error) {
      console.error("Error saving property:", error);
    }
  };

  const propertyToEdit = properties.find((p) => p.id === editingPropertyId);

  return (
    <div>
      <h2>Properties</h2>
      <PropertyForm
        propertyToEdit={propertyToEdit}
        onCancel={handleCancelEdit}
        onSave={handleSaveProperty}
      />
      <ul>
        {properties.map((property) => (
          <PropertyItem
            key={property.id}
            property={property}
            onEdit={() => handleEditProperty(property.id)}
            onDelete={() => handleDeleteProperty(property.id)}
            isEditing={property.id === editingPropertyId}
          />
        ))}
      </ul>
    </div>
  );
}

export default PropertyList;