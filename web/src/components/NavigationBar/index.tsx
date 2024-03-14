import { Box, VStack } from "@chakra-ui/react";
import React from "react";
import { FaHome } from "react-icons/fa";
import { MdInventory } from "react-icons/md";
import NavigationButton from "./NavigationButton";
function NavigationBar() {
  const [navHover, setNavHover] = React.useState(false);
  const [current, setCurrent] = React.useState(0);
  const [active, setActive] = React.useState(0);
  return (
    <Box
      position="absolute"
      transition="0.15s linear"
      left="-60px"
      _hover={{ left: -210, w: 200 }}
      w={50}
      onMouseEnter={() => setNavHover(true)}
      onMouseLeave={() => setNavHover(false)}
    >
      <VStack gap={4} p={2} bg="white" shadow="lg">
        <NavigationButton
          to="/"
          active={active}
          setActive={setActive}
          index={0}
          navHover={navHover}
          current={current}
          icon={<FaHome />}
          text="Home"
        />
        <NavigationButton
          to="/retrieve-inventory"
          active={active}
          setActive={setActive}
          index={1}
          navHover={navHover}
          current={current}
          icon={<MdInventory />}
          text="Inventory"
        />
      </VStack>
    </Box>
  );
}

export default NavigationBar;
