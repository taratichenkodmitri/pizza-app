import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Menu from './page/Menu/Menu.tsx';
import Cart from './page/Cart/Cart.tsx';
import Error from './page/Error/Error.tsx';
import MenuLayout from './layout/MenuLayout/MenuLayout.tsx';
import Dish from './page/Dish/Dish.tsx';
import axios from 'axios';
import { DishIface } from './interfaces/dish.interface.ts';
import { API_PREFIX } from './helpers/constants.ts';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MenuLayout />,
    children: [
      {
        path: '/',
        element: <Menu />,
      },
      {
        path: '/cart',
        element: <Cart />,
      },
      {
        path: 'dish/:id',
        element: <Dish />,
        loader: async ({ params }) => {
          await new Promise<void>((resolve) => {
            setTimeout(() => {
              resolve();
            }, 2000);
          });
          const { data } = await axios.get<DishIface>(`${API_PREFIX}/products/${params.id}`);
          return data;
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
