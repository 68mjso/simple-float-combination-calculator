import AppContext from "@/AppContext";
import InputForm from "@/components/InputForm";
import ResultRow from "@/components/ResultRow";
import { CombinationResponse } from "@/models/CombinationResponse";
import { CombinationResult } from "@/models/CombinationResult";
import { Input } from "@/models/Input";
import { Box, Flex, Grid, GridItem, VStack } from "@chakra-ui/react";
import { MdContentCopy } from "react-icons/md";
import socket from "@socket";
import React from "react";
import { useToast } from "@chakra-ui/react";
function HomePage() {
  const toast = useToast();
  const appContext = React.useContext(AppContext);
  const [selectedRow, setSelectedRow] = React.useState(-1);
  const {
    isCombinationLoading,
    setIsCombinationLoading,
    combinationResultData,
    setCombinationResultData,
    setActiveRoute,
    inputTimeout,
    setInputItemList,
    inputItemList,
    session,
  } = appContext;
  React.useEffect(() => {
    setActiveRoute(0);
    socket.on("combination-result", (data: CombinationResponse) => {
      const arr = data.result;
      setCombinationResultData(arr);
      setIsCombinationLoading(!data.completed);
    });
    // retrieveCsFloatInventory().then((res: any) => {
    //   const arr = res.filter((e: any) => e.type !== "agent");
    //   setInventoryList(arr);
    // });
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
    setInputItemList(floatArr);
    socket.emit("calculate-combination", {
      timeout: inputTimeout,
      core_arr: core,
      input_arr: floatArr.map((e) => e.float).join(","),
    });
  };

  const copyToClipboard = (cr: CombinationResult, i: number) => {
    setSelectedRow(i);
    const arr = [];
    for (let i = 0; i < cr.input_arr.length; i++) {
      const item = inputItemList.find((e) => e.float == cr.input_arr[i]);
      if (!item) {
        continue;
      }
      arr.push(item);
    }
    const str = `steamBuyRequiredBulk(${JSON.stringify(arr)},'${session}',0)`;
    const temp = document.createElement("textarea");
    document.body.append(temp);
    temp.value = str;
    temp.select();
    document.execCommand("copy");
    temp.remove();
    toast({
      title: "Success",
      description: "Scirpt has been copied to clipboard.",
      status: "success",
      duration: 9000,
      isClosable: true,
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
              {combinationResultData.map((e: CombinationResult, i: number) =>
                e.input_arr.length > 0 ? (
                  <Box key={`result-${i}`} position="relative">
                    <Flex
                      position="absolute"
                      w="full"
                      h="full"
                      backgroundColor={selectedRow == i ? "green.100" : "#cccccc00"}
                      borderRadius={8}
                      _hover={{
                        cursor: "pointer",
                        backgroundColor: "#cccccc4d",
                        transition: "0.25s",
                      }}
                      p={2}
                      justifyContent="flex-end"
                      onClick={() => copyToClipboard(e, i)}
                    >
                      <MdContentCopy color="#fff" />
                    </Flex>
                    <ResultRow result={e} />
                  </Box>
                ) : null
              )}
            </VStack>
          </GridItem>
        </Grid>
      </Box>
    </Flex>
  );
}

export default HomePage;
