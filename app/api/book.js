import {client, createHeader} from './';

export const getTopBook = token => {
  return client.get('/book/topview', createHeader(token));
};
