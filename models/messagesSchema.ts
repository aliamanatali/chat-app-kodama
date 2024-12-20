import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema({
    conversationId: {
        type: String,
    },
    senderId:{
        type: String,
    },
    message: {
        type: String,
    },
    },
    { timestamps: true }
);
  export const MessageModel = mongoose.model('Message', MessageSchema);
