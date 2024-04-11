import NavigationBar from "@/components/NavigationBar";
import HomeSetting from "@/components/Setting";
import { Grid, GridItem } from "@chakra-ui/react";
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
        <NavigationBar />
      </GridItem>
      <GridItem colSpan={8}>
        <Outlet />
      </GridItem>
      <GridItem colSpan={2}>
        <HomeSetting />
      </GridItem>
    </Grid>
  );
}

export default Root;
