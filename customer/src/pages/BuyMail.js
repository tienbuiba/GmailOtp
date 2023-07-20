
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// material
import {
  Card,
  Stack,
  Button,
  Container,
  Typography
} from '@mui/material';
// components
import Page from '../components/Page';
import Iconify from '../components/Iconify';
import BuyMailMain from '../components/buy-mail/BuyMailComponent';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

// ----------------------------------------------------------------------

export default function BuyMail() {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      navigate('/login', { replace: true });
    }
  }, [])
  const { t } = useTranslation("translation");
  return (
    <Page title={t("dashboard_002")}>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            {t("dashboard_002")}
          </Typography>
          <Button variant="contained" component={RouterLink} to="/dashboard/deposit" startIcon={<Iconify icon="eva:plus-fill" />}>
            {t("dashboard_003")}
          </Button>
        </Stack>
        <Card>
          <BuyMailMain></BuyMailMain>
        </Card>
      </Container>
    </Page>
  );
}
