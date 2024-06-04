import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  Box,
  Text,
  Image,
  Spinner,
  Heading,
  Button,
  SimpleGrid,
  StackDivider,
} from "@chakra-ui/react";

const API_URL = import.meta.env.VITE_API_URL;

const ProductDetails = () => {
  const { productId } = useParams(); // Get the product ID from URL params
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`${API_URL}/products/${productId}`);
        setProduct(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [productId]); // Include productId in the dependency array

  const handleAddToOrder = async (product) => {
    try {
      // Retrieve JWT token from local storage
      const token = localStorage.getItem("authToken");

      // Check if token exists
      if (!token) {
        // Optionally, handle the case when the token is missing
        console.error("Auth token not found in local storage");
        return;
      }

      // Make request to add order with JWT token in headers
      const response = await axios.post(
        `${API_URL}/orders`,
        {
          products: [
            {
              product: product._id,
              quantity: 1, // Assuming you always add one quantity at a time
              priceAtPurchase: product.price,
            },
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Order added:", response.data);
      // Optionally, you can provide feedback to the user that the order was added successfully
    } catch (error) {
      console.error("Error adding order:", error);
      // Optionally, provide error feedback to the user
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

  if (!product) {
    return (
      <Box textAlign="center" mt="5">
        <Text>No product found</Text>
      </Box>
    );
  }

  return (
    <Box p="5">
      <Heading as="h1" mb="5">
        Product Details
      </Heading>
      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={10}>
        <Box>
          <Image
            src={product.image}
            alt={product.name}
            objectFit="cover"
            width="100%"
            height="auto"
            mb="4"
          />
        </Box>
        <Box>
          <Heading
            lineHeight={1.1}
            fontWeight={600}
            fontSize={{ base: "2xl", sm: "4xl", lg: "5xl" }}
            mb="4"
          >
            {product.name}
          </Heading>
          <Text
            color="gray.400"
            fontWeight={300}
            fontSize={{ base: "xl", sm: "2xl" }}
            mb="4"
          >
            ${product.price}
          </Text>
          <Text fontSize={{ base: "xl", sm: "lg" }} mb="4">
            {product.description}
          </Text>
          <Button
            w="full"
            size="lg"
            bg="blue.400"
            color="white"
            _hover={{ bg: "blue.500" }}
            onClick={() => handleAddToOrder(product)}
          >
            Add to Cart
          </Button>
        </Box>
      </SimpleGrid>
    </Box>
  );
};

export default ProductDetails;
