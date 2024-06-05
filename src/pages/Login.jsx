import { useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

import {
  Flex,
  Button,
  Heading,
  Input,
  FormControl,
  FormErrorMessage,
  Box,
  useToast,
} from "@chakra-ui/react";

const API_URL = import.meta.env.VITE_API_URL;

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(undefined);

  const navigate = useNavigate();
  const toast = useToast();

  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    const requestBody = { email, password };

    axios
      .post(`${API_URL}/auth/login`, requestBody)
      .then((response) => {
        storeToken(response.data.authToken);
        authenticateUser();
        toast({
          title: "Login successful.",
          description: "You have been successfully logged in.",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        navigate("/");
      })
      .catch((error) => {
        const errorMessage = error.response.data.message;
        setError(errorMessage);
      });
  };

  return (
    <Flex height="100vh" alignItems="center" justifyContent="center">
      <Box
        width={{ base: "90%", md: "400px" }}
        as="form"
        p={6}
        rounded="md"
        bg="gray.300"
        onSubmit={handleLoginSubmit}
      >
        <Heading mb={6} textAlign="center">
          Log in
        </Heading>
        <FormControl isInvalid={error}>
          <Input
            placeholder="test1@test.com"
            variant="filled"
            mb={3}
            type="email"
            value={email}
            onChange={handleEmail}
          />
          <Input
            placeholder="Test123"
            variant="filled"
            mb={6}
            type="password"
            value={password}
            onChange={handlePassword}
          />
          {error && <FormErrorMessage>{error}</FormErrorMessage>}
        </FormControl>
        <Button mb={6} colorScheme="teal" type="submit" width="full">
          Log in
        </Button>
        <p>
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </Box>
    </Flex>
  );
}

export default Login;
