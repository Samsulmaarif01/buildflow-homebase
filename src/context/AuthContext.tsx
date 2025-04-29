
import React, { createContext, useContext, useEffect, useState } from 'react';
import { TeamMember } from '@/types';

interface AuthContextType {
  currentUser: TeamMember | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user data (in a real app, this would come from a database)
const mockUsers = [
  { id: "1", name: "Alex Johnson", role: "1", division: "1", email: "admin@example.com", password: "admin123" },
  { id: "2", name: "Maria Rodriguez", role: "2", division: "2", email: "maria@example.com", password: "password123" },
  { id: "3", name: "David Chen", role: "3", division: "3", email: "david@example.com", password: "password123" },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<TeamMember | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check for saved user in localStorage on component mount
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // In a real app, this would be an API call
    const user = mockUsers.find(user => user.email === email && user.password === password);
    
    if (user) {
      // Remove the password before storing the user
      const { password: _, ...userWithoutPassword } = user;
      const userToStore = userWithoutPassword as TeamMember;
      
      setCurrentUser(userToStore);
      setIsAuthenticated(true);
      localStorage.setItem('currentUser', JSON.stringify(userToStore));
      return true;
    }
    
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('currentUser');
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
