import { useContext } from "react";
import { Box, Button, Image, Text, VStack } from "@chakra-ui/react";
import { CartContext } from "../context/cart.context";

const Orders = () => {
  const { cart, deleteItem } = useContext(CartContext);

  const handleDelete = (index) => {
    deleteItem(index);
  };

  return (
    <Box p={4}>
      <Text as="h2" fontSize="2xl" mb={4}>
        Orders
      </Text>
      {cart.length === 0 ? (
        <Text>No orders placed yet</Text>
      ) : (
        <VStack spacing={4}>
          {cart.map((order, index) => (
            <Box
              key={index}
              borderWidth="1px"
              borderRadius="md"
              overflow="hidden"
              p={4}
              width="100%"
              display="flex"
              alignItems="center"
            >
              <Image
                src={order.image}
                alt={order.name}
                boxSize="100px"
                mr={4}
              />
              <Box flex="1">
                <Text>Name: {order.name}</Text>
                <Text>Price: {order.price}</Text>
              </Box>
              <Button colorScheme="red" onClick={() => handleDelete(index)}>
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
