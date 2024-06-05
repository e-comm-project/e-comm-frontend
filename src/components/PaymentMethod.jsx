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
  HStack,
  Image,
  useToast,
} from "@chakra-ui/react";

const PaymentMethod = ({ totalPrice }) => {
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const toast = useToast();

  const handlePayment = () => {
    console.log("Payment processed!");
    toast({
      title: "Payment Successful",
      description: "Your payment has been processed.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  return (
    <Box
      maxW={{ base: "90%", md: "600px" }}
      mx="auto"
      p={{ base: "4", md: "8" }}
      my={{ base: "4", md: "6" }}
      borderWidth="1px"
      borderRadius="lg"
      boxShadow="md"
      borderColor="gray.300"
    >
      <Heading
        as="h2"
        fontSize={{ base: "xl", md: "2xl" }}
        mb={4}
        textAlign="center"
      >
        Payment Details
      </Heading>
      <HStack justifyContent="center" mb={4} spacing={{ base: 1, md: 4 }}>
        <Image
          src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg"
          alt="Visa"
          height={{ base: "24px", md: "32px" }}
          maxW={{ base: "30px", md: "50px" }}
        />
        <Image
          src="https://upload.wikimedia.org/wikipedia/commons/a/a4/Mastercard_2019_logo.svg"
          alt="Mastercard"
          height={{ base: "24px", md: "32px" }}
          maxW={{ base: "30px", md: "50px" }}
        />
        <Image
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/American_Express_logo_%282018%29.svg/601px-American_Express_logo_%282018%29.svg.png?20191022102801"
          alt="American Express"
          height={{ base: "24px", md: "32px" }}
          maxW={{ base: "30px", md: "50px" }}
        />
        <Image
          src="https://upload.wikimedia.org/wikipedia/commons/3/37/Discover-logo.png?20210625133609"
          alt="Discover"
          height={{ base: "24px", md: "32px" }}
          maxW={{ base: "30px", md: "50px" }}
        />
      </HStack>
      <VStack spacing={4}>
        <FormControl id="cardNumber" isRequired>
          <FormLabel>Card Number</FormLabel>
          <Input
            type="text"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            borderColor="gray.300"
            placeholder="5925 6793 5385 4859"
            variant="filled"
          />
        </FormControl>
        <FormControl id="expiryDate" isRequired>
          <FormLabel>Expiry Date</FormLabel>
          <Input
            type="text"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
            borderColor="gray.300"
            placeholder="07/27"
            variant="filled"
          />
        </FormControl>
        <FormControl id="cvv" isRequired>
          <FormLabel>CVV</FormLabel>
          <Input
            type="text"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
            borderColor="gray.300"
            placeholder="559"
            variant="filled"
          />
        </FormControl>
        <Divider />
        <Text fontSize="xl" fontWeight="bold" textAlign="center">
          Total Price to Pay: ${totalPrice.toFixed(2)}
        </Text>
        <Button colorScheme="teal" onClick={handlePayment} w="full">
          Pay Now
        </Button>
      </VStack>
    </Box>
  );
};

export default PaymentMethod;
