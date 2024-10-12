import { Text, Textarea, VStack } from "@chakra-ui/react";

function CustomTextarea({
  label,
  value,
  onChange,
}: {
  label?: string;
  value: any;
  onChange: any;
}) {
  return (
    <VStack gap={2} alignItems="flex-start" w="full">
      {label ? (
        <Text fontWeight="bold" textColor="brand.100">
          {label}:
        </Text>
      ) : null}
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Input Here"
        resize="none"
        rows={8}
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

export default CustomTextarea;
