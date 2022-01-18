import {client, createHeader} from './';

// export const getArticleByRoomAPI = (token, idRuang, page) => {
//   return client.get(
//     `/article/pagination/type/${idRuang}/${page}/1/idArticle/desc`,
//     createHeader(token),
//   );
// };

export const getRoomAPI = token =>
  client.get('/ruang-master/utama', createHeader(token));

export const getRoomTypeByIdAPI = (idRuang, token = '') => {
  return client.get(`/ruang-master/${idRuang}`, createHeader(token));
};

// export const getRoomByParentAPI = (token, idRuang) => {
//   return client.get(`/ruang-master/child/${idRuang}`, createHeader(token));
// };

export const getImportantMessageAPI = token =>
  client.get('/ruang-master/pesan-penting', createHeader(token));

export const getTestimoniAPI = token =>
  client.get('/testimoni', createHeader(token));

export const getVideoAPI = (token, id) =>
  client.get(`/ruang-master/video-olahraga/${id}`, createHeader(token));

export const getBookAPI = (token, id, page = 0, per_page = 20) =>
  client.get(
    `/book/pagination/type/${id}/${page}/${per_page}/idBook/asc`,
    createHeader(token),
  );

export const getVideoPageAPI = (token, page = 0, per_page = 20) =>
  client.get(
    `/media/pagination/type/2/${page}/${per_page}/idMedia/asc`,
    createHeader(token),
  );
