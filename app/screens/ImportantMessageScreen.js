import React, {useState, useEffect, useContext} from 'react';
import {StyleSheet, FlatList} from 'react-native';
import {Container} from '../components/Container';
import {HeaderTitle} from '../components/Headers';
// import {TestimonialItem} from '../components/Items';
import {LoadingComponent} from '../components/Loadings';
import {DestinationContent, VideoMessageContent} from '../components/Contents';
import {NoInternet, ErrorServer} from '../components/Errors';
import {COLORS} from '../constants';
import {
  getImportantMessageAPI,
  // getTestimoniAPI
} from '../api/room';
import useErrorHandler from '../hooks/useErrorHandler';
import {AppContext} from '../index';

const ImportantMessageScreen = ({navigation}) => {
  const {token} = useContext(AppContext);
  const [data, setData] = useState([]);
  // const [testimonial, setTestimonial] = useState([]);
  const [loading, setLoading] = useState({get: true, refresh: false});
  const [error, setError] = useErrorHandler();

  useEffect(() => {
    getInitialData();
  }, []);

  const getInitialData = async () => {
    try {
      const res = await getImportantMessageAPI(token);
      // const resTestimonial = await getTestimoniAPI(token);
      setData(res.data.data.media);
      // setTestimonial(resTestimonial.data.data);
    } catch (e) {
      setError(e);
    } finally {
      setLoading({get: false, refresh: false});
    }
  };

  const renderItem = ({item}) => {
    if (item.typeContent === 1) {
      return <DestinationContent data={item} />;
    } else if (item.typeContent === 5) {
      return (
        <VideoMessageContent
          data={item}
          onPress={() => navigation.navigate('Video', {url: item.url_frame})}
        />
      );
    } else {
      null;
    }
  };

  const handleRefresh = () => {
    setError();
    setLoading(state => ({...state, refresh: true}));
    getInitialData();
  };

  return (
    <Container>
      <HeaderTitle back title="Pesan Penting" />
      {loading.get ? (
        <LoadingComponent />
      ) : (
        <>
          {data?.length ? (
            <>
              <FlatList
                data={data}
                refreshing={loading.refresh}
                onRefresh={handleRefresh}
                keyExtractor={item => item.idMedia.toString()}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.container}
                // ListFooterComponent={
                //   <View style={styles.padding}>
                //     <ScrollView
                //       horizontal
                //       showsHorizontalScrollIndicator={true}
                //       contentContainerStyle={styles.scroll}>
                //       {testimonial.map(item => (
                //         <TestimonialItem data={item} key={item.id_testimoni} />
                //       ))}
                //     </ScrollView>
                //   </View>
                // }
              />
            </>
          ) : null}
        </>
      )}
      {error.noInternet ? <NoInternet onPress={handleRefresh} /> : null}
      {error.error ? <ErrorServer onPress={handleRefresh} /> : null}
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
  },
  padding: {
    borderTopWidth: 6,
    borderColor: COLORS.lightGray,
    paddingTop: 16,
  },
  scroll: {paddingHorizontal: 16},
});

export default ImportantMessageScreen;
