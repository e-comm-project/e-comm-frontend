import React from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  chakra,
  Container,
  Stack,
  Text,
  useColorModeValue,
  VisuallyHidden,
  Link,
  Image,
  HStack,
} from "@chakra-ui/react";
import { FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

const Logo = (props) => {
  return (
    <chakra.img
      src="https://i.ibb.co/kDS6CZG/ezgif-3-3d6b3770df.jpg"
      height={32}
      alt="Logo"
      {...props}
    />
  );
};

const SocialButton = ({ children, label, href }) => {
  return (
    <chakra.button
      bg={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
      rounded={"full"}
      w={8}
      h={8}
      cursor={"pointer"}
      as="a"
      href={href}
      target="_blank"
      display={"inline-flex"}
      alignItems={"center"}
      justifyContent={"center"}
      transition={"background 0.3s ease"}
      _hover={{
        bg: useColorModeValue("blackAlpha.200", "whiteAlpha.200"),
      }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

const Footer = () => {
  return (
    <Box
      bg={useColorModeValue("gray.50", "gray.900")}
      color={useColorModeValue("gray.700", "gray.200")}
    >
      <Container
        as={Stack}
        maxW={"6xl"}
        py={4}
        spacing={4}
        justify={"center"}
        align={"center"}
      >
        <Logo />
        <Stack direction={"row"} spacing={6}>
          <RouterLink to={"/"}>Home</RouterLink>
          <RouterLink to={"/about"}>About</RouterLink>{" "}
          <RouterLink to={"/contact"}>Contact Us</RouterLink>{" "}
          <RouterLink to={"/products"}>Products</RouterLink>{" "}
        </Stack>
      </Container>

      <Box
        borderTopWidth={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.700")}
      >
        <Container
          as={Stack}
          maxW={"6xl"}
          py={4}
          direction={{ base: "column", md: "row" }}
          spacing={4}
          justify={{ base: "center", md: "space-between" }}
          align={{ base: "center", md: "center" }}
        >
          <Text>© 2024 AboutShe </Text>
          <HStack
            justifyContent="center"
            mb={4}
            mt={2}
            spacing={{ base: 1, md: 4 }}
          >
            <Image
              src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg"
              alt="Visa"
              height={{ base: "20px", md: "28px" }}
              maxW={{ base: "40px", md: "60px" }}
            />
            <Image
              src="https://upload.wikimedia.org/wikipedia/commons/a/a4/Mastercard_2019_logo.svg"
              alt="Mastercard"
              height={{ base: "20px", md: "28px" }}
              maxW={{ base: "40px", md: "60px" }}
            />
            <Image
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/American_Express_logo_%282018%29.svg/601px-American_Express_logo_%282018%29.svg.png?20191022102801"
              alt="American Express"
              height={{ base: "20px", md: "28px" }}
              maxW={{ base: "40px", md: "60px" }}
            />
            <Image
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/1200px-PayPal.svg.png?20230314142951"
              alt="Paypal"
              height={{ base: "20px", md: "28px" }}
              maxW={{ base: "40px", md: "60px" }}
            />
          </HStack>
          <Stack direction={"row"} spacing={6}>
            <SocialButton label={"Twitter"} href="https://twitter.com">
              <FaTwitter />
            </SocialButton>
            <SocialButton label={"YouTube"} href="https://youtube.com">
              <FaYoutube />
            </SocialButton>
            <SocialButton label={"Instagram"} href="https://instagram.com">
              <FaInstagram />
            </SocialButton>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
};

export default Footer;
