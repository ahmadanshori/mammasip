import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Container} from '../../components/Container';
import {CalculatorItem} from '../../components/Items';
import {COLORS, FONTS} from '../../constants';

const JournalScreen = ({navigation}) => {
  const handleNavigation = type => {
    navigation.navigate(type);
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
        source={require('../../assets/images/woman.png')}
        onPress={() => handleNavigation('SportsJournal')}
        backgroundColor={COLORS.orange}
        title="Jurnal Olahraga"
        description="Catat semua aktivitas kebutuhan 
        olahragamu sehari-hari"
      />
      <CalculatorItem
        source={require('../../assets/images/woman.png')}
        onPress={() => handleNavigation('WeightJournal')}
        backgroundColor={COLORS.primary}
        title="Jurnal Berat Badan"
        description="Hitung berat badan ideal yang sesuai
        dengan dirimu."
      />
      <CalculatorItem
        source={require('../../assets/images/woman.png')}
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
