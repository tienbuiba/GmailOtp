import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { useSelector } from 'react-redux';
import { fNumber } from 'src/utils/formatNumber';

export default function Review() {
  const [totalPrice, setTotalPrice] = React.useState('');
  const [amount, setAmount] = React.useState('');
  const dataOrder = useSelector(state => state.order.data);
  const [name, setName] = React.useState('')
  React.useEffect(() => {
    setTotalPrice(dataOrder.total)
    setAmount(dataOrder.amount)
    setName(dataOrder.name)
  }, [dataOrder.total, dataOrder.amount,dataOrder.name])


  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
      </Typography>
      <List disablePadding>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary={"Hot Mail"} secondary={name} />
          <Typography variant="body2">{fNumber(amount)}</Typography>
        </ListItem>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            {fNumber(totalPrice)} VND
          </Typography>
        </ListItem>
      </List>
    </React.Fragment>
  );
}