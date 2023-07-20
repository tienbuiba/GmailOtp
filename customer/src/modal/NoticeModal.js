import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { styled } from '@mui/material/styles';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { Container,  Grid, useTheme } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { closeNoticeModal } from 'src/redux/creates-action/NoticeModal';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;
  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};
export default function NoticeModal() {
  const theme = useTheme();
  const data = useSelector(state => state.notice.data);
  const dispatch = useDispatch();
  const { t } = useTranslation("translation");
  const navigate = useNavigate();
  const token = localStorage.getItem('accessToken');
  const handleClose = () => {
    dispatch(closeNoticeModal());
  };

  return (
    <Container maxWidth="sm">
      <BootstrapDialog
        maxWidth="sm"
        fullWidth
        aria-labelledby="customized-dialog-title"
        open={data.isOpen}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose} color="#28a745" sx={{ alignItems: 'center', textAlign: 'center' }}>
          THÔNG BÁO
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Grid container>
            <Grid item xs={12}>
              <Typography sx={{ color: '#130f35' }}>
                Trang web đang chạy thử nghiệm, nếu trong quá trình quý khách theo tác trên hệ thống có xảy ra lỗi mong quý khách hết sức thông cảm. Mọi đóng góp xin phản hồi admin theo Zalo: 0902281334
              </Typography>
              <Typography sx={{ color: '#130f35', textAlign: 'right' }}>
                Xin cảm ơn quý khách!
              </Typography>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={(e) => {
            dispatch(closeNoticeModal());
          }} sx={{ backgroundColor: 'linear-gradient(134deg,#04a468 0%,#0D788C 100%)' }}>
            Đồng ý
          </Button>
        </DialogActions>
      </BootstrapDialog>
      <ToastContainer></ToastContainer>
    </Container>
  );
}


