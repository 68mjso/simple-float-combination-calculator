import { SteamInventoryAsset } from "./SteamInventoryAsset";
import { SteamInventoryDescription } from "./SteamInventoryDescription";

export interface SteamInventoryResponse {
  assets: Array<SteamInventoryAsset>;
  descriptions: Array<SteamInventoryDescription>;
  rwgrsn: number;
  success: number;
  total_inventory_count: number;
}
