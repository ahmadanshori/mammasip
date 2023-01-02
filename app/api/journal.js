import {client, createHeader} from './';

export const createJournalSportAPI = (token, data) => {
  return client.post('/jurnal_olahraga', data, createHeader(token));
};

export const createJournalWeightAPI = (token, data) => {
  return client.post('/jurnal_imt', data, createHeader(token));
};

export const createJournalSadariAPI = (token, data) => {
  return client.post('/jurnal_sadari', data, createHeader(token));
};

export const createJournalSadanisAPI = (token, data) => {
  return client.post('/jurnal_sadanis', data, createHeader(token));
};

export const getJournalSportAPI = (token, id) => {
  return client.get(`/jurnal_olahraga/user/last/${id}`, createHeader(token));
};

export const getJournalWeightAPI = (token, id) => {
  return client.get(`/jurnal_imt/user/last/${id}`, createHeader(token));
};

export const getJournalSkriningAPI = (token, id) => {
  return client.get(
    `/jurnal_sadari_sadanis/user/last/${id}`,
    createHeader(token),
  );
};

export const getJournalGuideAPI = (token, id) => {
  return client.get(
    `/jurnal_panduan_sadari/user/last/${id}`,
    createHeader(token),
  );
};

export const getCheckJournalGuideAPI = (token, id) => {
  return client.get(
    `/jurnal_panduan_sadari/user/today/${id}`,
    createHeader(token),
  );
};

export const getQuestionGuideAPI = token =>
  client.get('/panduan_sadari', createHeader(token));

export const createJournalGuideAPI = (token, data) => {
  return client.post('/jurnal_panduan_sadari', data, createHeader(token));
};
export const getTempAPI = (token, id) => {
  return client.get(`/jurnal_panduan_sadari/v2/${id}`, createHeader(token));
};

export const updateSadariAPI = (token, id, data) => {
  return client.put(`/jurnal_sadari/${id}`, data, createHeader(token));
};

export const updateSadanisAPI = (token, id, data) => {
  return client.put(`/jurnal_sadanis/${id}`, data, createHeader(token));
};

export const updateSadariDoneAPI = (token, id, data) => {
  return client.put(`/jurnal_sadari/done/${id}`, data, createHeader(token));
};
