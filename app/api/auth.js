import {client, createHeader} from './';

export const loginAPI = data => {
  return client.post('/auth', data);
};

export const registerAPI = data => {
  return client.post('/register', data);
};

export const changePasswordAPI = (token, data) => {
  return client.post('/change_password', data, createHeader(token));
};
