import { Button, HStack } from "@chakra-ui/react";
import * as router from "react-router-dom";

function NavigationBar() {
  return (
    <HStack w="full" gap={4}>
      <Button as={router.Link} to="/home">
        Home
      </Button>
      <Button as={router.Link} to="/retrieve-inventory">
        Inventory
      </Button>
    </HStack>
  );
}

export default NavigationBar;
