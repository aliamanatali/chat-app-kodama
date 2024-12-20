import express from 'express';
import * as userController from '../controllers/userController'

const router = express.Router();

router.post('/create', userController.createUser);
router.get('/getUsers', userController.getUsers);
router.get('/:id', userController.getUserById);

export default router;
