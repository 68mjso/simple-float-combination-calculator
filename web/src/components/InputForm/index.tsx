import { Button, Grid, GridItem, Text, VStack } from "@chakra-ui/react";
import React from "react";
import CustomTextarea from "../CustomTextarea";
import { Spinner } from "@chakra-ui/react";
import AppContext from "@/AppContext";
import InventorySelector from "../InventorySelector";
function InputForm({
  handleSubmit,
  isLoading,
}: {
  handleSubmit: (core: string, input: string) => void;
  isLoading: boolean;
}) {
  const [core, setCore] = React.useState("");
  const [input, setInput] = React.useState("");
  const appContext = React.useContext(AppContext);
  const { activeRoute } = appContext;
  const getActiveComponent = () => {
    switch (activeRoute) {
      case 0:
        return <CustomTextarea label="Core" value={core} onChange={setCore} />;
      case 1:
        return <InventorySelector />;
      default:
        return <CustomTextarea label="Core" value={core} onChange={setCore} />;
    }
  };
  return (
    <VStack gap={4}>
      <Grid templateColumns="repeat(6, 1fr)" w="full" gap={4}>
        <GridItem colSpan={6} gap={4} h={250} borderRadius={10}>
          {getActiveComponent()}
        </GridItem>
        <GridItem colSpan={6}>
          <CustomTextarea label="Input" value={input} onChange={setInput} />
        </GridItem>
      </Grid>
      <Button
        w="full"
        onClick={() => handleSubmit(core, input)}
        bg="brand.400"
        textColor="white"
        transition="0.3s all"
        _hover={{ bg: "brand.100" }}
        shadow="lg"
        isDisabled={isLoading}
        _disabled={{
          bg: "gray.600",
        }}
      >
        {isLoading ? <Spinner /> : <Text>Calculate</Text>}
      </Button>
    </VStack>
  );
}

export default InputForm;
