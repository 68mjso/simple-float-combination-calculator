import { Input, Text, VStack } from "@chakra-ui/react";

function CustomInput({
  label,
  value,
  onChange,
}: {
  label: string;
  value: any;
  onChange: any;
}) {
  return (
    <VStack gap={2} alignItems="flex-start" w="full">
      <Text fontWeight="bold" textColor="brand.100">
        {label}:
      </Text>
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Input Here"
        textColor="brand.100"
        bg="white"
        borderRadius={8}
        borderWidth="2px"
        borderColor="brand.100"
        shadow="lg"
      />
    </VStack>
  );
}

export default CustomInput;
