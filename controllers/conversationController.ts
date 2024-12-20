import { ConversationModel } from "../models/conversationSchema";
import { Request, Response } from 'express';
import { UserModel } from "../models/userModel";
import { io } from "..";

export const createConversation = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { senderId, recieverId } = req.body;
    console.log(senderId, recieverId);
    if (!senderId || !recieverId) {
      return res.status(400).json({ message: 'SenderId and ReceiverId are required.' });
    }

    const existingConversation = await ConversationModel.findOne({
      members: { $all: [senderId, recieverId] },
    });

    if (existingConversation) {
      return res.status(409).json({ message: 'Conversation already exists between these users.' });
    }

    const newConversation = new ConversationModel({ members: [senderId, recieverId] });
    await newConversation.save();

    io.emit('newConversation', { senderId, recieverId, conversationId: newConversation._id });

    return res.status(201).json({ message: 'Conversation created successfully.' });
  } catch (err) {
    return res.status(500).json({ message: 'Server error: ' + err });
  }
};
export const getConversation = async (req: Request, res: Response): Promise<Response> => {
  try {
    const userId = req.params.userId;
    console.log('conv user id', userId);
    if (!userId) {
      return res.status(400).json({ message: 'UserId is required.' });
    }

    const conversations = await ConversationModel.find({ members: { $in: [userId] } });

    const conversationUserData = await Promise.all(
      conversations.map(async (conversation) => {
        const receiverId = conversation.members.find((member) => member !== userId);
        if (receiverId) {
          const user = await UserModel.findById(receiverId).select("email name contact");
          if (user) {
            return {
              user: {_id: user.id, email: user.email, name: user.name, contact: user.contact },
              conversationId: conversation._id,
            };
          }
        }
        return null;
      })
    );

    const filteredData = conversationUserData.filter((data) => data !== null);
    console.log(filteredData);
    return res.status(200).json(filteredData);
  } catch (err) {
    return res.status(500).json({ message: 'Server error: ' + err });
  }
};
