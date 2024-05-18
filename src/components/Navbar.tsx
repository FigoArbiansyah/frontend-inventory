import React from 'react'
import { Button } from '@mui/material';

interface NavbarProps {
  auth: object|any;
}

const Navbar: React.FC<NavbarProps> = ({ auth }) => {
  return (
    <header className='bg-white py-3 px-4 rounded'>
      <nav className='flex justify-between items-center'>
        <div>
          Hai 👋, <span className='font-semibold'>{auth?.name ?? '-'}</span>
        </div>
        <div>
          <Button
            color='secondary'
          >
            LOGOUT
          </Button>
        </div>
      </nav>
    </header>
  )
}

export default Navbar