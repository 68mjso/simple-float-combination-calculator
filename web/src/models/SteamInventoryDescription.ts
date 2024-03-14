export interface SteamInventoryDescription {
  actions: Array<{ link: string; name: string }>;
  appid: number;
  background_color: string;
  classid: string;
  commodity: number;
  currency: number;
  descriptions: Array<{ type: string; value: string }>;
  icon_url: string;
  instanceid: string;
  market_actions: Array<{ link: string; name: string }>;
  market_hash_name: string;
  market_name: string;
  market_tradable_restriction: number;
  marketable: number;
  name: string;
  name_color: string;
  tags: Array<{
    category: string;
    internal_name: string;
    localized_category_name: string;
    localized_tag_name: string;
  }>;
  tradable: number;
  type: string;
}
