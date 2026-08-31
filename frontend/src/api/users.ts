import api from './axios';

export interface UserPreferences {
  language: string;
  theme: string;
  notifications: {
    email: boolean;
    push: boolean;
  };
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  age?: number;
  gender?: string;
  phone?: string;
  avatar?: string;
  demoData: boolean;
  createdAt: string;
  lastLogin?: string;
  preferences?: UserPreferences;
}

export const userService = {
  async getProfile() {
    const response = await api.get('/users/profile');
    return response.data;
  },

  async updateProfile(data: Partial<UserProfile>) {
    const response = await api.put('/users/profile', data);
    return response.data;
  },

  async updatePreferences(data: Partial<UserPreferences>) {
    const response = await api.put('/users/preferences', data);
    return response.data;
  },

  async deleteData() {
    const response = await api.delete('/users/data');
    return response.data;
  },

  async toggleDemo() {
    const response = await api.post('/users/toggle-demo');
    return response.data;
  }
};