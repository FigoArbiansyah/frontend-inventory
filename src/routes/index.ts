import App from '../App.tsx';
import Category from '../pages/Category.tsx';
import Dashboard from '../pages/Dashboard.tsx';

const routes = [
  {
    name: 'Dashboard',
    path: '/dashboard',
    element: Dashboard,
  },
  {
    name: 'Category',
    path: '/category',
    element: Category,
  },
];

export default routes;
