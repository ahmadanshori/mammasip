import {client, createHeader} from './';

export const getHealtyCaloriesAPI = () => {
  return client.get('/menu_sehat/tipe_kalori');
};

export const getHealtyCaloriesByIdAPI = (token, calorieId, pekanId) => {
  return client.get(
    `/menu_sehat/type/${calorieId}/${pekanId}`,
    createHeader(token),
  );
};
