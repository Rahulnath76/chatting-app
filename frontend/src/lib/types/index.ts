export interface User {
  avatar: string;
  email: string;
  fullName: string;
  username: string;
  friends: User[] | string;
  status: string;
  createdAt: string;
  updatedAt: string;
  _id: string;
  __v: number;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data?: User
}


export interface Message{
  sender: string;
  receiver: string;
  text: string;
  image: string;
  read: boolean;
  createdAt: string;
  updatedAt: string;
  _id: string;
  __v: number;
}