import { Navigate, useRoutes } from 'react-router-dom';
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
import User from './pages/User';
import Login from './pages/Login';
import NotFound from './pages/Page404';
import Products from './pages/Products';
import DashboardApp from './pages/DashboardApp';
import ChangePassword from './pages/ChangePassword';
import EditProduct from './pages/EditProduct';
import EditUser from './pages/EditUser';
import Transactions from './pages/Transactions';
import Orders from './pages/Orders';
import CreateProduct from './pages/CreateProduct';
import CreateMailProduct from './pages/CreateMailProduct';
import OrderDetails from './pages/OrderDetails';
import ApiToken from './pages/ApiToken';
import RentMail from './pages/RentMail';
import CreateRentProduct from './pages/CreateRentProduct';
import UpdateRentService from './pages/UpdateRentService';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { path: 'home', element: <DashboardApp/> },
        { path: 'user', element: <User /> },
        { path: 'products', element: <Products/> },
        { path: 'rent-mail', element: <RentMail/> },
        { path: 'edit-product', element: <EditProduct/> },
        { path: 'edit-user', element: <EditUser/> },
        { path: 'transactions', element: <Transactions /> },
        { path: 'orders', element: <Orders /> },
        { path: 'create-product', element: <CreateProduct /> },
        { path: 'create-mail-product', element: <CreateMailProduct /> },
        { path: 'order-details', element: <OrderDetails /> },
        { path: 'api-token', element: <ApiToken /> },
        { path: 'create-rent-product', element: <CreateRentProduct /> },
        { path: 'update-rent-product', element: <UpdateRentService/> },    
              ],
    },
    {
      path: 'login',
      element: <Login />,

    },
    {
      path: '/dashboard', element: <DashboardLayout />,
      children: [
        { path: 'change-password', element: <ChangePassword /> },
      ],
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: '/', element: <Navigate to="/login" /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);
}