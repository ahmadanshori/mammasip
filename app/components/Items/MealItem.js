import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS, FONTS} from '../../constants';

const MealItem = ({name, calories, ingredients}) => {
  const [isSelect, setIsSelect] = useState(false);
  const handleSelect = () => {
    setIsSelect(state => !state);
  };
  return (
    <>
      <TouchableOpacity
        style={[styles.container, isSelect ? styles.active : styles.inActive]}
        activeOpacity={1}
        onPress={handleSelect}>
        <View style={styles.row}>
          <Text style={[FONTS.text14, {color: COLORS.black}]}>{name}</Text>
          {/* <Text style={[FONTS.text12, {color: COLORS.gray, marginLeft: 6}]}>
            {calories} Kkal
          </Text> */}
        </View>
        <Icon name={isSelect ? 'chevron-up' : 'chevron-down'} size={20} />
      </TouchableOpacity>
      {isSelect ? (
        <>
          {ingredients.map(item => (
            <View
              style={[styles.container, styles.ingredients]}
              key={item.id_bahan}>
              <View>
                <View style={styles.row}>
                  <Text style={[FONTS.text14, {color: COLORS.black}]}>
                    {item.bahan}
                  </Text>
                  <Text
                    style={[FONTS.text12, {color: COLORS.gray, marginLeft: 6}]}>
                    {item.berat} gr
                  </Text>
                </View>
                <Text style={[FONTS.text12, {color: COLORS.secondary}]}>
                  {item.urt}
                </Text>
              </View>
              <View style={styles.row}>
                <Text style={FONTS.textBold18}>{item.kkal} </Text>
                <Text style={FONTS.text12}>Kkal</Text>
              </View>
            </View>
          ))}
        </>
      ) : null}
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    borderWidth: 1,
    borderRadius: 6,
  },
  active: {borderColor: COLORS.primary, backgroundColor: COLORS.shadowPrimary},
  inActive: {borderColor: COLORS.primary, backgroundColor: COLORS.darkWhite},
  ingredients: {borderColor: COLORS.border, backgroundColor: COLORS.darkWhite},
  row: {flexDirection: 'row', alignItems: 'center'},
});

export default MealItem;
