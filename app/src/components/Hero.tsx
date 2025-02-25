import { Flex, Heading } from "@chakra-ui/react";

export const Hero = ({ title }: { title: string }) => (
  <Flex
    justifyContent="center"
    alignItems="center"
    height="100vh"
  >
    <Heading m="100px" fontSize="4vw">{title}</Heading>
  </Flex>
);

Hero.defaultProps = {
  title: "INVAR",
};
