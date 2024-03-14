import CustomInput from "@/components/CustomInput";
import { Button, VStack } from "@chakra-ui/react";
import React from "react";

function SteamSetting({ onClick }: { onClick: () => void }) {
  const [steamId, setSteamId] = React.useState("76561198148838277");
  return (
    <VStack w={200} position="absolute" right={-220} gap={4}>
      <VStack w="full" bg="brand.300" p={4} shadow="lg">
        <CustomInput label="Steam ID" value={steamId} onChange={setSteamId} />
        <Button w="full" bg="brand.400" color="brand.300" onClick={onClick}>
          Get
        </Button>
      </VStack>
    </VStack>
  );
}

export default SteamSetting;
