import React, { useState } from 'react'
import { Button } from '@mui/material';
import { API_ENDPOINTS } from '../helpers/constant';
import axios from 'axios';
import useLocalStorage from '../hooks/useLocalStorage';
import { axiosConfig } from '../helpers/utils';
import { useNavigate } from 'react-router-dom';

interface NavbarProps {
  auth: object|any;
}

const Navbar: React.FC<NavbarProps> = ({ auth }) => {
  const navigate = useNavigate();
  const [token, setToken] = useLocalStorage('token', '');
  const [expiresIn, setExpiresIn] = useLocalStorage('token', '');
  const [authUser, setAuthUser] = useLocalStorage('auth', auth);
  const [loading, setLoading] = useState(false);

  const _handleLogout = async () => {
    setLoading(true);
    try {
      const url = `${API_ENDPOINTS.dev}/auth/logout`;
      const request = await axios.post(url, JSON.stringify({}), axiosConfig(token));
      if (request?.status === 200) {
        const response = request?.data;
        console.log(response);
        setToken('');
        setAuthUser('');
        setExpiresIn('');
        // console.log('response', response);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    // Handle jika sudah terlogout
    if (!token && (token === '' || token === null)) {
      navigate('/');
    }
  }, [token]);

  return (
    <header className='bg-white py-3 px-4 rounded'>
      <nav className='flex justify-between items-center'>
        <div>
          Hai 👋, <span className='font-semibold'>{authUser?.name ?? '-'}</span>
        </div>
        <div>
          <Button
            disabled={loading}
            color='secondary'
            onClick={() => {
              if (!token) {
                navigate('/');
              } else {
                _handleLogout()
              }
            }}
          >
            {loading ? 'LOADING' : 'LOGOUT'}
          </Button>
        </div>
      </nav>
    </header>
  )
}

export default Navbar