import NavigationBar from "@/components/NavigationBar";
import HomeSetting from "@/components/Setting";
import { Grid, GridItem, VStack } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
function Root() {
  return (
    <Grid
      w="full"
      templateColumns="repeat(12, 1fr)"
      gap={4}
      p={4}
      alignItems="flex-start"
    >
      <GridItem colSpan={2}>
        <VStack>
          <NavigationBar />
          <HomeSetting />
        </VStack>
      </GridItem>
      <GridItem colSpan={10}>
        <Outlet />
      </GridItem>
    </Grid>
  );
}

export default Root;
