import React, { useEffect, useState } from 'react';
import {
  Table,
  Button,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TableSortLabel,
  TableHead,
  Grid,
  Typography,
  Card,
  FormControl,
  Autocomplete,
  TextField,
  Box,
} from '@mui/material';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import StoreMallDirectoryIcon from '@mui/icons-material/StoreMallDirectory';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import { useDispatch, useSelector } from 'react-redux';
import { showBuyMailModal, showRentMailModal } from 'src/redux/creates-action/BuyMailAction';
import { useTranslation } from 'react-i18next';
import { fCurrency } from 'src/utils/formatNumber';
import useResponsive from 'src/hooks/useResponsive';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { apiUserGetOtpCode, apiUserGetRentMail, apiUserGetRentMailById, apiUserRentMail } from 'src/services/RentMail';
import { closeLoadingApi, openLoadingApi } from 'src/redux/creates-action/LoadingAction';
import { showNoticeModal } from 'src/redux/creates-action/NoticeModal';

const RentMailMain = () => {
  const { t } = useTranslation("translation");
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const smUp = useResponsive('up', 'sm');
  const data2 = useSelector(state => state.mail.data);
  const [copied, setCopied] = useState(false);
  const [idService, setIdService] = useState('');
  const [dataRentMail, setDataRentMail] = useState([]);
  const [rent, setRent] = useState(false);
  const [clickRent, setClickRent] = useState(false);

  // useEffect(() => {
  //   dispatch(showNoticeModal())
  // }, [])

  useEffect(() => {
    dispatch(openLoadingApi());
    apiUserGetRentMail().then(result => {
      const res = result.data
      setData(res);
      dispatch(closeLoadingApi());
    }).catch(err => {
      console.log(err)
      dispatch(closeLoadingApi());
    })
  }, [])

  useEffect(() => {
    dispatch(openLoadingApi());
    apiUserGetRentMailById().then(result => {
      setDataRentMail(result.data);
      setRent(false);
      dispatch(closeLoadingApi());
      setInterval(() => {
        setRent(true);
      }, 20000)
      setIdService('');
    }).catch(err => {
      toast.error(err.response.data.message, options);
      dispatch(closeLoadingApi());
    })
  }, [rent]);

  const options = {
    autoClose: 2000,
    position: toast.POSITION.BOTTOM_RIGHT,
  };
  const options1 = {
    autoClose: 2000,
    position: toast.POSITION.BOTTOM_RIGHT,
  };

  const handleRentMail = () => {
    if (idService === '') {
      toast.error(t('Select the service you want to hire'), options1);
    } else {
      dispatch(openLoadingApi());
      apiUserRentMail(idService).then(result => {
        const res = result.data;
        dispatch(closeLoadingApi());
        toast.success(res.message, options);
        setRent(true);
        setClickRent(true)
      }).catch(err => {
        dispatch(closeLoadingApi());
        if (err.response.data.statusCode === 401) {
          toast.error(err.response.data.message, options);
          dispatch(closeLoadingApi());

        } else if (err.response.data.statusCode === 400) {
          toast.error(err.response.data.message, options);
          dispatch(closeLoadingApi());

        } else {
          toast.error(err.response.data.message, options);
          dispatch(closeLoadingApi());
        }
      })
    }
    // dispatch(showRentMailModal())
  }
  return (
    <div>
      <Card sx={{ mb: 5, padding: 5 }}>
        <Grid container spacing={5} sx={{ alignItems: 'center', justifyContent: 'center' }}>
          <Grid item xs={12} sm={6} md={4} align="center">
            <FormControl fullWidth>
              <Autocomplete
                isOptionEqualToValue={(option, value) => {
                  return option.id === value?.id
                }}
                options={data}
                clearOnBlur={clickRent}
                getOptionLabel={(option) => { return option.name + ' - ' + option.price + "đ" }}
                onChange={(e, newValue) => {
                  setIdService(newValue === null ? '' : newValue.id)
                }}
                renderInput={(params) => <TextField {...params} placeholder={t("----Select Service----")} />}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3} align="center">
            <Button variant="contained" size="large" onClick={handleRentMail}>
              {t("Hire Email Code now")}
            </Button>
          </Grid>
        </Grid>
      </Card>
      <Card>
        <TableContainer>
          <Table>
            {!smUp && (<>
              <TableHead>
                <TableRow>
                  <TableCell
                    align='center'
                  >
                    <TableSortLabel hideSortIcon>
                      <WatchLaterIcon sx={{ color: '#3953B4', mr: 1 }} />
                      {t("buy_02")}
                    </TableSortLabel>
                  </TableCell>
                  <TableCell
                    align='center'
                  >
                    <TableSortLabel
                      hideSortIcon
                    >
                      <StoreMallDirectoryIcon sx={{ color: '#3953B4', mr: 1 }} />
                      {t("buy_04")}
                    </TableSortLabel>
                  </TableCell>
                </TableRow>
              </TableHead>
            </>)}
            {smUp && (
              <>
                <TableHead>
                  <TableRow>
                    <TableCell
                      align='left'
                    >
                    </TableCell>
                    <TableCell
                      align='left'
                    >
                      <TableSortLabel
                        hideSortIcon
                      >
                        <FingerprintIcon sx={{ color: '#3953B4', mr: 1 }} />
                        {t("SERVICE")}
                      </TableSortLabel>
                    </TableCell>
                    <TableCell
                      align='left'
                    >
                      <TableSortLabel
                        hideSortIcon
                      >
                        <LocalOfferIcon sx={{ color: '#3953B4', mr: 1 }} />
                        {t("PRICE")}
                      </TableSortLabel>
                    </TableCell>
                    <TableCell
                      align='left'
                    >
                      <TableSortLabel
                        hideSortIcon
                      >
                        <MarkEmailReadIcon sx={{ color: '#3953B4', mr: 1 }} />
                        EMAIL
                      </TableSortLabel>
                    </TableCell>
                    <TableCell
                      align='left'
                    >
                      <TableSortLabel
                        hideSortIcon
                      >
                        <VpnKeyIcon sx={{ color: '#3953B4', mr: 1 }} />
                        CODE
                      </TableSortLabel>
                    </TableCell>
                    <TableCell>
                      <TableSortLabel
                        hideSortIcon
                      >
                        <MarkEmailReadIcon sx={{ color: '#3953B4', mr: 1 }} />
                        {t("STATUS")}
                      </TableSortLabel>
                    </TableCell>
                  </TableRow>
                </TableHead>
              </>
            )}

            {!smUp && (
              <TableBody>
                {dataRentMail?.map((row) => {
                  return (
                    <TableRow
                      hover
                      key={row.id}
                      tabIndex={-1}
                    >
                      <TableCell
                        align='left'
                      >
                      </TableCell>
                      <TableCell align='left'>
                        {row.name}
                      </TableCell>
                      <TableCell align='left'
                        width="120px">{row.code}</TableCell>
                      <TableCell align='left'
                        width="50px">
                        <Button variant="contained" sx={{ color: '#fff', backgroundColor: '#459D73' }} onClick={(e) => { dispatch(showBuyMailModal(row.id, row.name, row.price)) }}>
                          {t("buy_05")}
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
                <TableRow >
                  <TableCell colSpan={5} />
                </TableRow>
              </TableBody>
            )}
            {smUp && (
              <TableBody>
                {dataRentMail?.map((row) => {
                  return (
                    <TableRow
                      hover
                      key={row.id}
                      tabIndex={-1}
                    >
                      <TableCell
                        align='left'
                      >
                      </TableCell>
                      <TableCell align='left'>
                        {row.rentService.name}
                      </TableCell>
                      <TableCell align='left'
                      >{fCurrency(row.rentService.price)}đ / mail</TableCell>
                      <TableCell align='left'
                      >   {row.mail.username}</TableCell>
                      <TableCell align='left'
                      >{row.code}
                        <CopyToClipboard text={row.code} onCopy={() => setCopied(true)}>
                          <Button startIcon={<ContentCopyIcon sx={{ color: '#459D73' }} />
                          } onClick={() => {
                            toast.success('Copy this text to clipboard', options);
                          }
                          }>
                          </Button>
                        </CopyToClipboard>
                      </TableCell>
                      <TableCell align='left'
                      >{row.status}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            )}
          </Table>
        </TableContainer>
      </Card>
      <ToastContainer />
    </div>
  );
};

export default RentMailMain;