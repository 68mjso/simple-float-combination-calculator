import { GET_INVENTORY } from "@/utilities/api-path";
import { API } from "./api";
// import { getInventoryReponse } from "@utilities/mock";

export class SteamAPI {
  private api: API = new API();
  constructor() {}

  getInventory = (): any => {
    // if (process.env.NODE_ENV == "development") {
    //   return Promise.resolve(getInventoryReponse);
    // }
    // return Promise.resolve(getInventoryReponse);
    return this.api.get(GET_INVENTORY);
  };
}
