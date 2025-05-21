import { v4 as uuidv4 } from 'uuid';
import { User, Project, Contribution, UserRole } from '../types';

// Mock Users
const mockUsers: User[] = [
  {
    id: '1',
    email: 'dev@example.com',
    name: 'Alex Johnson',
    role: 'freelancer',
    skills: ['JavaScript', 'React', 'Node.js', 'TypeScript'],
    bio: 'Full-stack developer with 3 years of experience',
    contributions: [],
    createdAt: new Date('2023-01-15')
  },
  {
    id: '2',
    email: 'recruiter@example.com',
    name: 'Sam Rodriguez',
    role: 'recruiter',
    company: 'TechHire Solutions',
    bio: 'Technical recruiter specializing in developer talent',
    createdAt: new Date('2023-02-10')
  },
  {
    id: '3',
    email: 'provider@example.com',
    name: 'Jamie Smith',
    role: 'provider',
    company: 'WebTech Innovations',
    bio: 'Project manager looking for talented developers',
    createdAt: new Date('2023-03-05')
  }
];

// Mock Projects
const mockProjects: Project[] = [
  {
    id: '1',
    title: 'E-commerce Platform',
    description: 'Building a modern e-commerce platform with React frontend and Node.js backend. Looking for contributors to help with shopping cart functionality, user authentication, and payment processing integration.',
    requiredSkills: ['React', 'Node.js', 'Express', 'MongoDB'],
    providerId: '3',
    providerName: 'Jamie Smith',
    status: 'active',
    contributions: [],
    createdAt: new Date('2023-03-10')
  },
  {
    id: '2',
    title: 'Task Management App',
    description: 'Developing a collaborative task management application with real-time updates. Need help with implementing drag-and-drop functionality, notifications system, and user permissions.',
    requiredSkills: ['JavaScript', 'React', 'Firebase', 'CSS'],
    providerId: '3',
    providerName: 'Jamie Smith',
    status: 'active',
    contributions: [],
    createdAt: new Date('2023-04-15')
  },
  {
    id: '3',
    title: 'Educational Platform',
    description: 'Creating an educational platform for coding tutorials and interactive exercises. Looking for contributors to help with content management, exercise validation, and progress tracking.',
    requiredSkills: ['TypeScript', 'React', 'Node.js', 'PostgreSQL'],
    providerId: '3',
    providerName: 'Jamie Smith',
    status: 'active',
    contributions: [],
    createdAt: new Date('2023-05-20')
  }
];

// Mock Contributions
const mockContributions: Contribution[] = [
  {
    id: '1',
    userId: '1',
    userName: 'Alex Johnson',
    projectId: '1',
    projectTitle: 'E-commerce Platform',
    description: 'Implemented shopping cart functionality with local storage persistence',
    createdAt: new Date('2023-04-05')
  },
  {
    id: '2',
    userId: '1',
    userName: 'Alex Johnson',
    projectId: '2',
    projectTitle: 'Task Management App',
    description: 'Added drag-and-drop functionality for task reordering',
    createdAt: new Date('2023-05-10')
  }
];

// Update mock data with contributions
export const initializeMockData = () => {
  // Add contributions to users
  const users = [...mockUsers];
  const projects = [...mockProjects];
  const contributions = [...mockContributions];

  // Link contributions to users
  users.forEach(user => {
    user.contributions = contributions.filter(c => c.userId === user.id);
  });

  // Link contributions to projects
  projects.forEach(project => {
    project.contributions = contributions.filter(c => c.projectId === project.id);
  });

  // Save to localStorage if not already initialized
  if (!localStorage.getItem('users')) {
    localStorage.setItem('users', JSON.stringify(users));
  }
  
  if (!localStorage.getItem('projects')) {
    localStorage.setItem('projects', JSON.stringify(projects));
  }
  
  if (!localStorage.getItem('contributions')) {
    localStorage.setItem('contributions', JSON.stringify(contributions));
  }
};

// Mock API functions
export const fetchUsers = (): Promise<User[]> => {
  return new Promise((resolve) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    setTimeout(() => resolve(users), 300);
  });
};

export const fetchUserById = (id: string): Promise<User | null> => {
  return new Promise((resolve) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((u: User) => u.id === id) || null;
    setTimeout(() => resolve(user), 300);
  });
};

export const fetchUserByEmail = (email: string): Promise<User | null> => {
  return new Promise((resolve) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((u: User) => u.email === email) || null;
    setTimeout(() => resolve(user), 300);
  });
};

export const createUser = (userData: Omit<User, 'id' | 'createdAt' | 'contributions'>): Promise<User> => {
  return new Promise((resolve) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const newUser: User = {
      ...userData,
      id: uuidv4(),
      createdAt: new Date(),
      contributions: []
    };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    setTimeout(() => resolve(newUser), 300);
  });
};

