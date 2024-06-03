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
        <Flex
          justify={"center"}
          mt={12}
          h={"120px"}
          w={"full"}
          src={user?.image}
          objectFit="cover"
        >
          <Avatar //how to make the image editable in the profile page
            // click on the image to choose image from the local storage
            size={"2xl"}
            src={user?.image}
            alt={"Avatar Alt"}
            _hover={{
              cursor: "pointer",
            }}
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
