import { useLayoutEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  Stack,
  Container,
  Typography,
  Grid,
  Button,


} from '@mui/material';
import Page from '../components/Page';
import { useTranslation } from 'react-i18next';
import Momo from 'src/components/deposit/Momo';
import { optionDeposit } from 'src/constant/Constants';
import Paypal from 'src/components/deposit/Paypal';
import Vietcombank from 'src/components/deposit/Vietcombank';
import useResponsive from 'src/hooks/useResponsive';

// ----------------------------------------------------------------------

export default function Deposit() {

  const { t } = useTranslation("translation");
  const navigate = useNavigate();
  useLayoutEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      navigate('/login', { replace: true });
    }
  }, [])
  const [type, setType] = useState("")
  const smUp = useResponsive('up', 'sm');

  const resolveClick = option => {
    setType(option);
  }

  const ShowOrHide = () => {
    if (type === optionDeposit.VIETCOMBANK) {
      return (
        <Vietcombank update={resolveClick} />
      )
    }
    else if (type === optionDeposit.MOMO) {
      return (
        <Momo update={resolveClick} />
      )
    }
    else if (type === optionDeposit.PAYPAL) {
      return (
        <Paypal update={resolveClick} />
      )
    }
    else {
      return (
        <Vietcombank />
      )
    }
  }
  return (
    <Page title={t("title_01")}>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            {t("deposit_02")}
          </Typography>
        </Stack>
        <Card>
          {!smUp && (
            <Grid container sx={{ p: 3 }} spacing={2}>
              <Grid container item xs={12} md={12} spacing={2} sx={{ mt: 1 }}>
                <Grid item xs={12} sx={{ textAlign: 'center' }} >
                  <Button variant="outlined" sx={{ width: '171px', height: '53px', color: '#d82d8b' }} onClick={() => resolveClick(optionDeposit.MOMO)}>
                    <img src={require('../_mock/momo.png')} height="42px" style={{ textAlign: 'left', marginRight: '25px' }} />
                    MOMO
                  </Button>
                </Grid>
                <Grid item xs={12} sx={{ textAlign: 'center' }} >
                  <Button variant="outlined" onClick={() => resolveClick(optionDeposit.PAYPAL)}>
                    <img src={require('../_mock/paypal.png')} width="140px" height="42px" />
                  </Button>
                </Grid>
                <Grid item xs={12} sx={{ textAlign: 'center' }} >
                  <Button variant="outlined" onClick={() => resolveClick(optionDeposit.VIETCOMBANK)}>
                    <img src={require('../_mock/vietcombank.png')} width="140px" height="42px" />
                  </Button>
                </Grid>
              </Grid>
              <Grid container item xs={12} md={12} sx={{ my: 5 }}>
                <ShowOrHide></ShowOrHide>
              </Grid>
            </Grid>
          )}

          {smUp && (
            <Grid container sx={{ p: 3 }} spacing={2}>
              <Grid container item xs={12} md={12} spacing={2} sx={{ my: 5 }}>
                <Grid item xs={4} sx={{ textAlign: 'center' }} >
                  <Button variant="outlined" sx={{ width: '171px', height: '53px', color: '#d82d8b' }} onClick={() => resolveClick(optionDeposit.MOMO)}>
                    <img src={require('../_mock/momo.png')} height="42px" style={{ textAlign: 'left', marginRight: '25px' }} />
                    MOMO
                  </Button>
                </Grid>
                <Grid item xs={4} sx={{ textAlign: 'center' }} >
                  <Button variant="outlined" onClick={() => resolveClick(optionDeposit.VIETCOMBANK)}>
                    <img src={require('../_mock/vietcombank.png')} width="140px" height="42px" />
                  </Button>
                </Grid>
                <Grid item xs={4} sx={{ textAlign: 'center' }} >
                  <Button variant="outlined" onClick={() => resolveClick(optionDeposit.PAYPAL)}>
                    <img src={require('../_mock/paypal.png')} width="140px" height="42px" />
                  </Button>
                </Grid>
              </Grid>
              <Grid container item xs={12} md={12} sx={{ my: 5 }}>
                <ShowOrHide></ShowOrHide>
              </Grid>
            </Grid>
          )}

        </Card>
      </Container>
    </Page>
  );
}

