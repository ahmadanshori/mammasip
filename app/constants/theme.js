import {Dimensions} from 'react-native';
const {height, width} = Dimensions.get('window');

export const COLORS = {
  primary: '#701E70',
  lightPrimary: '#F1E4F1',
  shadowPrimary: 'rgba(112, 30, 112,0.4)',
  secondary: '#D21988',
  white: '#ffffff',
  darkWhite: '#FBFBFB',
  gray: '#b2b2b2',
  lightGray: '#d6d6d6',
  black: '#0A0A0A',
  blackShadow: 'rgba(0,0,0, 0.8)',
  green: '#00960a',
  darkYellow: '#F4C30E',
  yellow: '#F9E186',
  lightYellow: '#FDF3CF',
  red: '#d61841',
  separator: '#EDEDED',
  border: '#E0E0E0',
};

export const SIZES = {
  opacity: 0.8,
  height,
  width,
  width0: width / 1.15,
  width1: width / 1.5,
  width2: width / 2,
  width3: width / 3,
  width4: width / 4,
  width6: width / 6,
  shadow: {
    elevation: 2,
  },
};

export const FONTS = {
  text8: {fontFamily: 'Inter-Regular', fontSize: 8},
  textBold8: {fontFamily: 'Inter-Bold', fontSize: 8},
  text10: {fontFamily: 'Inter-Regular', fontSize: 10},
  textBold10: {
    fontFamily: 'Inter-Bold',
    fontSize: 10,
    letterSpacing: 0.14,
  },
  text12: {fontFamily: 'Inter-Regular', fontSize: 12, letterSpacing: 0.17},
  textBold12: {
    fontFamily: 'Inter-Bold',
    fontSize: 12,
    letterSpacing: 0.17,
  },
  text14: {fontFamily: 'Inter-Regular', fontSize: 14, letterSpacing: 0.2},
  textBold14: {fontFamily: 'Inter-Bold', fontSize: 14, letterSpacing: 0.2},
  text16: {fontFamily: 'Inter-Regular', fontSize: 16, letterSpacing: 0.37},
  textBold16: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    letterSpacing: 0.37,
  },
  textBold24: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
  },
};

const appTheme = {COLORS, SIZES, FONTS};
export default appTheme;
