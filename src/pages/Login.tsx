import React, { useEffect } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import FormLogin from '../components/FormLogin';
import { API_ENDPOINTS } from '../helpers/constant';
import { axiosConfig } from '../helpers/utils';
import useLocalStorage from '../hooks/useLocalStorage';

const Login = () => {
  const navigate = useNavigate();
  const [token, setToken] = useLocalStorage('token', null);
  const [auth, setAuth] = useLocalStorage('auth', null);

  const _handleSubmit = async (values: any) => {
    try {
      const url = `${API_ENDPOINTS.dev}/auth/login`;
      const formData = new FormData();
      formData.append('email', values?.email);
      formData.append('password', values?.password);

      const request = await axios.post(url, formData);
      if (request?.status === 200) {
        const response = request?.data;
        setToken(response?.data?.access_token);
        // console.log('response', response);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const _fetchAuthData = async (token: string) => {
    try {
      const url = `${API_ENDPOINTS.dev}/auth/me`;
      const request = await axios.get(url, axiosConfig(token));
      if (request?.status === 200) {
        const response = request?.data;
        setAuth({ ...response?.data, token });
        // console.log('response', response);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    // Handle ketika sudah login
    if (token && token !== '') {
      _fetchAuthData(token);
      navigate('/dashboard');
    }
  }, [token]);

  // Handle ketika sudah login
  if (token && token !== '') {
    return '';
  }

  return (
    <main className='w-full min-h-screen bg-gray-50 flex justify-center items-center'>
      <div className='p-5 bg-white rounded shadow w-[22rem]'>
        <div>
          <FormLogin
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
