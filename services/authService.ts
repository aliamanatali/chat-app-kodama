import bcrypt from 'bcryptjs'; // for password hashing
import jwt from 'jsonwebtoken'; // for JWT generation
import { UserModel } from "../models/userModel";
import { SignInData, User } from "../types/types";
import { getUsers } from "./userService";

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

export const signInUser = async ({ email, password }: SignInData): Promise<{ user: User; token: string } | null> => {
  const users = await getUsers();
  const user = users.find((user) => user.email === email);

  if (!user) {
    return null;
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    return null;
  }

  const token = jwt.sign(
    { userId: user._id, email: user.email },
    JWT_SECRET,
    { expiresIn: '1h' }
  );

  return { user, token };
};

export const signUpUser = async ({ name, email, contact, password }: User): Promise<User> => {
  const existingUser = await UserModel.findOne({ email });
  if (existingUser) {
    throw new Error('User already exists');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new UserModel({ name, email, contact, password: hashedPassword });
  await newUser.save();

  return newUser;
};
