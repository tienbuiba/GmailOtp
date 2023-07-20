import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useEffect, useState } from 'react';
import { Link, Link as RouterLink, useNavigate } from 'react-router-dom';
// material
import {
  Card,
  Table,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  Stack,
  Button,
} from '@mui/material';
// components
import Page from '../components/Page';
import Scrollbar from '../components/Scrollbar';
import USERLIST from '../_mock/user';
import ProductListHead from '../sections/@dashboard/products/ProductListHead';
import ProductMoreMenu from '../sections/@dashboard/products/ProductMoreMenu';
import { apiAdminGetMailType } from 'src/services/Products';
import moment from 'moment/moment';
import Label from 'src/components/Label';
import Iconify from 'src/components/Iconify';
import { fNumber } from 'src/utils/formatNumber';
import { useSelector } from 'react-redux';
import { fDateLocal } from '../utils/formatTime';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'Tên', label: 'Tên', alignRight: false },
  { id: 'F', label: 'Quốc gia', alignRight: false },
  { id: 'Giá ', label: 'Giá ', alignRight: false },
  { id: 'Tổng', label: 'Tổng', alignRight: false },
  { id: 'Loai', label: 'Loại', alignRight: false },
  { id: 'Thời gian cập nhật', label: 'Thời gian cập nhật', alignRight: false },
  { id: 'ad', label: '', alignRight: false },
];

export default function Product() {

  const [data, setData] = useState([])
  const navigate = useNavigate();
  
  const dataProduct = useSelector((state) => state.product.data);
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      navigate('/login', { replace: true });
    }
  }, []);

  useEffect(() => {
    apiAdminGetMailType().then(result => {
      const res = result.data
      setData(res.data)
    }).catch(err => {
      console.log(err)
    })
  }, [dataProduct.delete])

  return (
    <Page title="Dashboard: Products">
      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Sản Phẩm
        </Typography>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Button variant="contained" component={RouterLink} to="/dashboard/create-product" startIcon={<Iconify icon="eva:plus-fill" />}>
            Thêm sản phẩm Trusted
          </Button>
          <Button variant="contained" component={RouterLink} to="/dashboard/create-mail-product" startIcon={<Iconify icon="eva:plus-fill" />}>
            Thêm Mail Trusted thủ công
          </Button>
        </Stack>
        <Card>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <ProductListHead
                  headLabel={TABLE_HEAD}
                  rowCount={data.length}
                />
                <TableBody>
                  {data?.map((row) => {
                    return (
                      <TableRow
                        hover
                        key={row.id}
                      >
                        <TableCell align="center"></TableCell>
                        <TableCell align="center">
                          {row.name}
                        </TableCell>
                        <TableCell align="center">
                          <img src={`https://countryflagsapi.com/png/${row.countryCode === null ? 'VN' : row.countryCode}`} width='35px' height='25px' style={{ display: 'block', textAlign: 'center', margin: '0 auto', borderRadius: '5px' }} />
                        </TableCell>
                        <TableCell align="center">
                          {fNumber(row.price)}
                        </TableCell>
                        <TableCell align="center">
                          {fNumber(row.count)}
                        </TableCell>
                        <TableCell align="center">
                          <Label variant="ghost" color={(row.isTrusted === true && 'success') || 'error'}>
                            {(row.isTrusted === true && 'Trusted') || 'Not Trusted'}
                          </Label>
                        </TableCell>
                        <TableCell align="center">
                          {fDateLocal(row.createdAt)}
                        </TableCell>
                        <TableCell align="left">
                          <ProductMoreMenu id={row.id} price={row.price} type={row.name} status={row.isTrusted} time={row.timeExist} />
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
                {/* <TableBody>
                  <TableRow>
                    <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                    </TableCell>
                  </TableRow>
                </TableBody> */}
              </Table>
            </TableContainer>
          </Scrollbar>
        </Card>
      </Container>
    </Page>
  );
}
