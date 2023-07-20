import { Button, FormControl, Grid, InputAdornment, Link, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import SendIcon from '@mui/icons-material/Send';
import { fNumber } from 'src/utils/formatNumber';
import { apiUserDepositPayPal } from 'src/services/Payment';
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { linkPaypal } from 'src/redux/creates-action/PaymentAction';
import { useTranslation } from 'react-i18next';
import useResponsive from 'src/hooks/useResponsive';

const Paypal = (props) => {
  const [money, setMoney] = useState('');
  const [link, setLink] = useState('');
  const { t } = useTranslation("translation");
  const smUp = useResponsive('up', 'sm');

  const handleChange = (e) => {
    const result = (e.target.value);
    setMoney(result);
  }
  const dispatch = useDispatch()

  const options = {
    autoClose: 2000,
    position: toast.POSITION.TOP_RIGHT,
  };


  const handleClick = () => {
    if (money !== '') {
      apiUserDepositPayPal(parseInt(money)).then(result => {
        let res = result.data;
        setLink(res.data.link);
        dispatch(linkPaypal(res.data.link));
        window.open(res.data.link, "_blank", "");
      })
        .catch(err => {
          if (err.response.data.statusCode === 401) {
            toast.error(err.response.data.message, options);
          } else if (err.response.data.statusCode === 400) {
            toast.error(err.response.data.message[0].message, options);
          } else {
            toast.error(err.response.data.message, options);
          }
        })
    }

  }

  return (
    <>
      <Grid container item spacing={2} sx={{ pt: 2, textAlign: 'center' }} xs={12}>
        <Grid item xs={12}>
          <Typography variant="body1" sx={{ display: 'inline-block' }} gutterBottom>
            {t("paypal_02")}
            <span style={{ color: '#00457C', display: 'inline-block', marginRight: '5px', marginLeft: '5px', fontWeight: 'bold' }}>
              PAYPAL
            </span>
          </Typography>
        </Grid>
        {!smUp && (
          <Grid container item xs={12} spacing={2}>
            <Grid item xs={12}>
              <FormControl fullWidth variant="standard">
                <TextField
                  label={t("paypal_03")}
                  fullWidth
                  value={fNumber(money)} onChange={handleChange}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                  }}>
                </TextField>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <Button variant="contained" endIcon={<SendIcon></SendIcon>} onClick={handleClick}>
                {t("paypal_01")}
              </Button>
            </Grid>
          </Grid>
        )}
        {smUp && (
          <Grid container item xs={12} spacing={2}>
            <Grid item xs={4}>
            </Grid>
            <Grid item xs={4}>
              <FormControl fullWidth variant="standard">
                <TextField
                  label={t("paypal_03")}
                  fullWidth
                  value={fNumber(money)} onChange={handleChange}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                  }}>
                </TextField>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" endIcon={<SendIcon></SendIcon>} onClick={handleClick}>
                {t("paypal_01")}
              </Button>
            </Grid>
          </Grid>
        )}
        <ToastContainer></ToastContainer>
      </Grid>
    </>
  );
};

export default Paypal;