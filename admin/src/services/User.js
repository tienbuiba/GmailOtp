import TokenService from "./TokenService";
import api from "./Api"
const userService = "https://api.gmailmmo.com/api/v1"

export const apiAdminGetListUser = async (limit, offset, keyword) => {
  let url = userService + '/users/admin/list-users'
  let data = {
    limit: limit,
    offset: offset,
    keyword: keyword
  };
  let res;
  const accessToken = TokenService.getLocalAccessToken();
  res = await api.post(url, data, { headers: { 'Content-Type': 'application/json', 'Authorization': accessToken } });
  return res;
}

export const apiAdminBlockUser = async (id) => {
  let url = userService + `/users/admin/update-status?userId=${id}`
  let res;
  const accessToken = TokenService.getLocalAccessToken();
  res = await api.post(url, {}, {
    headers: {
      'Authorization': accessToken
    }
  }
  );
  return res;
}

export const apiAdminUpdateBalance = async (userId, type, amount,  message) => {
  let url = userService + `/users/admin/update-balance`
  let res;
  let data = {
    userId: userId,
    type: type,
    amount: amount,  
    message: message
  };
  const accessToken = TokenService.getLocalAccessToken();
  res = await api.post(url, data, {
    headers: {
      'Authorization': accessToken
    }
  }
  );
  return res;
}

