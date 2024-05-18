// import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import routes from './routes';
import './index.css';
import MainLayout from './Layout';
import NotFoundPage404 from  './pages/404';

const routesWithNotFound = [
  {
    name: 'NotFound',
    path: '*',
    element: NotFoundPage404,
  },
  ...routes,
]

const router = createBrowserRouter(routesWithNotFound?.map((route) => {
  const { element: Element } = route;
  return {
    ...route,
    element: route?.name === 'NotFound' ? <Element /> : (
      <MainLayout>
        <Element />
      </MainLayout>
    ),
  };
}));

ReactDOM.createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />,
);
