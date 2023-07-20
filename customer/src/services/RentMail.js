import { userService } from "src/constant/Constants";
import TokenService from "./TokenService";
import api from './Api';


export const apiUserGetRentMail = async () => {
  const url = userService + '/rent-services/list';
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


export const apiUserRentMail = async (serviceId,) => {
  const url = userService + '/rent-mails/rent';
  const data = {
    serviceId: serviceId
  };
  let res;
  const accessToken = TokenService.getLocalAccessToken();
  res = await api.post(url, data, {
    headers: {
      Authorization: accessToken,
      'Content-Type': 'application/json',
    },
  });

  return res;
};


export const apiUserGetRentMailById = async () => {
  const url = userService + '/rent-mails/list-by-user';
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


export const apiUserGetOtpCode = async (email,serviceId) => {
  const url = userService + `/rent-mails/otp-code?email=${email}&serviceId=${serviceId}`;
  let res;
  const accessToken = TokenService.getLocalAccessToken();
  res = await api.get(url, {
    headers: {
      Authorization: accessToken,
      'Content-Type': 'application/json',
    }
  });

  return res.data;
};