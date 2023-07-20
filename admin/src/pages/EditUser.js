import { useEffect, useState } from 'react';
import { Link, Link as RouterLink, useNavigate } from 'react-router-dom';
// material
import {
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
} from '@mui/material';
import Page from '../components/Page';
import Iconify from 'src/components/Iconify';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { apiAdminUpdateBalance } from 'src/services/User';
import { closeLoadingApi, openLoadingApi } from 'src/redux/create-actions/LoadingAction';

export default function EditUser() {
  const [amount, setAmount] = useState('');
    const [message, setMessage] = useState('');
  const [typePay, setTypePay] = useState('');
  const [methodPay, setMethodPay] = useState('');
  const data = useSelector((state) => state.user.data);
  const dispatch = useDispatch()

  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      navigate('/login', { replace: true });
    }
  }, []);

  const options = {
    autoClose: 2000,
    position: toast.POSITION.TOP_RIGHT,
  };

  const handleClick = () => {
    if (typePay !== '' && amount !== '' && message !== '') {
      dispatch(openLoadingApi());
      apiAdminUpdateBalance(data.id, typePay === 'MINUS' ? typePay : typePay + methodPay, parseInt(amount), message)
        .then((result) => {
          let res = result.data;
          navigate('/dashboard/user', { replace: true });
          dispatch(closeLoadingApi());
          toast.success(res.message, options);
        })
        .catch((err) => {
          if (err.response.data.statusCode === 401) {
            dispatch(closeLoadingApi());
            toast.error(err.response.data.message, options);
          } else if (err.response.data.statusCode === 400) {
            dispatch(closeLoadingApi());
            toast.error(err.response.data.message[0].message, options);
          } else {
            toast.error(err.response.data.message, options);
            dispatch(closeLoadingApi());
          }
        });
    } else {
      toast.error('Nhập thiếu trường!!!', options);
    }
  };

  const handleChangeTypePay = (event) => {
    setTypePay(event.target.value);
  };

  const handleChangeMethodPay = (event) => {
    setMethodPay(event.target.value);
  };

  const handleChangeAmount = (e) => {
    setAmount(e.target.value);
  };

  return (
    <Page title="Dashboard: Product">
      <Container>
        <Typography variant="h4" sx={{ mb: 10 }}>
          Cập nhật số dư
        </Typography>
        <Grid container>
          <Grid item xs={6}></Grid>
          <Grid item xs={6} sx={{ textAlign: 'right' }}>
            <Button
              variant="contained"
              component={RouterLink}
              to="/dashboard/user"
              startIcon={<Iconify icon="eva:arrow-back-outline" />}
            >
              Quay lại
            </Button>
          </Grid>
        </Grid>
        <Page title="Edit-product">
          <Container maxWidth="md" sx={{ mt: 3 }}>
            <Grid container>
              <Grid container item spacing={3}>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id="demo">Loại giao dịch</InputLabel>
                    <Select
                      labelId="demo"
                      id="demo"
                      value={typePay}
                      label="Loại giao dịch"
                      onChange={handleChangeTypePay}
                    >
                      <MenuItem value="ADD_">Cộng Tiền</MenuItem>
                      <MenuItem value="MINUS">Trừ Tiền</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl variant="standard">
                    <TextField
                      label="Số tiền..."
                      value={amount}
                      onChange={handleChangeAmount}
                      InputProps={{
                        startAdornment: <InputAdornment position="start">VND</InputAdornment>,
                      }}
                    ></TextField>
                  </FormControl>
                </Grid>

                {typePay === 'MINUS' ? (
                  <></>
                ) : (
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple">Phương thức thanh toán</InputLabel>
                      <Select
                        labelId="demo-simple"
                        id="demo-simple-select"
                        value={methodPay}
                        label="Phương thức thanh toán"
                        onChange={handleChangeMethodPay}
                      >
                        <MenuItem value="MOMO">Momo</MenuItem>
                        <MenuItem value="BANK">Autobank</MenuItem>
                        <MenuItem value="PAYPAL">Paypal</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                )}

                <Grid item xs={12}>
                  <TextField
                    label="Nội dung"
                    value={message}
                    fullWidth
                    onChange={(e) => setMessage(e.target.value)}
                  ></TextField>
                </Grid>
                <Grid item xs={12}>
                  <Button variant="contained" onClick={handleClick} startIcon={<Iconify icon="ic:outline-update" />}>
                    Cập nhật
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Container>
        </Page>
      </Container>
      <ToastContainer />
    </Page>
  );
}
