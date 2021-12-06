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
import {COLORS} from '../../constants';

const ListQuizScreen = ({navigation}) => {
  return (
    <Container>
      <HeaderTitle back title="Kuis Mammasip" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Quiz')}
          style={{
            padding: 16,
            backgroundColor: COLORS.primary,
            marginBottom: 16,
            borderRadius: 8,
          }}>
          <Text>ListQuizScreen</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            padding: 16,
            backgroundColor: COLORS.primary,
            marginBottom: 16,
            borderRadius: 8,
          }}>
          <Text>QuizScreen</Text>
        </TouchableOpacity>
      </ScrollView>
    </Container>
  );
};
const styles = StyleSheet.create({
  scroll: {padding: 16},
});

export default ListQuizScreen;
