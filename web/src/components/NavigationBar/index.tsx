import { Box, VStack } from "@chakra-ui/react";
import React from "react";
import { MdEdit, MdInventory, MdOutlineQuestionMark } from "react-icons/md";
import NavigationButton from "./NavigationButton";
function NavigationBar() {
  const [active, setActive] = React.useState(0);
  return (
    <Box
      transition="0.15s linear"
      w="full"
      // onMouseEnter={() => setNavHover(true)}
      // onMouseLeave={() => setNavHover(false)}
    >
      <VStack gap={2} p={2} bg="white" shadow="lg">
        <NavigationButton
          active={active}
          setActive={setActive}
          index={0}
          icon={<MdEdit />}
          text="Calculator"
        />
        {/* <NavigationButton
          active={active}
          setActive={setActive}
          index={1}
          icon={<MdInventory />}
          text="Inventory"
        /> */}
        {/* <NavigationButton
          active={active}
          setActive={setActive}
          index={2}
          icon={<MdOutlineQuestionMark />}
          text="Random 10"
        /> */}
      </VStack>
    </Box>
  );
}

export default NavigationBar;
