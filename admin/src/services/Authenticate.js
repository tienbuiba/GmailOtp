import TokenService from "./TokenService";
import api from "./Api"

const userService = "https://api.gmailmmo.com/api/v1"

export const apiUserLogin = async (email, password) => {
  let url = userService + '/auth/admin/login'
  let data = {
    email: email,
    password: password
  };
  let res;
  res = await api.post(url, data, {
    headers: { 'Content-Type': 'application/json' }
  });

  return res;
}


export const apiUserProfile = async () => {
  const url = userService + '/users/me';
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

export const apiAdminChangePassword = async (password, newPassword) => {
  let url = userService + '/auth/change-password'
  let data = {
    password: password,
    newPassword: newPassword
  };
  let res;
  const accessToken = TokenService.getLocalAccessToken();
  res = await api.post(url, data, {
    headers: {
      "Authorization": accessToken,
      'Content-Type': 'application/json'
    }
  });

  return res;
}


















