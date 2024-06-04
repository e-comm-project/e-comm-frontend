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
} from "@chakra-ui/react";
import { FiUser, FiShoppingCart, FiHeart } from "react-icons/fi";
import { AuthContext } from "../context/auth.context"; // Import AuthContext

function Navbar() {
  const [showAuthOptions, setShowAuthOptions] = useState(false);
  const { user, logOutUser } = useContext(AuthContext); // Access user context and logOutUser function

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
      bg="dark"
      color="white"
    >
      {/* Left side */}
      <Flex align="center" mr={5}>
        {/* Home Link */}
        <Box as={RouterLink} to="/" color="black" mr={4}>
          Home
        </Box>
        {/* Contact Us Link */}
        <Box as={RouterLink} to="/contact" color="black" mr={4}>
          Contact Us
        </Box>
        {/* About Us Link */}
        <Box as={RouterLink} to="/about" color="black" mr={4}>
          About Us
        </Box>
        {/* Women Link */}
        <Box as={RouterLink} to="/products" color="black" mr={4}>
          Women
        </Box>
      </Flex>

      <Spacer />

      {/* Center Logo */}
      <Box>
        <Image
          src="https://i.ibb.co/6v77dhS/66.jpg"
          alt="Logo"
          boxSize="absolute"
        />
      </Box>

      <Spacer />

      {/* Right side */}
      <Stack direction="row" spacing={4} align="center">
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
    </Flex>
  );
}

export default Navbar;
