import { CombinationResult } from "@/models/CombinationResult";
import { Box, HStack, Text, VStack } from "@chakra-ui/react";

function ResultRow({ result }: { result: CombinationResult }) {
  function convertArrayWithPlus(list: Array<number>) {
    return list.join(" + ");
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
    </VStack>
  );
}

export default ResultRow;
