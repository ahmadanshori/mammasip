import {client, createHeader} from './';

export const getHealtyCaloriesAPI = token => {
  return client.get('/menu_sehat/tipe_kalori', createHeader(token));
};

export const getHealtyCaloriesByIdAPI = (token, calorieId, pekanId) => {
  return client.get(
    `/menu_sehat/type/${calorieId}/${pekanId}`,
    createHeader(token),
  );
};
