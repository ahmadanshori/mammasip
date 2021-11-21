import {client, createHeader} from './';

export const getArticleByRoomAPI = (idRuang, page) => {
  return client.get(
    `/article/pagination/type/${idRuang}/${page}/1/idArticle/desc`,
  );
};

export const getRoomAPI = () => {
  return client.get('/ruang-master/utama');
};

export const getRoomTypeByIdAPI = idRuang => {
  return client.get(`/ruang-master/${idRuang}`);
};

export const getRoomByParentAPI = idRuang => {
  return client.get(`/ruang-master/child/${idRuang}`);
};
