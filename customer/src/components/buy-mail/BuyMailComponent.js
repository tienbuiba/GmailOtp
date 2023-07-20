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
} from '@mui/material';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import StoreMallDirectoryIcon from '@mui/icons-material/StoreMallDirectory';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import { useDispatch, useSelector } from 'react-redux';
import { showBuyMailModal } from 'src/redux/creates-action/BuyMailAction';
import { useTranslation } from 'react-i18next';
import { apiUserGetListMail } from 'src/services/BuyMail';
import { fCurrency } from 'src/utils/formatNumber';
import useResponsive from 'src/hooks/useResponsive';
import { updateBalance } from 'src/redux/creates-action/balanceAction';
import { closeLoadingApi, openLoadingApi } from 'src/redux/creates-action/LoadingAction';
import TokenService from 'src/services/TokenService';

const BuyMailMain = () => {
  const { t } = useTranslation("translation");
  const dispatch = useDispatch()
  const [data, setData] = useState([]);
  const smUp = useResponsive('up', 'sm');
  const dataLanguage = TokenService.getLocalLanguage();

  useEffect(() => {
    dispatch(openLoadingApi());   
    apiUserGetListMail().then(result => {
      const res = result.data
      dispatch(updateBalance());
      dispatch(closeLoadingApi());
      setData(res)
    }).catch(err => {
      console.log(err);
      dispatch(closeLoadingApi());
    })
  }, []);

  return (
    <div>
      <TableContainer>
        <Table>
          {!smUp && (<>
            <TableHead>
              <TableRow>
                <TableCell align='center'>
                  <TableSortLabel hideSortIcon>
                    <WatchLaterIcon sx={{ color: '#3953B4', mr: 1 }} />
                    {t("buy_02")}
                  </TableSortLabel>
                </TableCell>
                <TableCell
                  align='center'
                >
                  <TableSortLabel hideSortIcon>
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
                    align='center'
                  >
                    <TableSortLabel
                      hideSortIcon
                    >
                      <FingerprintIcon sx={{ color: '#3953B4', mr: 1 }} />
                      {t("buy_01")}
                    </TableSortLabel>
                  </TableCell>
                  <TableCell
                    align='center'
                  >
                    <TableSortLabel
                      hideSortIcon
                    >
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
                      <LocalOfferIcon sx={{ color: '#3953B4', mr: 1 }} />
                      {t("buy_03")}
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
                  <TableCell
                    align='center'
                  >
                    <TableSortLabel
                      hideSortIcon
                    >
                    </TableSortLabel>
                  </TableCell>
                </TableRow>
              </TableHead>
            </>
          )}

          {!smUp && (
            <TableBody>
              {data?.map((row) => {
                return (
                  <TableRow
                    hover
                    key={row.id}
                    tabIndex={-1}
                  >
                    <TableCell align="center" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                      <Grid container spacing={0.5}>
                        <Grid container item xs={12} spacing={1}>
                          <Grid item xs={12} align="center">
                            <img src={`https://countryflagsapi.com/png/${row.countryCode === null ? 'VN' : row.countryCode}`} width='25px' height='20px' style={{ display: 'block', textAlign: 'center', borderRadius: '5px', justifySelf: 'flex-start' }} />
                          </Grid>
                          <Grid item xs={12} align="center">
                            <Typography variant="" align="left">
                              {row.name}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                    </TableCell>
                    <TableCell align="center" width="120px">{row.count}</TableCell>
                    <TableCell align="center" width="50px">
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
              {data?.map((row) => {
                return (
                  <TableRow
                    hover
                    key={row.id}
                    tabIndex={-1}
                  >
                    <TableCell align="center" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                      <Grid container spacing={0.5}>
                        <Grid item xs={12}>
                          <Typography sx={{ color: '#3953B4', fontSize: '14px', fontWeight: '450' }}>
                            GMAIL                        </Typography>
                        </Grid>
                        <Grid container item xs={12} spacing={1}>
                          <Grid item xs={6} align="right">
                            <img src={`https://countryflagsapi.com/png/${row.countryCode === null ? 'VN' : row.countryCode}`} width='25px' height='20px' style={{ display: 'block', textAlign: 'center', borderRadius: '5px', justifySelf: 'flex-start' }} />
                          </Grid>
                          <Grid item xs={6} align="left">
                            <Typography variant="" align="left">
                              {row.name}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                    </TableCell>
                    <TableCell align="center">{row.timeExist === -1 ? 'Trusted' : row.timeExist * 24 + ' hours'}</TableCell>
                    <TableCell align="center">
                      {dataLanguage === 'vie' ?
                        <>
                          {fCurrency(row.price)}
                        </>
                        :
                        <>
                          {(row.price / 24000).toFixed(4)}
                        </>
                      }
                      {t("$ / mail")}

                      
                    </TableCell>
                    <TableCell align="center" >{row.count}</TableCell>
                    <TableCell align="center">
                      <Button variant="contained" sx={{ color: '#fff', backgroundColor: '#459D73' }} onClick={(e) => { dispatch(showBuyMailModal(row.id, row.name, row.price)) }}>
                        {t("buy_05")}
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          )}
        </Table>
      </TableContainer>
    </div>
  );
};

export default BuyMailMain;