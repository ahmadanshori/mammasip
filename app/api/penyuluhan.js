import {client, createHeader} from './';

export const getCounselingByIdAPI = (token, id, page = 0, per_page = 5) =>
  client.get(
    `/penyuluhan/pagination/type/${id}/${page}/${per_page}/idPenyuluhan/asc`,
    createHeader(token),
  );

export const getCounselingVideoAPI = token =>
  client.get('/penyuluhan/video', createHeader(token));
