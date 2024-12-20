import { Request, Response } from 'express';
import * as messageService from '../services/messageService';
import { MessageModel } from '../models/messagesSchema';
import { ConversationModel } from '../models/conversationSchema';

export const sendMessage = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const { conversationId, senderId, message, recieverId = '' } = req.body;

    if (!senderId || !message) {
      return res.status(400).json({ message: 'All fields are required: conversationId, senderId, message.' });
    }

    if(conversationId=='new' && recieverId)
    {
        const newConversation = new ConversationModel({model: [senderId, recieverId]});
        await newConversation.save();
        const newMessage = new MessageModel({conversationId: newConversation._id, senderId, message})
        await newMessage.save();
        return res.status(200).send('Message sent successfully');
    }
    else if(!conversationId && !recieverId){
        return res.status(400).end('Please fill all the required fields');
    }

    await messageService.createMessage(conversationId, senderId, message);
    return res.status(200).send('Message sent successfully');
  } catch (error) {
    console.error('Error sending message:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

export const getMessages = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const conversationId = req.params.conversationId;
    if (conversationId === 'new') {
      return res.status(200).json([]);
    }
    const messages = await messageService.fetchMessagesWithUserData(conversationId);
    return res.status(200).json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Add the fetchLastMessage route handler
export const fetchLastMessage = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const conversationId = req.params.conversationId;
    const lastMessage = await messageService.fetchLastMessage(conversationId);

    if (!lastMessage) {
      return res.status(404).json({ message: 'No messages found in this conversation.' });
    }

    return res.status(200).json(lastMessage);
  } catch (error) {
    console.error('Error fetching last message:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};