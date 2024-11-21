import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Container,
  VStack,
  Input,
  Button,
  Text,
  useToast,
  Flex,
  Spacer,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    // Load previous chat messages
    loadChatHistory();
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const loadChatHistory = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/chat/history`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      // Get messages from the most recent chat
      const messages = response.data[0]?.messages || [];
      setMessages(messages);
    } catch (error) {
      console.error('Error loading chat history:', error);
      setMessages([]);
      toast({
        title: 'Error',
        description: 'Failed to load chat history. Please try again.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessage: Message = {
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/chat`,
        { message: input },
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );

      const assistantMessage: Message = {
        role: 'assistant',
        content: response.data.message,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: 'Error',
        description: 'Failed to send message. Please try again.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      // Remove the user message if sending failed
      setMessages((prev) => prev.slice(0, -1));
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  return (
    <Container maxW="container.md" py={8}>
      <VStack spacing={4} h="calc(100vh - 200px)">
        <Box
          flex={1}
          w="100%"
          overflowY="auto"
          borderRadius="md"
          bg="white"
          p={4}
          boxShadow="sm"
        >
          {messages && messages.length > 0 ? (
            messages.map((message, index) => (
              <Flex
                key={index}
                mb={4}
                flexDirection={message.role === 'user' ? 'row-reverse' : 'row'}
              >
                <Box
                  maxW="70%"
                  bg={message.role === 'user' ? 'brand.500' : 'gray.100'}
                  color={message.role === 'user' ? 'white' : 'black'}
                  p={3}
                  borderRadius="lg"
                >
                  <Text>{message.content}</Text>
                  <Text fontSize="xs" color={message.role === 'user' ? 'white' : 'gray.500'} mt={1}>
                    {new Date(message.timestamp).toLocaleTimeString()}
                  </Text>
                </Box>
              </Flex>
            ))
          ) : (
            <Text color="gray.500" textAlign="center">No messages yet. Start a conversation!</Text>
          )}
          <div ref={messagesEndRef} />
        </Box>

        <Flex w="100%" gap={2}>
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            disabled={isLoading}
          />
          <Button
            colorScheme="brand"
            onClick={handleSend}
            isLoading={isLoading}
            loadingText="Sending..."
          >
            Send
          </Button>
        </Flex>
      </VStack>
    </Container>
  );
};

export default Chat;
