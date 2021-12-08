import {client} from './';

export const getQuizByIdAPI = id => {
  return client.get(`kuis_master/${id}`);
};
