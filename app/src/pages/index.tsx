import {
  Link as ChakraLink,
  Text,
  Code,
  List,
  ListIcon,
  ListItem,
  Box,
} from "@chakra-ui/react";
import { CheckCircleIcon, LinkIcon } from "@chakra-ui/icons";

import { Hero } from "../components/Hero";
import { Container } from "../components/Container";
import { Main } from "../components/Main";
import { DarkModeSwitch } from "../components/DarkModeSwitch";
import { CTA } from "../components/CTA";
import { Footer } from "../components/Footer";
import { INVARPDF } from "../components/INVAR/INVARPDF";

const Index = () => (
  <Container height="100vh">
    <Hero />
    <Main>
      <Text color="text" fontSize={"sm"} textAlign={"center"}>
        A decentralized system for secure, tamper-proof verification of signed
        documents, ensuring <Code>(I)</Code>ntegrity, <Code>(N)</Code>on-
        <Code>(R)</Code>epudation, <Code>(V)</Code>alidity and <Code>(A)</Code>
        uthenticity through digital signatures,{" "}
        <ChakraLink
          href="https://sign.global/"
          isExternal
          textDecoration={"Underline"}
        >
          Sign Protocol
        </ChakraLink>
        , and blockchain.
      </Text>

      <List spacing={3} my={0} color="text">
        <ListItem>
          👤 <Code mx="2">Who?</Code>Professionals in any field who need to issue
          secure, official or legally binding documents.
        </ListItem>
        <ListItem>
          ❌ <Code mx="2">Why?</Code>Document forgery, jeopardizing the reliability and
          trust in critical documents.
        </ListItem>
        <ListItem>
          ⚙️ <Code mx="2">How?</Code>By issuing PKI-enabled, traceable and permanent
          attestations through decentralized tech.
        </ListItem>
      </List>
      <Box mt="10">
        <Text mb="2" fontSize={'sm'}>Demo workflow</Text>
        <INVARPDF />
      </Box>
    </Main>

    <DarkModeSwitch />
    <Footer>
      <Text>
        Made with 🔒 by{" "}
        <ChakraLink href="https://x.com/0xjjpa" isExternal>
          0xjjpa
        </ChakraLink>
      </Text>
    </Footer>
    {/* <CTA /> */}
  </Container>
);

export default Index;
