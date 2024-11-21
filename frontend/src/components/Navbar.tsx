import React from 'react';
import { Box, Flex, Button, Text, HStack, useToast } from '@chakra-ui/react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar: React.FC = () => {
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

  const handleLogout = () => {
    logout();
    toast({
      title: 'Logged out successfully',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
    navigate('/');
  };

  return (
    <Box as="nav" bg="white" boxShadow="sm" py={4}>
      <Flex maxW="container.xl" mx="auto" px={4} justify="space-between" align="center">
        <RouterLink to="/">
          <Text fontSize="xl" fontWeight="bold" color="brand.500">
            MindfulSphere
          </Text>
        </RouterLink>

        <HStack spacing={4}>
          {isAuthenticated ? (
            <>
              <RouterLink to="/chat">
                <Button variant="ghost">Chat</Button>
              </RouterLink>
              <RouterLink to="/resources">
                <Button variant="ghost">Resources</Button>
              </RouterLink>
              <Button onClick={handleLogout} variant="outline">
                Logout
              </Button>
            </>
          ) : (
            <>
              <RouterLink to="/login">
                <Button variant="ghost">Login</Button>
              </RouterLink>
              <RouterLink to="/register">
                <Button variant="solid">Sign Up</Button>
              </RouterLink>
            </>
          )}
        </HStack>
      </Flex>
    </Box>
  );
};

export default Navbar;
