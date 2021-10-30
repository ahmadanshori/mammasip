import {client, createHeader} from './';

export const getArticleByRoomAPI = (token, idRuang, page) => {
  return client.get(
    `/article/pagination/type/${idRuang}/${page}/1/idArticle/desc`,
    createHeader(token),
  );
};

export const getRoomAPI = () => {
  return client.get('/ruang-master');
};

export const getRoomTypeByIdAPI = (token, idRuang) => {
  return client.get(`/ruang-master/${idRuang}`, createHeader(token));
};
