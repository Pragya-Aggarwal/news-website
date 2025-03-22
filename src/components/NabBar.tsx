import React from "react";
import { Box, Flex, HStack, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
  onClick?: () => void;
}

const Navbar: React.FC = () => {
  return (
    <Box
      bg="blue.600"
      px={6}
      py={3}
      position="fixed"
      w="100%"
      top={0}
      zIndex={1000}
      boxShadow="md"
    >
      <Flex justifyContent="space-between" alignItems="center">
        <Link to="/category/science">
          <Text fontSize="xl" fontWeight="bold" color="white">
            NewsToday
          </Text>
        </Link>

        <HStack gap={6} display={{ base: "none", md: "flex" }}>
          <NavLink to="/category/science">Home</NavLink>
          <NavLink to="/category/business">Business</NavLink>
          <NavLink to="/category/sports">Sports</NavLink>
          <NavLink to="/category/technology">Technology</NavLink>
          <NavLink to="/category/health">Health</NavLink>
          <NavLink to="/category/politics">Politics</NavLink>
        </HStack>
      </Flex>
    </Box>
  );
};

const NavLink: React.FC<NavLinkProps> = ({ to, children, onClick }) => (
  <Link to={to} onClick={onClick}>
    <Text fontSize="xl" color="white" _hover={{ textDecoration: "underline" }}>
      {children}
    </Text>
  </Link>
);

export default Navbar;
