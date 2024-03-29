import { API } from "./api";
import {
  INSPECT_ITEM_BULK,
  INSPECT_ITEM,
  INSPECT_ITEM_WITH_URL,
  BASE_CSFLOAT_INVENTORY,
} from "@/utilities/api-path";

export class CSFloat {
  private api: API = new API();
  constructor() {}

  getInventory = () => {
    return this.api.get("./inventory.json");
    // return this.api.get(BASE_CSFLOAT_INVENTORY);
  };

  getItemBulk = (links: Array<any>) => {
    return this.api.post(INSPECT_ITEM_BULK, { links: links });
  };

  getCSItem = (a: string, d: string) => {
    return this.api.get(`${INSPECT_ITEM}a=${a}&d=${d}`);
  };

  getCSItemUsingInspect = (url: string) => {
    return this.api.get(`${INSPECT_ITEM_WITH_URL}${url}`);
  };
}
