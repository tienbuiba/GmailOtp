
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// material
import {
  Stack,
  Button,
  Container,
  Typography
} from '@mui/material';
// components
import Page from '../components/Page';
import Iconify from '../components/Iconify';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import RentMailMain from 'src/components/rent-mail/RentMailMain';

// ----------------------------------------------------------------------

export default function RentMail() {
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
      <Container maxWidth="lg">
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            {t("Rent Code Mail")}
          </Typography>
          <Button variant="contained" component={RouterLink} to="/dashboard/deposit" startIcon={<Iconify icon="eva:plus-fill" />}>
            {t("dashboard_003")}
          </Button>
        </Stack>
        <div>
          <RentMailMain></RentMailMain>
        </div>
      </Container>
    </Page>
  );
}
