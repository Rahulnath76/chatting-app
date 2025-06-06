export interface User {
  _id: string;
  name: string;
  email: string;
  projects: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  user?: User
}
