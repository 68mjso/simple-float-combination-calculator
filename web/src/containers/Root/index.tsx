import NavigationBar from "@/components/NavigationBar";
import { Box, VStack } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
function Root() {
  return (
    <VStack w="full" bgColor="osu.600">
      {/* <Flex
        display={isLoading ? "block" : "none"}
        position="fixed"
        top="0"
        left="0"
        w="100vw"
        h="100vh"
        alignItems="center"
        justifyContent="center"
        bgColor="#000000AA"
        zIndex="999"
      >
        <Image src="loading.gif" maxW="100px" maxH="100px" />
      </Flex> */}
      <NavigationBar />
      <Box w="full">
        <Outlet />
      </Box>
    </VStack>
  );
}

export default Root;
