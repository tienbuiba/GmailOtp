import { useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
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
  TableSortLabel,
  TableHead
} from '@mui/material';
// components
import Page from '../components/Page';
import Scrollbar from '../components/Scrollbar';
import { apiAdminGetRentServiceLists } from 'src/services/Products';
import Iconify from 'src/components/Iconify';
import { fNumber } from 'src/utils/formatNumber';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';//
import RentMoreMenu from 'src/sections/@dashboard/rentMail/RentMoreMenu';
import Label from 'src/components/Label';

// ----------------------------------------------------------------------

export default function RentMail() {
  const [data, setData] = useState([])
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      navigate('/login', { replace: true });
    }
  }, [])
  useEffect(() => {
    apiAdminGetRentServiceLists().then(result => {
      const res = result.data;
      setData(res.data)
    }).catch(err => {
      console.log(err)
    })
  }, []);
  return (
    <Page title="Dashboard: Products">
      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Thuê CODE Mail
        </Typography>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <></>
          <Button variant="contained" component={RouterLink} to="/dashboard/create-rent-product" startIcon={<Iconify icon="eva:plus-fill" />}>
            Thêm Loại Thuê Code Mail
          </Button>
        </Stack>
        <Card>
          <Scrollbar>
            <TableContainer
            >
              <Table>
                <>
                  <TableHead>
                    <TableRow>
                      <TableCell
                        align='left'
                      >
                      </TableCell>
                      <TableCell
                        align='left'
                      >
                        <TableSortLabel
                          hideSortIcon
                        >
                          <FingerprintIcon sx={{ color: '#3953B4', mr: 1 }} />
                          DỊCH VỤ
                        </TableSortLabel>
                      </TableCell>
                      <TableCell
                        align='left'
                      >
                        <TableSortLabel
                          hideSortIcon
                        >
                          <LocalOfferIcon sx={{ color: '#3953B4', mr: 1 }} />
                          GIÁ
                        </TableSortLabel>
                      </TableCell>
                      <TableCell
                        align='left'>
                        <TableSortLabel hideSortIcon>
                          <MarkEmailReadIcon sx={{ color: '#3953B4', mr: 1 }} />
                          TRẠNG THÁI
                        </TableSortLabel>
                      </TableCell>
                      <TableCell align='left'>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                </>
                <TableBody>
                  {data?.map((row) => {
                    return (
                      <TableRow
                        hover
                        key={row.id}
                        tabIndex={-1}
                      >
                        <TableCell align='left'>
                        </TableCell>
                        <TableCell align='left'>
                          {row.name}
                        </TableCell>
                        <TableCell align='left'
                        >{fNumber(row.price)}đ / mail</TableCell>
                        <TableCell align='left'
                        >
                          <Label variant="ghost" color={(row.status === 'ACTIVE' && 'success') || 'error'}>
                            {row.status}
                          </Label>
                        </TableCell>
                        <TableCell align="left">
                          <RentMoreMenu id={row.id} price={row.price} name={row.name} status={row.status} />
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>
        </Card>
      </Container>
      <ToastContainer />
    </Page>
  );
}
