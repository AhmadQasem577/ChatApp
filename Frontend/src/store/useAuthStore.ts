
import {create} from 'zustand';
import axiosInstance from '../lib/axios';
import axios from 'axios';

type AuthStore = {
  authUser: any | null;
  isLoggingIn: boolean;
  isSigningUp: boolean;
  isUpdatingProfile: boolean;
  isCheckingAuth: boolean;
  checkAuth: () => Promise<void>;
  signUp: (data: any) => Promise<void>;
  login: (data: any) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (data: any) => Promise<void>;

}

export const useAuthStore:any = create<AuthStore>((set) => ({
  authUser: null,
  isLoggingIn: false,
  isSigningUp: false,
  isUpdatingProfile: false,

  isCheckingAuth: true,
  
  checkAuth: async () => {
    try {
      const response = await axiosInstance.get('/auth/auth-check');
      set({ authUser: response.data });
    } catch (error) {
      console.error('Error checking authentication:', error);
      set({ authUser: null });

     }
    finally {
      set({ isCheckingAuth: false });
    }
  },
  signUp: async (data: any) => {
    try {
      set({ isSigningUp: true });
      await axiosInstance.post('/auth/signup', data);
    } catch (error) {
      console.error('Error signing up:', axios.isAxiosError(error) ? error.response?.data : error);
    } finally {
      set({ isSigningUp: false });
    }
  },
  login: async (data: any) => {
    try {
      set({ isLoggingIn: true });
      const response = await axiosInstance.post('/auth/login', data);
      set({ authUser: response.data });
    } catch (error) {
      console.error('Error logging in:', error);
    } finally {
      set({ isLoggingIn: false });
    }
  },
  logout: async () => {
    try {
      await axiosInstance.post('/auth/logout');
      set({ authUser: null });
    } catch (error) {
      console.error('Error logging out:', error);
    }
  },
  updateProfile: async (data: any) => {
    try {
      set({ isUpdatingProfile: true });
      const response = await axiosInstance.put('/auth/update-profile', data);
      set({ authUser: response.data });
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      set({ isUpdatingProfile: false });
    }
  }
  
})); 