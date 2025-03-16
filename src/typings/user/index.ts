import { IAddress } from "../auth";

export interface IUserFilter {
  page: number;
  limit: number;
  name: string;
  email: string;
  role: "manager" | "user" | "staff" | undefined;
  isVerified: boolean | undefined;
}

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
  isBanned?: boolean;
}

export interface IUserState {
  users: IUser[];
  total: number;
  totalPages: number;
}
