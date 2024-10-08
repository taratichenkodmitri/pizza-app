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
import { API_PREFIX } from './helpers/constants';
import Login from './page/Login/Login.tsx';
import Register from './page/Register/Register.tsx';
import AuthLayout from './layout/AuthLayout/AuthLayout.tsx';
import { RequireAuth } from './helpers/RequireAuth.tsx';
import { Provider } from 'react-redux';
import { store } from './store/store.ts';
import SuccessOrder from './page/SuccessOrder/SuccessOrder.tsx';

const Menu = lazy(() => import('./page/Menu/Menu'));

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <RequireAuth>
        <MenuLayout />
      </RequireAuth>
    ),
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
        path: '/success',
        element: <SuccessOrder />,
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
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'register',
        element: <Register />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
);
