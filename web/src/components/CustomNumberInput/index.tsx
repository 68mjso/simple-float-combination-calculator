import { NumberInput, NumberInputField, Text, VStack } from "@chakra-ui/react";

function CustomNumberInput({
  label,
  value,
  onChange,
}: {
  label: string;
  value: any;
  onChange: any;
}) {
  return (
    <VStack gap={2} alignItems="flex-start">
      <Text fontWeight="bold" textColor="brand.100">
        {label}:
      </Text>
      <NumberInput
        value={value}
        onChange={(e) => onChange(e)}
        w="full"
        textColor="brand.100"
        bg="white"
        borderRadius={8}
        shadow="lg"
      >
        <NumberInputField
          borderRadius={8}
          borderWidth="2px"
          borderColor="brand.100"
        />
      </NumberInput>
    </VStack>
  );
}

export default CustomNumberInput;
