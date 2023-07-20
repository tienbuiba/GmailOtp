import api from "./Api"

const userService = "https://api.gmailmmo.com/api/v1"

export const apiGetAllCountryId = async () => {
  const url = userService + `/countries`;
  let res;
  res = await api.get(url,  {
    headers: {
      "Content-Type": "application/json"
    }
  }, 
  );

  return res;
}

