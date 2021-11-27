import {client, createHeader} from './';

export const getTopPenyuluhanAPI = token => {
  return client.get('/penyuluhan/topview', createHeader(token));
};

export const getCounselingByIdAPI = id => {
  return client.get(`/penyuluhan/type/${id}`);
};
