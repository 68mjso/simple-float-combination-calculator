import { CombinationResult } from "@/models/CombinationResult";
import { Box, Text, VStack } from "@chakra-ui/react";

function ResultRow({ result }: { result: CombinationResult }) {
  function convertArrayWithPlus(list: Array<number>) {
    return list.join(" + ");
  }
  return (
    <VStack w="100%" bg="green.50" p={2} gap={2} alignItems="flex-start">
      <Box>
        <Text>
          {`Combination: ${convertArrayWithPlus(
            result.core_arr.concat(result.input_arr)
          )}`}
        </Text>
      </Box>
      <Box>{`Sum: ${result.sum_result}`}</Box>
      <Box>{`Converted : ${result.converted_sum_result}`}</Box>
    </VStack>
  );
}

export default ResultRow;
