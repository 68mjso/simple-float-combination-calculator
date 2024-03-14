import InputForm from "@/components/InputForm";
import NavigationBar from "@/components/NavigationBar";
import ResultRow from "@/components/ResultRow";
import { CombinationResponse } from "@/models/CombinationResponse";
import { CombinationResult } from "@/models/CombinationResult";
import { Box, Flex, Grid, GridItem, VStack } from "@chakra-ui/react";
import socket from "@socket";
import React from "react";
import HomeSetting from "./HomeSetting";
function HomePage() {
  const [resultData, setResultData] = React.useState<Array<CombinationResult>>(
    []
  );
  const test = {
    core_arr: [
      0.96873486042023, 0.97897589206696, 0.92473173141479, 0.90209847688675,
    ],
    input_arr: [
      0.7412097454071, 0.79570639133453, 0.78514647483826, 0.76760387420654,
      0.66804617643356, 0.66594451665878,
    ],
    sum_result: "0.666666662335395",
    converted_sum_result: "0.6666666865348816 ",
  };
  React.useEffect(() => {
    socket.on("combination-result", (data: CombinationResponse) => {
      const arr = data.result;
      setResultData(arr);
    });
  }, []);
  const handleSubmit = (core: string, input: string) => {
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
            <InputForm handleSubmit={handleSubmit} />
          </GridItem>
          <GridItem colSpan={{ base: 2, lg: 2 }}>
            <VStack w="full" gap={4}>
              <ResultRow result={test} />
              {resultData.map((e: CombinationResult, i: number) => (
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
