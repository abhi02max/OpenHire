export type UserRole = 'freelancer' | 'recruiter' | 'provider';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  name: string;
  skills?: string[];
  company?: string;
  bio?: string;
  contributions?: Contribution[];
  createdAt: Date;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  requiredSkills: string[];
  providerId: string;
  providerName: string;
  status: 'active' | 'completed';
  contributions: Contribution[];
  createdAt: Date;
}

export interface Contribution {
  id: string;
  userId: string;
  userName: string;
  projectId: string;
  projectTitle: string;
  description: string;
  createdAt: Date;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<User>;
  register: (userData: RegisterData) => Promise<User>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => Promise<User>;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
  role: UserRole;
  skills?: string[];
  company?: string;
}

export interface LoginData {
  email: string;
  password: string;
}