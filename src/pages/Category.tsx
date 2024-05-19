import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CategoryTable from '../components/CategoryPage/CategoryTable';
import { API_ENDPOINTS } from '../helpers/constant';
import { _handleLogout, axiosConfig } from '../helpers/utils';
import useLocalStorage from '../hooks/useLocalStorage';
import BreadCrumbs from '../components/BreadCrumbs';

const Category = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useLocalStorage('token', '');

  const _fetchData = async () => {
    try {
      setLoading(true);
      const url = `${API_ENDPOINTS.dev}/category`;
      const request = await axios.get(url, axiosConfig(token));
      if (request?.status === 200) {
        const response = request?.data;
        const results = response?.data;
        const _data = results?.map((item: any, index: number) => (
          { ...item, iter: (index + 1) }
        ));
        setData(_data);
      } else {
        throw Error();
      }
    } catch (error: any) {
      if (error?.response?.status == 401) {
        setToken('');
        navigate('/');
        console.log(error?.response?.status)
      }
      console.log('error', error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    _fetchData();
  }, []);

  return (
    <div>
      <div>
        <BreadCrumbs
          items={[
            { to: '/category', title: 'Kategori' }
          ]}
        />
      </div>
      <div className='my-3'>
        <h1 className="text-2xl">Daftar Kategori</h1>
      </div>
      <div>
        <CategoryTable loading={loading} rows={data} />
      </div>
    </div>
  );
}

export default React.memo(Category);
