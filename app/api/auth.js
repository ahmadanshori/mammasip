import {client, createHeader, createHeaderForm} from './';

export const loginAPI = data => {
  return client.post('/auth', data);
};

export const loginGoogleAPI = data => client.post('/auth_google', data);

export const registerAPI = data => {
  return client.post('/register', data);
};

export const changePasswordAPI = (token, data) => {
  return client.post('/change_password', data, createHeader(token));
};

export const uploaddFileAPI = (token, data) => {
  return client.post('/upload_file', data, createHeaderForm(token));
};

export const updateUserAPI = (token, id, data) => {
  return client.put(`/user/${id}`, data, createHeader(token));
};

export const updateTokenFCMAPI = (token, id, data) => {
  return client.put(`/user/update_fcm/${id}`, data, createHeader(token));
};

export const forgotPassowrdAPI = email => {
  return client.get(`/get_forgotpass/${email}`);
};
