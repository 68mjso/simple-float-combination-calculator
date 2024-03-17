import { BASE_IMAGE_URL } from "@/utilities/api-path";
import { Button, Checkbox, HStack, Img, Text, VStack } from "@chakra-ui/react";

function InventoryItem({
  label,
  imgUrl,
  name,
}: {
  label: string;
  imgUrl: string;
  name: string;
}) {
  const formatNumber = () => {
    return Number(label).toFixed(10);
  };
  return (
    <HStack w="full" py={2} px={4} gap={4}>
      <Checkbox />
      <VStack alignItems="flex-start">
        <Text
          fontSize={name.length > 24 ? 13 : 14}
          lineHeight={1}
          fontWeight="bold"
          textOverflow="ellipsis"
        >
          {name}
        </Text>
        <Text fontSize={12} lineHeight={1}>
          {formatNumber()}
        </Text>
      </VStack>
    </HStack>
  );
}

export default InventoryItem;
