import {client, createHeader} from './';

export const getTopArticle = token => {
  return client.get('/article/topview', createHeader(token));
};

export const getArticleAPI = (token, page = 0, per_page = 20) => {
  return client.get(
    `/article/pagination/${page}/${per_page}/idArticle/desc`,
    createHeader(token),
  );
};

export const getArticleByIdAPI = (token, id) => {
  return client.get(`/article/${id}`, createHeader(token));
};

export const getBookAPI = (token, page = 0) => {
  return client.get(
    `/book/pagination/${page}/15/idBook/desc`,
    createHeader(token),
  );
};
