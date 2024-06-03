import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Text, VStack, Button, Spinner } from "@chakra-ui/react";

const API_URL = import.meta.env.VITE_API_URL;

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("authToken");

        if (!token) {
          throw new Error("No authorization token was found");
        }

        const response = await axios.get(`${API_URL}/orders`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setOrders(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleDelete = async (orderId) => {
    try {
      const token = localStorage.getItem("authToken");

      if (!token) {
        throw new Error("No authorization token was found");
      }

      await axios.delete(`${API_URL}/orders/${orderId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setOrders(orders.filter((order) => order._id !== orderId));
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  if (loading) {
    return (
      <Box textAlign="center" mt="5">
        <Spinner size="xl" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box textAlign="center" mt="5">
        <Text>Error: {error}</Text>
      </Box>
    );
  }

  return (
    <Box p={4}>
      <Text as="h2" fontSize="2xl" mb={4}>
        Orders
      </Text>
      {orders.length === 0 ? (
        <Text>No orders placed yet</Text>
      ) : (
        <VStack spacing={4}>
          {orders.map((order) => (
            <Box
              key={order._id}
              borderWidth="1px"
              borderRadius="md"
              overflow="hidden"
              p={4}
              width="100%"
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Text>Name: {order.products[0].product.name}</Text>
              <Text>Price: ${order.total}</Text>
              <Button colorScheme="red" onClick={() => handleDelete(order._id)}>
                Delete
              </Button>
            </Box>
          ))}
        </VStack>
      )}
    </Box>
  );
};

export default Orders;
