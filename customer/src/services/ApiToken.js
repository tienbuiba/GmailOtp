import TokenService from "./TokenService";
import api from "./Api"

const userService = "https://api.gmailmmo.com/api/v1"

export const apiAdminApiToken = async () => {
  const url = userService + '/users/api-token';
  let res;
  const accessToken = TokenService.getLocalAccessToken();
  res = await api.get(url, {
    headers: {
      "Authorization": accessToken,
      "Content-Type": "application/json"
    }
  }
  );

  return res.data;
}

export const apiAdminRenewApiToken = async () => {
  const url = userService + '/users/renew-api-token';
  let res;
  const accessToken = TokenService.getLocalAccessToken();
  res = await api.get(url, {
    headers: {
      "Authorization": accessToken,
      "Content-Type": "application/json"
    }
  }
  );

  return res.data;
}


















