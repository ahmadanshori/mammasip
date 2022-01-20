import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import {SearchInput} from '../Inputs';
import {SIZES, COLORS, FONTS} from '../../constants';

const SearchHeader = ({
  search,
  handleSearch,
  title,
  desc,
  placeholder,
  source,
  autoFocus,
}) => {
  const navigation = useNavigation();
  return (
    <ImageBackground source={source} style={styles.background}>
      <View style={styles.wrapper}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.goBack();
            }}
            activeOpacity={SIZES.opacity}>
            <Icon
              name={Platform.OS === 'ios' ? 'left' : 'arrowleft'}
              size={18}
              color={COLORS.white}
            />
          </TouchableOpacity>
          <View style={styles.w15} />
        </View>
        <View style={styles.textWrapper}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.desc}>{desc}</Text>
        </View>
        <SearchInput
          placeholder={placeholder}
          value={search}
          onChangeText={handleSearch}
          autoFocus={autoFocus}
          style={styles.search}
        />
      </View>
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  wrapper: {backgroundColor: COLORS.background, height: '100%'},
  background: {height: SIZES.width2 - 16, width: '100%'},
  textWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  button: {
    width: '15%',
    paddingVertical: 16,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  w15: {width: '15%'},
  scroll: {paddingHorizontal: 16, paddingBottom: 16},
  title: {...FONTS.textBold16, color: COLORS.white, textAlign: 'center'},
  desc: {...FONTS.text12, color: COLORS.white, textAlign: 'center'},
  search: {marginHorizontal: 16, marginTop: 24},
});

export default SearchHeader;
