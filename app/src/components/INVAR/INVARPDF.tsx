import { useState } from "react";
import {
  INVAR_OFF_CHAIN_SCHEMA_ID,
  INVAR_ONCHAIN_FULL_SCHEMA_ID,
  INVAR_PDF_DEMO_FILE,
  INVAR_PDF_DEMO_URL,
} from "../../constants/invar";
import {
  generateSignature,
  loadCryptoKeyFromCredential,
  loadDemoCredential,
  verifySignature,
} from "../../lib/fiel";
import { usePDFStore } from "./INVARStore";
import { Button, Link as ChakraLink, Code, Flex, Text } from "@chakra-ui/react";
import { createAttestation } from "../../lib/sign";
import { INVARAttestation } from "../../types/invar";
import { AttestationResult } from "@ethsign/sp-sdk";

export const INVARPDF = () => {
  const documentURL = usePDFStore((state) => state.documentURL);
  const documentChecksum = usePDFStore((state) => state.documentChecksum);
  const credential = usePDFStore((state) => state.credential);
  const key = usePDFStore((state) => state.key);
  const signature = usePDFStore((state) => state.signature);
  const attestation = usePDFStore((state) => state.attestation);
  const loadDocumentURL = usePDFStore((state) => state.loadDocumentURL);
  const loadDocumentChecksum = usePDFStore(
    (state) => state.loadDocumentChecksum
  );
  const loadCredential = usePDFStore((state) => state.loadCredential);
  const loadKey = usePDFStore((state) => state.loadKey);
  const loadSignature = usePDFStore((state) => state.loadSignature);
  const loadAttestation = usePDFStore((state) => state.loadAttestation);

  const [isSignatureValid, setIsSignatureValid] = useState(undefined);

  async function fetchFileHash(filename: string) {
    const response = await fetch(`/api/hash/${filename}`);
    if (!response.ok) {
      throw new Error("Failed to fetch the hash");
    }
    const data = await response.json();
    return data.hash;
  }

  async function fetchAttestationData({
    schemaId,
    attestationData,
    index,
  }: {
    schemaId: string;
    attestationData: INVARAttestation;
    index: string;
  }) {
    const attestationResponse = await fetch(
      `/api/attestation/${schemaId}/${index}`,
      {
        method: "POST",
        body: JSON.stringify({
          attestationData,
        }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    if (!attestationResponse.ok) {
      throw new Error("Failed to fetch the hash");
    }
    const dataWithAttestationAsJSONString = await attestationResponse.json();
    return JSON.parse(dataWithAttestationAsJSONString.attestation) as AttestationResult;
  }

  const abbreviate = (str: string, length = 10) =>
    `${str.substring(0, length)}...${str.substring(
      str.length - length,
      str.length
    )}`;

  return (
    <>
      <Flex
        gap="2"
        alignItems={"center"}
        h="50px"
        justifyContent={"space-between"}
      >
        {documentURL ? (
          <Text>
            📑 PDF loaded, find it{" "}
            <ChakraLink
              textDecoration={"underline"}
              isExternal
              href={documentURL}
            >
              here
            </ChakraLink>, download it to check its <Code>SHA256</Code> checksum yourself.
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
      <Flex
        gap="2"
        alignItems={"center"}
        h="50px"
        justifyContent={"space-between"}
      >
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
      <Flex
        gap="2"
        alignItems={"center"}
        h="50px"
        justifyContent={"space-between"}
      >
        {documentURL &&
          documentChecksum &&
          (credential ? (
            <Text>
              🪪 Credential loaded, user <Code>{credential.legalName()}</Code>{" "}
              has been loaded.
            </Text>
          ) : (
            <>
              <Text>
                👤 Retrieve demo credentials stamped by governamental PKI.
              </Text>
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
      <Flex
        gap="2"
        alignItems={"center"}
        h="50px"
        justifyContent={"space-between"}
      >
        {documentURL &&
          documentChecksum &&
          credential &&
          (key ? (
            <Text>
              🔐 Private key loaded, key of type{" "}
              <Code>{key.algorithm.name}</Code> has been loaded.
            </Text>
          ) : (
            <>
              <Text>
                🔑 Retrieve RSA private key from CA-stamped certificate .
              </Text>
              <Button
                onClick={async () => {
                  const key = await loadCryptoKeyFromCredential({ credential });
                  loadKey({ key });
                }}
              >
                Load key from credential
              </Button>
            </>
          ))}
      </Flex>
      <Flex
        gap="2"
        alignItems={"center"}
        h="50px"
        justifyContent={"space-between"}
      >
        {documentURL &&
          documentChecksum &&
          credential &&
          key &&
          (signature ? (
            <Text>
              🔏 Signature generated, with value{" "}
              <Code>{abbreviate(signature)}</Code> (in hex format).
            </Text>
          ) : (
            <>
              <Text>🖊️ Generate signature of the PDF file checksum.</Text>
              <Button
                onClick={async () => {
                  const signature = generateSignature(
                    credential,
                    documentChecksum
                  );
                  loadSignature({ signature });
                }}
              >
                Generate signature
              </Button>
            </>
          ))}
      </Flex>
      <Flex
        gap="2"
        alignItems={"center"}
        h="50px"
        justifyContent={"space-between"}
      >
        {documentURL && documentChecksum && credential && key && signature && (
          <>
            <Text>
              ✒️ Verify validity of the signature from credential public key.{" "}
              {isSignatureValid && <Code>(✅ it is)</Code>}
            </Text>
            {!isSignatureValid && (
              <Button
                onClick={async () => {
                  const isValid = verifySignature(
                    credential,
                    documentChecksum,
                    signature
                  );
                  setIsSignatureValid(isValid);
                }}
              >
                Verify signature
              </Button>
            )}
          </>
        )}
      </Flex>
      <Flex
        gap="2"
        alignItems={"center"}
        h="50px"
        justifyContent={"space-between"}
      >
        {documentURL &&
          documentChecksum &&
          credential &&
          key &&
          signature &&
          (attestation ? (
            <Text>
              📄 Attestation created with ID{" "}
              <Code>{attestation.attestationId}</Code> and can be seen{" "}
              <ChakraLink
                textDecoration={"underline"}
                isExternal
                href={`https://testnet-scan.sign.global/attestation/${INVAR_ONCHAIN_FULL_SCHEMA_ID}_${attestation.attestationId}`}
              >
                here
              </ChakraLink>
              .
            </Text>
          ) : (
            <>
              <Text>
                ✍🏼 Generate attestation for <Code>{credential.rfc()}</Code> with
                checksum and certificate.
              </Text>
              <Button
                onClick={async () => {
                  const attestation = await fetchAttestationData({
                    schemaId: INVAR_OFF_CHAIN_SCHEMA_ID,
                    attestationData: {
                      certificateAsPEM: credential.certificate().pem(),
                      documentSHA256Checksum: documentChecksum,
                    },
                    index: credential.rfc(),
                  });
                  loadAttestation({ attestation });
                }}
              >
                Create attestation
              </Button>
            </>
          ))}
      </Flex>
    </>
  );
};
