// UsersTab.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Button,
  VStack,
  Text,
  Spinner,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";

const API_URL = import.meta.env.VITE_API_URL;

const UsersTab = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get(`${API_URL}/admin/users`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDeleteUser = async (userId) => {
    try {
      const token = localStorage.getItem("authToken");
      await axios.delete(`${API_URL}/admin/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(users.filter((user) => user._id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return (
      <Alert status="error">
        <AlertIcon />
        {error}
      </Alert>
    );
  }

  return (
    <VStack spacing={4}>
      {users.map((user) => (
        <Box
          key={user._id}
          p={4}
          borderWidth={1}
          borderRadius="lg"
          w="100%"
          d="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Text>
            {user.username} - {user.email} - {user.role}
          </Text>
          <Button colorScheme="red" onClick={() => handleDeleteUser(user._id)}>
            Delete
          </Button>
        </Box>
      ))}
    </VStack>
  );
};

export default UsersTab;
