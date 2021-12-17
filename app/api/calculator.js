import {client, createHeader} from './';

export const getBmiAPI = data => {
  return client.post('/simulate/kalkulator-bmi', data);
};

export const getBmrAPI = data => {
  return client.post('/simulate/kalkulator-kalori', data);
};
