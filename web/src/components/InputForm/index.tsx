import AppContext from "@/AppContext";
import { Input } from "@/models/Input";
import { groupBy } from "@/utilities/func";
import {
  Button,
  Grid,
  GridItem,
  Spinner,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import CustomTextarea from "../CustomTextarea";
import InventorySelector from "../InventorySelector";
import CustomNumberInput from "../CustomNumberInput";
function InputForm({
  handleSubmit,
  isLoading,
}: {
  handleSubmit: (core: string, input: Input) => void;
  isLoading: boolean;
}) {
  const [core, setCore] = React.useState("");
  const [input, setInput] = React.useState({
    input1: "",
    input2: "",
    input3: "",
    input4: "",
    input5: "",
    input6: "",
  });
  const appContext = React.useContext(AppContext);
  const {
    activeRoute,
    inventoryFilter,
    setInventoryFilter,
    inventoryList,
    inputTarget,
    setInputTarget,
    inputMin,
    setInputMin,
    inputMax,
    setInputMax,
    inputTimeout,
    setInputTimeout,
  } = appContext;
  const getActiveComponent = () => {
    switch (activeRoute) {
      case 0:
        return <CustomTextarea value={core} onChange={setCore} />;
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
          <Tabs variant="line">
            <TabList mx={4}>
              <Tab
                fontWeight="bold"
                _selected={{
                  color: "brand.100",
                  borderBottomColor: "brand.100",
                }}
              >
                Core
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel>{getActiveComponent()}</TabPanel>
            </TabPanels>
          </Tabs>
        </GridItem>
        <GridItem colSpan={6}>
          <Tabs variant="line">
            <TabList mx={4}>
              {Object.keys(input).map((_, i) => (
                <Tab
                  fontWeight="bold"
                  _selected={{
                    color: "brand.100",
                    borderBottomColor: "brand.100",
                  }}
                  key={`input-tab-${i}`}
                >
                  Input {i + 1}
                </Tab>
              ))}
            </TabList>
            <TabPanels>
              {Object.keys(input).map((_, i) => (
                <TabPanel key={`input-area-${i}`}>
                  <CustomTextarea
                    value={input[`input${i + 1}`]}
                    onChange={(e: string) => {
                      const key = `input${i + 1}`;
                      setInput({
                        ...input,
                        [key]: e,
                      });
                    }}
                  />
                </TabPanel>
              ))}
            </TabPanels>
          </Tabs>
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
      <Grid templateColumns="repeat(4, 1fr)" w="full" gap={10} px={4}>
        <GridItem>
          <CustomNumberInput
            label="Min Float"
            value={inputMin}
            onChange={setInputMin}
          />
        </GridItem>
        <GridItem>
          <CustomNumberInput
            label="Max Float"
            value={inputMax}
            onChange={setInputMax}
          />
        </GridItem>
        <GridItem>
          <CustomNumberInput
            label="Target"
            value={inputTarget}
            onChange={setInputTarget}
          />
        </GridItem>
        <GridItem>
          <CustomNumberInput
            label="Timeout"
            value={inputTimeout}
            onChange={setInputTimeout}
          />
        </GridItem>
      </Grid>
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
