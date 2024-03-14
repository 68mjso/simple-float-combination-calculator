import NavigationBar from "@/components/NavigationBar";
import { SteamInventoryDescription } from "@/models/SteamInventoryDescription";
import { SteamInventoryResponse } from "@/models/SteamInventoryResponse";
import { CSFloat } from "@/services/CSFloat";
import { SteamAPI } from "@/services/SteamAPI";
import { BASE_INSPECT_LINK } from "@/utilities/api-path";
import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  HStack,
  Select,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import SteamSetting from "./SteamSetting";
import CustomTextarea from "@/components/CustomTextarea";

function SteamRetrievePage() {
  const steamAPI = new SteamAPI();
  const csFloat = new CSFloat();
  const [floatList, setFloatList] = React.useState("");
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
    <Flex w={960} minH={800} justifyContent="center" position="relative">
      <NavigationBar />
      <SteamSetting onClick={() => getItemFloat} />
      <Box w="full" p={8} shadow="lg" bg="brand.300">
        <VStack w="full">
          <VStack w="full">
            <Select
              value={selectedItem}
              onChange={(e) => setSelectedItem(e.target.value)}
              bg="white"
              borderColor="brand.100"
              borderWidth="2px"
              borderRadius={8}
            >
              {generateOptions()}
            </Select>
            <Grid
              templateColumns="repeat(12, 1fr)"
              gap={4}
              minH={400}
              bg="white"
              w="full"
              borderColor="brand.100"
              borderWidth="2px"
              borderRadius={8}
            >
              <GridItem colSpan={6}></GridItem>
            </Grid>
          </VStack>
          <CustomTextarea
            label="Float"
            value={floatList}
            onChange={setFloatList}
          />
        </VStack>
      </Box>
    </Flex>
  );
}

export default SteamRetrievePage;
