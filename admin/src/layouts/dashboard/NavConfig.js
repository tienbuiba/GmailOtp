// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const navConfig = [
  {
    title: 'Trang chủ',
    path: '/dashboard/home',
    icon: getIcon('eva:pie-chart-2-fill'),
  },
  {
    title: 'khách hàng',
    path: '/dashboard/user',
    icon: getIcon('eva:people-fill'),
  },
  {
    title: 'Sản phẩm',
    path: '/dashboard/products',
    icon: getIcon('eva:shopping-bag-fill'),
  },
  {
    title: 'Thuê Mail',
    path: '/dashboard/rent-mail',
    icon: getIcon('material-symbols:outgoing-mail-outline'),
  },
  {
    title: 'Đơn hàng',
    path: '/dashboard/orders',
    icon: getIcon('icon-park-twotone:transaction-order'),
  },
  {
    title: 'Lịch sử giao dịch',
    path: '/dashboard/transactions',
    icon: getIcon('ant-design:transaction-outlined'),
  },
];

export default navConfig;
