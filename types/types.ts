import { Types } from "mongoose";

export interface User {
    id?: string;
    name: string;
    email: string;
    contact: string;
    password: string;
  }
  
export interface SignInData {
    email: string;
    password: string;
  }
