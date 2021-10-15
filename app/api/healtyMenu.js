import {client, createHeader} from './';

export const getHealtyCaloriesAPI = token => {
  return client.get('/menu_sehat/tipe_kalori', createHeader(token));
};
