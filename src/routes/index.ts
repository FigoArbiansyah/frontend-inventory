import App from '../App.tsx';
import Category from '../pages/Category.tsx';
import Dashboard from '../pages/Dashboard.tsx';
import Login from '../pages/Login.tsx';

const routes = [
  {
    name: 'Login',
    path: '/',
    element: Login,
  },
  // {
  //   name: 'Dashboard',
  //   path: '/dashboard',
  //   element: Dashboard,
  // },
  // {
  //   name: 'Category',
  //   path: '/category',
  //   element: Category,
  // },
];

export default routes;
