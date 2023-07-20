import React, { useLayoutEffect, useState } from 'react';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import MailIcon from '@mui/icons-material/Mail';
import Typography from '@mui/material/Typography';
import { Container, Grid } from '@mui/material';
import Logo from 'src/components/Logo';
import TelegramIcon from '@mui/icons-material/Telegram';
import BuyMailMain from '../components/buy-mail/BuyMailComponent'
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import LanguagePopover from 'src/layouts/dashboard/LanguagePopover';
import { Link as RouterLink } from 'react-router-dom';
import useResponsive from 'src/hooks/useResponsive';

const sections = [
  { title: 'Homepage', url: '/' },
  { title: 'APIs Document', url: '/api-documents' },
];

const HomePage = () => {
  const { t } = useTranslation("translation");
  const navigate = useNavigate();
  const smUp = useResponsive('up', 'sm');

  useLayoutEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      navigate('/dashboard/user', { replace: true });
    }
  }, [])

  return (
    <Container maxWidth="lg">
      {!smUp && (
        <>
          <Toolbar sx={{ borderBottom: 1, borderColor: 'divider', px: 0 }}>
            <Button size="small" href="/">
              <Logo />
              <Typography variant="h4" sx={{ ml: 1 }}>
                Gmailmmo
              </Typography>
            </Button>
            <Typography
              component="h2"
              variant="h5"
              color="inherit"
              align="center"
              sx={{ flex: 1 }}
            >
            </Typography>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <div>
                <LanguagePopover></LanguagePopover>
              </div>
              <div>
                <Button variant="outlined" size="small" sx={{ textDecoration: 'none' }} to="/login" component={RouterLink} >
                  {t("home_00")}
                </Button>
              </div>
            </div>
          </Toolbar>
        </>
      )}
      {smUp && (
        <>
          <Toolbar sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Button size="small" href="/">
              <Logo />
              <Typography variant="h4" sx={{ ml: 1 }}>
                Gmailmmo
              </Typography>
            </Button>
            <Typography
              component="h2"
              variant="h5"
              color="inherit"
              align="center"
              sx={{ flex: 1 }}
            >
            </Typography>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <div>
                <LanguagePopover></LanguagePopover>
              </div>
              <div>
                <Button variant="outlined" size="medium" sx={{ textDecoration: 'none' }} to="/login" component={RouterLink} >
                  {t("home_00")}
                </Button>
              </div>
            </div>
          </Toolbar>
        </>
      )}
      {!smUp && (
        <>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px', }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <TelegramIcon sx={{ mr: 1 }}>
                </TelegramIcon>
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                {/* <MailIcon sx={{ mr: 2 }}>
                </MailIcon> */}
                <img src="https://cdn1.iconfinder.com/data/icons/logos-brands-in-colors/2500/zalo-seeklogo.com-512.png" style={{ width: 20, height: 20, marginRight: '10px' }}></img>
              </div>
            </div>
            <Toolbar
              sx={{ px: 0 }}
            >
              {sections.map((section) => (
                <Link
                  color="inherit"
                  key={section.title}
                  variant="body2"
                  to={section.url}
                  style={{ marginRight: '20px', textDecoration: 'none' }}
                >
                  {section.title}
                </Link>
              ))}
            </Toolbar>
          </div>
        </>
      )}
      {smUp && (
        <>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '30px' }}>
            <Toolbar
              component="nav"
              variant="dense"
              sx={{ gap: '20px' }}
            >
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <TelegramIcon sx={{ mr: 2 }}>
                </TelegramIcon>
                Telegram
              </div>
              <div style={{ display: 'flex', alignItems: 'center', fontSize: '14px' }}>
                {/* <MailIcon sx={{ mr: 2 }}>
                </MailIcon> */}
                <img src="https://cdn1.iconfinder.com/data/icons/logos-brands-in-colors/2500/zalo-seeklogo.com-512.png" style={{ width: 20, height: 20, marginRight: '10px' }}></img>
                0902281334
              </div>
            </Toolbar>
            <Toolbar>
              {sections.map((section) => (
                <Link
                  color="inherit"
                  key={section.title}
                  variant="body2"
                  to={section.url}
                  style={{ padding: '10px', flexShrink: 0, marginLeft: '20px', textDecoration: 'none' }}
                >
                  {section.title}
                </Link>
              ))}
            </Toolbar>
          </div>
        </>
      )}
      {!smUp && (
        <Grid container sx={{ mb: 1 }}>
          <Grid item xs={12} sx={{ paddingTop: 1 }}>
            <Typography gutterBottom variant="h5" sx={{ color: '#004e63' }}>
              {t("home_01")}
            </Typography>
            <Typography gutterBottom sx={{ color: '#004e63' }}>
              {t("home_02")}
            </Typography>
            <Typography gutterBottom sx={{ color: '#004e63' }}>
              {t("home_03")}
            </Typography>
            <Typography gutterBottom sx={{ color: '#004e63' }}>
              {t("home_04")}
            </Typography>
          </Grid>
          <Grid item xs={12} sx={{ textAlign: 'center', py: 1, mb: 1 }}>
            <Button variant="contained" to="/register" component={RouterLink}>
              {t("home_07")}
            </Button>
          </Grid>
        </Grid>
      )}

      {smUp && (
        <Grid container spacing={10} sx={{ mb: 5 }}>
          <Grid item xs={6} >
            <Typography gutterBottom variant="h5">
              {t("home_01")}
            </Typography>
            <Typography gutterBottom>
              {t("home_02")}
            </Typography>
            <Typography gutterBottom>
              {t("home_03")}
            </Typography>
            <Typography gutterBottom>
              {t("home_04")}
            </Typography>
          </Grid>
          <Grid item xs={6} sx={{ textAlign: 'center' }}>
            <Typography gutterBottom variant="h6">
              {t("home_05")}
            </Typography>
            <Typography>
              {t("home_06")}
            </Typography>
            <Button variant="contained" sx={{ mt: 3 }} to="/register" component={RouterLink}>
              {t("home_07")}
            </Button>
          </Grid>
        </Grid>
      )}
      <BuyMailMain />
    </Container>
  );
};

export default HomePage;