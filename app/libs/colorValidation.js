import {COLORS} from '../constants';

export default id => {
  if (id === 1) {
    return '#701E70';
  } else if (id === 2) {
    return '#EA39A3';
  } else if (id === 3) {
    return '#F2666E';
  } else if (id === 4) {
    return '#FFA4A3';
  } else if (id === 5) {
    return '#E17FA8';
  } else if (id === 6) {
    return '#DA6CD3';
  } else if (id === 7) {
    return '#AE72DD';
  } else if (id === 8) {
    return '#F17087';
  } else {
    return COLORS.darkBlue;
  }
};
