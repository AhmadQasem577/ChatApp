import {create} from 'zustand';
import axiosInstance from '../lib/axios';
import axios from 'axios';
import toast from 'react-hot-toast';

type User = {
  _id: string;
  fullName: string;
  email: string;
  profilePicture?: string;
};

type AuthStore = {
  authUser: User | null;
  isLoggingIn: boolean;
  isSigningUp: boolean;
  isUpdatingProfile: boolean;
  isCheckingAuth: boolean;
  checkAuth: () => Promise<void>;
  signUp: (data: any) => Promise<void>;
  login: (data: any) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (data: any) => Promise<void>;
};

export const useAuthStore = create<AuthStore>((set) => ({
  authUser: null,
  isLoggingIn: false,
  isSigningUp: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  
  checkAuth: async () => {
    try {
      set({ isCheckingAuth: true });
      const response = await axiosInstance.get('/auth/auth-check');
      set({ authUser: response.data });
    } catch (error) {
      console.error('Error checking authentication:', error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signUp: async (data) => {
    try {
      set({ isSigningUp: true });
      await axiosInstance.post('/auth/signup', data);
      toast.success('Sign up successful! Please log in.');
    } catch (error) {
      console.error('Error signing up:', error);
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message || 'An error occurred during sign up.');
      } else {
        toast.error('An unexpected error occurred. Please try again later.');
      }
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    try {
      set({ isLoggingIn: true });
      const response = await axiosInstance.post('/auth/login', data);
      set({ authUser: response.data.user });
      toast.success('Login successful!');
    } catch (error) {
      console.error('Error logging in:', error);
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message || 'An error occurred during login.');
      } else {
        toast.error('An unexpected error occurred. Please try again later.');
      }
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post('/auth/logout');
      set({ authUser: null });
      toast.success('Logout successful!');
    } catch (error) {
      console.error('Error logging out:', error);
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message || 'An error occurred during logout.');
      } else {
        toast.error('An unexpected error occurred. Please try again later.');
      }
    }
  },

  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const response = await axiosInstance.put('/auth/profile/edit', data);
      set((state) => ({ 
        authUser: { 
          ...state.authUser, 
          ...response.data 
        } 
      }));
      toast.success('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message || 'An error occurred while updating profile.');
      } else {
        toast.error('An unexpected error occurred. Please try again later.');
      }
    } finally {
      set({ isUpdatingProfile: false });
    }
  }
}));