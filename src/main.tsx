// import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import routes from './routes';
import './index.css';
import MainLayout from './Layout';
import NotFoundPage404 from  './pages/404';
import { routeNamesWithoutLayout } from './helpers/utils';

const routesWithNotFound = [
  {
    name: 'NotFound',
    path: '*',
    element: NotFoundPage404,
  },
  ...routes,
];

const _isElementWithoutLayout = (routeName: string) => {
  return routeNamesWithoutLayout?.includes(routeName);
};

const router = createBrowserRouter(routesWithNotFound?.map((route) => {
  const { element: Element } = route;
  return {
    ...route,
    element: _isElementWithoutLayout(route?.name)
      ? <Element />
      : (
        <MainLayout>
          <Element />
        </MainLayout>
      ),
  };
}));

ReactDOM.createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />,
);
