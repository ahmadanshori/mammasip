import React, {useContext} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Container} from '../../components/Container';
import {CalculatorItem} from '../../components/Items';
import {COLORS, FONTS, ICON} from '../../constants';
import {AppContext} from '../../index';

const JournalScreen = ({navigation}) => {
  const {token} = useContext(AppContext);
  const handleNavigation = type => {
    if (token) {
      navigation.navigate(type);
    } else {
      navigation.navigate('Login', {nav: 'JournalTab'});
    }
  };
  return (
    <Container style={styles.container}>
      <View style={styles.header}>
        <Text style={[FONTS.textBold20, {color: COLORS.black, marginTop: 16}]}>
          Jurnal Pribadi
        </Text>
        <Text style={[FONTS.text12, {color: COLORS.black}]}>
          Catat jadwal skrining & olahraga
        </Text>
      </View>
      <CalculatorItem
        image={<ICON.sport height={60} width={60} />}
        onPress={() => handleNavigation('SportsJournal')}
        backgroundColor={COLORS.orange}
        title="Jurnal Olahraga"
        description="Catat semua aktivitas kebutuhan 
        olahragamu sehari-hari"
      />
      <CalculatorItem
        image={<ICON.scales height={60} width={60} />}
        onPress={() => handleNavigation('WeightJournal')}
        backgroundColor={COLORS.primary}
        title="Jurnal Berat Badan"
        description="Hitung berat badan ideal yang sesuai
        dengan dirimu."
      />
      <CalculatorItem
        image={<ICON.calendar height={60} width={60} />}
        onPress={() => handleNavigation('SkriningJournal')}
        backgroundColor={COLORS.secondary}
        title="Jurnal Skrining"
        description="Jadwal untuk dirimu melakukan SADARI & SADANIS"
      />
    </Container>
  );
};
const styles = StyleSheet.create({
  container: {paddingHorizontal: 16},
  header: {marginTop: 24, marginBottom: 38},
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    backgroundColor: COLORS.primary,
  },
  textWrapper: {flex: 1, marginHorizontal: 8},
  iconWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    padding: 6,
    borderRadius: 40,
  },
});

export default JournalScreen;
