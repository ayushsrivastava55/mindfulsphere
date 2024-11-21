import React from 'react';
import {
  Box,
  Button,
  Container,
  Heading,
  Text,
  VStack,
  SimpleGrid,
  Icon,
  useColorModeValue,
} from '@chakra-ui/react';
import { FaHeart, FaBrain, FaUsers } from 'react-icons/fa';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { IconType } from 'react-icons';

interface FeatureProps {
  icon: IconType;
  title: string;
  text: string;
}

const Feature: React.FC<FeatureProps> = ({ icon, title, text }) => {
  return (
    <VStack
      p={5}
      bg={useColorModeValue('white', 'gray.800')}
      rounded="lg"
      shadow="md"
      borderWidth="1px"
      spacing={3}
      align="center"
      _hover={{ transform: 'translateY(-5px)', transition: 'all 0.2s' }}
    >
      <Icon as={icon} w={10} h={10} color="brand.500" />
      <Text fontWeight="bold" fontSize="lg">
        {title}
      </Text>
      <Text textAlign="center" color={useColorModeValue('gray.600', 'gray.400')}>
        {text}
      </Text>
    </VStack>
  );
};

const Home: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Box bg={useColorModeValue('gray.50', 'gray.900')} minH="100vh">
      <Container maxW="container.xl" py={20}>
        <VStack spacing={8} textAlign="center" mb={16}>
          <Heading
            as="h1"
            size="2xl"
            bgGradient="linear(to-r, brand.500, brand.600)"
            bgClip="text"
          >
            Welcome to MindfulSphere
          </Heading>
          <Text fontSize="xl" color={useColorModeValue('gray.600', 'gray.400')} maxW="2xl">
            Welcome to your safe space for mental health support and personal growth. Our AI-powered
            assistant is here 24/7 to provide empathetic conversations and valuable mental health resources.
          </Text>
          {!isAuthenticated && (
            <Button
              as={RouterLink}
              to="/register"
              size="lg"
              colorScheme="brand"
              px={8}
              _hover={{ transform: 'translateY(-2px)', boxShadow: 'lg' }}
            >
              Get Started
            </Button>
          )}
        </VStack>

        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10} mb={16}>
          <Feature
            icon={FaHeart}
            title="Empathetic Support"
            text="Experience compassionate and understanding conversations tailored to your needs."
          />
          <Feature
            icon={FaBrain}
            title="Mental Wellness"
            text="Access evidence-based resources and techniques for maintaining mental well-being."
          />
          <Feature
            icon={FaUsers}
            title="Growing Community"
            text="Join thousands of users who have found support and guidance through MindfulSphere."
          />
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default Home;
