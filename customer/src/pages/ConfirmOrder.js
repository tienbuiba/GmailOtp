import { Box, Button, Card, Container, Grid, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import Review from 'src/components/buy-mail/Review';
import Page from 'src/components/Page';
import { apiUserCreateOrder } from 'src/services/Order';
import { ToastContainer, toast } from 'react-toastify';
import { closeConfirmOrder } from 'src/redux/creates-action/OrderAction';
import { useNavigate } from 'react-router-dom';
import { updateBalance } from 'src/redux/creates-action/balanceAction';

const ConfirmOrder = () => {
  const { t } = useTranslation('translation');
  const [activeStep, setActiveStep] = React.useState(0);
  const data = useSelector((state) => state.mail.data);
  const [mailTypeId, setMailTypeId] = useState('');
  const [totalPrice, setTotalPrice] = useState('');
  const [amount, setAmount] = useState('');
  const dataOrder = useSelector((state) => state.order.data);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [orderCode, setOrderCode] = useState('');

  const options = {
    autoClose: 2000,
    position: toast.POSITION.TOP_RIGHT,
  };
  useEffect(() => {
    setMailTypeId(data.id);
    setTotalPrice(dataOrder.total);
    setAmount(dataOrder.amount);
  }, [data.id, dataOrder.total, dataOrder.amount]);

  const handleNext = () => {
    if ((mailTypeId !== null, totalPrice !== null, amount !== null)) {
      apiUserCreateOrder(mailTypeId, 'BUY', totalPrice, parseInt(amount))
        .then((result) => {
          let res = result.data;
          dispatch(updateBalance());
          toast.success(res.message, options);
          setActiveStep(activeStep + 1);
          dispatch(closeConfirmOrder());
          setOrderCode(res.data.orderCode);
        })
        .catch((err) => {
          if (err.response.data.statusCode === 401) {
            toast.error(err.response.data.message, options);
          } else if (err.response.data.statusCode === 400) {
            toast.error(err.response.data.message, options);
          } else {
            toast.error(err.response.data.message, options);
          }
        });
    } else {
      navigate('/dashboard/user', { replace: true });
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <Review />;
      default:
        throw new Error('Unknown step');
    }
  }
  return (
    <Page title={t('title_01')}>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            {t('confirm_order_01')}
          </Typography>
        </Stack>
        <Card>
          <Container component="main" maxWidth="lg" sx={{ mb: 4 }}>
            <Grid sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
              <Typography component="h1" variant="h4" align="center">
                {t('confirm_order_02')}
              </Typography>
              <React.Fragment>
                {activeStep === 1 ? (
                  <React.Fragment>
                    <Typography variant="h5" gutterBottom>
                      {t('confirm_order_03')}
                    </Typography>
                    <Typography variant="subtitle1">
                      {t('confirm_order_06')}#{orderCode}. {t('confirm_order_07')}
                    </Typography>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    {getStepContent(activeStep)}
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                      {activeStep !== 0 && (
                        <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                          Quay lại
                        </Button>
                      )}
                      <Button variant="contained" onClick={handleNext} sx={{ mt: 3, ml: 1 }}>
                        {t('confirm_order_05')}
                      </Button>
                    </Box>
                  </React.Fragment>
                )}
              </React.Fragment>
            </Grid>
          </Container>
        </Card>
      </Container>
      <ToastContainer></ToastContainer>
    </Page>
  );
};

export default ConfirmOrder;
