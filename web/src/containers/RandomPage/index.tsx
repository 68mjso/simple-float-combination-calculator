import AppContext from "@/AppContext";
import CustomTextarea from "@/components/CustomTextarea";
import ResultRow from "@/components/ResultRow";
import { CombinationResult } from "@/models/CombinationResult";
import { Box, Flex, Grid, GridItem, VStack } from "@chakra-ui/react";
import socket from "@socket";
import React from "react";
function HomePage() {
  const appContext = React.useContext(AppContext);
  const {
    setIsCombinationLoading,
    combinationResultData,
    setCombinationResultData,
  } = appContext;
  const [input, setInput] = React.useState("");
  const handleSubmit = (core: string, input: string) => {
    setCombinationResultData([]);
    setIsCombinationLoading(true);
    socket.emit("calculate-combination", {
      core_arr: core,
      input_arr: input,
    });
  };
  return (
    <Flex w="full" justifyContent="center" position="relative">
      <Box w="full" p={8} shadow="lg" bg="brand.300">
        <Grid templateColumns="repeat(2, 1fr)" gap={4}>
          <GridItem colSpan={{ base: 2, lg: 2 }}>
            <CustomTextarea label="Input" value={input} onChange={setInput} />
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
