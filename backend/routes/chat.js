const router = require('express').Router();
const OpenAI = require('openai');
const Chat = require('../models/Chat');
const auth = require('../middleware/auth');

// Fallback responses for testing
const FALLBACK_RESPONSES = [
    "I hear that you're going through a difficult time. While I'm here to listen and support you, remember that I'm a test assistant. Would you like to tell me more about what's on your mind?",
    "Thank you for sharing that with me. It takes courage to open up. How long have you been feeling this way?",
    "I understand this is challenging. While I'm here to support you, I want to remind you that speaking with a mental health professional can provide more comprehensive help. Would you like to explore what you're feeling further?",
    "Your feelings are valid, and it's important to acknowledge them. Have you considered talking to someone you trust about this?",
    "It sounds like you're dealing with a lot right now. Let's take it one step at a time. What would feel like a manageable first step for you?",
    "I appreciate you trusting me with your thoughts. While I'm in test mode, I want you to know that your well-being matters. What kind of support are you looking for right now?"
];

let responseIndex = 0;

// Get a rotating fallback response
const getFallbackResponse = () => {
    const response = FALLBACK_RESPONSES[responseIndex];
    responseIndex = (responseIndex + 1) % FALLBACK_RESPONSES.length;
    return response;
};

// Initialize OpenAI client
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// Start or continue chat
router.post('/', auth, async (req, res) => {
    try {
        const { message } = req.body;
        if (!message) {
            return res.status(400).json({ message: 'Message is required' });
        }

        const userId = req.user.id;
        console.log('Processing message for user:', userId);

        let chat = await Chat.findOne({ 
            user: userId,
            createdAt: { 
                $gte: new Date(new Date().setHours(0,0,0,0)) 
            }
        });

        if (!chat) {
            chat = new Chat({
                user: userId,
                messages: []
            });
            console.log('Created new chat for user:', userId);
        }

        // Add user message
        const userMessage = {
            role: 'user',
            content: message,
            timestamp: new Date()
        };
        chat.messages.push(userMessage);
        console.log('Added user message:', userMessage);

        // Use fallback response instead of OpenAI
        const aiResponse = getFallbackResponse();
        console.log('Using fallback response:', aiResponse);

        // Add AI response to chat
        const assistantMessage = {
            role: 'assistant',
            content: aiResponse,
            timestamp: new Date()
        };
        chat.messages.push(assistantMessage);
        console.log('Added assistant message:', assistantMessage);

        // Save chat to database
        await chat.save();
        console.log('Saved chat to database');

        return res.json({ message: aiResponse });

    } catch (error) {
        console.error('Server Error:', error);
        res.status(500).json({ 
            message: 'An error occurred while processing your message.',
            error: error.message 
        });
    }
});

// Get chat history
router.get('/history', auth, async (req, res) => {
    try {
        const userId = req.user.id;
        console.log('Fetching chat history for user:', userId);
        
        const chats = await Chat.find({ user: userId })
            .sort({ createdAt: -1 })
            .limit(1);
            
        console.log('Found chats:', chats.length);
        res.json(chats);
    } catch (error) {
        console.error('Chat history error:', error);
        res.status(500).json({ 
            message: 'Error fetching chat history', 
            error: error.message 
        });
    }
});

module.exports = router;
