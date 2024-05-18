import React from 'react'
import ReactIcon from '../assets/react.svg';
import { sidebarMenus } from '../helpers/interface';
import { Link, useLocation } from 'react-router-dom';

interface SidebarProps {
  items: sidebarMenus[];
}

const Sidebar: React.FC<SidebarProps> = ({ items }) => {
  const location = useLocation();
  console.log(location);
  return (
    <aside className='py-5 px-8 bg-white h-screen w-[20%]'>
      <div className='flex justify-center'>
        <img
          src={ReactIcon}
          alt="React Icon"
          className='w-16'
        />
      </div>
      <div className="mt-8 grid gap-1">
        {items?.map((item) => {
          const { icon: Icon, to, title } = item;
          const isActive = to === location?.pathname;
          return (
            <Link key={(to + title)} to={to}>
              <div className={`p-2 rounded flex gap-2 items-center text-gray-700 _hover:bg-cyan-700 _hover:text-white ${isActive && 'bg-cyan-700 text-white'} transition-all ease duration-300`}>
                <span>
                  <Icon />
                </span>
                <span
                  className='capitalize'
                  style={{
                    fontSize: 16,
                  }}
                >
                  {title}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </aside>
  );
}

export default Sidebar