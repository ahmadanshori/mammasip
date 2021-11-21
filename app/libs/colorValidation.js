import {COLORS} from '../constants';

export default id => {
  if (id === 1) {
    return COLORS.darkBlue;
  } else if (id === 2) {
    return COLORS.red;
  } else if (id === 3) {
    return COLORS.secondary;
  } else if (id === 4) {
    return COLORS.darkRed;
  } else if (id === 5) {
    return COLORS.orange;
  } else if (id === 6) {
    return COLORS.green;
  } else if (id === 7) {
    return COLORS.primary;
  } else {
    return COLORS.darkBlue;
  }
};
