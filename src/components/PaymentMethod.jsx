import React, { useState } from "react";
import {
  Box,
  Heading,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Divider,
} from "@chakra-ui/react";

const PaymentMethod = ({ totalPrice }) => {
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");

  const handlePayment = () => {
    // Here you can handle the payment process
    console.log("Payment processed!");
  };

  return (
    <Box
      maxW="600px"
      mx="auto"
      p="4"
      my="6"
      borderWidth="1px"
      borderRadius="lg"
      boxShadow="md"
    >
      <Heading as="h2" fontSize="2xl" mb={4} textAlign="center">
        Payment Details
      </Heading>
      <VStack spacing={4}>
        <FormControl id="cardNumber" isRequired>
          <FormLabel>Card Number</FormLabel>
          <Input
            type="text"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
          />
        </FormControl>
        <FormControl id="expiryDate" isRequired>
          <FormLabel>Expiry Date</FormLabel>
          <Input
            type="text"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
          />
        </FormControl>
        <FormControl id="cvv" isRequired>
          <FormLabel>CVV</FormLabel>
          <Input
            type="text"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
          />
        </FormControl>
        <Divider />
        <Text fontSize="xl" fontWeight="bold" textAlign="center">
          Total Price to Pay: ${totalPrice.toFixed(2)}
        </Text>
        <Button colorScheme="teal" onClick={handlePayment}>
          Pay Now
        </Button>
      </VStack>
    </Box>
  );
};

export default PaymentMethod;
