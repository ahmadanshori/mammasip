import React, {useState, useContext} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import debounce from 'lodash/debounce';
import {Container} from '../components/Container';
import {HeaderTitle} from '../components/Headers';
import {SearchInput} from '../components/Inputs';
import Accordion from '../components/Accordion';
import {NoInternet, ErrorServer} from '../components/Errors';
import {searchFaqAPI} from '../api/faq';
import {COLORS, FONTS} from '../constants';
import useErrorHandler from '../hooks/useErrorHandler';
import {AppContext} from '../../index';

const FaqScreen = () => {
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
      <HeaderTitle back title="FAQ" />
      <View style={styles.title}>
        <Text style={[FONTS.textBold18, {color: COLORS.black}]}>
          Tanya jawab sahabat mammaSIP
        </Text>
        <Text style={[FONTS.text12, {color: COLORS.black, marginBottom: 16}]}>
          Cari dan temukan jawaban yang tepat!
        </Text>
        <SearchInput
          placeholder="Cari topik pertanyaan"
          value={search}
          onChangeText={handleSearch}
        />
      </View>
      <FlatList
        // onEndReached={nextPage}
        // onEndReachedThreshold={0.5}
        refreshing={loading}
        onRefresh={handleRefresh}
        data={data}
        keyExtractor={item => item.id_faq.toString()}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 16,
        }}
      />
      {error.noInternet ? <NoInternet onPress={handleRefresh} /> : null}
      {error.error ? <ErrorServer onPress={handleRefresh} /> : null}
    </Container>
  );
};

const styles = StyleSheet.create({
  scroll: {paddingHorizontal: 16, paddingBottom: 16},
  title: {
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FaqScreen;
