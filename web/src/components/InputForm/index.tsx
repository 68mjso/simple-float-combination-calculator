import {
  Button,
  Grid,
  GridItem,
  HStack,
  Select,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import CustomTextarea from "../CustomTextarea";
import { Spinner } from "@chakra-ui/react";
import AppContext from "@/AppContext";
import InventorySelector from "../InventorySelector";
import { groupBy } from "@/utilities/func";
function InputForm({
  handleSubmit,
  isLoading,
}: {
  handleSubmit: (core: string, input: string) => void;
  isLoading: boolean;
}) {
  const [core, setCore] = React.useState("");
  const [input, setInput] = React.useState("");
  const appContext = React.useContext(AppContext);
  const { activeRoute, inventoryFilter, setInventoryFilter, inventoryList } =
    appContext;
  const getActiveComponent = () => {
    switch (activeRoute) {
      case 0:
        return <CustomTextarea label="Core" value={core} onChange={setCore} />;
      case 1:
        return <InventorySelector />;
      default:
        return <CustomTextarea label="Core" value={core} onChange={setCore} />;
    }
  };
  function generateOptions(list: Array<any>) {
    if (!list) {
      return null;
    }
    const group = groupBy(list, "item_name");
    return Object.keys(group)
      .sort((a, b) => (group[a].length > group[b].length ? -1 : a < b ? 1 : 0))
      .map((e: any, i: number) => (
        <option
          key={`item-${e}-${i}`}
          value={e}
        >{`${e} (${group[e].length})`}</option>
      ));
  }
  const copyText = () => {
    if (!inventoryList) {
      return;
    }
    const filterArr = inventoryList.filter(
      (e) => e.item_name === inventoryFilter
    );
    setCore(filterArr.join(","));
  };
  return (
    <VStack gap={4}>
      <Grid templateColumns="repeat(12, 1fr)" w="full" gap={4}>
        <GridItem colSpan={6} gap={4} h={200} borderRadius={10}>
          {getActiveComponent()}
        </GridItem>
        <GridItem colSpan={6}>
          <CustomTextarea label="Input" value={input} onChange={setInput} />
        </GridItem>
      </Grid>
      {/* <HStack>
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
        <Button onClick={copyText}>Copy</Button>
      </HStack> */}
      <Button
        w="full"
        onClick={() => handleSubmit(core, input)}
        bg="brand.400"
        textColor="white"
        transition="0.3s all"
        _hover={{ bg: "brand.100" }}
        shadow="lg"
        isDisabled={isLoading}
        _disabled={{
          bg: "gray.600",
        }}
      >
        {isLoading ? <Spinner /> : <Text>Calculate</Text>}
      </Button>
    </VStack>
  );
}

export default InputForm;
