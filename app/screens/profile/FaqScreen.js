import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';

import {Container} from '../../components/Container';
import {HeaderTitle} from '../../components/Headers';
import {SearchInput} from '../../components/Inputs';
import Accordion from '../../components/Accordion';

import {COLORS, FONTS} from '../../constants';

const FaqScreen = ({navigation}) => {
  return (
    <Container>
      <HeaderTitle back title="FAQ" />
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.title}>
          <Text style={[FONTS.textBold18, {color: COLORS.black}]}>
            Tanya jawab sahabat mammaSIP
          </Text>
          <Text style={[FONTS.text12, {color: COLORS.black}]}>
            Cari dan temukan jawaban yang tepat!
          </Text>
        </View>
        <SearchInput placeholder="Cari topik pertanyaan" />
        <View style={styles.body}>
          <Text style={[FONTS.textBold14, {color: COLORS.black}]}>
            Topik yang sering ditanyakan
          </Text>
          <Accordion title="Kenapa payudara ada benjolan tapi tidak sakit?" />
          <Accordion title="Apa yang harus dilakukan jika menemukan benjolan dipayudara?" />
          <Accordion title="Benjolan berbahaya itu yang seperti apa?" />
          <Accordion title="Apakah benjolan payudara kanker itu keras" />
        </View>
      </ScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({
  scroll: {paddingHorizontal: 16, paddingBottom: 16},
  title: {
    paddingVertical: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  body: {marginTop: 32},
});

export default FaqScreen;
