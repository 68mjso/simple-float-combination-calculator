import AppContext from "@/AppContext";
import HomeSetting from "@/components/HomeSetting";
import InputForm from "@/components/InputForm";
import NavigationBar from "@/components/NavigationBar";
import ResultRow from "@/components/ResultRow";
import { CombinationResponse } from "@/models/CombinationResponse";
import { CombinationResult } from "@/models/CombinationResult";
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
  const handleSubmit = (core: string, input: string) => {
    setCombinationResultData([]);
    setIsCombinationLoading(true);
    socket.emit("calculate-combination", {
      core_arr: core,
      input_arr: input,
    });
  };
  return (
    <Flex w={960} justifyContent="center" position="relative">
      <NavigationBar />
      <HomeSetting />
      <Box w="full" p={8} shadow="lg" bg="brand.300">
        <Grid templateColumns="repeat(2, 1fr)" gap={4}>
          <GridItem colSpan={{ base: 2, lg: 2 }}>
            <InputForm
              handleSubmit={(core: string, input: string) => {
                handleSubmit(core, input);
              }}
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
