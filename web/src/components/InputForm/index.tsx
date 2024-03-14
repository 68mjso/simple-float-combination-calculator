import {
  Button,
  Grid,
  GridItem,
  VStack
} from "@chakra-ui/react";
import React from "react";
import CustomNumberInput from "../CustomNumberInput";
import CustomTextarea from "../CustomTextarea";

function InputForm({
  handleSubmit,
}: {
  handleSubmit: (core: string, input: string) => void;
}) {
  const [core, setCore] = React.useState("");
  const [input, setInput] = React.useState("");
  const [noc, setNoc] = React.useState(0);
  const [min, setMin] = React.useState(0);
  const [max, setMax] = React.useState(0);

  return (
    <VStack gap={4}>
      <Grid templateColumns="repeat(6, 1fr)" w="full" gap={4}>
        <GridItem colSpan={6} gap={4}>
          <CustomTextarea label="Core" value={core} onChange={setCore} />
        </GridItem>
        <GridItem colSpan={6}>
          <CustomTextarea label="Input" value={input} onChange={setInput} />
        </GridItem>
        <GridItem colSpan={2}>
          <CustomNumberInput
            label="Num of core"
            value={noc}
            onChange={setNoc}
          />
        </GridItem>
        <GridItem colSpan={2}>
          <CustomNumberInput label="Min" value={min} onChange={setMin} />
        </GridItem>
        <GridItem colSpan={2}>
          <CustomNumberInput label="Max" value={max} onChange={setMax} />
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
      >
        Calculate
      </Button>
    </VStack>
  );
}

export default InputForm;
