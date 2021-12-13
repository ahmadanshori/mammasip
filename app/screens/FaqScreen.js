import React, {useState} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import debounce from 'lodash/debounce';
import {Container} from '../components/Container';
import {HeaderTitle} from '../components/Headers';
import {SearchInput} from '../components/Inputs';
import Accordion from '../components/Accordion';
import {searchFaqAPI} from '../api/faq';
import {COLORS, FONTS} from '../constants';

const FaqScreen = ({navigation}) => {
  const [search, setSearch] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

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
      const resFaq = await searchFaqAPI(formData);
      setData(resFaq.data.data);
    } catch (err) {
      //   console.log(`err`, {...err});
    } finally {
      setLoading(false);
    }
  }, 500);

  const handleRefresh = () => {
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
