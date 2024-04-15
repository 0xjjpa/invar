import { INVAR_PDF_DEMO_FILE, INVAR_PDF_DEMO_URL } from "../../constants/invar";
import { loadDemoCredential } from "../../lib/fiel";
import { usePDFStore } from "./INVARStore";
import { Button, Link as ChakraLink, Code, Flex, Text } from "@chakra-ui/react";

export const INVARPDF = () => {
  const documentURL = usePDFStore((state) => state.documentURL);
  const documentChecksum = usePDFStore((state) => state.documentChecksum);
  const credential = usePDFStore((state) => state.credential);
  const loadDocumentURL = usePDFStore((state) => state.loadDocumentURL);
  const loadDocumentChecksum = usePDFStore(
    (state) => state.loadDocumentChecksum
  );
  const loadCredential = usePDFStore((state) => state.loadCredential);

  async function fetchFileHash(filename: string) {
    const response = await fetch(`/api/hash/${filename}`);
    if (!response.ok) {
      throw new Error("Failed to fetch the hash");
    }
    const data = await response.json();
    return data.hash;
  }

  const abbreviate = (str: string, length = 10) =>
    `${str.substring(0, length)}...${str.substring(
      str.length - length,
      str.length
    )}`;

  return (
    <>
      <Flex gap="2" alignItems={"center"} h="40px" justifyContent={'space-between'}>
        {documentURL ? (
          <Text>
            📄 PDF loaded, find it{" "}
            <ChakraLink
              textDecoration={"underline"}
              isExternal
              href={documentURL}
            >
              here
            </ChakraLink>
            .
          </Text>
        ) : (
          <>
            <Text>⚡️ Start demo, which will load a sample PDF file.</Text>
            <Button
              onClick={() => {
                loadDocumentURL({ documentURL: INVAR_PDF_DEMO_URL });
              }}
            >
              Load file
            </Button>
          </>
        )}
      </Flex>
      <Flex gap="2" alignItems={"center"} h="40px" justifyContent={'space-between'}>
        {documentURL &&
          (documentChecksum ? (
            <Text>
              🔍 Checksum calculated, here it is{" "}
              <Code>{abbreviate(documentChecksum)}</Code>.
            </Text>
          ) : (
            <>
              <Text>📝 Generate document checksum.</Text>
              <Button
                onClick={async () => {
                  const checksum = await fetchFileHash(INVAR_PDF_DEMO_FILE);
                  loadDocumentChecksum({ documentChecksum: checksum });
                }}
              >
                Calculate checksum
              </Button>
            </>
          ))}
      </Flex>
      <Flex gap="2" alignItems={"center"} h="40px" justifyContent={'space-between'}>
        {(documentURL && documentChecksum) &&
          (credential ? (
            <Text>🪪 Credential loaded, user <Code>{credential.legalName()}</Code> has been loaded.</Text>
          ) : (
            <>
              <Text>👤 Retrieve demo credentials stamped by governamental PKI.</Text>
              <Button
                onClick={async () => {
                  const credential = await loadDemoCredential();
                  loadCredential({ credential });
                }}
              >
                Load sample credential
              </Button>
            </>
          ))}
      </Flex>
    </>
  );
};
