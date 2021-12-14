import {useState, useMemo} from 'react';

export default () => {
  const [error, setError] = useState(null);
  let err = useMemo(() => {
    let _err = {};
    if (error?.message === 'Network Error') {
      _err = {...error, noInternet: true};
    } else if (error) {
      _err = {...error, error: true};
    } else {
      _err = {};
    }
    return _err;
  }, [error]);
  return [err, setError];
};
