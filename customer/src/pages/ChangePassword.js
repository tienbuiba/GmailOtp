import {
  Button,
  FormHelperText,
  Grid,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
  Container,
  Card,
  Box,
  Divider

} from '@mui/material';

import * as Yup from 'yup';
import { Formik } from 'formik';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiUserChangePassword } from 'src/services/Authenticate';
import { ToastContainer, toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import Page from 'src/components/Page';
import UpdateIcon from '@mui/icons-material/Update';
import { closeLoadingApi, openLoadingApi } from 'src/redux/creates-action/LoadingAction';
import { useDispatch } from 'react-redux';

// ============================|| CHANGE PASSWORD ||============================ //

const ChangePassword = () => {
  const navigate = useNavigate();
  const { t } = useTranslation("translation");
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      navigate('/login', { replace: true });
    }
  }, [])


  const options = {
    autoClose: 2000,
    position: toast.POSITION.TOP_RIGHT,
  };

  return (
    <Page  title={t("title_03")}
    >
      <Container sx={{ padding: 2, backgroundColor: 'white' }}  maxWidth="lg">
        <Grid item xs={12}>
          <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
            <Typography variant="h4" sx={{ mb: 4, marginLeft: 2, marginTop: 2 }}>
              {t("change_04")}
            </Typography>
          </Stack>
        </Grid>
        <Formik
          initialValues={{
            password: '',
            newPassword: '',
            reTypeNewPassword: '',
            submit: null
          }}
          validationSchema={Yup.object().shape({
            password: Yup.string()
              .required("Please provide a valid password"),
            newPassword: Yup.string()
              .required("This field is required")
              .min(8, 'Password is too short, should be at least 8 characters'),
            reTypeNewPassword: Yup.string()
              .when("newPassword", {
                is: val => (val && val.length > 0 ? true : false),
                then: Yup.string().oneOf(
                  [Yup.ref("newPassword")],
                  "Both passwords need to be the same"
                )
              })
          })}
          onSubmit={(values) => {
            dispatch(openLoadingApi());
            apiUserChangePassword(values.password, values.newPassword).then(result => {
              let res = result.data;
              toast.success(res.message, options);
              dispatch(closeLoadingApi());
              setTimeout(() => {
                navigate('/dashboard/user', { replace: true });
              }, 2500)
            })
              .catch(err => {
                dispatch(closeLoadingApi());
                if (err.response.data.statusCode === 401) {
                  dispatch(closeLoadingApi());

                  toast.error(err.response.data.message, options);
                } else if (err.response.data.statusCode === 400) {
                  dispatch(closeLoadingApi());

                  toast.error(err.response.data.message[0].message, options);
                } else {
                  dispatch(closeLoadingApi());

                  toast.error(err.response.data.message, options);
                }
              })
          }}
        >
          {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
            <form noValidate onSubmit={handleSubmit}>
              <Grid container spacing={3.5} >
                <Grid item xs={12}>
                  <Stack spacing={0.7}>
                    <InputLabel htmlFor="password">
                      {t("change_00")}
                    </InputLabel>
                    <Grid item xs={12} sm={6} md={4}>
                      <OutlinedInput
                        fullWidth
                        size='small'
                        autoComplete="current-password"
                        error={Boolean(touched.password && errors.password)}
                        id="password"
                        type={'password'}
                        value={values.password}
                        name="password"
                        onBlur={handleBlur}
                        placeholder="********"
                        onChange={(e) => {
                          handleChange(e);
                        }}
                        inputProps={{}}
                      />
                    </Grid>
                    {touched.password && errors.password && (
                      <FormHelperText error id="helper-text-password-signup">
                        {errors.password}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Stack spacing={0.7}>
                    <InputLabel htmlFor="new-password">
                      {t("change_01")}
                    </InputLabel>
                    <Grid item xs={12} sm={6} md={4}>
                      <OutlinedInput
                        fullWidth
                        size='small'
                        autoComplete="new-password"
                        error={Boolean(touched.newPassword && errors.newPassword)}
                        id="new-password"
                        type={'password'}
                        value={values.newPassword}
                        name="newPassword"
                        onBlur={handleBlur}
                        onChange={(e) => {
                          handleChange(e);
                        }}
                        placeholder="********"
                        inputProps={{}}
                      />
                    </Grid>
                    {touched.newPassword && errors.newPassword && (
                      <FormHelperText error id="helper-text-password-signup">
                        {errors.newPassword}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Stack spacing={0.7}>
                    <InputLabel htmlFor="reTypeNewPassword">
                      {t("change_02")}

                    </InputLabel>
                    <Grid item xs={12} sm={6} md={4}>
                      <OutlinedInput
                        fullWidth
                        size='small'
                        autoComplete="new-password"
                        error={Boolean(touched.reTypeNewPassword && errors.reTypeNewPassword)}
                        id="reTypeNewPassword"
                        type={'password'}
                        value={values.reTypeNewPassword}
                        name="reTypeNewPassword"
                        onBlur={handleBlur}
                        onChange={(e) => {
                          handleChange(e);
                        }}
                        placeholder="********"
                        inputProps={{}}
                      />
                    </Grid>
                    {touched.reTypeNewPassword && errors.reTypeNewPassword && (
                      <FormHelperText error id="helper-text-password-signup">
                        {errors.reTypeNewPassword}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
                {errors.submit && (
                  <Grid item xs={12}>
                    <FormHelperText error>{errors.submit}</FormHelperText>
                  </Grid>
                )}
                <Grid container item xs={12} sm={4} sx={{ textAlign: 'center', mb: 3 }} >
                  <Grid item xs={6} sm={6} >
                  </Grid>
                  <Grid item xs={6} sm={6} >
                    <Button
                      disableElevation
                      type="submit"
                      variant="contained"
                      endIcon={<UpdateIcon></UpdateIcon>}
                    >
                      {t("change_03")}

                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </form>
          )}
        </Formik>
      </Container>
      <ToastContainer />
    </Page>
  );
};

export default ChangePassword;