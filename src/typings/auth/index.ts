export interface IAddress {
    fullnames: string;
    street: string;
    city: string;
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
  }
  