import React, {useState, useCallback, useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView, FlatList} from 'react-native';
import {Container} from '../components/Container';
import {HeaderTitle} from '../components/Headers';
import {LoadingComponent} from '../components/Loadings';
import CounselingTopBar from '../components/CounselingTopBar';
import {CounselingItem} from '../components/Items';

import {getCounselingByIdAPI} from '../api/penyuluhan';

const CounselingScreen = ({navigation}) => {
  const [select, setSelect] = useState(1);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getInitialData(select);
  }, []);

  const getInitialData = async id => {
    setLoading(true);
    try {
      const res = await getCounselingByIdAPI(id);
      //   console.log('res', res);
      setData(res.data.data);
    } catch (e) {
      //   console.log('e', e);
    } finally {
      setLoading(false);
    }
  };

  const handleMedia = val => {
    if (val.idType === 2) {
      navigation.navigate('Video', {url: val.url});
    } else if (val.idType === 3) {
      navigation.navigate('Pdf', {
        link: val.url,
      });
    } else {
      return null;
    }
  };
  const renderItem = ({item}) => {
    return (
      <CounselingItem
        source={item.media[0].typeFile === 1 ? {uri: item.media[0].url} : null}
        title={item.tittle}
        date={item.createdDate}
        onPress={() => handleMedia(item.media[0])}
      />
    );
  };

  //   const handleRefresh = () => {
  //     setLoading(true);
  //     handleCustomerSearch(search);
  //   };

  const handleTopBar = async val => {
    setSelect(val);
    getInitialData(val);
  };

  return (
    <Container>
      <HeaderTitle back title="Ruang Penyuluhan" />
      <CounselingTopBar select={select} onPress={handleTopBar} />
      {loading ? (
        <LoadingComponent />
      ) : (
        <FlatList
          // onEndReached={nextPage}
          // onEndReachedThreshold={0.5}
          // refreshing={loading}
          // onRefresh={handleRefresh}
          data={data}
          keyExtractor={item => item.idPenyuluhan.toString()}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 16,
            paddingTop: 24,
            paddingBottom: 16,
          }}
        />
      )}
    </Container>
  );
};

const styles = StyleSheet.create({});

export default CounselingScreen;
