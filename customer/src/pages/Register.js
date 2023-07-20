import useResponsive from '../hooks/useResponsive';
import Page from '../components/Page';
import Logo from '../components/Logo';
import { Link as RouterLink } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import * as Yup from 'yup';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link, IconButton, InputAdornment, Grid, FormControl, OutlinedInput, FormHelperText, useMediaQuery, createTheme, Typography, Container, Card, Button } from '@mui/material';
import { useFormik } from 'formik';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { apiUserRegister } from 'src/services/Authenticate';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReCAPTCHA from 'react-google-recaptcha';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { closeLoadingApi, openLoadingApi } from 'src/redux/creates-action/LoadingAction';


// ----------------------------------------------------------------------

const validationSchema = Yup.object().shape({
  userName: Yup.string()
    .required("Please provide a valid username"),
  password: Yup.string()
    .required("This field is required")
    .min(8, 'Password is too short - should be 8 chars minimum.'),
  email: Yup.string()
    .required("Please provide a valid email")
    .email('Not a proper email')

});

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

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 464,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2),
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function Register() {
  const smUp = useResponsive('up', 'sm');
  const mdUp = useResponsive('up', 'md');
  const navigate = useNavigate();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));
  const [showPassword, setShowPassword] = useState(false);
  const [verfied, setVerifed] = useState(false);
  const { t } = useTranslation("translation");
  const data = useSelector(state => state.loading.data);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      userName: '',
      password: '',
      email: '',
      role: 'USER'
    },
    validationSchema: validationSchema,
    onSubmit: (values) => { handleSubmit(values) }
  });
  const options = {
    autoClose: 2000,
    position: toast.POSITION.TOP_RIGHT,
  };

  const handleSubmit = (e) => {
    if (verfied) { 
      dispatch(openLoadingApi());
      apiUserRegister(e.userName,e.password,e.email,'').then(result => {
        if (result.data.statusCode === 200) {
          dispatch(closeLoadingApi());
          toast.success(result.data.message, options)
          setTimeout(() => {
            navigate('/login', { replace: true });
          }, 2500)
        }
      })
        .catch(err => {
          dispatch(closeLoadingApi());
          if (err.response.data.statusCode === 401) {
            toast.error(err.response.data.message, options);
          } else if (err.response.data.statusCode === 400) {
            toast.error(err.response.data.message, options);
          } else {
            toast.error(err.response.data.message, options);
          }
        })
    }
    else {
      dispatch(closeLoadingApi());
      toast.error("check Captcha", options)
    }
  };
  const handleCaptcha = (value) => {
    setVerifed(true);
  }
  return (
    <Page title="Register">
      <RootStyle>
        <HeaderStyle>
          <Logo />
          {smUp && (
            <Typography variant="body2" sx={{ mt: { md: -2 } }}>
              {t("signup_01")}
              <Link variant="subtitle2" component={RouterLink} to="/login">
                {t("signup_02")}
              </Link>
            </Typography>
          )}
        </HeaderStyle>
        {mdUp && (
          <SectionStyle>
            <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
              {t("signup_03")}
            </Typography>
            <img alt="register" src="/static/illustrations/illustration_register.png" />
          </SectionStyle>
        )}
        <Container>
          <ContentStyle>
            <Typography variant="h4" gutterBottom>
              {t("signup_04")}
            </Typography>
            <Typography sx={{ color: 'text.secondary', mb: 5 }}>
              {t("signup_05")}
            </Typography>
            <Grid>
              <form onSubmit={formik.handleSubmit} noValidate>
                <Grid sx={{ mb: 2 }} >
                  <FormControl fullWidth
                    error={formik.touched.userName && Boolean(formik.errors.userName)}>
                    <Typography>
                      {t("signup_06")}
                    </Typography>
                    <OutlinedInput
                      id="userName"
                      fullWidth
                      required
                      size={matchDownSM ? 'small' : 'large'}
                      value={formik.values.userName}
                      onChange={formik.handleChange}
                      sx={{
                        '& .MuiInputBase-input': {
                          bgcolor: theme.palette.background.default
                        },
                        bgcolor: theme.palette.background.default,
                      }}
                    />
                    {formik.touched.userName && formik.errors.userName && (
                      <FormHelperText error id="standard-weight-helper">
                        {formik.errors.userName}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
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
                      {t("signup_07")}
                    </Typography>
                    <OutlinedInput
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      fullWidth
                      required
                      size={matchDownSM ? 'small' : 'large'}
                      value={formik.values.password}
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
                <ReCAPTCHA
                  sitekey="6LcswW8iAAAAAAHRpgO3piKsnzK8J8za2BAmpuY0"
                  onChange={handleCaptcha}
                />
                <Button fullWidth size="large" type="submit" variant="contained" sx={{ mt: 2 }} disabled={data.isLoading === true ? true : false}>
                  {t("signup_08")}
                </Button>
              </form>
            </Grid>
            {!smUp && (
              <Typography variant="body2" sx={{ mt: 3, textAlign: 'center' }}>
                {t("signup_01")}
                <Link variant="subtitle2" to="/login" component={RouterLink}>
                  {t("signup_02")}
                </Link>
              </Typography>
            )}
          </ContentStyle>
        </Container>
      </RootStyle>
      <ToastContainer />
    </Page>
  );
}
