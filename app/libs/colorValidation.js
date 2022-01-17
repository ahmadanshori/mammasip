import {COLORS} from '../constants';

export default id => {
  if (id === 1) {
    return COLORS.darkBlue;
  } else if (id === 2) {
    return '#EA39A3';
  } else if (id === 3) {
    return COLORS.red;
  } else if (id === 4) {
    return COLORS.darkRed;
  } else if (id === 5) {
    return COLORS.orange;
  } else if (id === 6) {
    return COLORS.green;
  } else if (id === 7) {
    return COLORS.primary;
  } else if (id === 8) {
    return '#19B09E';
  } else {
    return COLORS.darkBlue;
  }
};
