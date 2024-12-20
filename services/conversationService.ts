import { ConversationModel } from "../models/conversationSchema";

export const createConversation = async (data: any) => {
  const user = new ConversationModel(data);
  return await user.save();
};

export const getConversations = async () => {
  return await ConversationModel.find({});
};
