import React from "react";
import { Link as RouterLink } from "react-router-dom"; // Import Link from React Router
import {
  Box,
  chakra,
  Container,
  Stack,
  Text,
  useColorModeValue,
  VisuallyHidden,
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

const SocialButton = ({ children, label, to }) => {
  // Change 'href' prop to 'to'
  return (
    <chakra.button
      bg={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
      rounded={"full"}
      w={8}
      h={8}
      cursor={"pointer"}
      as={RouterLink} // Use RouterLink instead of 'a' tag
      to={to} // Use 'to' prop for navigation
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
          <RouterLink to={"/"}>Home</RouterLink> {/* Change to RouterLink */}
          <RouterLink to={"/about"}>About</RouterLink>{" "}
          {/* Change to RouterLink */}
          <RouterLink to={"/contact"}>Contact Us</RouterLink>{" "}
          {/* Change to RouterLink */}
          <RouterLink to={"/products"}>Women</RouterLink>{" "}
          {/* Change to RouterLink */}
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
          <Stack direction={"row"} spacing={6}>
            <SocialButton label={"Twitter"} to={"/twitter"}>
              {" "}
              {/* Change to RouterLink */}
              <FaTwitter />
            </SocialButton>
            <SocialButton label={"YouTube"} to={"/youtube"}>
              {" "}
              {/* Change to RouterLink */}
              <FaYoutube />
            </SocialButton>
            <SocialButton label={"Instagram"} to={"/instagram"}>
              {" "}
              {/* Change to RouterLink */}
              <FaInstagram />
            </SocialButton>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
};

export default Footer;
