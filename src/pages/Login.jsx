import { useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import React from "react";
import {
  Flex,
  Button,
  Heading,
  Input,
  FormControl,
  FormErrorMessage,
} from "@chakra-ui/react";

const API_URL = import.meta.env.VITE_API_URL;

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(undefined);

  const navigate = useNavigate();

  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    const requestBody = { email, password };

    axios
      .post(`${API_URL}/auth/login`, requestBody)
      .then((response) => {
        console.log("JWT token", response.data.authToken);
        storeToken(response.data.authToken);
        authenticateUser();
        navigate("/");
      })
      .catch((error) => {
        const errorMessage = error.response.data.message;
        setError(errorMessage);
      });
  };

  return (
    <Flex height="100vh" alignItems="center" justifyContent="center">
      <Flex
        as="form"
        direction="column"
        background="gray.300"
        p={12}
        rounded={6}
        onSubmit={handleLoginSubmit}
      >
        <Heading mb={6}>Log in</Heading>
        <FormControl isInvalid={error}>
          <Input
            placeholder="test@test.com"
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
        <Button mb={6} colorScheme="teal" type="submit">
          Log in
        </Button>
        <p>
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </Flex>
    </Flex>
    //   <div>
    //     <form onSubmit={handleLoginSubmit}>
    //       <h2>Log In</h2>
    //       {error && <div>{error}</div>}
    //       <div>
    //         <label htmlFor="email">Email:</label>
    //         <input type="email" id="email" value={email} onChange={handleEmail} />
    //       </div>
    //       <div>
    //         <label htmlFor="password">Password:</label>
    //         <input
    //           type="password"
    //           id="password"
    //           value={password}
    //           onChange={handlePassword}
    //         />
    //       </div>
    //       <button type="submit">Log In</button>
    //       <p>
    //         Don't have an account? <Link to="/signup">Sign up</Link>
    //       </p>
    //     </form>
    //   </div>
    // );
  );
}

export default Login;
