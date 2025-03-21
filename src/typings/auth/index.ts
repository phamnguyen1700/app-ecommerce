export interface IAddress {
    fullName: string;
    street: string;
    city: string;
    district: string;
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
  }
  
  export interface IReg {
    name: string;
    email: string;
    password: string;
  }