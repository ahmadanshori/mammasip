import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Container} from '../../components/Container';
import {CalculatorItem} from '../../components/Items';
import {COLORS, FONTS, ICON} from '../../constants';

const AlatHitungScreen = ({navigation}) => {
  const handleNavigation = type => {
    navigation.navigate(type);
  };
  return (
    <Container style={styles.container}>
      <View style={styles.header}>
        <Text style={[FONTS.textBold20, {color: COLORS.black, marginTop: 16}]}>
          Alat Hitung
        </Text>
        <Text style={[FONTS.text12, {color: COLORS.black}]}>
          Rutin cek untuk kenali & sayangi dirimu.
        </Text>
      </View>
      <CalculatorItem
        image={<ICON.imt width={60} height={60} />}
        onPress={() => handleNavigation('Bmr')}
        backgroundColor={COLORS.blue}
        title="Kalkulator Indeks Massa Tubuh"
        description="Hitung berat badan ideal yang sesuai untuk kesehatan Anda."
      />
      <CalculatorItem
        image={<ICON.bmr width={60} height={60} />}
        onPress={() => handleNavigation('Bmi')}
        backgroundColor={COLORS.secondary}
        title="Kalkulator Kebutuhan Kalori"
        description="Sudahkan konsumsi makanan memenuhi kebutuhan kalori harian Anda?"
      />
      <CalculatorItem
        source={require('../../assets/images/woman.png')}
        image={<ICON.virus width={60} height={60} />}
        onPress={() => handleNavigation('CancerRisk')}
        backgroundColor={COLORS.red}
        title="Risiko Penyakit Kanker"
        description="Analisa dari kebiasaan dan pola makan sehari-hari Anda."
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

export default AlatHitungScreen;
