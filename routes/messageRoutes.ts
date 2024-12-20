import express from 'express';
import {sendMessage, getMessages, fetchLastMessage} from '../controllers/messageController'

const router = express.Router();

router.post('/send', sendMessage);
router.get('/get/:conversationId', getMessages);
router.get('/get/last/:conversationId', fetchLastMessage);

export default router;
