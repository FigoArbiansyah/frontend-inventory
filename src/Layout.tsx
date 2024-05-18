import React from 'react';
import Sidebar from './components/Sidebar';
import items from './menus';
import Navbar from './components/Navbar';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
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