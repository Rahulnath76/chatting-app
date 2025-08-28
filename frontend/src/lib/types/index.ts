export interface User {
  avatar: string;
  email: string;
  fullName: string;
  username: string;
  friends: User[] | string;
  status: string;
  lastMessageTime: Date | null;
  createdAt: string;
  updatedAt: string;
  _id: string;
  __v: number;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  user?: User
}


export interface Message{
  sender: string | User;
  text: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  _id: string;
  __v: number;
}