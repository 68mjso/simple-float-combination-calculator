import { SteamInventoryDescription } from "@/models/SteamInventoryDescription";
import { SteamInventoryResponse } from "@/models/SteamInventoryResponse";
import { SteamAPI } from "@/services/SteamAPI";
import { BASE_INSPECT_LINK } from "./api-path";
import { CSFloat } from "@/services/CSFloat";

const steamAPI = new SteamAPI();
const csFloat = new CSFloat();

// async function handleRetrieveInventory(callback?: () => void) {
//   console.log("call");
//   const response = await steamAPI.getInventory();
//   const data: SteamInventoryResponse = {
//     assets: response["assets"],
//     descriptions: response["descriptions"],
//     rwgrsn: response["rwgrsn"],
//     success: response["success"],
//     total_inventory_count: response["total_inventory_count"],
//   };
//   const inspect = [];
//   const descriptions = data.descriptions;
//   const assets = data.assets;
//   const items: Array<{ market_name: string; inspect_link: string }> = [];
//   for (let i = 0; i < assets.length; i++) {
//     const { assetid } = assets[i];
//     const description = descriptions.find(
//       (e: SteamInventoryDescription) =>
//         e.instanceid === assets[i].instanceid && e.classid === assets[i].classid
//     );
//     const { market_name, actions } = description;
//     if (!actions) {
//       continue;
//     }
//     const link = actions[0].link;
//     const d = link.split("%D")[1];
//     const inspectLink = BASE_INSPECT_LINK.concat(`A${assetid}D${d}`);
//     items.push({ market_name: market_name, inspect_link: inspectLink });
//     // const itemResponse = csFloat.getCSItemUsingInspect(inspectLink);
//     // inspect.push(itemResponse);
//   }
//   const itemResponse = await csFloat.getCSItemUsingInspect(
//     items[0].inspect_link
//   );
//   // Promise.all(inspect).then((res) => {
//   //   console.log(res);
//   // });
//   // console.log(itemResponse);
//   // const itemGroup = Object.groupBy(items, ({ market_name }) => market_name);
//   callback();
// }

async function retrieveCsFloatInventory() {
  const response = await csFloat.getInventory();
  return response;
}

function groupBy(xs: any, key: string) {
  return xs.reduce(function (rv: any, x: any) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
}

export { groupBy, retrieveCsFloatInventory };
