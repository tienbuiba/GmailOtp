import { useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// material
import { Container, Typography, Grid, TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import Page from '../components/Page';
import Iconify from 'src/components/Iconify';
import { ToastContainer, toast } from 'react-toastify';
import { apiAdminCreateRentMailService } from 'src/services/Products';
import { closeLoadingApi, openLoadingApi } from 'src/redux/create-actions/LoadingAction';
import { useDispatch } from 'react-redux';

export default function CreateRentProduct() {
  const [price, setPrice] = useState('');
  const [name, setName] = useState('');
  const dispatch = useDispatch();

  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      navigate('/login', { replace: true });
    }
  }, []);

  const handleChangePrice = (e) => {
    setPrice(e.target.value);
  };
  const handleChangeName = (e) => {
    setName(e.target.value);
  };
  const options = {
    autoClose: 2000,
    position: toast.POSITION.TOP_RIGHT,
  };

  const handleClick = () => {
    if (name !== '' && price !== '') {
      dispatch(openLoadingApi());
      apiAdminCreateRentMailService(name, parseInt(price))
        .then((result) => {
          let res = result.data;
          dispatch(closeLoadingApi());
          navigate('/dashboard/rent-mail', { replace: true });
          toast.success(res.message, options);
        })
        .catch((err) => {
          if (err.response.data.statusCode === 401) {
            dispatch(closeLoadingApi());
            toast.error(err.response.data.message, options);
          } else if (err.response.data.statusCode === 400) {
            dispatch(closeLoadingApi());
            toast.error(err.response.data.message, options);
          } else {
            dispatch(closeLoadingApi());
            toast.error(err.response.data.message, options);
          }
        });
    } else {
      toast.error('Điền đầy đủ thông tin', options);
    }
  };

  return (
    <Page title="Dashboard: Product">
      <Container>
        <Typography variant="h4" sx={{ mb: 10 }}>
          Thêm sản phẩm Thuê Code MAIL
        </Typography>
        <Grid container>
          <Grid item xs={6}></Grid>
          <Grid item xs={6} sx={{ textAlign: 'right' }}>
            <Button
              variant="contained"
              component={RouterLink}
              to="/dashboard/rent-mail"
              startIcon={<Iconify icon="eva:arrow-back-outline" />}
            >
              Quay lại
            </Button>
          </Grid>
        </Grid>
        <Page title="Create-product">
          <Container maxWidth="md" sx={{ mt: 3 }}>
            <Grid container spacing={3}>
              <Grid container item>
                <Grid item xs={6}>
                  Tên Dịch Vụ
                </Grid>
                <Grid item xs={6}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Tên Dịch Vụ</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Tên Dịch Vụ"
                      value={name} onChange={handleChangeName}  >
                      <MenuItem value={'Tiktok'}>Tiktok</MenuItem>
                      <MenuItem value={'Facebook'}>Facebook</MenuItem>
                      <MenuItem value={'Lazada'}>Lazada</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
              <Grid container item>
                <Grid item xs={6}>
                  Giá
                </Grid>
                <Grid item xs={6}>
                  <TextField label="Giá loại dịch vụ (ví dụ: 100...)" value={price} onChange={handleChangePrice} fullWidth></TextField>
                </Grid>
              </Grid>
              <Grid container item>
                <Grid item xs={6}></Grid>
                <Grid item xs={6}>
                  <Button variant="contained" onClick={handleClick} startIcon={<Iconify icon="eva:plus-fill" />}>
                    Thêm
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
