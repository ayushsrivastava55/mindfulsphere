import React from 'react';
import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Text,
  VStack,
  useColorModeValue,
  Icon,
  Button,
} from '@chakra-ui/react';
import { FaPhone, FaBook, FaPrayingHands, FaUserMd } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { Link as RouterLink } from 'react-router-dom';

interface Resource {
  title: string;
  description: string;
  icon: any;
  link: string;
}

const Resources: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const resources: Resource[] = [
    {
      title: 'Crisis Hotline',
      description: '24/7 support line for immediate assistance',
      icon: FaPhone,
      link: '/crisis',
    },
    {
      title: 'Self-Help Library',
      description: 'Articles and resources for mental wellness',
      icon: FaBook,
      link: '/library',
    },
    {
      title: 'Meditation Guide',
      description: 'Guided meditation and mindfulness exercises',
      icon: FaPrayingHands,
      link: '/meditation',
    },
    {
      title: 'Find a Therapist',
      description: 'Connect with mental health professionals',
      icon: FaUserMd,
      link: '/therapists',
    },
  ];

  return (
    <Container maxW="container.xl" py={10}>
      <VStack spacing={8} align="stretch">
        <Box textAlign="center">
          <Heading size="xl" mb={4}>
            Mental Health Resources
          </Heading>
          <Text fontSize="lg" color="gray.600">
            Access our comprehensive collection of mental health support resources
          </Text>
        </Box>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={8}>
          {resources.map((resource, index) => (
            <Box
              key={index}
              bg={bgColor}
              p={6}
              borderRadius="lg"
              border="1px"
              borderColor={borderColor}
              _hover={{ transform: 'translateY(-5px)', transition: 'all 0.2s' }}
            >
              <VStack spacing={4} align="center">
                <Icon as={resource.icon} w={10} h={10} color="brand.500" />
                <Heading size="md">{resource.title}</Heading>
                <Text textAlign="center" color="gray.600">
                  {resource.description}
                </Text>
                <Button
                  as={RouterLink}
                  to={resource.link}
                  colorScheme="brand"
                  variant="outline"
                  width="full"
                >
                  Learn More
                </Button>
              </VStack>
            </Box>
          ))}
        </SimpleGrid>
      </VStack>
    </Container>
  );
};

export default Resources;
