import ResultRow from "@/components/ResultRow";
import { CombinationResult } from "@/models/CombinationResult";
import { CombinationResponse } from "@/models/CombinationResponse";
import { Button, Flex, Grid, GridItem, Text } from "@chakra-ui/react";
import { Textarea } from "@chakra-ui/react";
import socket from "@socket";
import React from "react";
function HomePage() {
  const [core, setCore] = React.useState("");
  const [input, setInput] = React.useState("");
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
  const handleSubmit = () => {
    socket.emit("calculate-combination", {
      core_arr: core,
      input_arr: input,
    });
  };
  return (
    <Flex w="100%" justifyContent="center" p={4}>
      <Grid templateColumns="repeat(2, 1fr)" w="full" gap={4}>
        <GridItem colSpan={{ base: 2, lg: 1 }}>
          <Grid templateColumns="repeat(2, 1fr)" w="full" gap={4}>
            <GridItem colSpan={2} gap={4}>
              <Text>Core:</Text>
              <Textarea
                value={core}
                onChange={(e) => setCore(e.target.value)}
                placeholder="Here is a sample placeholder"
              />
            </GridItem>
            <GridItem colSpan={2}>
              <Text>Input:</Text>
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Here is a sample placeholder"
              />
            </GridItem>
            <GridItem colSpan={2}>
              <Button w="full" onClick={handleSubmit}>
                Calculate
              </Button>
            </GridItem>
          </Grid>
        </GridItem>
        <GridItem colSpan={{ base: 2, lg: 1 }}>
          <ResultRow result={test} />
          {resultData.map((e: CombinationResult, i: number) => (
            <ResultRow key={`result-${i}`} result={e} />
          ))}
        </GridItem>
      </Grid>
    </Flex>
  );
}

export default HomePage;
