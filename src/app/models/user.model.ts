export interface User {
  id: string;
  firstName: string;
  lastName: string;
  dni: string;
  email: string;
  role: 'USER' | 'ADMIN';
  status: 'ACTIVE' | 'SUSPENDED';
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  token: string;
  role: 'USER' | 'ADMIN';
  user: User;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  dni: string;
  email: string;
  password: string;
}

export interface UpdateUserRequest {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
}

export type UserStatus = 'ACTIVE' | 'SUSPENDED';