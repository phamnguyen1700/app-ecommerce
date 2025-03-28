export interface APIError {
  response?: {
    status?: number;
    data?: {
      message?: string;
    };
  };
  message?: string;
  config?: {
    url?: string;
    method?: string;
    headers?: {
      Authorization?: string;
    };
    data?: string;
  };
  stack?: string; // Thêm stack trace cho error
}

export interface RefreshError {
  message?: string;
  response?: {
    data?: unknown;
  };
  stack?: string;
}
export interface IAddress {
  fullName: string;
  street: string;
  city: string;
  district: string;
  province: string;
  phone: string;
  _id: string;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user";
  skinType: string;
  address: IAddress;
  points: number;
}

export interface IReg {
  name: string;
  email: string;
  password: string;
}
