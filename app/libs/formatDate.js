import {format, parseISO} from 'date-fns';
import {id} from 'date-fns/locale';

export default (date, formatString) => {
  try {
    if (typeof date === 'string') {
      return format(parseISO(date), formatString, {
        locale: id,
      });
    } else {
      return format(date, formatString, {
        locale: id,
      });
    }
  } catch (e) {
    return 'Invalid Date';
  }
};
