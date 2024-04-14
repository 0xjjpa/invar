import { usePDFStore } from "./INVARStore";
import { Link as ChakraLink, Text } from "@chakra-ui/react";

export const INVARPDF = () => {
  const documentURL = usePDFStore((state) => state.documentURL);

  return (
    <>
      {documentURL ? (
        <Text>PDF loaded, find it <ChakraLink isExternal href={documentURL}>here</ChakraLink></Text>
      ) : (
        "Start demo to load sample file."
      )}
    </>
  );
};
