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

export const _getFormattedPagination = (pagination: any) => {
  return {
    total: pagination?.total_items,
    per_page: pagination?.items_per_page,
    current_page: pagination?.current_page,
    last_page: pagination?.total_pages,
    prev_page_url: pagination?.previous_page,
    next_page_url: pagination?.next_page,
  }
}
