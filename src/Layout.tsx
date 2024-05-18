import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import items from './menus';
import Navbar from './components/Navbar';
import useLocalStorage from './hooks/useLocalStorage';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const [token, setToken] = useLocalStorage('token', '');

  useEffect(() => {
    if (token && token !== '') {
      navigate('/dashboard'); // Handle ketika sudah login
    } else if (!token && (token === '' || token === null)) {
      navigate('/'); // Handle ketika belum login
    }
  }, [token]);

  return (
    <>
      <main className='flex'>
        <Sidebar items={items} />
        <section className='bg-gray-50 h-screen p-4 w-[80%]'>
          <Navbar />
          <div className='overflow-y-auto py-4'>
            {children}
          </div>
        </section>
      </main>
    </>
  )
}

export default MainLayout