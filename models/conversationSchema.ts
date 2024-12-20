import mongoose from 'mongoose';

const ConversationSchema = new mongoose.Schema({
    members: {
        type: Array,
        required: true
    }
    });
  export const ConversationModel = mongoose.model('Conversation', ConversationSchema);
