import React from 'react';
import { Box } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Chat from './pages/Chat';
import Login from './pages/Login';
import Register from './pages/Register';
import Resources from './pages/Resources';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Box minH="100vh" bg="gray.50">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/resources" element={<Resources />} />
          </Routes>
        </Box>
      </Router>
    </AuthProvider>
  );
}

export default App;
