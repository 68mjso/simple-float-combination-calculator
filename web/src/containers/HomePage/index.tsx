import AppContext from "@/AppContext";
import InputForm from "@/components/InputForm";
import ResultRow from "@/components/ResultRow";
import { CombinationResponse } from "@/models/CombinationResponse";
import { CombinationResult } from "@/models/CombinationResult";
import { Input } from "@/models/Input";
import { retrieveCsFloatInventory } from "@/utilities/func";
import { Box, Flex, Grid, GridItem, VStack } from "@chakra-ui/react";
import socket from "@socket";
import React from "react";
function HomePage() {
  const appContext = React.useContext(AppContext);
  const {
    isCombinationLoading,
    setIsCombinationLoading,
    combinationResultData,
    setCombinationResultData,
    setActiveRoute,
    setInventoryList,
  } = appContext;
  React.useEffect(() => {
    setActiveRoute(0);
    socket.on("combination-result", (data: CombinationResponse) => {
      const arr = data.result;
      setCombinationResultData(arr);
      setIsCombinationLoading(!data.completed);
    });
    retrieveCsFloatInventory().then((res: any) => {
      const arr = res.filter((e: any) => e.type !== "agent");
      setInventoryList(arr);
    });
  }, []);
  const handleSubmit = (core: string, input: Input) => {
    const floatArr = [];
    setCombinationResultData([]);
    setIsCombinationLoading(true);
    for (let key of Object.keys(input)) {
      const val = input[key];
      try {
        const converted = JSON.parse(val);
        for (let i = 0; i < converted.length; i++) {
          floatArr.push(converted[i]);
        }
      } catch (e) {
        continue;
      }
    }
    console.log(floatArr.map((e) => e.float));
    appContext.setInputItemList(floatArr);
    socket.emit("calculate-combination", {
      core_arr: core,
      input_arr: floatArr.map((e) => e.float).join(","),
    });
  };
  return (
    <Flex w="full" justifyContent="center" position="relative">
      <Box w="full" p={8} shadow="lg" bg="brand.300">
        <Grid templateColumns="repeat(2, 1fr)" gap={4}>
          <GridItem colSpan={{ base: 2, lg: 2 }}>
            <InputForm
              handleSubmit={handleSubmit}
              isLoading={isCombinationLoading}
            />
          </GridItem>
          <GridItem colSpan={{ base: 2, lg: 2 }}>
            <VStack w="full" gap={4}>
              {combinationResultData.map((e: CombinationResult, i: number) => (
                <ResultRow key={`result-${i}`} result={e} />
              ))}
            </VStack>
          </GridItem>
        </Grid>
      </Box>
    </Flex>
  );
}

export default HomePage;
