import { Button, Flex, Grid, GridItem, Text } from "@chakra-ui/react";
import { Textarea } from "@chakra-ui/react";
import socket from "@socket";
import React from "react";
function HomePage() {
  const [core, setCore] = React.useState("");
  const [input, setInput] = React.useState("");
  const handleSubmit = () => {
    socket.emit("calculate-combination", {
      core_arr: core,
      input_arr: input,
    });
  };
  return (
    <Flex w="100%" justifyContent="center">
      <Grid templateColumns="repeat(2, 1fr)" w={1000} gap={4}>
        <GridItem colSpan={1} gap={4}>
          <Text>Core:</Text>
          <Textarea
            value={core}
            onChange={(e) => setCore(e.target.value)}
            placeholder="Here is a sample placeholder"
          />
        </GridItem>
        <GridItem colSpan={1}>
          <Text>Input:</Text>
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Here is a sample placeholder"
          />
        </GridItem>
        <GridItem colSpan={2}>
          <Button onClick={handleSubmit}>Calculate</Button>
        </GridItem>
      </Grid>
    </Flex>
  );
}

export default HomePage;
