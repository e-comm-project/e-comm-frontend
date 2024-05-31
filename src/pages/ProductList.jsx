import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Grid,
  GridItem,
  Heading,
  Text,
  Image,
  Spinner,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import Product from "../components/product";

const API_URL = import.meta.env.VITE_API_URL;

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${API_URL}/products`);
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <Box textAlign="center" mt="5">
        <Spinner size="xl" />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert status="error" mt="5">
        <AlertIcon />
        {error}
      </Alert>
    );
  }

  return (
    <Box p="5">
      <Heading as="h1" mb="5">
        Product List
      </Heading>
      <Grid
        templateColumns={{
          base: "repeat(1, 1fr)",
          sm: "repeat(2, 1fr)",
          md: "repeat(3, 1fr)",
          lg: "repeat(4, 1fr)",
        }}
        gap="6"
      >
        {products.map((product) => (
          <Product key={product.id} product={product} />
          // <GridItem
          //   key={product._id}
          //   borderWidth="1px"
          //   borderRadius="md"
          //   overflow="hidden"
          //   boxShadow="md"
          //   position="relative"
          // >
          //   <Image
          //     src={product.image}
          //     alt={product.name}
          //     objectFit="cover"
          //     width="100%"
          //     height="100%"
          //   />
          //   <Box
          //     position="absolute"
          //     bottom="0"
          //     left="0"
          //     width="100%"
          //     bg="rgba(0, 0, 0, 0.6)"
          //     color="white"
          //     p="3"
          //     textAlign="center"
          //   >
          //     <Heading as="h2" size="md" mb="2">
          //       {product.name}
          //     </Heading>
          //     <Text mb="2">{product.description}</Text>
          //     <Text fontWeight="bold">Price: ${product.price}</Text>
          //   </Box>
          // </GridItem>
        ))}
      </Grid>
    </Box>
  );
};

export default ProductList;
