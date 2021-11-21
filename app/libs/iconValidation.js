import React from 'react';
import {ICON} from '../constants';

export default id => {
  console.log(`id`, id);
  if (id === 1) {
    return <ICON.sayangi height={90} width={90} />;
  } else if (id === 2) {
    return <ICON.cinta height={90} width={90} />;
  } else if (id === 3) {
    return <ICON.berbagi height={90} width={90} />;
  } else if (id === 4) {
    return <ICON.kenali height={90} width={90} />;
  } else if (id === 5) {
    return <ICON.pemenang height={90} width={90} />;
  } else if (id === 6) {
    return <ICON.gerbang height={90} width={90} />;
  } else if (id === 7) {
    return <ICON.bunga height={90} width={90} />;
  } else {
    return <ICON.sayangi height={90} width={90} />;
  }
};
