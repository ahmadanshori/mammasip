import axios from 'axios';
import env from 'react-native-config';

const client = axios.create({
  baseURL: `${env.HOST}`,
  timeout: 10000,
});
export const headerOptions = {
  'Content-Type': 'multipart/form-data',
};
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

const createHeaderNonAuthorization = () => {
  return {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    },
  };
};

// client.interceptors.response.use(undefined, async err => {
//   const error = err.response;
//   if (error && error.status === 401) {
//     await AsyncStorage.clear();
//     return navigate('Login');
//   }
//   throw err;
// });

export {client, createHeader, createHeaderForm, createHeaderNonAuthorization};
