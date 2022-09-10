import React, {useState, useEffect, useCallback, useContext} from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Container} from '../../components/Container';
import {HeaderTitle} from '../../components/Headers';
import {LoadingComponent} from '../../components/Loadings';
import Divider from '../../components/Divider';
import {ErrorNetwork, ErrorServer} from '../../components/Errors';
import {COLORS, FONTS, ICON} from '../../constants';
import {getJournalSkriningAPI} from '../../api/journal';
import formatDate from '../../libs/formatDate';
import useErrorHandler from '../../hooks/useErrorHandler';
import {AppContext} from '../../index';
import {MainButton, AskButton} from '../../components/Buttons';
import {JournalItem} from '../../components/Items';

const GuideScreen = ({navigation}) => {
  const {token, user, setLoading} = useContext(AppContext);
  const [data, setData] = useState([1, 2, 3, 4]);
  const [isJournal, setIsJournal] = useState(false);
  const [selected, setSelected] = useState(null);
  const [isLoad, setIsLoad] = useState(true);
  const [error, setError] = useErrorHandler();

  useEffect(() => {
    getInitialData();
  }, []);

  const getInitialData = useCallback(async () => {
    try {
      //   const res = await getJournalSkriningAPI(token, user.id_user);
    } catch (e) {
      setError(e);
    } finally {
      setIsLoad(false);
    }
  }, [token, user.id_user, setError]);

  const handleRefresh = () => {
    setError();
    setIsLoad(true);
    getInitialData();
  };
  return (
    <Container>
      <HeaderTitle title="Jurnal Panduan Skrining" />
      {isLoad ? (
        <LoadingComponent />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.wrapper}>
            {isJournal ? (
              <View style={{...styles.header, backgroundColor: '#ECFFEE'}}>
                <ICON.panduan2 height={80} width={80} />
                <View style={{flex: 1, marginLeft: 16}}>
                  <Text style={FONTS.textBold14}>
                    Anda sudah mengisi jurnal panduan skrining bulan ini!
                  </Text>
                  <Text style={{...FONTS.text12, marginTop: 8}}>
                    Pastikan anda rutin melakukan SADARI ya Sahabat MammaSIP!
                  </Text>
                </View>
              </View>
            ) : (
              <>
                <View style={{...styles.header, backgroundColor: '#FFECEC'}}>
                  <ICON.panduan height={80} width={80} />
                  <View style={{flex: 1, marginLeft: 16}}>
                    <Text style={FONTS.textBold14}>
                      Anda belum mengisi jurnal panduan skrining bulan ini!
                    </Text>
                    <Text style={{...FONTS.text12, marginTop: 8}}>
                      Silahkan isi jurnal panduan skrining secara rutin untuk
                      memantau kesehatan anda.
                    </Text>
                  </View>
                </View>
                <MainButton title={'Tulis Jurnal Sekarang'} right />
              </>
            )}
          </View>
          <Divider />
          <View style={styles.wrapper}>
            <View style={styles.between}>
              <View style={styles.row}>
                <Icon size={20} name="history" style={{marginRight: 8}} />
                <Text style={FONTS.textBold14}>Riwayat Jurnal</Text>
              </View>
              <View style={styles.year}>
                <Text style={FONTS.text14}>2022</Text>
                <Icon name="chevron-down" size={25} />
              </View>
            </View>
            {data.length ? (
              <>
                {data.map(item => (
                  <JournalItem key={item} />
                ))}
              </>
            ) : (
              <View style={styles.noData}>
                <Text style={{...FONTS.text18, color: COLORS.gray}}>
                  Belum ada jurnal
                </Text>
              </View>
            )}
          </View>
          <Divider />
          <View style={styles.wrapper}>
            <View style={styles.footer}>
              <Text
                style={[
                  FONTS.textBold16,
                  {textAlign: 'center', marginBottom: 16},
                ]}>
                Butuh informasi lainnya?
              </Text>
              <AskButton onPress={() => navigation.navigate('Faq')} />
            </View>
          </View>
        </ScrollView>
      )}

      {error.noInternet ? <ErrorNetwork onPress={handleRefresh} /> : null}
      {error.error ? <ErrorServer onPress={handleRefresh} /> : null}
    </Container>
  );
};
const styles = StyleSheet.create({
  wrapper: {paddingHorizontal: 16, paddingVertical: 24},
  header: {
    flexDirection: 'row',
    alignItems: 'center',

    padding: 24,
    borderRadius: 8,
    marginBottom: 24,
  },
  between: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  row: {flexDirection: 'row', alignItems: 'center'},
  year: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 8,
    borderColor: '#E0E0E0',
  },
  noData: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default GuideScreen;
