import React, { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/auth.context";
import {
  Heading,
  Avatar,
  Box,
  Center,
  Flex,
  Stack,
  useColorModeValue,
  Input,
  useToast,
} from "@chakra-ui/react";

const API_URL = import.meta.env.VITE_API_URL;

function Profile() {
  const { user, authenticateUser, setUser } = useContext(AuthContext);
  const [image, setImage] = useState(user?.image || "");
  const toast = useToast();

  const handleImageChange = async (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("image", file);

      try {
        const response = await axios.post(
          `${API_URL}/profile/upload`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }
        );

        console.log("Server response:", response); // Add this line to log the response

        if (response.status === 200 && response.data.image) {
          setImage(response.data.image);

          // Update user data in context and local storage
          const updatedUser = { ...user, image: response.data.image };
          setUser(updatedUser);
          localStorage.setItem("user", JSON.stringify(updatedUser));

          toast({
            title: "Profile picture updated.",
            description: "Your profile picture has been successfully updated.",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
        } else {
          throw new Error("Invalid response from server");
        }
      } catch (error) {
        console.error("Error uploading image", error);
        toast({
          title: "Error uploading image.",
          description: "There was an error uploading your profile picture.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    }
  };

  return (
    <Center py={6}>
      <Box
        maxW={{ base: "90%", md: "400px" }}
        w={"full"}
        bg={useColorModeValue("white", "gray.800")}
        boxShadow={"2xl"}
        rounded={"md"}
        overflow={"hidden"}
      >
        <Flex justify={"center"} mt={12}>
          <Input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            display="none"
            id="file-input"
          />
          <Avatar
            size={"2xl"}
            src={image}
            alt={"Avatar Alt"}
            _hover={{
              cursor: "pointer",
            }}
            onClick={() => document.getElementById("file-input").click()}
          />
        </Flex>

        <Box p={6}>
          <Stack spacing={0} align={"center"} mb={5}>
            <Heading
              fontSize={{ base: "xl", md: "2xl" }}
              fontWeight={500}
              fontFamily={"body"}
            >
              {user.name}
            </Heading>
            <Heading
              fontSize={{ base: "md", md: "lg" }}
              fontWeight={400}
              fontFamily={"body"}
            >
              {user.email}
            </Heading>
          </Stack>
        </Box>
      </Box>
    </Center>
  );
}

export default Profile;
