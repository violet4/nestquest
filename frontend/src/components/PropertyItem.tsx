import { Property } from "../types";

interface PropertyItemProps {
  property: Property;
  onEdit: () => void;
  onDelete: () => void;
  isEditing: boolean;
}

function PropertyItem({ property, onEdit, onDelete, isEditing }: PropertyItemProps) {
  return (
    <li>
      {property.name} ({property.address})
      <button onClick={onEdit} disabled={isEditing}>Edit</button>
      <button onClick={onDelete}>Delete</button>
    </li>
  );
}

export default PropertyItem;