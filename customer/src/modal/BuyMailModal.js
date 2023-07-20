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
export default function BuyMailModal() {
  const theme = useTheme();
  const data = useSelector(state => state.mail.data);
  const dispatch = useDispatch();
  const [id, setId] = React.useState('');
  const [mailTypeId, setMailTypeId] = React.useState('')
  const [name,setName]=React.useState('')

  React.useEffect(() => {
    setPrice(data.price)
    setId(data.id)
    setName(data.name)
  }, [data.price, data.id])


  const { t } = useTranslation("translation");
  const [quantity, setQuantity] = React.useState('')
  const [price, setPrice] = React.useState('')
  const [amount, setAmount] = React.useState('');
  const options = {
    autoClose: 2000,
    position: toast.POSITION.TOP_RIGHT,
  };

  React.useMemo(() => {
    if (quantity < 10000) {
      setAmount(price * quantity)
      setMailTypeId(id)
    }
    else {
      toast.success('Please enter quantity less than 10000', options);
      setQuantity('')
    }
  }, [price, quantity, id])

  const navigate = useNavigate();
  const token = localStorage.getItem('accessToken');
  const handleClose = () => {
    dispatch(closeBuyMailModal());
  };


  return (
    <Container maxWidth="sm">
      <BootstrapDialog
        maxWidth="sm"
        fullWidth
        aria-labelledby="customized-dialog-title"
        open={data.isOpen}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose} color="#28a745" >
          {t("buyMailModal_01")}
          <Typography variant="body1" color="#0d788c">
            {t("buyMailModal_02")}
          </Typography>
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Grid container>
            <Grid item xs={6}>
              <Typography sx={{ color: '#130f35' }}>
                {t("buyMailModal_03")}
              </Typography>
            </Grid>
            <Grid item xs={6} sx={{ textAlign: 'right' }}>
              <TextField variant="standard" size="small"
                value={fNumber(quantity)}
                sx={{ textAlign: 'center', }}
                onChange={e => { setQuantity(e.target.value) }}
              // placeholder="enter quality" 
              >
              </TextField>
            </Grid>
          </Grid>
          <Divider sx={{ mb: 2 }}>
          </Divider>
          <Grid container>
            <Grid item xs={6}>
              <Typography sx={{ color: '#130f35' }}>
                {t("buyMailModal_04")}
              </Typography>
            </Grid>
            <Grid item xs={6} sx={{ textAlign: 'right' }}>
              <Typography sx={{ color: '#130f35' }}>
                {fCurrency(price)} VND
              </Typography>
            </Grid>
          </Grid>
          <Divider sx={{ mb: 2 }}>
          </Divider>
          <Grid container>
            <Grid item xs={6}>
              <Typography sx={{ color: '#130f35' }}>
                {t("buyMailModal_05")}
              </Typography>
            </Grid>
            <Grid item xs={6} sx={{ textAlign: 'right' }}>
              <Typography sx={{ color: '#130f35' }}>
                {fCurrency(amount)} VND
              </Typography>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={(e) => {
            if (token) {
              if (mailTypeId !== null && amount !== 0 && quantity !== '') {
                navigate('/dashboard/confirm-order', { replace: true });
                dispatch(confirmOrder(mailTypeId, amount, quantity,name))
                dispatch(closeBuyMailModal());
              } else {
                toast.success('Please enter the number in the correct format', options);
              }
            }
            else {
              navigate('/login', { replace: true });
              dispatch(closeBuyMailModal());
              toast.success('You need to login to make a purchase', options);
            }
          }} sx={{ backgroundColor: 'linear-gradient(134deg,#04a468 0%,#0D788C 100%)' }}>
            {t("buyMailModal_07")}
          </Button>
        </DialogActions>
      </BootstrapDialog>
      <ToastContainer></ToastContainer>
    </Container>
  );
}


