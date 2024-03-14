import { SteamInventoryDescription } from "@/models/SteamInventoryDescription";
import { SteamInventoryResponse } from "@/models/SteamInventoryResponse";
import { CSFloat } from "@/services/CSFloat";
import { SteamAPI } from "@/services/SteamAPI";
import { BASE_INSPECT_LINK } from "@/utilities/api-path";
import { Button, Grid, GridItem, HStack, Select } from "@chakra-ui/react";
import React from "react";

function SteamRetrievePage() {
  const steamAPI = new SteamAPI();
  const csFloat = new CSFloat();
  const [itemList, setItemList] = React.useState(null);
  const [selectedItem, setSelectedItem] = React.useState("");
  async function handleRetrieveInventory() {
    const response = await steamAPI.getInventory();
    const data: SteamInventoryResponse = {
      assets: response["assets"],
      descriptions: response["descriptions"],
      rwgrsn: response["rwgrsn"],
      success: response["success"],
      total_inventory_count: response["total_inventory_count"],
    };
    const descriptions = data.descriptions;
    const assets = data.assets;
    const items: Array<{ market_name: string; inspect_link: string }> = [];
    for (let i = 0; i < assets.length; i++) {
      const { assetid } = assets[i];
      const description = descriptions.find(
        (e: SteamInventoryDescription) =>
          e.instanceid === assets[i].instanceid &&
          e.classid === assets[i].classid
      );
      const { market_name, actions } = description;
      if (!actions) {
        continue;
      }
      const link = actions[0].link;
      const d = link.split("%D")[1];
      const inspectLink = BASE_INSPECT_LINK.concat(`A${assetid}D${d}`);
      items.push({ market_name: market_name, inspect_link: inspectLink });
    }

    const itemGroup = Object.groupBy(items, ({ market_name }) => market_name);
    setItemList(itemGroup);
    // const itemResponse: any = await csFloat.getCSItemUsingInspect(inspectLink);
  }
  function generateOptions() {
    if (!itemList) {
      return null;
    }
    return Object.keys(itemList).map((e) => <option value={e}>{e}</option>);
  }
  function getItemFloat() {
    if (!selectedItem || !itemList) {
      return;
    }
    const responseArr = [];
    const items = itemList[selectedItem];
    for (let i = 0; i < items.length; i++) {
      const inspectLink = items[i]["inspect_link"];
      const itemRequest = csFloat.getCSItemUsingInspect(inspectLink);
      responseArr.push(itemRequest);
    }
    Promise.all(responseArr).then((responses) => {});
  }
  React.useEffect(() => {
    handleRetrieveInventory();
  }, []);
  return (
    <HStack w="full">
      <Grid templateColumns="repeat(12, 1fr)" gap={4}>
        <GridItem colSpan={6}>
          <Select
            value={selectedItem}
            onChange={(e) => setSelectedItem(e.target.value)}
          >
            {generateOptions()}
          </Select>
        </GridItem>
        <GridItem colSpan={2}>
          <Button onClick={getItemFloat}>Get</Button>
        </GridItem>
      </Grid>
    </HStack>
  );
}

export default SteamRetrievePage;
