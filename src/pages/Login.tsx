import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import FormLogin from '../components/FormLogin';
import { API_ENDPOINTS } from '../helpers/constant';
import { axiosConfig } from '../helpers/utils';
import useLocalStorage from '../hooks/useLocalStorage';

const Login = () => {
  const navigate = useNavigate();
  const [token, setToken] = useLocalStorage('token', null);
  const [expiresIn, setExpiresIn] = useLocalStorage('expiresIn', 3600);
  const [auth, setAuth] = useLocalStorage('auth', null);
  const [loading, setLoading] = useState(false);

  const _handleSubmit = async (values: any) => {
    try {
      setLoading(true);
      const url = `${API_ENDPOINTS.dev}/auth/login`;
      const formData = new FormData();
      formData.append('email', values?.email);
      formData.append('password', values?.password);

      const request = await axios.post(url, formData);
      if (request?.status === 200) {
        const response = request?.data;
        setToken(response?.data?.access_token);
        const expirationTime = (new Date().getTime()) + (response?.data?.expires_in * 10000);
        setExpiresIn(expirationTime);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const _fetchAuthData = async (token: string) => {
    try {
      setLoading(true);
      const url = `${API_ENDPOINTS.dev}/auth/me`;
      const request = await axios.get(url, axiosConfig(token));
      if (request?.status === 200) {
        const response = request?.data;
        setAuth({ ...response?.data, token });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    // Handle ketika sudah login
    if (token && token !== '') {
      _fetchAuthData(token);
      if (auth && auth !== '') {
        navigate('/dashboard');
      }
    }
  }, [token, auth]);

  // Handle ketika sudah login
  if (token && token !== '' && auth && auth !== '') {
    return '';
  }

  return (
    <main className='w-full min-h-screen bg-gray-50 flex justify-center items-center'>
      <div className='p-5 bg-white rounded shadow w-[22rem]'>
        <div>
          <FormLogin
            loading={loading}
            initialValues={{
              email: '',
              password: '',
            }}
            onSave={(values) => {
              _handleSubmit(values);
            }}
          />
        </div>
      </div>
    </main>
  )
}

export default Login;
