import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import SlideComponent from "../components/SlideComponent";
import {
  Box,
  Grid,
  Image,
  Text,
  Button,
  Heading,
  Center,
  Flex,
  useToast,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/cart.context.jsx";

const API_URL = import.meta.env.VITE_API_URL;

function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const cartcont = useContext(CartContext);
  const toast = useToast();

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

      const response = await axios.post(
        `${API_URL}/orders`,
        {
          products: [
            {
              product: product._id,
              quantity: 1,
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
      toast({
        title: "Product added.",
        description: `${product.name} has been added to your order.`,
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error adding order:", error);
      toast({
        title: "Error.",
        description: "There was an error adding the product to your order.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Randomly select three products for discount items
  const randomDiscountProducts = getRandomProducts(products, 4);

  // Randomly select three products for popular items
  const randomPopularProducts = getRandomProducts(products, 4);

  return (
    <div>
      <SlideComponent />
      <Heading as="h1" size="xl" textAlign="center">
        Discount
      </Heading>
      <Grid
        templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(4, 1fr)" }}
        gap={4}
        p={4}
      >
        {randomDiscountProducts.map((product) => (
          <ProductBox
            key={product.id}
            product={product}
            onClick={() => handleAddToOrder(product)}
          />
        ))}
      </Grid>

      <Heading as="h1" size="xl" textAlign="center" mt="8">
        Popular Items
      </Heading>
      {/* Render random popular items */}
      <Grid
        templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(4, 1fr)" }}
        gap={4}
        p={4}
      >
        {randomPopularProducts.map((product) => (
          <ProductBox
            key={product.id}
            product={product}
            onClick={() => handleAddToOrder(product)}
          />
        ))}
      </Grid>
    </div>
  );
}

// Function to get random products from the array
function getRandomProducts(products, count) {
  const randomProducts = [];
  while (randomProducts.length < count) {
    const randomIndex = Math.floor(Math.random() * products.length);
    const product = products[randomIndex];
    if (!randomProducts.includes(product)) {
      randomProducts.push(product);
    }
  }
  return randomProducts;
}

function ProductBox({ product, onClick }) {
  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="lg"
      transition="transform 0.3s ease-in-out"
      _hover={{ transform: "scale(1.05)" }}
      height="100%"
    >
      <Flex direction="column" height="100%">
        <Center flex="1" as={Link} to={`/product/${product._id}`}>
          <Image
            src={product.image}
            alt={product.name}
            maxH="300px"
            maxW="300px"
            objectFit="contain"
          />
        </Center>
        <Box p="6" textAlign="center" flex="1">
          <Text fontWeight="semibold">{product.name}</Text>
          <Text mt="2">
            <Text as="span" textDecoration="line-through" mr="2">
              ${product.price}
            </Text>
            ${(product.price * 0.85).toFixed(2)} (15% off)
          </Text>
          <Button mt="4" onClick={onClick}>
            Add to Order
          </Button>
        </Box>
      </Flex>
    </Box>
  );
}

export default HomePage;
