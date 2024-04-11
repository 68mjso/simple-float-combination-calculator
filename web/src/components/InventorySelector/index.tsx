import AppContext from "@/AppContext";
import { groupBy } from "@/utilities/func";
import { Box, Grid, GridItem, Select, VStack } from "@chakra-ui/react";
import React from "react";
import InventoryItem from "../InventoryItem";

function InventorySelector() {
  const appContext = React.useContext(AppContext);
  const { inventoryList, inventoryFilter, setInventoryFilter } = appContext;
  function generateOptions(list: Array<any>) {
    if (!list) {
      return null;
    }
    const group = groupBy(list, "item_name");
    return Object.keys(group)
      .sort((a, b) => (a < b ? -1 : a > b ? 1 : 0))
      .map((e: any, i: number) => (
        <option
          key={`item-${e}-${i}`}
          value={e}
        >{`${e} (${group[e].length})`}</option>
      ));
  }
  return (
    <VStack w="full" alignItems="flex-start" gap={4} p={1}>
      <Select
        bg="white"
        borderColor="brand.100"
        borderWidth={2}
        borderRadius={10}
        value={inventoryFilter}
        onChange={(e) => setInventoryFilter(e.target.value)}
        w="full"
        size="sm"
      >
        <option value="">All</option>
        {generateOptions(inventoryList)}
      </Select>
      <Box overflowY="scroll" h={180} className="inventory-box" py={4} w="full">
        <Grid templateColumns="repeat(3, 1fr)" w="full" gap={2}>
          {inventoryList
            ? inventoryList.map((e: any, i: number) => (
                <GridItem
                  key={`inventory-item-${i}`}
                  colSpan={{ base: 1, lg: 1 }}
                  overflow="hidden"
                  borderRadius={10}
                  borderWidth={2}
                  borderColor="brand.100"
                  bg="white"
                  shadow="lg"
                  cursor="pointer"
                >
                  <InventoryItem label={e.float_value} name={e.item_name} />
                </GridItem>
              ))
            : null}
        </Grid>
      </Box>
    </VStack>
  );
}

export default InventorySelector;
