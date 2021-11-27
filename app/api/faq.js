import {client, createHeaderNonAuthorization} from './';

export const searchFaqAPI = data =>
  client.post('/faq/search', data, createHeaderNonAuthorization());
