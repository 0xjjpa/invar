import { Link as ChakraLink, Button } from "@chakra-ui/react";

import { Container } from "./Container";
import { usePDFStore } from "./INVAR/INVARStore";
import { INVAR_PDF_DEMO_URL } from "../constants/invar";

export const CTA = () => {
  const loadDocumentURL = usePDFStore((state) => state.loadDocumentURL);

  return (
    <Container
      flexDirection="row"
      position="fixed"
      bottom={0}
      width="full"
      maxWidth="3xl"
      py={3}
    >
      <Button
        as={ChakraLink}
        variant="outline"
        colorScheme="green"
        rounded="button"
        flexGrow={1}
        mx={2}
        width="full"
        onClick={() => {
          loadDocumentURL({ documentURL: INVAR_PDF_DEMO_URL });
        }}
      >
        Start Demo
      </Button>
    </Container>
  );
};
