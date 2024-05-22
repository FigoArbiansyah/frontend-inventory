import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { Button } from '@mui/material';
import { omitBy as _omitBy, isEmpty as _isEmpty } from 'lodash';
import CategoryTable from '../components/CategoryPage/CategoryTable';
import { API_ENDPOINTS } from '../helpers/constant';
import { _handleLogout, axiosConfig } from '../helpers/utils';
import useLocalStorage from '../hooks/useLocalStorage';
import BreadCrumbs from '../components/BreadCrumbs';
import CategoryModalForm from '../components/CategoryPage/CategoryForm';

const Category = () => {
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useLocalStorage('token', '');
  const [visibleForm, setVisibleForm] = useState(false);
  const [loadingAdd, setLoadingAdd] = useState(false);
  const [pagination, setPagination] = useState({});
  const [searchParams, setSearchParams] = useSearchParams();

  const _fetchData = async () => {
    try {
      setLoading(true);
      const url = `${API_ENDPOINTS.dev}/category${location?.search}`;
  
      const request = await axios.get(url, axiosConfig(token));
      if (request?.status === 200) {
        const response = request?.data;
        const results = response?.data;
        const _pagination = response?.pagination;
        const _data = results?.map((item: any, index: number) => (
          { ...item, iter: (index + 1) }
        ));
        setData(_data);
        setPagination(_pagination);
        console.log(_pagination)
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

  const _handleSave = async (values: any) => {
    try {
      setLoadingAdd(true);
      const url = `${API_ENDPOINTS.dev}/category`;
      const formData = new FormData();
      formData.append('name', values?.name);
      if (values?.description) {
        formData.append('description', values?.description);
      }

      const request = await axios.post(url, formData, axiosConfig(token));
      if (request?.status === 200) {
        const response = request?.data;
        _fetchData();
      } else {
        throw Error();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingAdd(false);
    }
  }

  useEffect(() => {
    _fetchData();
  }, [location?.search, params]);

  return (
    <div>
      <div>
        <BreadCrumbs
          items={[
            { to: '/category', title: 'Kategori' }
          ]}
        />
      </div>
      <div className='my-3 flex items-center justify-between'>
        <h1 className="text-2xl">Daftar Kategori</h1>
        <Button
          variant='contained'
          onClick={() => {
            setVisibleForm(true);
          }}
        >
          TAMBAH
        </Button>
      </div>
      <div>
        <CategoryTable loading={loading} rows={data} pagination={pagination} />
        <CategoryModalForm
          visible={visibleForm}
          onClose={() => {
            setVisibleForm(false);
          }}
          initialValues={{ name: '', description: '' }}
          loading={loading}
          onSave={(values) => {
            _handleSave(values);
          }}
        />
      </div>
    </div>
  );
}

export default React.memo(Category);
