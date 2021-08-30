import React, {useState} from 'react';
import {StyleSheet, ScrollView, View} from 'react-native';
import {Container} from '../../components/Container';
import {HeaderTitle} from '../../components/Headers';
import {SelectedButton, MainButton} from '../../components/Buttons';
import {COLORS} from '../../constants';

const data = [
  {id: 1, name: 'Paket Menu 1'},
  {id: 2, name: 'Paket Menu 2'},
  {id: 3, name: 'Paket Menu 3'},
  {id: 4, name: 'Paket Menu 4'},
];
const MenuPackageScreen = ({route, navigation}) => {
  const {updateMenu, menu} = route.params;
  const [selectedMenu, setSelectedMenu] = useState(menu);

  const handleSelectedMenu = value => {
    setSelectedMenu(value);
  };

  const handleChangeMenu = () => {
    updateMenu(selectedMenu);
    navigation.goBack();
  };
  return (
    <Container>
      <HeaderTitle title="Pilih Paket Menu" />
      <ScrollView contentContainerStyle={styles.container}>
        {data.map(item => (
          <SelectedButton
            key={item.id}
            title={item.name}
            selected={selectedMenu?.id === item.id ? true : false}
            onPress={() =>
              selectedMenu?.id === item.id ? {} : handleSelectedMenu(item)
            }
          />
        ))}
      </ScrollView>
      <View style={styles.footer}>
        <MainButton
          title="Ganti Menu"
          backgroundColor={COLORS.secondary}
          onPress={handleChangeMenu}
          disable={!selectedMenu?.id}
        />
      </View>
    </Container>
  );
};
const styles = StyleSheet.create({
  container: {padding: 16},
  footer: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
});

export default MenuPackageScreen;
