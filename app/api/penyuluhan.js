import {client, createHeader} from './';

export const getTopPenyuluhanAPI = token => {
  return client.get('/penyuluhan/topview', createHeader(token));
};

export const getCounselingByIdAPI = (id, page = 0, per_page = 5) => {
  return client.get(
    `/penyuluhan/pagination/type/${id}/${page}/${per_page}/idPenyuluhan/asc`,
  );
};
