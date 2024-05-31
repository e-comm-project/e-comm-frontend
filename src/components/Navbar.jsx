import React, { useState } from "react";
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
} from "@chakra-ui/react";
import { FiHome, FiUser, FiShoppingCart, FiHeart } from "react-icons/fi";

function Navbar() {
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
      padding={4}
      color="white"
    >
      {/* Left side */}
      <Flex align="center" mr={5}>
        {/* Home Link */}
        <Box as={RouterLink} to="/" mr={4} bg="black">
          <Icon as={FiHome} />
        </Box>
        {/* Contact Link */}
        <Box as={RouterLink} to="/contact" mr={4} bg="black">
          <Icon as={FiUser} />
        </Box>
        {/* About Link */}
        <Box as={RouterLink} to="/about" mr={4} bg="black">
          <Icon as={FiUser} />
        </Box>
      </Flex>

      {/* Right side */}
      <Box>
        <Stack direction="row" spacing={4}>
          {/* Login Icon with Menu */}
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
      </Box>
    </Flex>
  );
}

export default Navbar;
