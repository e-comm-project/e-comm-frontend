import React from "react";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import {
  Heading,
  Avatar,
  Box,
  Center,
  Image,
  Flex,
  Stack,
  useColorModeValue,
  Input,
} from "@chakra-ui/react";

function Profile() {
  const { user } = useContext(AuthContext);

  return (
    <Center py={6}>
      <Box
        maxW={"400px"}
        w={"full"}
        maxH="50vh"
        height={"full"}
        bg={useColorModeValue("white", "gray.800")}
        boxShadow={"2xl"}
        rounded={"md"}
        overflow={"hidden"}
      >
        <Image h={"120px"} w={"full"} src={user?.image} objectFit="cover" />
        <Flex justify={"center"} mt={-12}>
          <Avatar
            size={"xl"}
            src={
              "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ"
            }
          />
        </Flex>

        <Box p={6}>
          <Stack spacing={0} align={"center"} mb={5}>
            <Heading fontSize={"2xl"} fontWeight={500} fontFamily={"body"}>
              {user.name}
            </Heading>
            <Heading fontSize={"2xl"} fontWeight={500} fontFamily={"body"}>
              {user.email}
            </Heading>
          </Stack>
        </Box>
      </Box>
    </Center>
  );
}

export default Profile;
