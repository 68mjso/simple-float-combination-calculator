import { Button, Flex, Grid, GridItem, Text } from "@chakra-ui/react";
import { Textarea } from "@chakra-ui/react";
function HomePage() {
  return (
    <Flex w="100%" justifyContent="center">
      <Grid templateColumns="repeat(2, 1fr)" w={1000} gap={4}>
        <GridItem colSpan={1} gap={4}>
          <Text>Core:</Text>
          <Textarea placeholder="Here is a sample placeholder" />
        </GridItem>
        <GridItem colSpan={1}>
          <Text>Input:</Text>
          <Textarea placeholder="Here is a sample placeholder" />
        </GridItem>
        <GridItem colSpan={2}>
            <Button>Calculate</Button>
        </GridItem>
      </Grid>
    </Flex>
  );
}

export default HomePage;
