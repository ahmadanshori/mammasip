import {client, createHeader} from './';

export const getQuizByIdAPI = (token, id) =>
  client.get(`kuis_master/${id}`, createHeader(token));
