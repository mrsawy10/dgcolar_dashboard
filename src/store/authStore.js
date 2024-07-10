import { toast } from 'react-toastify';
import { create } from 'zustand';
import * as yup from 'yup';
import { persist } from 'zustand/middleware';
// import { useNavigate } from "react-router-dom";

import { API_URL } from 'src/constants';
import { RegisterSchema, LoginSchema } from 'src/validation/schema';
import useGeneralStore from './generalStore';

// Initial state for the auth store
const initialState = {
  user: null,
  error: null,
  isLogged: false,
  token: localStorage.getItem(`dgcollar-user-token`),
  isSuccess: false,
  isError: false,
  isLoading: false,
  errorMsg: '',
};
// Create the auth store using Zustand
const useAuthStore = create(
  persist(
    (set, get) => ({
      ...initialState,

      setLogout: () =>
        set({
          isLoading: false,
          error: { error: true },
          isSuccess: false,
          isError: true,
          isLogged: false,
          token: undefined,
          user: null,
          errorMsg: `User logout`,
        }),
    }),
    { name: 'auth-store' }
  )
);

export default useAuthStore;

export const testAuth = async () => {
  try {
    useAuthStore.setState({ isLoading: true });
    useGeneralStore.setState({ generalIsLoading: true });

    const response = await fetch(`${API_URL}/auth/check-auth`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: useAuthStore.getState().token ?? localStorage.getItem(`dgcollar-user-token`),
      }),
    });
    const { user, token, error } = await response.json();
    if (!response.ok) throw new Error();
    useAuthStore.setState({ user, token });
  } catch (error) {
    console.log(`test auth failed ==>`, error);
    if (error) {
      useAuthStore.getState().setLogout();
    }
  } finally {
    useAuthStore.setState({ isLoading: false });
    useGeneralStore.setState({ generalIsLoading: false });
  }
};

// ______________________________________

export const Login = async ({ email, password }) => {
  try {
    useAuthStore.setState({ isLoading: true });
    useGeneralStore.setState({ generalIsLoading: true });

    LoginSchema.validateSync({ email, password }, { abortEarly: false });

    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    const { token, user, error } = await response.json();

    if (error) throw new Error(`${error}`);
    if (!response.ok) throw new Error('Invalid credentials. Please check your email and password.');

    localStorage.setItem('dgcollar-user-token', token);

    toast.success('Login Successful ✔️', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });

    useAuthStore.setState({
      isLoading: false,
      user,
      isSuccess: true,
      isError: false,
      isLogged: true,
      errorMsg: '',
      error: undefined,
      token,
    });
    // Optionally, you might want to perform additional actions after successful login
    // For example, redirecting to another page or fetching additional user data
  } catch (error) {
    console.error('Login failed:', error);

    if (error instanceof yup.ValidationError) {
      return toast.warning(error.errors[0] ?? '', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }

    toast.error(`${error.message ?? `Error while logging in`}`, {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });

    useAuthStore.setState({
      isLoading: false,
      error,
      isSuccess: false,
      isError: true,
      errorMsg: 'Login failed',
    });
  } finally {
    useGeneralStore.setState({ generalIsLoading: false });
    useAuthStore.setState({ isLoading: false });
  }
};

// ____________________________________
// ____________________________________
// ____________________________________
// ____________________________________

export const Register = async (formData) => {
  try {
    useAuthStore.setState({ isLoading: true });
    useGeneralStore.setState({ generalIsLoading: true });

    RegisterSchema.validateSync(formData, { abortEarly: false });

    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    const { token, user, error } = await response.json();
    localStorage.setItem(`dgcollar-user-token`, token);
    if (error) {
      throw new Error(`${error}`);
    }
    if (!response.ok) throw new Error();
    toast.success('Register Successfully ✔️', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
    useAuthStore.setState({
      isLoading: false,
      user,
      isSuccess: true,
      isError: false,
      isLogged: true,
      errorMsg: ``,
      error: undefined,
      token,
    });
  } catch (error) {
    console.log(`register failed ==>`, error);
    if (error instanceof yup.ValidationError) {
      return toast.warning(error.errors[0] ?? '', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }

    toast.error(`${error.message ?? `Error while registering`}`, {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
    useAuthStore.setState({
      isLoading: false,
      error,
      isSuccess: false,
      isError: true,
      errorMsg: `Registration failed`,
    });
  } finally {
    useGeneralStore.setState({ generalIsLoading: false });
  }
};
