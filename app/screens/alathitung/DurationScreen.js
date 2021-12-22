import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {Container} from '../../components/Container';
import {HeaderTitle} from '../../components/Headers';
import {COLORS, FONTS} from '../../constants';
const data = [
  {id: 1, title: 'Hampir tidak pernah berolahraga'},
  {id: 2, title: '1 - 3 hari per minggu berolahraga'},
  {id: 3, title: '3 - 5 hari per minggu berolahraga'},
  {id: 4, title: '6 - 7 hari per minggu berolahraga'},
  {id: 5, title: 'Atlet'},
];

const DurationScreen = ({navigation, route}) => {
  const {updateDuration} = route.params;
  const selected = route.params.selected || null;
  const handleDuration = event => {
    updateDuration(event);
    navigation.goBack();
  };

  return (
    <Container>
      <HeaderTitle title="Pilih Durasi Olahraga" />
      <View style={styles.padding}>
        {data.map(item => (
          <TouchableOpacity
            key={item.id}
            activeOpacity={1}
            onPress={() => handleDuration(item)}
            style={[
              styles.button,
              item.id === selected?.id ? styles.active : styles.inActive,
            ]}>
            <Text
              style={[
                FONTS.text14,
                {
                  flex: 1,
                  color:
                    item.id === selected?.id ? COLORS.secondary : COLORS.black,
                },
              ]}>
              {item.title}
            </Text>
            {item.id === selected?.id ? (
              <Icon name="check" size={20} color={COLORS.secondary} />
            ) : null}
          </TouchableOpacity>
        ))}
      </View>
    </Container>
  );
};

export default DurationScreen;

const styles = StyleSheet.create({
  padding: {padding: 16},
  button: {
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  active: {borderColor: COLORS.secondary},
  inActive: {borderColor: COLORS.gray},
});
