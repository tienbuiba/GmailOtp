import { Grid, Stack, Typography, Container, Box, TextField, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiAdminApiToken, apiAdminRenewApiToken } from 'src/services/ApiToken';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';//

// ============================|| CHANGE PASSWORD ||============================ //

const ApiToken = () => {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  const [token, setToken] = useState('');
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      navigate('/login', { replace: true });
    }
  }, []);

  useEffect(() => {
    apiAdminApiToken().then((result) => {
      const res = result.data;
      setToken(res.apiToken);
    });
  }, []);

  const handleRenew = () => {
    apiAdminRenewApiToken().then((result) => {
      const res = result.data;
      setToken(res.apiToken);
    }, []);
  };
  const options = {
    autoClose: 2000,
    position: toast.POSITION.BOTTOM_RIGHT,
  };
  return (
    <Box>
      <Container sx={{ padding: 2, backgroundColor: 'white', paddingBottom: '100px' }}>
        <Grid container alignItems="center" spacing={2}>
          <Grid item xs={12}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="baseline"
              sx={{ mb: { xs: -0.5, sm: 0.5 } }}
            >
              <Typography variant="h4" sx={{ mb: 4, marginLeft: 2, marginTop: 2 }}>
                API Key
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={5}>
            <TextField fullWidth value={token}>
            </TextField>
          </Grid>
          <Grid item xs={2}>
            <CopyToClipboard text={token} onCopy={() => setCopied(true)}>
              <Button startIcon={<ContentCopyIcon sx={{ color: '#459D73' }} />
              } onClick={() => {
                toast.success('Copy this text to clipboard', options);
              }}>
              </Button>
            </CopyToClipboard>
          </Grid>
          <Grid item xs={2}>
            <Button onClick={handleRenew} variant="contained">
              ReNew
            </Button>
          </Grid>
        </Grid>
      </Container>
      <ToastContainer />
    </Box>
  );
};

export default ApiToken;
