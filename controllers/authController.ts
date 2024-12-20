import { Request, Response } from 'express';
import { signInUser, signUpUser } from '../services/authService';
import { User } from '../types/types';

export const signIn = async (req: Request, res: Response): Promise<Response<{ message: string; user: User; token: string }>> => {
  const { email, password } = req.body;

  try {
    const result = await signInUser({ email, password });

    if (result) {
      return res.status(200).json({
        message: 'User authenticated successfully',
        user: result.user,
        token: result.token,
      });
    } else {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (err) {
    return res.status(500).json({ message: 'Server error: ' + err });
  }
};

export const signUp = async (req: Request, res: Response): Promise<Response<{ message: string; user: User }>> => {
  const { name, email, contact, password } = req.body;

  try {
    const newUser = await signUpUser({ name, email, contact, password });

    return res.status(201).json({
      message: 'User created successfully',
      user: newUser,
    });
  } catch (err) {
    console.error('Error signing up user:', err);
    return res.status(500).json({ message: 'Server error: ' + err });
  }
};
