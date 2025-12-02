
import { User } from '../types';

const USERS_KEY = 'avance_users';
const CURRENT_USER_KEY = 'avance_current_user';

// Initial default user
const DEFAULT_ADMIN: User = {
  id: 'admin-1',
  name: 'Admin Principal',
  pin: '123456',
  role: 'admin'
};

export const getUsers = (): User[] => {
  const stored = localStorage.getItem(USERS_KEY);
  if (!stored) {
    localStorage.setItem(USERS_KEY, JSON.stringify([DEFAULT_ADMIN]));
    return [DEFAULT_ADMIN];
  }
  const users = JSON.parse(stored);
  // Fail-safe: Ensure at least one admin exists
  if (!users.some((u: User) => u.role === 'admin')) {
      users.push(DEFAULT_ADMIN);
      localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }
  return users;
};

export const saveUser = (user: User) => {
  const users = getUsers();
  const existingIndex = users.findIndex(u => u.id === user.id);
  
  if (existingIndex >= 0) {
    users[existingIndex] = user;
  } else {
    users.push(user);
  }
  
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

export const deleteUser = (userId: string) => {
  const users = getUsers().filter(u => u.id !== userId);
  // Ensure at least one admin remains
  if (users.length === 0 || !users.some(u => u.role === 'admin')) {
     users.push(DEFAULT_ADMIN);
  }
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

export const authenticate = (pin: string): User | null => {
  const users = getUsers();
  const user = users.find(u => u.pin === pin);
  if (user) {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    return user;
  }
  return null;
};

export const logout = () => {
  localStorage.removeItem(CURRENT_USER_KEY);
};

export const getCurrentUser = (): User | null => {
  const stored = localStorage.getItem(CURRENT_USER_KEY);
  return stored ? JSON.parse(stored) : null;
};
