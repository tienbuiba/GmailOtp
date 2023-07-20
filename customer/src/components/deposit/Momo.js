import { Button, Grid, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import TokenService from 'src/services/TokenService';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Momo = (props) => {
  const [messageContent, setMessageContent] = useState('buibatien');
  const [account, setAccount] = useState('0384524334');
  const [nameAccount, setNameAccount] = useState('Nguyen Thi Thu Thao');
  const { t } = useTranslation("translation");
  const profile = JSON.parse(TokenService.getLocalProfile('profile'));
  const [copied, setCopied] = useState(false);
  const options = {
    autoClose: 2000,
    position: toast.POSITION.BOTTOM_RIGHT,
  };
  return (
    <Grid container spacing={2} sx={{ pt: 2 }}>
      <Grid sx={{ textAlign: 'center' }} item xs={12}>
        <Typography variant="body1" sx={{ display: 'inline-block' }} gutterBottom>
          {t("momo_01")}
        </Typography>
        <span style={{ color: '#d82d8b', display: 'inline-block', marginRight: '5px', marginLeft: '5px' }}>
          MOMO
        </span>
        <Typography variant="body2" gutterBottom>
          {t("momo_02")}
          <span style={{ color: '#d82d8b', display: 'inline-block', marginRight: '5px', marginLeft: '5px' }}>
            NAPTIEN {profile.userCode}
          </span>
          {t("momo_03")}</Typography>
        <Typography variant="body2" sx={{ display: 'inline-block' }} gutterBottom>
          {t("momo_04")}
          <a href='#' style={{ display: 'inline-block', marginRight: '5px', marginLeft: '5px', color: '#3030fa', fontWeight: 'bold' }}> Gmailmmo</a>
          {t("momo_05")}</Typography>
        <Typography variant="body2" sx={{ display: 'block', color: '#d82d8b', }} gutterBottom>
          {t("Note: Minimum transaction amount 50,000(VND)/transaction")}
        </Typography>
        <Grid container item spacing={2} sx={{ pt: 2 }}>
          <Grid item xs={6}>
            {t("momo_06")}
          </Grid>
          <Grid item xs={6} sx={{ flexDirection: 'row', alignItems: 'center' }}>
            <TextField size='small' value={account}>
            </TextField>
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
            {t("momo_07")}
          </Grid>
          <Grid item xs={6} sx={{ flexDirection: 'row', alignItems: 'center' }}>
            <TextField size='small' value={nameAccount}>
            </TextField>
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
            {t("momo_08")}
          </Grid>
          <Grid item xs={6} sx={{ flexDirection: 'row', alignItems: 'center' }}>
            <TextField size='small' value={`NAPTIEN ${profile.userCode}`}>
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

export default Momo;