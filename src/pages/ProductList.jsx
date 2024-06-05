import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Box,
  Grid,
  Heading,
  Text,
  Image,
  Spinner,
  Alert,
  AlertIcon,
  Button,
  GridItem,
  Select,
} from "@chakra-ui/react";

const API_URL = import.meta.env.VITE_API_URL;

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${API_URL}/products`);
        const productData = response.data;
        setProducts(productData);
        setFilteredProducts(productData);
        setLoading(false);

        // Extract categories
        const categorySet = new Set(
          productData.map((product) => product.category)
        );
        setCategories(Array.from(categorySet));
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToOrder = async (product) => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
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
    } catch (error) {
      console.error("Error adding order:", error);
    }
  };

  const handleCategoryChange = (event) => {
    const category = event.target.value;
    setSelectedCategory(category);
    if (category === "") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(
        products.filter((product) => product.category === category)
      );
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

      <Box mb="5">
        <Select
          placeholder="Filter by Category"
          onChange={handleCategoryChange}
          value={selectedCategory}
        >
          <option value="">All Categories</option>
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </Select>
      </Box>

      <Grid
        templateColumns={{
          base: "repeat(1, 1fr)",
          sm: "repeat(2, 1fr)",
          md: "repeat(3, 1fr)",
          lg: "repeat(4, 1fr)",
        }}
        gap="6"
      >
        {filteredProducts.map((product) => (
          <GridItem
            key={product.id}
            borderWidth="1px"
            borderRadius="md"
            overflow="hidden"
            boxShadow="md"
            position="relative"
          >
            <Link to={`/product/${product._id}`}>
              <Image
                src={product.image}
                alt={product.name}
                objectFit="cover"
                width="100%"
                height="100%"
              />
            </Link>
            <Box
              position="absolute"
              bottom="0"
              left="0"
              width="100%"
              bg="rgba(0, 0, 0, 0.6)"
              color="white"
              p="3"
              textAlign="center"
            >
              <Heading as="h2" size="md" mb="2">
                {product.name}
              </Heading>
              <Text mb="2">{product.description}</Text>
              <Text fontWeight="bold">Price: ${product.price}</Text>
              <Button onClick={() => handleAddToOrder(product)}>
                Add to Order
              </Button>
            </Box>
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
};

export default ProductList;
