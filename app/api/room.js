import {client, createHeader} from './';

export const getArticleByRoomAPI = (token, idRuang, page) => {
  return client.get(
    `/article/pagination/type/${idRuang}/${page}/1/idArticle/desc`,
    createHeader(token),
  );
};
