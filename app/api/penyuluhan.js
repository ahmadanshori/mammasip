import {client, createHeader} from './';

export const getTopPenyuluhanAPI = token => {
  return client.get('/penyuluhan/topview', createHeader(token));
};
