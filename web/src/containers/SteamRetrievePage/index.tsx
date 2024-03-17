import AppContext from "@/AppContext";
import CustomTextarea from "@/components/CustomTextarea";
import NavigationBar from "@/components/NavigationBar";
import { SteamInventoryDescription } from "@/models/SteamInventoryDescription";
import { SteamInventoryResponse } from "@/models/SteamInventoryResponse";
import { CSFloat } from "@/services/CSFloat";
import { SteamAPI } from "@/services/SteamAPI";
import { BASE_INSPECT_LINK } from "@/utilities/api-path";
import { Box, Flex, Grid, GridItem, Select, VStack } from "@chakra-ui/react";
import React from "react";
import SteamSetting from "@/components/SteamSetting";

function SteamRetrievePage() {
  const csFloat = new CSFloat();
  const [floatList, setFloatList] = React.useState("");
  const [itemList, setItemList] = React.useState(null);
  const [selectedItem, setSelectedItem] = React.useState("");
  const appContext = React.useContext(AppContext);
  const { setActiveRoute } = appContext;
  function generateOptions() {
    if (!itemList) {
      return null;
    }
    return Object.keys(itemList).map((e) => <option value={e}>{e}</option>);
  }
  React.useEffect(() => {
    setActiveRoute(1);
  }, []);
  return (
    <Flex w={960} minH={800} justifyContent="center" position="relative">
      <NavigationBar />
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
