import {client, createHeader} from './';

export const getTopArticle = token => {
  return client.get('/article/topview', createHeader(token));
};

export const getArticleAPI = (page = 0, per_page = 20) => {
  return client.get(`/article/pagination/${page}/${per_page}/idArticle/desc`);
};

export const getArticleByRuangAPI = (ruangId, page = 0) => {
  return client.get(
    `/article/pagination/type/${ruangId}/${page}/15/idArticle/desc`,
  );
};

export const getArticleByIdAPI = id => {
  return client.get(`/article/${id}`);
};

export const getBookAPI = (page = 0) => {
  return client.get(`/book/pagination/${page}/15/idBook/desc`);
};
