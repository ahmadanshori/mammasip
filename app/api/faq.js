import {client, createHeader} from './';

export const getTopFaqAPI = token =>
  client.get('/faq/topview', createHeader(token));

export const getTopNewsAPI = (token, page = 0, per_page = 5) =>
  client.get(
    `/news/pagination/${page}/${per_page}/idBerita/desc`,
    createHeader(token),
  );

export const getNewsDetailAPI = (token, id) =>
  client.get(`/news/${id}`, createHeader(token));

export const searchFaqAPI = (token, data) =>
  client.post('/faq/search', data, createHeader(token));

export const searchAllDataAPI = (token, data) =>
  client.post('/telusuri', data, createHeader(token));
