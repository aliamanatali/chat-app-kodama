import { MessageModel } from '../models/messagesSchema';
import { UserModel } from '../models/userModel';

export const createMessage = async (conversationId: string, senderId: string, message: string) => {
  const newMessage = new MessageModel({ conversationId, senderId, message });
  return await newMessage.save();
};

export const fetchMessagesWithUserData = async (conversationId: string) => {
  const messages = await MessageModel.find({ conversationId });

  const messageUserData = await Promise.all(
    messages.map(async (message) => {
      const user = await UserModel.findById(message.senderId);
      return {
        user: { _id: user?._id, email: user?.email, name: user?.name },
        message: message.message,
        createdAt: message.createdAt
      };
    })
  );

  return messageUserData;
};

export const fetchLastMessage = async (conversationId: string) => {
  const lastMessage = await MessageModel.findOne({ conversationId })
    .sort({ createdAt: -1 })
    .limit(1);

  if (!lastMessage) return null;

  const user = await UserModel.findById(lastMessage.senderId);
  return {
    message: lastMessage.message,
  };
};