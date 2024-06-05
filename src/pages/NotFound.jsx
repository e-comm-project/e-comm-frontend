import React from "react";
import { Flex, Box, Image, Text, Center, Link } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

function NotFound() {
  return (
    <Center height="100vh" bg="gray.100">
      <Flex direction={{ base: "column", md: "row" }} align="center">
        <Image
          src="https://i.imgur.com/qIufhof.png"
          alt="404 Not Found"
          boxSize={{ base: "150px", md: "300px" }}
          mb={{ base: 4, md: 0 }}
        />
        <Box ml={{ base: 0, md: 8 }} textAlign="center">
          <Text fontSize="4xl" fontWeight="bold">
            404
          </Text>
          <Text fontSize="xl">This page could not be found</Text>
          <Link
            as={RouterLink}
            to="/"
            mt={4}
            fontSize="lg"
            color="blue.500"
            _hover={{ textDecoration: "underline" }}
          >
            Go to Homepage
          </Link>
        </Box>
      </Flex>
    </Center>
  );
}

export default NotFound;
