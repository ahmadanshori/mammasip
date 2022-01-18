import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ImageBackground,
  TouchableOpacity,
  Platform,
} from 'react-native';
import debounce from 'lodash/debounce';
import Icon from 'react-native-vector-icons/AntDesign';
import {Container} from '../components/Container';
import {SearchInput} from '../components/Inputs';
import Accordion from '../components/Accordion';
import {NoInternet, ErrorServer} from '../components/Errors';
import {searchFaqAPI} from '../api/faq';
import {COLORS, FONTS, SIZES} from '../constants';
import useErrorHandler from '../hooks/useErrorHandler';
import {AppContext} from '../index';

const FaqScreen = ({navigation}) => {
  const {token} = useContext(AppContext);
  const [search, setSearch] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useErrorHandler();

  const renderItem = ({item}) => (
    <Accordion title={item.question_en} desc={item.answer_en} />
  );

  const handleSearch = async text => {
    setSearch(text);
    setLoading(true);
    handleCustomerSearch(text);
  };

  const handleCustomerSearch = debounce(async text => {
    try {
      const formData = new FormData();
      formData.append('search', text);
      const resFaq = await searchFaqAPI(token, formData);
      setData(resFaq.data.data);
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  }, 500);

  const handleRefresh = () => {
    setError();
    setLoading(true);
    handleCustomerSearch(search);
  };

  return (
    <Container>
      <ImageBackground
        source={require('../assets/images/ask.jpg')}
        style={styles.background}>
        <View style={styles.wrapper}>
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                navigation.goBack();
              }}
              activeOpacity={SIZES.opacity}>
              <Icon
                name={Platform.OS === 'ios' ? 'left' : 'arrowleft'}
                size={18}
                color={COLORS.white}
              />
            </TouchableOpacity>
            <View style={styles.w15} />
          </View>
          <View style={styles.textWrapper}>
            <Text style={styles.title}>Tanya jawab sahabat mammaSIP</Text>
            <Text style={styles.desc}>
              Cari dan temukan jawaban yang tepat!
            </Text>
          </View>
          <SearchInput
            placeholder="Cari topik pertanyaan"
            value={search}
            onChangeText={handleSearch}
            style={styles.search}
          />
        </View>
      </ImageBackground>

      <FlatList
        // onEndReached={nextPage}
        // onEndReachedThreshold={0.5}
        refreshing={loading}
        onRefresh={handleRefresh}
        data={data}
        keyExtractor={item => item.id_faq.toString()}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
      />
      {error.noInternet ? <NoInternet onPress={handleRefresh} /> : null}
      {error.error ? <ErrorServer onPress={handleRefresh} /> : null}
    </Container>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  wrapper: {backgroundColor: COLORS.background, height: '100%'},
  background: {height: SIZES.width2 - 16, width: '100%'},
  textWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  button: {
    width: '15%',
    paddingVertical: 16,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  w15: {width: '15%'},
  scroll: {paddingHorizontal: 16, paddingBottom: 16},
  title: {...FONTS.textBold16, color: COLORS.white, textAlign: 'center'},
  desc: {...FONTS.text12, color: COLORS.white, textAlign: 'center'},
  search: {marginHorizontal: 16, marginTop: 24},
  list: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
});

export default FaqScreen;
