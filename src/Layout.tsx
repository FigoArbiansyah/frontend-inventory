import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import useLocalStorage from './hooks/useLocalStorage';
import menus from './menus';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const [token, setToken] = useLocalStorage('token', '');
  const [auth, setAuth] = useLocalStorage('auth', '-');
  let authorizedMenus = menus?.[1] // JUST FOR INITIAL

  if (auth?.role_id) {
    authorizedMenus = menus?.[auth?.role_id];
  }

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
        <Sidebar items={authorizedMenus} />
        <section className='bg-gray-50 h-screen p-4 w-[80%]'>
          <Navbar auth={auth} />
          <div className='overflow-y-auto py-4'>
            {children}
          </div>
        </section>
      </main>
    </>
  )
}

export default MainLayout