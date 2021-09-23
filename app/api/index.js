import axios from 'axios';
// import Config from 'react-native-config';
// import {navigate} from '../config/RootNavigation';

const client = axios.create({
  //   baseURL: `${Config.API_HOST}`,
  baseURL: 'http://mammasip.com:8200/core-mammasip',
  timeout: 10000,
});

const createHeader = token => {
  if (token) {
    return {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    };
  } else {
    return {};
  }
};
const createHeaderForm = token => {
  if (token) {
    return {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    };
  } else {
    return {};
  }
};

// client.interceptors.response.use(undefined, (err) => {
//   const error = err.response;
//   if (error && error.status === 401) {
//     AsyncStorage.clear();
//     navigate('Login');
//   }
//   throw err;
// });

export {client, createHeader, createHeaderForm};
