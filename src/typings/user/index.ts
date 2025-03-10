import { IAddress } from "../auth";

export interface IUser {
    _id: string;
    name: string;
    email: string;
    role: "admin" | "user"; 
    isVerified: boolean;
    emailVerificationToken?: string;
    skinType?: string;
    address: IAddress;
    createdAt: string;
    updatedAt: string;
    __v: number;
    passwordResetExpires?: string;
    passwordResetToken?: string;
  }
  