import {client, createHeader} from './';

export const getTopArticle = token => {
  return client.get('/article/topview', createHeader(token));
};
