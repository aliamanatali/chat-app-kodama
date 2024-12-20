import dotenv from 'dotenv';
dotenv.config({ path: '../env' });

import express from 'express';
import mongoose from 'mongoose';
import userRoutes from './routes/userRoutes';
import authRoutes from './routes/authRoutes';
import messageRoutes from './routes/messageRoutes';
import conversationRoutes from './routes/conversationRoutes';
import cors from 'cors';
import { Server } from 'socket.io';
import { UserModel } from './models/userModel';
import { User } from './types/types';

const io = new Server(8000, {
  cors: {
    origin: 'http://localhost:3000',
  },
});

let users: { userId: string; socketId: string }[] = [];

io.on('connection', (socket) => {
  console.log('A user connected', socket.id);
  socket.on('addUser', (userId) => {
    const isUserExist = users.find((user) => user.userId === userId);

    if (!isUserExist) {
      const user = { userId, socketId: socket.id };
      users.push(user);
    }

    io.emit('getUsers', users);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected', socket.id);
    users = users.filter((user) => user.socketId !== socket.id);
    io.emit('getUsers', users);
  });

  socket.on('sendMessage', async ({receiverId, senderId, message, conversationId})=>{
    console.log(receiverId, senderId, message, conversationId);
    const receiver = users.find(user=> user.userId === receiverId);
    const sender = users.find(user=> user.userId === senderId);
    const createdAt = new Date().toISOString();
    const user = await UserModel.findById(senderId).select("email name");
    console.log('reciever', receiver, 'sender', sender, 'user', user);
    if(receiver && sender){
      io.to(receiver.socketId).to(sender.socketId).emit('getMessage',{
        senderId,
        message,
        receiverId,
        conversationId,
        user: {_id: user?._id, name: user?.name, email: user?.email },
        createdAt
      })
    }else if(sender && !receiver){
      io.to(sender.socketId).emit('getMessage',{
        senderId,
        message,
        receiverId,
        conversationId,
        user: {_id: user?._id, name: user?.name, email: user?.email },
        createdAt
      })
    }
  })


});

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/conversation', conversationRoutes);
app.use('/api/message', messageRoutes);


const config = {
  port: process.env.PORT || 3001,
  dbUri: process.env.MONGO_URI || 'mongodb+srv://aliamanatali218:1234Apple$@chat-app-cluster.ias8j.mongodb.net/',
};

mongoose.connect(config.dbUri)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Could not connect to MongoDB\n', err));

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});

export { io };