import {client, createHeader} from './';

export const loginAPI = data => {
  return client.post('/auth', data);
};
