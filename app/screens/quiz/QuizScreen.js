import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {Container} from '../../components/Container';
import {HeaderTitle} from '../../components/Headers';
import {COLORS, FONTS} from '../../constants';

const QuizScreen = ({navigation}) => {
  return (
    <Container>
      <HeaderTitle back title="Kuis Mammasip" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}>
        <View style={styles.title}>
          <Text style={[FONTS.textBold16, {color: COLORS.white}]}>Anatomi</Text>
        </View>
        <Text style={[FONTS.text12, {color: COLORS.primary}]}>
          Pertanyaan 1 dari 5
        </Text>
        <Text
          style={[
            FONTS.text16,
            {color: COLORS.black, marginTop: 8, marginBottom: 24},
          ]}>
          Kelenjar payudara yang menghasilkan air susu ibu (ASI) terdiri atas?
        </Text>
        <TouchableOpacity>
          <View style={{color: COLORS.primary, padding: 4}}>
            <Text>A</Text>
          </View>
          <Text>Lobus & Duktus</Text>
        </TouchableOpacity>
      </ScrollView>
    </Container>
  );
};
const styles = StyleSheet.create({
  scroll: {padding: 16},
  title: {
    padding: 16,
    backgroundColor: COLORS.primary,
    marginTop: 8,
    marginBottom: 32,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default QuizScreen;
