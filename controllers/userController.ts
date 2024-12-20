import { Request, Response } from 'express';
import * as userService from '../services/userService';
import { User } from '../types/types';

const createUser = async (req: Request, res: Response): Promise<Response<{ message: string; user: User }>> => {
  try {
    const { name, email, contact, password } = req.body;
    console.log('Inserted:', name, email, contact, password);

    const user: User = await userService.createUser({
      name,
      email,
      contact,
      password,
    });

    return res.status(201).json({
      message: 'User created successfully',
      user,
    });
  } catch (err) {
    console.error('Error creating user:', err);
    return res.status(500).json({ message: 'Server error: ' + err });
  }
};

const getUsers = async (req: Request, res: Response): Promise<Response<{ users: User[] }>> => {
  try {
    const users: User[] = await userService.getUsers();
    return res.status(200).json(users);
  } catch (err) {
    return res.status(500).json({ message: 'Server error: ' + err });
  }
};

const getUserById = async (req: Request, res: Response): Promise<Response<{ message: string; user?: User }>> => {
  try {
    const user: User | null = await userService.getUserById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    return res.status(200).json({
      message: 'User found',
      user,
    });
  } catch (err) {
    return res.status(500).json({ message: 'Server error: ' + err });
  }
};

export {
  createUser,
  getUsers,
  getUserById,
};
