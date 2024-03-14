import { VStack } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
function Root() {
  return (
    <VStack w="full" gap={4} p={4}>
      <Outlet />
    </VStack>
  );
}

export default Root;
