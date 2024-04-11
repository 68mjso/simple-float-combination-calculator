import AppContext from "@/AppContext";
import { Button, Text } from "@chakra-ui/react";
import React from "react";
function NavigationButton({
  active,
  setActive,
  icon,
  text,
  index,
}: {
  active: number;
  setActive: any;
  icon: any;
  text: string;
  index: number;
}) {
  const appContext = React.useContext(AppContext);
  const { activeRoute, setActiveRoute } = appContext;
  return (
    <Button
      variant="ghost"
      w="full"
      p={4}
      overflow="hidden"
      _hover={{ bg: "brand.400", color: "brand.300" }}
      bg={active === index ? "brand.400" : "white"}
      color={active === index ? "brand.300" : "black"}
      justifyContent="flex-start"
      onMouseEnter={() => setActive(index)}
      onMouseLeave={() => setActive(activeRoute)}
      onClick={() => setActiveRoute(index)}
      gap={3}
      alignItems="center"
      lineHeight={0}
    >
      {icon}
      <Text>{text}</Text>
    </Button>
  );
}

export default NavigationButton;
