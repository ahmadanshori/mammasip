import {client} from './';

export const searchFaqAPI = data => client.post('/faq/search', data);

export const searchAllDataAPI = data => client.post('/telusuri', data);
