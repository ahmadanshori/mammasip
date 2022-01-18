import {client, createHeader} from './';

export const searchFaqAPI = (token, data) =>
  client.post('/faq/search', data, createHeader(token));

export const searchAllDataAPI = (token, data) =>
  client.post('/telusuri', data, createHeader(token));
