import {client, createHeader} from './';

export const getAgendaAPI = (token, page = 0, per_page = 20) =>
  client.get(
    `event/pagination/${page}/${per_page}/idEvent/desc`,
    createHeader(token),
  );

export const searchAgendaAPI = (token, data) =>
  client.post('/event/search', data, createHeader(token));

export const getAgendaDetailAPI = (token, id) =>
  client.get(`/event/${id}`, createHeader(token));
