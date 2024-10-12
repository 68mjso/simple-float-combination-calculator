import AppContext from "@/AppContext";
import CustomNumberInput from "@/components/CustomNumberInput";
import { VStack } from "@chakra-ui/react";
import React from "react";
import CustomInput from "../CustomInput";

function Setting() {
  const appContext = React.useContext(AppContext);
  const { inputNoc, setInputNoc, session, setSession } = appContext;
  return (
    <VStack w="full" gap={4}>
      <VStack w="full" bg="brand.300" p={4} px={6} shadow="lg">
        <CustomInput label="Session ID" value={session} onChange={setSession} />
        <CustomNumberInput
          label="Num of core"
          value={inputNoc}
          onChange={setInputNoc}
        />
      </VStack>
    </VStack>
  );
}

export default Setting;
