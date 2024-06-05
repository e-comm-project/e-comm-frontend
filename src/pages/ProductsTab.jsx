import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Button,
  VStack,
  HStack,
  Text,
  Spinner,
  Alert,
  AlertIcon,
  Input,
  FormControl,
  FormLabel,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Image,
  Flex, // Import Flex component
  useBreakpointValue, // Import useBreakpointValue for responsive values
} from "@chakra-ui/react";

const API_URL = import.meta.env.VITE_API_URL;

const ProductsTab = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    brand: "",
    image: "",
    rating: "",
    numReviews: "",
    countInStock: "",
    genre: "",
  });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [currentProduct, setCurrentProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get(`${API_URL}/admin/products`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddProduct = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.post(`${API_URL}/admin/products`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts([...products, response.data]);
      setForm({
        name: "",
        price: "",
        description: "",
        category: "",
        brand: "",
        image: "",
        rating: "",
        numReviews: "",
        countInStock: "",
        genre: "",
      });
      onClose();
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const handleEditProduct = (product) => {
    setCurrentProduct(product);
    setForm({
      name: product.name,
      price: product.price,
      description: product.description,
      category: product.category,
      brand: product.brand,
      image: product.image,
      rating: product.rating,
      numReviews: product.numReviews,
      countInStock: product.countInStock,
      genre: product.genre,
    });
    onOpen();
  };

  const handleUpdateProduct = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.put(
        `${API_URL}/admin/products/${currentProduct._id}`,
        form,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setProducts(
        products.map((p) => (p._id === currentProduct._id ? response.data : p))
      );
      setCurrentProduct(null);
      setForm({
        name: "",
        price: "",
        description: "",
        category: "",
        brand: "",
        image: "",
        rating: "",
        numReviews: "",
        countInStock: "",
        genre: "",
      });
      onClose();
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      const token = localStorage.getItem("authToken");
      await axios.delete(`${API_URL}/admin/products/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(products.filter((product) => product._id !== productId));
    } catch (error) {
      console.error("Error deleting product:", error);
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
    <Box>
      <HStack spacing={4} mb={4}>
        <Button colorScheme="teal" onClick={onOpen}>
          Add Product
        </Button>
      </HStack>
      <VStack spacing={4}>
        {products.map((product) => (
          <Box
            key={product._id}
            p={4}
            borderWidth={1}
            borderRadius="lg"
            w="100%"
            boxShadow="md"
          >
            <Flex
              direction={{ base: "column", md: "row" }} // Adjust flex direction based on screen size
              justifyContent="space-between"
              alignItems={{ base: "flex-start", md: "center" }} // Align items based on screen size
              w="100%"
            >
              <HStack spacing={4} mb={{ base: 4, md: 0 }}>
                <Image
                  boxSize="100px"
                  objectFit="cover"
                  src={product.image}
                  alt={product.name}
                />
                <Text>
                  {product.name} - {product.description} - ${product.price}
                </Text>
              </HStack>
              <HStack spacing={4}>
                <Button
                  colorScheme="blue"
                  onClick={() => handleEditProduct(product)}
                >
                  Edit
                </Button>
                <Button
                  colorScheme="red"
                  onClick={() => handleDeleteProduct(product._id)}
                >
                  Delete
                </Button>
              </HStack>
            </Flex>
          </Box>
        ))}
      </VStack>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {currentProduct ? "Edit Product" : "Add Product"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mb={4}>
              <FormLabel>Name</FormLabel>
              <Input
                name="name"
                value={form.name}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Price</FormLabel>
              <Input
                name="price"
                value={form.price}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Description</FormLabel>
              <Input
                name="description"
                value={form.description}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Category</FormLabel>
              <Input
                name="category"
                value={form.category}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Brand</FormLabel>
              <Input
                name="brand"
                value={form.brand}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Image URL</FormLabel>
              <Input
                name="image"
                value={form.image}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Rating</FormLabel>
              <Input
                name="rating"
                value={form.rating}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Number of Reviews</FormLabel>
              <Input
                name="numReviews"
                value={form.numReviews}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Count in Stock</FormLabel>
              <Input
                name="countInStock"
                value={form.countInStock}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Genre</FormLabel>
              <Input
                name="genre"
                value={form.genre}
                onChange={handleInputChange}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={currentProduct ? handleUpdateProduct : handleAddProduct}
            >
              {currentProduct ? "Update" : "Add"}
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ProductsTab;
