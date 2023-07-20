import { Navigate, useRoutes } from 'react-router-dom';
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
import Login from './pages/Login';
import NotFound from './pages/Page404';
import Register from './pages/Register';
import DashboardApp from './pages/DashboardApp';
import BuyMail from './pages/BuyMail';
import HomePage from './pages/HomePage';
import Transaction from './pages/Transaction';
import Deposit from './pages/Deposit';
import Profile from './pages/Profile';
import ChangePassword from './pages/ChangePassword';
import ForgotPass from './pages/ForgotPass';
import ResetPassword from './pages/ResetPassword';
import ConfirmOrder from './pages/ConfirmOrder';
import TransactionOrder from './pages/TransactionOrder';
import OrderDetails from './pages/OrderDetails';
import ApiDocuments from './pages/ApiDocuments';
import RentMail from './pages/RentMail';
import ApiToken from './pages/ApiToken'

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { path: 'user', element: <BuyMail/> },
        // { path: 'home', element: <DashboardApp/> },
        { path: 'rent-mail', element: <RentMail/> },
        { path: 'deposit', element: <Deposit/> },
        { path: 'transaction-history', element: <Transaction/> },
        { path: 'transaction-order', element: <TransactionOrder/> },
        { path: 'profile', element: <Profile/> },
        { path: 'change-password', element: <ChangePassword/> },
        { path: 'confirm-order', element: <ConfirmOrder/> },
        { path: 'order-details', element: <OrderDetails/> },
        { path: 'api-token', element: <ApiToken /> },
      ],
    },
    {
      path: 'login',
      element: <Login />,
    },
    {
      path: 'register',
      element: <Register />,
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: '/', element: <HomePage/>},
        { path: 'forgot-password', element: <ForgotPass/>},
        { path: 'no-auth/forgot-password', element: <ResetPassword/>},
        { path: '404', element: <NotFound />},
        { path: 'api-documents', element: <ApiDocuments/>},
        { path: '*', element: <Navigate to="/404" /> }
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);
}
