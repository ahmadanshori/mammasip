import {client, createHeader} from './';

export const getTopArticle = token => {
  return client.get('/article/topview', createHeader(token));
};

export const getArticleAPI = (page = 0) => {
  return client.get(`/article/pagination/${page}/15/idArticle/desc`);
};

export const getBookAPI = (page = 0) => {
  return client.get(`/book/pagination/${page}/15/idBook/desc`);
};
