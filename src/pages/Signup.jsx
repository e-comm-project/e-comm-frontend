import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import axios from "axios";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
} from "@chakra-ui/react";

const API_URL = import.meta.env.VITE_API_URL;

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleName = (e) => setName(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password, name };
    axios
      .post(`${API_URL}/auth/signup`, requestBody)
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        const errorMessage = error.response.data.message;
        setError(errorMessage);
      });
  };

  return (
    <Flex
      height={"80vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
      as="form"
      direction="column"
      onSubmit={handleSubmit}
      width="full"
      px={8}
    >
      <Stack spacing={8} mx={"auto"} py={6} px={3} width="2xl">
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Sign up
          </Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to enjoy all of our cool features ✌️
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            {error && (
              <Text color="red.500" textAlign="center">
                {error}
              </Text>
            )}
            <HStack>
              <Box width="full">
                <FormControl id="name" isRequired>
                  <FormLabel>Name</FormLabel>
                  <Input
                    placeholder="Name"
                    mb={3}
                    type="text"
                    value={name}
                    onChange={handleName}
                    size="lg"
                  />
                </FormControl>
              </Box>
            </HStack>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input
                placeholder="test@test.com"
                type="email"
                value={email}
                onChange={handleEmail}
                size="lg"
              />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <Input
                placeholder="Test123"
                type="password"
                value={password}
                onChange={handlePassword}
                size="lg"
              />
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Submitting"
                type="submit"
                size="lg"
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
              >
                Sign up
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={"center"}>
                Already a user?{" "}
                <Link as={RouterLink} to="/login" color={"blue.400"}>
                  Login
                </Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
    // <div>
    //   <form onSubmit={handleSubmit}>
    //     <h2>Sign Up</h2>
    //     <div>
    //       <label htmlFor="name">Name:</label>
    //       <input type="text" id="name" value={name} onChange={handleName} />
    //     </div>
    //     <div>
    //       <label htmlFor="email">Email:</label>
    //       <input type="email" id="email" value={email} onChange={handleEmail} />
    //     </div>
    //     <div>
    //       <label htmlFor="password">Password:</label>
    //       <input
    //         type="password"
    //         id="password"
    //         value={password}
    //         onChange={handlePassword}
    //       />
    //     </div>
    //     <button type="submit">Sign Up</button>
    //     <p>
    //       Already have an account? <Link to="/login">Log in</Link>
    //     </p>
    //   </form>
    // </div>
  );
}

export default Signup;
