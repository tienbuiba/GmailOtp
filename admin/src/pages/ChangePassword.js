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
  Box

} from '@mui/material';

import * as Yup from 'yup';
import { Formik } from 'formik';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiAdminChangePassword } from 'src/services/Authenticate';
import { ToastContainer, toast } from 'react-toastify';
import { closeLoadingApi, openLoadingApi } from 'src/redux/create-actions/LoadingAction';
import { useDispatch } from 'react-redux';




// ============================|| CHANGE PASSWORD ||============================ //

const ChangePassword = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      navigate('/login', { replace: true });
    }
  }, [])
  const dispatch = useDispatch();

  const options = {
    autoClose: 2000,
    position: toast.POSITION.TOP_RIGHT,
  };

  return (
    <Box>
      <Container sx={{ padding: 2, backgroundColor: 'white' }}>
        <Grid item xs={12}>
          <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
            <Typography variant="h4" sx={{ mb: 4, marginLeft: 2, marginTop: 2 }}>Thay đổi mật khẩu</Typography>
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
              .required("Vui lòng cung cấp mật khẩu hợp lệ"),
            newPassword: Yup.string()
              .required("Trường này là bắt buộc")
              .min(8, 'Mật khẩu quá ngắn, nên có tối thiểu 8 ký tự'),
            reTypeNewPassword: Yup.string()
              .when("newPassword", {
                is: val => (val && val.length > 0 ? true : false),
                then: Yup.string().oneOf(
                  [Yup.ref("newPassword")],
                  "Cả hai mật khẩu cần phải giống nhau"
                )
              })
          })}
          onSubmit={(values, { setErrors, setStatus, setSubmitting }) => {
            dispatch(openLoadingApi());
            apiAdminChangePassword(values.password, values.newPassword).then(result => {
              let res = result.data;
              navigate('/dashboard/home', { replace: true });
              dispatch(closeLoadingApi());
              toast.success(res.message, options);
            })
              .catch(err => {
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
              <Grid container spacing={3.5} sx={{ paddingLeft: 2 }}>
                <Grid item xs={12}>
                  <Stack spacing={0.7}>
                    <InputLabel htmlFor="password">Mật khẩu cũ*</InputLabel>
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
                    <InputLabel htmlFor="new-password">Mật khẩu mới*</InputLabel>
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
                    <InputLabel htmlFor="reTypeNewPassword">Nhập lại mật khẩu mới</InputLabel>
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
                    >
                      Cập nhật
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </form>
          )}
        </Formik>
      </Container>
      <ToastContainer />
    </Box>
  );
};

export default ChangePassword;