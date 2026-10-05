import { Clock3 } from "lucide-react";
import { store } from "../data/store";
export function StoreHours() {
  return (
    <div className="store-hours">
      <Clock3 size={19} aria-hidden="true" />
      <div>
        <strong>{store.hours.label}</strong>
        <p>{store.hours.message}</p>
        <a href={store.telephone}>Call to confirm hours</a>
      </div>
    </div>
  );
}
