import React from 'react';
import {View, Text, StyleSheet, TouchableNativeFeedback} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {COLORS, FONTS} from '../../constants';

const ProfileItem = ({iconName, title, number}) => {
  return (
    <TouchableNativeFeedback>
      <View
        style={[
          styles.container,
          {borderColor: title === 'Keluar' ? COLORS.red : COLORS.border},
        ]}>
        <View style={styles.row}>
          {iconName ? (
            <MaterialCommunityIcons
              name={iconName}
              size={18}
              color={title === 'Keluar' ? COLORS.red : COLORS.black}
            />
          ) : null}
          <Text
            style={[
              FONTS.text12,
              {
                color: title === 'Keluar' ? COLORS.red : COLORS.black,
                marginLeft: 8,
              },
            ]}>
            {title}
          </Text>
        </View>
        {title === 'Bookmark' && number ? (
          <View style={styles.number}>
            <Text style={[FONTS.text8, {color: COLORS.white}]}>
              {number >= 100 ? '99+' : number}
            </Text>
          </View>
        ) : (
          <AntDesign
            name="arrowright"
            size={18}
            color={title === 'Keluar' ? COLORS.red : COLORS.black}
          />
        )}
      </View>
    </TouchableNativeFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderRadius: 6,
    marginBottom: 8,
  },
  row: {flexDirection: 'row', alignItems: 'center'},
  number: {
    paddingHorizontal: 4,
    paddingVertical: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.secondary,
    borderRadius: 50,
  },
});

export default ProfileItem;
