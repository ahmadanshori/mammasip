import {client, createHeader} from './';

export const getBmiAPI = (token, data) => {
  return client.post('/simulate/kalkulator-bmi', data, createHeader(token));
};

export const getBmrAPI = (token, data) => {
  return client.post('/simulate/kalkulator-kalori', data, createHeader(token));
};
