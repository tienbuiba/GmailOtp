import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { getBalance } from "src/redux/creates-action/balanceAction";
import TokenService from "src/services/TokenService";
import { apiUserGetBalance } from "src/services/User";
import { fCurrency } from "src/utils/formatNumber";

export default function Balance() {
  const [money, setMoney] = useState('');
  const dispatch = useDispatch();
  const data = useSelector(state => state.balance.data);
  const dataLanguage = TokenService.getLocalLanguage();
  useEffect(() => {
    apiUserGetBalance().then(result => {
      const res = result?.data
      setMoney(res?.data.balance)
      dispatch(getBalance(res?.data.balance))
    })
  }, [data.update])

  const { t } = useTranslation("translation");
  return (
    <>
      <Typography variant="body2" sx={{ color: '#555' }}>
        {t("profile_detail_02")} </Typography>
      <Typography variant="body2" sx={{ color: '#000' }}>
        {dataLanguage === 'vie' ?
                        <>
                          {fCurrency(money)}
                        </>
                        :
                        <>
                          {fCurrency(money / 24000)}
                        </>
                      }
                      {t("$")}
      </Typography>
    </>
  );
}
