import React, { useState, useContext } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Flex,
  Box,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Stack,
  Icon,
  Image,
  Spacer,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  useColorModeValue,
} from "@chakra-ui/react";
import { FiUser, FiShoppingCart, FiHeart, FiMenu } from "react-icons/fi";
import { AuthContext } from "../context/auth.context"; // Import AuthContext

function Navbar() {
  const { user, logOutUser } = useContext(AuthContext); // Access user context and logOutUser function
  const { isOpen, onOpen, onClose } = useDisclosure(); // For mobile menu toggle

  const [showAuthOptions, setShowAuthOptions] = useState(false);

  const handleAuthOptionsToggle = () => {
    setShowAuthOptions(!showAuthOptions);
  };

  const handleMenuClose = () => {
    setShowAuthOptions(false);
  };

  const handleMenuItemHover = () => {
    // Prevent the menu from closing when hovering over menu items
    setShowAuthOptions(true);
  };

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding={{ base: 3, md: 4 }}
      bg="gray.100"
      color="gray.800"
    >
      {/* Left side */}
      <Flex align="center">
        <Box display={{ base: "flex", md: "none" }} alignItems="center">
          <IconButton
            onClick={onOpen}
            icon={<FiMenu />}
            variant="outline"
            aria-label="Open Menu"
            isRound
          />
        </Box>
        <Box
          as={RouterLink}
          to="/"
          display={{ base: "none", md: "block" }}
          color="black"
          mr={4}
        >
          Home
        </Box>
        <Box
          as={RouterLink}
          to="/contact"
          display={{ base: "none", md: "block" }}
          color="black"
          mr={4}
        >
          Contact Us
        </Box>
        <Box
          as={RouterLink}
          to="/about"
          display={{ base: "none", md: "block" }}
          color="black"
          mr={4}
        >
          About Us
        </Box>
        <Box
          as={RouterLink}
          to="/products"
          display={{ base: "none", md: "block" }}
          color="black"
          mr={4}
        >
          Products
        </Box>
      </Flex>

      <Spacer />

      {/* Center Logo */}
      <Box>
        <Image
          src="https://i.ibb.co/vPR2WSP/ezgif-3-3d6b3770df.jpg"
          alt="Logo"
        />
      </Box>

      <Spacer />

      {/* Right side */}
      <Stack
        direction="row"
        spacing={4}
        align="center"
        display={{ base: "none", md: "flex" }}
      >
        {/* Login/Profile/Dashboard Icon with Menu */}
        <Menu onClose={handleMenuClose}>
          <MenuButton
            as={IconButton}
            icon={<Icon as={FiUser} />}
            aria-label="User"
            onMouseEnter={handleAuthOptionsToggle}
          />
          <MenuList
            display={showAuthOptions ? "block" : "none"}
            onMouseEnter={handleMenuItemHover}
            onMouseLeave={handleAuthOptionsToggle}
            bg="white"
          >
            {user ? (
              <>
                <MenuItem
                  as={RouterLink}
                  to={user.role === "admin" ? "/admin" : "/profile"}
                  color="black"
                  _hover={{ bg: "black", color: "blue.500" }}
                >
                  {user.role === "admin" ? "Dashboard" : "Profile"}
                </MenuItem>
                <MenuItem
                  onClick={logOutUser}
                  color="black"
                  _hover={{ bg: "black", color: "blue.500" }}
                >
                  Logout
                </MenuItem>
              </>
            ) : (
              <>
                <MenuItem
                  as={RouterLink}
                  to="/login"
                  color="black"
                  _hover={{ bg: "black", color: "blue.500" }}
                >
                  Login
                </MenuItem>
                <MenuItem
                  as={RouterLink}
                  to="/signup"
                  color="black"
                  _hover={{ bg: "black", color: "blue.500" }}
                >
                  Sign Up
                </MenuItem>
              </>
            )}
          </MenuList>
        </Menu>
        {/* Favorite Icon */}
        <IconButton icon={<Icon as={FiHeart} />} aria-label="Favorite" />
        {/* Cart Icon */}
        <IconButton
          as={RouterLink}
          to="/orders"
          icon={<Icon as={FiShoppingCart} />}
          aria-label="Cart"
        />
      </Stack>

      {/* Mobile menu */}
      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader borderBottomWidth="1px">Menu</DrawerHeader>
            <DrawerBody>
              <Stack as={"nav"} spacing={4}>
                <Box as={RouterLink} to="/" color="black" onClick={onClose}>
                  Home
                </Box>
                <Box
                  as={RouterLink}
                  to="/contact"
                  color="black"
                  onClick={onClose}
                >
                  Contact Us
                </Box>
                <Box
                  as={RouterLink}
                  to="/about"
                  color="black"
                  onClick={onClose}
                >
                  About Us
                </Box>
                <Box
                  as={RouterLink}
                  to="/products"
                  color="black"
                  onClick={onClose}
                >
                  Products
                </Box>
                {user ? (
                  <>
                    <Box
                      as={RouterLink}
                      to={user.role === "admin" ? "/admin" : "/profile"}
                      color="black"
                      onClick={onClose}
                    >
                      {user.role === "admin" ? "Dashboard" : "Profile"}
                    </Box>
                    <Box
                      color="black"
                      onClick={() => {
                        logOutUser();
                        onClose();
                      }}
                    >
                      Logout
                    </Box>
                  </>
                ) : (
                  <>
                    <Box
                      as={RouterLink}
                      to="/login"
                      color="black"
                      onClick={onClose}
                    >
                      Login
                    </Box>
                    <Box
                      as={RouterLink}
                      to="/signup"
                      color="black"
                      onClick={onClose}
                    >
                      Sign Up
                    </Box>
                  </>
                )}
                <Box
                  as={RouterLink}
                  to="/orders"
                  color="black"
                  onClick={onClose}
                >
                  <Icon as={FiShoppingCart} /> Cart
                </Box>
              </Stack>
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </Flex>
  );
}

export default Navbar;
