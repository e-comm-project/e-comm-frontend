import React, { useState } from "react";
import {
  Box,
  Button,
  VStack,
  HStack,
  Text,
  useDisclosure,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";

const UserTab = ({ users, onDeleteUser }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [userIdToDelete, setUserIdToDelete] = useState(null);
  const cancelRef = React.useRef();

  const handleDeleteClick = (userId) => {
    setUserIdToDelete(userId);
    onOpen();
  };

  const handleDeleteUser = () => {
    onDeleteUser(userIdToDelete);
    onClose();
  };

  return (
    <Box>
      <VStack spacing={4} w="100%">
        {users.map((user) => (
          <Box
            key={user._id}
            p={4}
            borderWidth={1}
            borderRadius="lg"
            w="100%"
            boxShadow="md"
          >
            <VStack spacing={2} w="100%">
              <Text>
                {user.name} - {user.email}
              </Text>
              <HStack spacing={4} justifyContent="space-between" w="100%">
                <Button
                  colorScheme="red"
                  onClick={() => handleDeleteClick(user._id)}
                >
                  Delete
                </Button>
              </HStack>
            </VStack>
          </Box>
        ))}
      </VStack>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete User
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to delete this user? This action cannot be
              undone.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={handleDeleteUser} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
};

export default UserTab;
