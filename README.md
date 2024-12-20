# Chat Application Backend

This project is the backend implementation of a real-time chat application built using TypeScript, Express, Node.js, and Socket.IO. The backend provides APIs for authentication, user management, conversations, and messages, while enabling real-time messaging functionality through WebSockets.

## Features

- **Authentication**: Secure user authentication using JSON Web Tokens (JWT).
- **User Management**: APIs for creating, updating, and managing user profiles.
- **Conversations**: APIs for managing chat conversations.
- **Real-Time Messaging**: Enable instant messaging through Socket.IO.
- **Modular Architecture**: Organized codebase with separation of concerns for controllers, services, routes, and models.

## Prerequisites

- [Node.js](https://nodejs.org/) (v16 or above)
- [TypeScript](https://www.typescriptlang.org/)
- MongoDB Database

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and configure the following environment variables:
   ```env
   PORT=5000
   MONGO_URI=your-mongodb-connection-string
   JWT_SECRET=your-secret-key
   SOCKET_PORT=3000
   ```

4. Compile TypeScript code:
   ```bash
   npm run build
   ```

5. Start the server:
   ```bash
   npm start
   ```

## Project Structure

### Controllers
- **`authController.ts`**: Handles user authentication and registration.
- **`conversationController.ts`**: Manages CRUD operations for conversations.
- **`messageController.ts`**: Handles message-related functionality.
- **`userController.ts`**: Manages user data.

### Models
- **`conversationSchema.ts`**: Mongoose schema for conversations.
- **`messagesSchema.ts`**: Mongoose schema for messages.
- **`userModel.ts`**: Mongoose schema for users.

### Routes
- **`authRoutes.ts`**: Routes for authentication-related endpoints.
- **`conversationRoutes.ts`**: Routes for conversation-related endpoints.
- **`messageRoutes.ts`**: Routes for message-related endpoints.
- **`userRoutes.ts`**: Routes for user-related endpoints.

### Services
- **`authService.ts`**: Logic for authentication processes.
- **`conversationService.ts`**: Business logic for conversations.
- **`messageService.ts`**: Business logic for messages.
- **`userService.ts`**: Business logic for users.

### Types
- **`types.ts`**: TypeScript type definitions for shared interfaces and data models.

### Main Entry Point
- **`index.ts`**: Initializes the Express server, sets up middlewares, connects to the database, and integrates Socket.IO for real-time functionality.

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user.
- `POST /api/auth/login` - Login and generate JWT.

### User Management
- `GET /api/users` - Get all users.
- `GET /api/users/:id` - Get user by ID.
- `PUT /api/users/:id` - Update user by ID.

### Conversations
- `POST /api/conversations` - Create a new conversation.
- `GET /api/conversations/:userId` - Get conversations for a user.

### Messages
- `POST /api/messages` - Send a message.
- `GET /api/messages/:conversationId` - Get messages for a conversation.

## Real-Time Features

- **Socket.IO**: Implements WebSocket communication for instant messaging. Listens for and emits events like `messageSent` and `messageReceived`.

## Scripts

- `npm run dev`: Start the server in development mode with TypeScript compilation.
- `npm run build`: Compile TypeScript to JavaScript.
- `npm start`: Start the server in production mode.


## Folder Structure

```
server
├── controllers
│   ├── authController.ts
│   ├── conversationController.ts
│   ├── messageController.ts
│   ├── userController.ts
├── models
│   ├── conversationSchema.ts
│   ├── messagesSchema.ts
│   ├── userModel.ts
├── routes
│   ├── authRoutes.ts
│   ├── conversationRoutes.ts
│   ├── messageRoutes.ts
│   ├── userRoutes.ts
├── services
│   ├── authService.ts
│   ├── conversationService.ts
│   ├── messageService.ts
│   ├── userService.ts
├── types
│   ├── types.ts
├── index.ts
├── package.json
├── package-lock.json
├── tsconfig.json
```

## License

This project is licensed under the [MIT License](LICENSE).

---

Feel free to contribute to the project or raise issues if you encounter any bugs or have feature suggestions!

