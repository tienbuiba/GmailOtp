import { Button, Grid, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import TokenService from 'src/services/TokenService';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Vietcombank = (props) => {
  const [messageContent, setMessageContent] = useState('buibatien');
  const [account, setAccount] = useState('199996868888');
  const [nameAccount, setNameAccount] = useState('Nguyen Thi Thu Thao');
  const { t } = useTranslation('translation');
  const profile = JSON.parse(TokenService.getLocalProfile('profile'));
  const [copied, setCopied] = useState(false);
  const options = {
    autoClose: 2000,
    position: toast.POSITION.BOTTOM_RIGHT,
  };

  return (
    <Grid container item spacing={2} xs={12} sx={{ pt: 2 }}>
      <Grid sx={{ textAlign: 'center' }} item xs={12}>
        <Typography variant="body1" sx={{ display: 'inline-block' }} gutterBottom>
          {t('vietcombank_01')}
        </Typography>
        <span style={{ color: '#1E01CE', display: 'inline-block', marginRight: '5px', marginLeft: '5px' }}>
          MBBANK
        </span>
        <Typography variant="body2" gutterBottom>
          {t('vietcombank_02')}
          <span style={{ color: '#1E01CE', display: 'inline-block', marginRight: '5px', marginLeft: '5px' }}>
            NAPTIEN {profile.userCode}
          </span>
          {t('vietcombank_03')}
        </Typography>
        <Typography variant="body2" sx={{ display: 'inline-block' }} gutterBottom>
          {t('vietcombank_04')}
          <a
            href="#"
            style={{
              display: 'inline-block',
              marginRight: '5px',
              marginLeft: '5px',
              color: '#1E01CE',
              fontWeight: 'bold',
            }}
          >
            {' '}
            Gmailmmo
          </a>
          {t('vietcombank_05')}{' '}
        </Typography>
        <Typography variant="body2" sx={{ display: 'block', color: '#1E01CE', }} gutterBottom>
          {t("Note: Minimum transaction amount 50,000(VND)/transaction")}
        </Typography>
        <Grid container item spacing={2} sx={{ pt: 2 }}>
          <Grid item xs={6}>
            {t('vietcombank_06')}
          </Grid>
          <Grid item xs={6} sx={{ flexDirection: 'row', alignItems: 'center' }}>
            <TextField size="small" value={account}></TextField>
            <CopyToClipboard text={account} onCopy={() => setCopied(true)}>
              <Button startIcon={<ContentCopyIcon sx={{ color: '#459D73' }} />
              } onClick={() => {
                toast.success('Copy this text to clipboard', options);
              }
              }>
              </Button>
            </CopyToClipboard>
          </Grid>
          <Grid item xs={6}>
            {t('vietcombank_07')}
          </Grid>
          <Grid item xs={6} sx={{ flexDirection: 'row', alignItems: 'center' }}>
            <TextField size="small" value={nameAccount}></TextField>
            <CopyToClipboard text={nameAccount} onCopy={() => setCopied(true)}>
              <Button startIcon={<ContentCopyIcon sx={{ color: '#459D73' }} />
              } onClick={() => {
                toast.success('Copy this text to clipboard', options);
              }
              }>
              </Button>
            </CopyToClipboard>
          </Grid>
          <Grid item xs={6}>
            {t('vietcombank_08')}
          </Grid>
          <Grid item xs={6} sx={{ flexDirection: 'row', alignItems: 'center' }}>
            <TextField size='small' value={`NAPTIEN ${profile.userCode}`} sx={{ color: 'red' }}>
            </TextField>
            <CopyToClipboard text={`NAPTIEN ${profile.userCode}`} onCopy={() => setCopied(true)}>
              <Button startIcon={<ContentCopyIcon sx={{ color: '#459D73' }} />
              } onClick={() => {
                toast.success('Copy this text to clipboard', options);
              }
              }>
              </Button>
            </CopyToClipboard>
          </Grid>
        </Grid>
      </Grid>
      <ToastContainer />
    </Grid>
  );
};

export default Vietcombank;
