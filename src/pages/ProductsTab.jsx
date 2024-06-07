import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  VStack,
  HStack,
  Text,
  Image,
  Flex,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  useToast,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Select,
} from "@chakra-ui/react";

const API_URL = import.meta.env.VITE_API_URL;

const ProductsTab = ({
  products,
  setProducts,
  onDeleteProduct,
  onUpdateProduct,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isDeleteDialogOpen,
    onOpen: onOpenDeleteDialog,
    onClose: onCloseDeleteDialog,
  } = useDisclosure();
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
  const [currentProduct, setCurrentProduct] = useState(null);
  const [productIdToDelete, setProductIdToDelete] = useState(null);
  const toast = useToast();
  const cancelRef = React.useRef();

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
      toast({
        title: "Product added.",
        description: "The product has been successfully added.",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error adding product:", error);
      toast({
        title: "Error adding product.",
        description: "There was an error adding the product.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
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
      await onUpdateProduct(currentProduct._id, form);
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
      toast({
        title: "Error updating product.",
        description: "There was an error updating the product.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const handleDeleteClick = (productId) => {
    setProductIdToDelete(productId);
    onOpenDeleteDialog();
  };

  const handleDeleteProduct = () => {
    onDeleteProduct(productIdToDelete);
    onCloseDeleteDialog();
  };

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
                  onClick={() => handleDeleteClick(product._id)}
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
              <Select
                name="genre"
                value={form.genre}
                placeholder="Select genre"
                onChange={handleInputChange}
              >
                <option value="Men">Men</option>
                <option value="Women">Women</option>
              </Select>
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

      <AlertDialog
        isOpen={isDeleteDialogOpen}
        leastDestructiveRef={cancelRef}
        onClose={onCloseDeleteDialog}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Product
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to delete this product? This action cannot
              be undone.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onCloseDeleteDialog}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={handleDeleteProduct} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
};

export default ProductsTab;
