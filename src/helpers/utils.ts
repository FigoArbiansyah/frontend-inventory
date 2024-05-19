import useLocalStorage from "../hooks/useLocalStorage";
import { API_ENDPOINTS } from "./constant";
import axios from 'axios';

export const routeNamesWithoutLayout = [
  'Login', 'NotFound', 'ErrorPage', 'Register',
];

export const axiosConfig = (token: string) => ({
  headers: {
    'Authorization': `Bearer ${token}`,
  }
});

export const _handleLogout = async () => {
  const [token, setToken] = useLocalStorage('token', '');
  const [authUser, setAuthUser] = useLocalStorage('authUser', '');
  const [expiresIn, setExpiresIn] = useLocalStorage('authUser', '');
  setToken('');
  setAuthUser('');
  setExpiresIn('');
}
