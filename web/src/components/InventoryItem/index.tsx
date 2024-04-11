import { Text, VStack } from "@chakra-ui/react";

function InventoryItem({ label, name }: { label: string; name: string }) {
  const formatNumber = () => {
    return Number(label).toFixed(10);
  };
  return (
    <VStack alignItems="flex-start" w="full" py={2} px={4} gap={2}>
      <Text
        fontSize={name.length > 24 ? 11 : 12}
        lineHeight={1}
        fontWeight="bold"
        textOverflow="ellipsis"
      >
        {name}
      </Text>
      <Text fontSize={10} lineHeight={1}>
        {formatNumber()}
      </Text>
    </VStack>
  );
}

export default InventoryItem;
