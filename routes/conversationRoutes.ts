import express from 'express';
import * as conversationController from '../controllers/conversationController'

const router = express.Router();

router.post('/create', conversationController.createConversation);
router.get('/get/:userId', conversationController.getConversation);

export default router;
