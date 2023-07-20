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
import { Container, Divider, Grid, TextField, useTheme } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { closeBuyMailModal } from 'src/redux/creates-action/BuyMailAction';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { fCurrency } from 'src/utils/formatNumber';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { confirmOrder } from 'src/redux/creates-action/OrderAction';
import { fNumber } from 'src/utils/formatNumber';
import { closeRentMailModal } from 'src/redux/creates-action/RentMailAction';


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
export default function RentMailModal() {
  const theme = useTheme();
  const data = useSelector(state => state.rent.data);
  const dispatch = useDispatch();
  const { t } = useTranslation("translation");

  const options = {
    autoClose: 2000,
    position: toast.POSITION.TOP_RIGHT,
  };

  const handleClose = () => {
    dispatch(closeRentMailModal());
  };

  const handleClick = () => {

  }

  return (
    <Container maxWidth="xs">
      <BootstrapDialog
        maxWidth="xs"
        fullWidth
        aria-labelledby="customized-dialog-title"
        open={data.isOpenRentMail}       
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose} color="#28a745" align="center" sx={{ fontSize: '24px'}}>
          Bạn chắc chứ?
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Grid container sx={{alignItems: 'center', textAlign: 'center' }}>
            <Grid item xs={12} sx={{ alignItems: 'center', textAlign: 'center' }} align="center">
              <Typography sx={{ color: '#130f35', alignItems: 'center', textAlign: 'center' }} align="center">
                Bạn đã kiểm tra kỹ chưa
              </Typography>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" sx={{ backgroundColor: 'linear-gradient(134deg,#04a468 0%,#0D788C 100%)' }} onClick={handleClick}>
            THUÊ NGAY
          </Button>
        </DialogActions>
      </BootstrapDialog>
      <ToastContainer></ToastContainer>
    </Container>
  );
}


