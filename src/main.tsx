import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, defer, RouterProvider } from 'react-router-dom';
import Cart from './page/Cart/Cart.tsx';
import Error from './page/Error/Error.tsx';
import MenuLayout from './layout/MenuLayout/MenuLayout.tsx';
import Dish from './page/Dish/Dish.tsx';
import axios from 'axios';
import { DishIface } from './interfaces/dish.interface.ts';
import { API_PREFIX } from './helpers/constants.ts';

const Menu = lazy(() => import('./page/Menu/Menu'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <MenuLayout />,
    children: [
      {
        path: '/',
        element: (
          <Suspense fallback={<>Loading ...</>}>
            <Menu />
          </Suspense>
        ),
      },
      {
        path: '/cart',
        element: <Cart />,
      },
      {
        path: 'dish/:id',
        element: <Dish />,
        errorElement: <>Error</>,
        loader: async ({ params }) => {
          return defer({
            data: axios.get<DishIface>(`${API_PREFIX}/products/${params.id}`).then((data) => data),
          });
        },
      },
      {
        path: '*',
        element: <Error />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
