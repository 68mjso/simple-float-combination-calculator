import AppContext from "@/AppContext";
import { Text, VStack } from "@chakra-ui/react";
import React from "react";

function InfoBox() {
  const appContext = React.useContext(AppContext);
  const { inputMin, inputMax, inputTarget } = appContext;
  const avgValue = React.useMemo(
    () => calculateAvgFloat(inputMin, inputMax, inputTarget),
    [inputMin, inputMax, inputTarget]
  );
  function calculateAvgFloat(min: number, max: number, target: number) {
    return (target - min) / (max - min);
  }
  return (
    <VStack
      w="full"
      bg="brand.300"
      p={4}
      px={6}
      shadow="lg"
      alignItems="flex-start"
    >
      <Text textAlign="left" fontWeight="bold" color="brand.100">
        Average Float:
      </Text>
      <Text fontWeight="bold" color="brand.200">
        {avgValue}
      </Text>
    </VStack>
  );
}

export default InfoBox;
