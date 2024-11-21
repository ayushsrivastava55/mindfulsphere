# MindfulSphere - Mental Health Support Platform

MindfulSphere is a comprehensive mental health support platform that combines AI-powered chat assistance with valuable mental health resources. Our platform provides a safe, empathetic space for users to discuss their mental health concerns and access helpful resources.

## Features

- 🤖 AI-Powered Chat Support
- 📚 Mental Health Resources
- 🔒 Secure User Authentication
- 💡 Personalized Support
- 📱 Responsive Design

## Tech Stack

- Frontend: React with TypeScript
- Backend: Node.js with Express
- Database: MongoDB
- Authentication: JWT
- UI Framework: Chakra UI
- AI Integration: OpenAI GPT

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/mindfulsphere.git
cd mindfulsphere
```

2. Install dependencies for both frontend and backend:
```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

3. Set up environment variables:

Create a `.env` file in the backend directory with the following variables:
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
OPENAI_API_KEY=your_openai_api_key
```

4. Start the development servers:

```bash
# Start backend server
cd backend
npm run dev

# Start frontend server (in a new terminal)
cd frontend
npm start
```

## Contributing

We welcome contributions! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

If you encounter any issues or have questions, please open an issue in the repository.
