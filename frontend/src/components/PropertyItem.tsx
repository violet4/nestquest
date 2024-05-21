import { Property } from "../types";

function PropertyItem({ property }: { property: Property }) {
  return (
    <li>
      {property.name} ({property.address})
      {/* Add edit/delete buttons here, triggering actions in parent component */}
    </li>
  );
}

export default PropertyItem;