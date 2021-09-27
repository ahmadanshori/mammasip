import {client, createHeaderNonAuthorization} from './';

export const searchFaqAPI = data => {
  return client.post('/faq/search', data, createHeaderNonAuthorization());
};
