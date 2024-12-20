import { UserModel } from '../models/userModel';

export const createUser = async (data: any) => {
  const user = new UserModel(data);
  return await user.save();
};

export const getUsers = async () => {
  return await UserModel.find({});
};

export const getUserById = async (id: string) => {
  return await UserModel.findById(id);
};

