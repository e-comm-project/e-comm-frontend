import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Box, Text, Image, Spinner, Heading } from "@chakra-ui/react";

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
      <Box borderWidth="1px" borderRadius="md" overflow="hidden" boxShadow="md">
        <Image
          src={product.image}
          alt={product.name}
          objectFit="cover"
          width="100%"
          height="100%"
        />
        <Box p="4">
          <Heading as="h2" size="xl" mb="4">
            {product.name}
          </Heading>
          <Text fontSize="xl" fontWeight="bold" mb="4">
            Price: ${product.price}
          </Text>
          <Text fontSize="lg">{product.description}</Text>
        </Box>
      </Box>
    </Box>
  );
};

export default ProductDetails;
