import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
// hooks
import useResponsive from '../hooks/useResponsive';
// components
import Page from '../components/Page';
import Logo from '../components/Logo';
// sections
import * as Yup from 'yup';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link, Stack, IconButton, InputAdornment, Grid, FormControl, OutlinedInput, FormHelperText, useMediaQuery, createTheme, Typography, Container, Card, Button, Divider } from '@mui/material';
import { useFormik } from 'formik';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { apiUserLogin, apiUserProfile } from 'src/services/Authenticate';
import TokenService from 'src/services/TokenService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { closeLoadingApi, openLoadingApi } from 'src/redux/creates-action/LoadingAction';


const theme = createTheme()
// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const HeaderStyle = styled('header')(({ theme }) => ({
  top: 0,
  zIndex: 9,
  lineHeight: 0,
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  position: 'absolute',
  padding: theme.spacing(3),
  justifyContent: 'space-between',
  [theme.breakpoints.up('md')]: {
    alignItems: 'flex-start',
    padding: theme.spacing(7, 5, 0, 7),
  },
}));


const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '60vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function Login() {
  const smUp = useResponsive('up', 'sm');
  const navigate = useNavigate();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required("This field is required")
      .email('Please provide a valid password'),
    password: Yup.string()
      .required("This field is required")
      .min(8, 'Password is too short - should be 8 chars minimum.')
  });
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => { handleSubmit(values) }
  });

  const options = {
    autoClose: 2000,
    position: toast.POSITION.TOP_RIGHT,
  };

  const handleSubmit = (e) => {
    dispatch(openLoadingApi());
    apiUserLogin(e.email, e.password)
      .then(result => {
        let res = result.data;
        if (res.statusCode === 200) {
          TokenService.updateLocalAccessToken(`Bearer ${res.data.accessToken}`);
          TokenService.updateLocalExpiresIn(res.data.expiresIn);
          dispatch(closeLoadingApi());
          apiUserProfile().then(result => {
            TokenService.updateLocalProfile(JSON.stringify(result.data));
            navigate('/dashboard/user', { replace: true });
            toast.success(res.message, options);
          }).then(error => {
            console.log(error);
            dispatch(closeLoadingApi());
          })
        }
      }).catch(err => {
        dispatch(closeLoadingApi());
        if (err.response.data.statusCode === 401) {
          toast.error(err.response.data.message, options);
          navigate('/login', { replace: true });
        } else if (err.response.data.statusCode === 400) {
          toast.error(err.response.data.message[0].message, options);
          navigate('/login', { replace: true });
        } else {
          toast.error(err.response.data.message, options);
          navigate('/login', { replace: true });
        }
      })
  };
  const { t } = useTranslation("translation");
  const data = useSelector(state => state.loading.data);
  return (
    <Page title="Login">
      <RootStyle>
        <HeaderStyle>
          <Logo />
        </HeaderStyle>
        <Container maxWidth="sm">
          <ContentStyle>
            <Card sx={{ px: 3, py: 3 }}>
              <Grid container justifyContent={'center'} alignItems={'center'} display={'flex'} flexDirection={'column'} spacing={0.2}>
                <Grid item>
                  <Typography variant="h4" gutterBottom letterSpacing={1.9} align='center'>
                    {t("login_04")}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography gutterBottom variant="body2">
                    {t("login_01")}
                    <Link variant="subtitle2" component={RouterLink} to="/register" style={{ paddingLeft: '8px' }}>
                      {t("login_02")}
                    </Link>
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body2" gutterBottom letterSpacing={1.9} align='center'>
                    GMAILOTP.COM
                  </Typography>
                  <Divider sx={{ mb: 3 }}></Divider>
                </Grid>
              </Grid>
              <Grid>
                <form component="form" onSubmit={formik.handleSubmit} noValidate>
                  <Grid sx={{ mb: 2 }} >
                    <FormControl fullWidth
                      error={formik.touched.email && Boolean(formik.errors.email)}>
                      <Typography>Email *</Typography>
                      <OutlinedInput
                        id="email"
                        fullWidth
                        required
                        size={matchDownSM ? 'small' : 'large'}
                        value={formik.values.email}
                        placeholder='Nhập email'
                        onChange={formik.handleChange}
                        sx={{
                          '& .MuiInputBase-input': {
                            bgcolor: theme.palette.background.default
                          },
                          bgcolor: theme.palette.background.default,
                        }}
                      />
                      {formik.touched.email && formik.errors.email && (
                        <FormHelperText error id="standard-weight-helper">
                          {formik.errors.email}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid sx={{ mb: 2 }} >
                    <FormControl fullWidth
                      error={formik.touched.password && Boolean(formik.errors.password)}
                    >
                      <Typography>
                        {t("login_06")}
                      </Typography>
                      <OutlinedInput
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        fullWidth
                        required
                        size={matchDownSM ? 'small' : 'large'}
                        value={formik.values.password}
                        placeholder='Nhập mật khẩu'
                        onChange={formik.handleChange}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={e => { setShowPassword(!showPassword) }}
                              onMouseDown={(e) => e.preventDefault()}
                              edge="end"
                              size="small"
                            >
                              {showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                          </InputAdornment>
                        }
                        inputProps={{}}
                        sx={{
                          '& .MuiInputBase-input': {
                            bgcolor: theme.palette.background.default
                          },
                          bgcolor: theme.palette.background.default,
                        }}
                      />
                      {formik.touched.password && formik.errors.password && (
                        <FormHelperText error id="standard-weight-helper-text-email-login">
                          {formik.errors.password}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
                    <div></div>
                    <Link variant="subtitle2" component={RouterLink} to="/forgot-password">
                      {t("login_07")}
                    </Link>
                  </Stack>
                  <Button fullWidth size="large" type="submit" variant="contained" disabled={data.isLoading === true ? true : false}>
                    {t("login_08")}
                  </Button>
                </form>
              </Grid>
            </Card>
          </ContentStyle>
        </Container>
      </RootStyle>
      <ToastContainer />
    </Page>
  );
}
