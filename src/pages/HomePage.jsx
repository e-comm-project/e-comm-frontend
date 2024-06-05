import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import SlideComponent from "../components/SlideComponent";
import { Box, Grid, Image, Text, Button, Heading } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/cart.context.jsx";

const API_URL = import.meta.env.VITE_API_URL;

function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const cartcont = useContext(CartContext);

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
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Randomly select three products for discount items
  const randomDiscountProducts = getRandomProducts(products, 3);

  // Randomly select three products for popular items
  const randomPopularProducts = getRandomProducts(products, 3);

  return (
    <div>
      <SlideComponent />
      <Heading as="h1" size="xl" textAlign="center">
        Discount
      </Heading>
      {/* Render random products with 15% discount */}
      <Grid templateColumns="repeat(3, 1fr)" gap={4}>
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
      <Grid templateColumns="repeat(3, 1fr)" gap={4}>
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

// Product box component to display individual product
function ProductBox({ product, onClick }) {
  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="lg"
      transition="transform 0.3s ease-in-out"
      _hover={{ transform: "scale(1.05)" }}
    >
      <Image src={product.image} alt={product.name} />
      <Box p="6">
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
    </Box>
  );
}

export default HomePage;
