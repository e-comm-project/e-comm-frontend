import React from "react";
import { Box, Image, Heading, Text } from "@chakra-ui/react";

const AboutUs = () => {
  return (
    <Box p={{ base: "4", md: "5" }} fontFamily="sans-serif">
      <Heading
        as="h1"
        mb={{ base: "4", md: "5" }}
        fontSize={{ base: "2xl", md: "4xl" }}
      >
        About Us
      </Heading>
      <Box maxW="800px" mx="auto">
        <Text fontSize={{ base: "md", md: "xl" }} mb={{ base: "4", md: "5" }}>
          Welcome to our women's clothing store! Our mission is to provide
          stylish and comfortable clothing options for women of all ages. We
          believe that every woman deserves to feel confident and beautiful in
          what she wears. Whether you're looking for casual everyday outfits or
          elegant evening wear, we've got you covered.
        </Text>
        <Image
          src="https://i.ibb.co/NrhpsKF/aboutshe.jpg"
          alt="About Us"
          borderRadius="md"
          mb={{ base: "4", md: "5" }}
          maxH={{ base: "300px", md: "500px" }}
          mx="auto"
          display="block"
        />
        <Text fontSize={{ base: "md", md: "xl" }}>
          Our store offers a wide range of clothing options, including dresses,
          tops, bottoms, outerwear, and more. We carefully curate our
          collections to ensure that we offer the latest trends and timeless
          classics. With high-quality fabrics and attention to detail, our
          clothing is designed to flatter every body type and personality.
        </Text>
      </Box>
    </Box>
  );
};

export default AboutUs;
