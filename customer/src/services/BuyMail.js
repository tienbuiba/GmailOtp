import TokenService from './TokenService';
import api from './Api';
import { userService } from 'src/constant/Constants';

export const apiUserGetListMail = async () => {
  const url = userService + '/mail-types/list';
  let res;
  const accessToken = TokenService.getLocalAccessToken();
  res = await api.get(url, {
    headers: {
      Authorization: accessToken,
      'Content-Type': 'application/json',
    },
  });

  return res.data;
};
