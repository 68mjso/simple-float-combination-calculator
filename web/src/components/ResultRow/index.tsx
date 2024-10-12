import AppContext from "@/AppContext";
import { CombinationResult } from "@/models/CombinationResult";
import { Box, HStack, Text, VStack } from "@chakra-ui/react";
import React from "react";

function ResultRow({ result }: { result: CombinationResult }) {
  const appContext = React.useContext(AppContext);
  const { inputItemList } = appContext;

  function convertArrayWithPlus(list: Array<number>) {
    return list.join(" + ");
  }

  function getPrice() {
    let sum = 0;
    for (let i = 0; i < result.input_arr.length; i++) {
      const float = String(result.input_arr[i]);
      const item = inputItemList.find((e) => e.float === String(float));
      if (!item) {
        continue;
      }
      sum += Number(item.price);
    }
    return new Intl.NumberFormat("vn-vi", {
      style: "currency",
      currency: "VND",
    }).format(sum / 100);
  }
  return (
    <VStack
      w="100%"
      borderWidth="2px"
      borderRadius={8}
      borderColor="brand.100"
      bg="brand.500"
      p={2}
      gap={2}
      alignItems="flex-start"
    >
      <Box>
        <Text fontWeight="bold">{`Combination: `}</Text>
        <Text>
          {convertArrayWithPlus(result.core_arr.concat(result.input_arr))}
        </Text>
      </Box>
      <HStack gap={1}>
        <Text fontWeight="bold">Sum:</Text>
        <Text fontWeight="bold" color="brand.400">
          {result.sum_result}
        </Text>
      </HStack>
      <HStack gap={1}>
        <Text fontWeight="bold">Converted:</Text>
        <Text fontWeight="bold" color="brand.400">
          {result.converted_sum_result}
        </Text>
      </HStack>
      <HStack gap={1}>
        <Text fontWeight="bold">Price:</Text>
        <Text fontWeight="bold" color="brand.400">
          {getPrice()}
        </Text>
      </HStack>
    </VStack>
  );
}

export default ResultRow;