export const updateUser = (id: string, userData: Partial<User>): Promise<User> => {
  return new Promise((resolve, reject) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = users.findIndex((u: User) => u.id === id);
    
    if (userIndex === -1) {
      reject(new Error('User not found'));
      return;
    }
    
    const updatedUser = { ...users[userIndex], ...userData };
    users[userIndex] = updatedUser;
    localStorage.setItem('users', JSON.stringify(users));
    setTimeout(() => resolve(updatedUser), 300);
  });
};

export const fetchProjects = (): Promise<Project[]> => {
  return new Promise((resolve) => {
    const projects = JSON.parse(localStorage.getItem('projects') || '[]');
    setTimeout(() => resolve(projects), 300);
  });
};

export const fetchProjectById = (id: string): Promise<Project | null> => {
  return new Promise((resolve) => {
    const projects = JSON.parse(localStorage.getItem('projects') || '[]');
    const project = projects.find((p: Project) => p.id === id) || null;
    setTimeout(() => resolve(project), 300);
  });
};

export const createProject = (projectData: Omit<Project, 'id' | 'createdAt' | 'contributions'>): Promise<Project> => {
  return new Promise((resolve) => {
    const projects = JSON.parse(localStorage.getItem('projects') || '[]');
    const newProject: Project = {
      ...projectData,
      id: uuidv4(),
      createdAt: new Date(),
      contributions: []
    };
    projects.push(newProject);
    localStorage.setItem('projects', JSON.stringify(projects));
    setTimeout(() => resolve(newProject), 300);
  });
};

export const createContribution = (contributionData: Omit<Contribution, 'id' | 'createdAt'>): Promise<Contribution> => {
  return new Promise((resolve) => {
    const contributions = JSON.parse(localStorage.getItem('contributions') || '[]');
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const projects = JSON.parse(localStorage.getItem('projects') || '[]');
    
    const newContribution: Contribution = {
      ...contributionData,
      id: uuidv4(),
      createdAt: new Date()
    };
    
    // Add to contributions array
    contributions.push(newContribution);
    localStorage.setItem('contributions', JSON.stringify(contributions));
    
    // Update user's contributions
    const userIndex = users.findIndex((u: User) => u.id === contributionData.userId);
    if (userIndex !== -1) {
      if (!users[userIndex].contributions) {
        users[userIndex].contributions = [];
      }
      users[userIndex].contributions.push(newContribution);
      localStorage.setItem('users', JSON.stringify(users));
    }
    
    // Update project's contributions
    const projectIndex = projects.findIndex((p: Project) => p.id === contributionData.projectId);
    if (projectIndex !== -1) {
      if (!projects[projectIndex].contributions) {
        projects[projectIndex].contributions = [];
      }
      projects[projectIndex].contributions.push(newContribution);
      localStorage.setItem('projects', JSON.stringify(projects));
    }
    
    setTimeout(() => resolve(newContribution), 300);
  });
};

export const fetchContributions = (): Promise<Contribution[]> => {
  return new Promise((resolve) => {
    const contributions = JSON.parse(localStorage.getItem('contributions') || '[]');
    setTimeout(() => resolve(contributions), 300);
  });
};

export const fetchContributionsByUserId = (userId: string): Promise<Contribution[]> => {
  return new Promise((resolve) => {
    const contributions = JSON.parse(localStorage.getItem('contributions') || '[]');
    const userContributions = contributions.filter((c: Contribution) => c.userId === userId);
    setTimeout(() => resolve(userContributions), 300);
  });
};

export const fetchContributionsByProjectId = (projectId: string): Promise<Contribution[]> => {
  return new Promise((resolve) => {
    const contributions = JSON.parse(localStorage.getItem('contributions') || '[]');
    const projectContributions = contributions.filter((c: Contribution) => c.projectId === projectId);
    setTimeout(() => resolve(projectContributions), 300);
  });
};

// Authentication mock
export const login = (email: string, password: string): Promise<User> => {
  return new Promise((resolve, reject) => {
    // In a real app, we would validate the password
    // For this mock, we just check if the user exists
    fetchUserByEmail(email).then(user => {
      if (user) {
        resolve(user);
      } else {
        reject(new Error('Invalid credentials'));
      }
    });
  });
};

export const register = (userData: { email: string; password: string; name: string; role: UserRole; skills?: string[]; company?: string }): Promise<User> => {
  return new Promise((resolve, reject) => {
    fetchUserByEmail(userData.email).then(existingUser => {
      if (existingUser) {
        reject(new Error('User with this email already exists'));
      } else {
        // In a real app, we would hash the password
        // For this mock, we just create the user
        createUser({
          email: userData.email,
          name: userData.name,
          role: userData.role,
          skills: userData.role === 'freelancer' ? userData.skills : undefined,
          company: userData.role === 'recruiter' || userData.role === 'provider' ? userData.company : undefined,
        }).then(newUser => {
          resolve(newUser);
        });
      }
    });
  });
};