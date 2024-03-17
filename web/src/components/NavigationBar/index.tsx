import { Box, VStack } from "@chakra-ui/react";
import React from "react";
import { MdEdit } from "react-icons/md";
import { MdInventory } from "react-icons/md";
import NavigationButton from "./NavigationButton";
import AppContext from "@/AppContext";
function NavigationBar() {
  const [navHover, setNavHover] = React.useState(false);
  const [active, setActive] = React.useState(0);
  const appContext = React.useContext(AppContext);
  const { activeRoute, setActiveRoute } = appContext;
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
          active={active}
          setActive={setActive}
          setActiveRoute={setActiveRoute}
          index={0}
          navHover={navHover}
          current={activeRoute}
          icon={<MdEdit />}
          text="Input"
        />
        <NavigationButton
          active={active}
          setActive={setActive}
          setActiveRoute={setActiveRoute}
          index={1}
          navHover={navHover}
          current={activeRoute}
          icon={<MdInventory />}
          text="Inventory"
        />
      </VStack>
    </Box>
  );
}

export default NavigationBar;
