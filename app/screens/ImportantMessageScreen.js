import React, {useState, useContext, useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView, FlatList} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Container} from '../components/Container';
import {HeaderTitle} from '../components/Headers';
import {TestimonialItem} from '../components/Items';
import {LoadingComponent} from '../components/Loadings';
import {DestinationContent, VideoMessageContent} from '../components/Contents';
import {COLORS, FONTS, SIZES} from '../constants';
import {getImportantMessageAPI, getTestimoniAPI} from '../api/room';
// import {AppContext} from '../index';

const ImportantMessageScreen = ({route, navigation}) => {
  //   const {setLoading} = useContext(AppContext);

  const [data, setData] = useState([]);
  const [testimonial, setTestimonial] = useState([]);
  const [loading, setLoading] = useState({get: true, refresh: false});

  useEffect(() => {
    getInitialData();
  }, []);

  const getInitialData = async () => {
    try {
      const res = await getImportantMessageAPI();
      const resTestimonial = await getTestimoniAPI();
      //   console.log('resTestimonial', resTestimonial);
      setData(res.data.data.media);
      setTestimonial(resTestimonial.data.data);
    } catch (e) {
      //   console.log('e', e);
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
          onPress={() => navigation.navigate('Video', {url: item.url})}
        />
      );
    } else {
      null;
    }
  };

  return (
    <Container>
      <HeaderTitle back title="Pesan Penting" />
      {loading.get ? (
        <LoadingComponent />
      ) : (
        <>
          {data?.length && testimonial?.length ? (
            <>
              <FlatList
                data={data}
                keyExtractor={item => item.idMedia.toString()}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.container}
                ListFooterComponent={
                  <View style={styles.padding}>
                    <View style={styles.wrapper}>
                      <Icon
                        name="message-processing"
                        size={20}
                        style={styles.icon}
                      />
                      <Text style={[FONTS.textBold14]}>Apa Kata Mereka?</Text>
                    </View>
                    <ScrollView
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      contentContainerStyle={styles.scroll}>
                      {testimonial.map(item => (
                        <TestimonialItem data={item} key={item.id_testimoni} />
                      ))}
                    </ScrollView>
                  </View>
                }
              />
            </>
          ) : null}
        </>
      )}
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
  },
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  padding: {
    // padding: 16,
    borderTopWidth: 6,
    borderColor: COLORS.lightGray,
    marginTop: 8,
  },
  icon: {marginRight: 6},
  scroll: {paddingHorizontal: 16},
});

export default ImportantMessageScreen;
