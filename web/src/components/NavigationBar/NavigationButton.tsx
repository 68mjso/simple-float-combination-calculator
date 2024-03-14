import { Button, Text } from "@chakra-ui/react";
import * as router from "react-router-dom";
function NavigationButton({
  active,
  setActive,
  to,
  navHover,
  current,
  icon,
  text,
  index,
}: {
  current: number;
  active: number;
  setActive: any;
  to: string;
  navHover: boolean;
  icon: any;
  text: string;
  index: number;
}) {
  return (
    <Button
      as={router.Link}
      to={to}
      variant="ghost"
      w="full"
      p={navHover ? 4 : 0}
      overflow="hidden"
      _hover={{ bg: "brand.400", color: "brand.300" }}
      bg={active === index ? "brand.400" : "white"}
      color={active === index ? "brand.300" : "black"}
      justifyContent={navHover ? "flex-start" : "center"}
      onMouseEnter={() => setActive(index)}
      onMouseLeave={() => setActive(current)}
      gap={3}
      alignItems="center"
      lineHeight={0}
    >
      {icon}
      {navHover ? <Text>{text}</Text> : null}
    </Button>
  );
}

export default NavigationButton;
