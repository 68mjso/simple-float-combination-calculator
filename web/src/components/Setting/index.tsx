import CustomNumberInput from "@/components/CustomNumberInput";
import { Text, VStack } from "@chakra-ui/react";
import React from "react";

function Setting() {
  const [target, setTarget] = React.useState(0.6666666);
  const [noc, setNoc] = React.useState(4);
  const [min, setMin] = React.useState(0.06);
  const [max, setMax] = React.useState(0.8);
  const avgValue = React.useMemo(
    () => calculateAvgFloat(min, max, target),
    [min, max, target]
  );
  function calculateAvgFloat(min: number, max: number, target: number) {
    return (target - min) / (max - min);
  }
  return (
    <VStack w="full" gap={4}>
      <VStack w="full" bg="brand.300" p={4} shadow="lg">
        <CustomNumberInput label="Target" value={target} onChange={setTarget} />
        <CustomNumberInput label="Num of core" value={noc} onChange={setNoc} />
        <CustomNumberInput label="Min Float" value={min} onChange={setMin} />
        <CustomNumberInput label="Max Float" value={max} onChange={setMax} />
      </VStack>
      <VStack w="full" bg="brand.300" p={4} shadow="lg" alignItems="flex-start">
        <Text textAlign="left" fontWeight="bold" color="brand.100">
          Average Float:
        </Text>
        <Text fontWeight="bold" color="brand.200">
          {avgValue}
        </Text>
      </VStack>
    </VStack>
  );
}

export default Setting;
