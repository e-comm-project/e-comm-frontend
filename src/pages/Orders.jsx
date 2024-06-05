import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Text,
  VStack,
  Button,
  Spinner,
  Image,
  Heading,
  Stack,
  Divider,
} from "@chakra-ui/react";
import PaymentMethod from "../components/PaymentMethod"; // Import the PaymentMethod component

const API_URL = import.meta.env.VITE_API_URL;

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);

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

  useEffect(() => {
    // Calculate the total price of all orders
    const total = orders.reduce((acc, order) => acc + order.total, 0);
    setTotalPrice(total);
  }, [orders]);

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
    <Box>
      <VStack spacing={6} mb={8}>
        {orders.length === 0 ? (
          <Text textAlign="center">No orders placed yet</Text>
        ) : (
          orders.map((order) => (
            <Box
              key={order._id}
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              p="5"
              w="100%"
              boxShadow="md"
            >
              <Stack direction={["column", "row"]} spacing="4" align="center">
                <Image
                  boxSize="100px"
                  objectFit="cover"
                  src={order.products[0].product.image}
                  alt={order.products[0].product.name}
                  fallbackSrc="https://via.placeholder.com/100"
                />
                <Box flex="1">
                  <Text fontSize="md" fontWeight="semibold" noOfLines={1}>
                    {order.products[0].product.name}
                  </Text>
                  <Text fontSize="xl" fontWeight="bold" color="teal.500">
                    Price: ${order.total}
                  </Text>
                </Box>
                <Button
                  colorScheme="red"
                  onClick={() => handleDelete(order._id)}
                  aria-label={`Delete order for ${order.products[0].product.name}`}
                >
                  Delete
                </Button>
              </Stack>
              <Divider mt="4" />
            </Box>
          ))
        )}
      </VStack>
      {orders.length > 0 && <PaymentMethod totalPrice={totalPrice} />}
    </Box>
  );
};

export default Orders;
