import {client, createHeader} from './';

export const getArticleByRoomAPI = (idRuang, page) => {
  return client.get(
    `/article/pagination/type/${idRuang}/${page}/1/idArticle/desc`,
  );
};

export const getRoomAPI = () => {
  return client.get('/ruang-master/utama');
};

export const getRoomTypeByIdAPI = (idRuang, token = '') => {
  return client.get(`/ruang-master/${idRuang}`, createHeader(token));
};

export const getRoomByParentAPI = idRuang => {
  return client.get(`/ruang-master/child/${idRuang}`);
};

export const getImportantMessageAPI = () =>
  client.get('/ruang-master/pesan-penting');

export const getTestimoniAPI = () => client.get('/testimoni');

export const getVideoAPI = id =>
  client.get(`/ruang-master/video-olahraga/${id}`);

export const getBookAPI = (id, page = 0, per_page = 20) =>
  client.get(`/book/pagination/type/${id}/${page}/${per_page}/idBook/asc`);

export const getVideoPageAPI = (page = 0, per_page = 20) =>
  client.get(`/media/pagination/type/2/${page}/${per_page}/idMedia/asc`);
