import {client, createHeader} from './';

export const getCounselingByIdAPI = (token, id, page = 0, per_page = 5) => {
  return client.get(
    `/penyuluhan/pagination/type/${id}/${page}/${per_page}/idPenyuluhan/asc`,
    createHeader(token),
  );
};
