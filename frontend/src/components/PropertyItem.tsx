import { Property } from "../types";

interface PropertyItemProps {
  property: Property;
  onEdit: () => void;
  onDelete: () => void;
  disabled: boolean;
}

function PropertyItem({ property, onEdit, onDelete, disabled }: PropertyItemProps) {
  return (
    <li>
      {property.name} ({property.address})
      <button onClick={onEdit} disabled={disabled}>Edit</button>
      <button onClick={onDelete} disabled={disabled}>Delete</button>
    </li>
  );
}

export default PropertyItem;
