import React, {
  useEffect,
  useState,
  useMemo,
  useCallback,
  useContext,
} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TouchableNativeFeedback,
  RefreshControl,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Container} from '../../components/Container';
import {HeaderTitle} from '../../components/Headers';
import {ErrorNetwork, ErrorServer} from '../../components/Errors';
import {COLORS, FONTS, SIZES} from '../../constants';
import {LoadingComponent} from '../../components/Loadings';
import PeopleIcon from '../../assets/icons/people1.svg';
import {getQuizByIdAPI} from '../../api/quiz';
import useErrorHandler from '../../hooks/useErrorHandler';
import {AppContext} from '../../index';

const QuizScreen = ({route}) => {
  const {id} = route.params;
  const {token} = useContext(AppContext);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState({get: true, refresh: false});
  const [select, setSelect] = useState(0);
  const [count, setCount] = useState(0);
  const [finish, setFinish] = useState(false);
  const [error, setError] = useErrorHandler();

  useEffect(() => {
    getInitialData();
  }, []);

  const getInitialData = async () => {
    try {
      const res = await getQuizByIdAPI(token, id);
      setData(res.data.data);
    } catch (e) {
      setError(e);
    } finally {
      setLoading({get: false, refresh: false});
    }
  };

  const activeQuiz = useMemo(() => {
    return select + 1;
  }, [select]);

  const handleSelected = useCallback(
    val => {
      if (activeQuiz === data.pertanyaan.length) {
        if (val.status_benar === 1) {
          if (count === 0) {
            setCount(1);
          } else {
            setCount(state => state + 1);
          }
        }
        setFinish(true);
      } else {
        setSelect(state => state + 1);
        if (val.status_benar === 1) {
          if (count === 0) {
            setCount(1);
          } else {
            setCount(state => state + 1);
          }
        }
      }
    },
    [count, activeQuiz, data?.pertanyaan],
  );

  const handleRefreshQuiz = () => {
    setSelect(0);
    setCount(0);
    setFinish(false);
  };

  const handleRefresh = () => {
    setError();
    setLoading(state => ({...state, refresh: true}));
    getInitialData();
  };

  return (
    <Container>
      <HeaderTitle back title="Kuis Mammasip" />
      {loading.get ? (
        <LoadingComponent />
      ) : (
        <>
          {finish ? (
            <View style={styles.finish}>
              <PeopleIcon height={SIZES.width2} width={SIZES.width2} />
              <Text
                style={[
                  FONTS.textBold16,
                  {color: COLORS.primary, marginTop: 24, marginBottom: 16},
                ]}>
                {count === data.pertanyaan.length
                  ? 'Yey, kamu benar semua. Selamat ya!'
                  : ` Kamu Benar ${count} dari ${data.pertanyaan.length} Pertanyaan`}
              </Text>
              <Text
                style={[
                  FONTS.text14,
                  {color: COLORS.black, textAlign: 'center'},
                ]}>
                Perbanyak wawasan dengan main kuis MammaSIP, Jaga Kesehatan &
                Sayangi Dirimu.
              </Text>
              {count !== data.pertanyaan.length ? (
                <TouchableOpacity
                  style={styles.refreshButton}
                  activeOpacity={1}
                  onPress={handleRefreshQuiz}>
                  <Icon name="refresh" size={18} color={COLORS.white} />
                  <Text
                    style={[
                      FONTS.textBold12,
                      {color: COLORS.white, marginLeft: 6},
                    ]}>
                    Coba Lagi Yuk
                  </Text>
                </TouchableOpacity>
              ) : null}
            </View>
          ) : (
            <>
              <View style={styles.wrapper}>
                <View
                  style={[
                    styles.title,
                    data?.kuisMaster?.bg_color_kuis
                      ? {backgroundColor: data?.kuisMaster?.bg_color_kuis}
                      : null,
                  ]}>
                  <Text style={[FONTS.textBold16, {color: COLORS.white}]}>
                    {data.kuisMaster.nama_kuis}
                  </Text>
                </View>
                <Text style={[FONTS.text12, {color: COLORS.primary}]}>
                  Pertanyaan {activeQuiz} dari {data.pertanyaan.length}
                </Text>
                <Text
                  style={[
                    FONTS.text16,
                    {color: COLORS.black, marginTop: 8, marginBottom: 42},
                  ]}>
                  {data.pertanyaan[select]?.pertanyaan}
                </Text>
                <Text
                  style={[
                    FONTS.text12,
                    {color: COLORS.black, marginBottom: 16},
                  ]}>
                  Pilih jawaban yang benar dibawah ini:
                </Text>
              </View>
              <ScrollView
                showsVerticalScrollIndicator={false}
                refreshControl={
                  <RefreshControl
                    onRefresh={handleRefresh}
                    refreshing={loading.refresh}
                  />
                }
                contentContainerStyle={styles.wrapper}>
                {data.pertanyaan[select].pilihan.map((item, index) => (
                  <TouchableNativeFeedback
                    key={item.id_pilihan}
                    onPress={() => handleSelected(item)}>
                    <View style={styles.button}>
                      <View style={styles.square}>
                        <Text style={[FONTS.text12, {color: COLORS.white}]}>
                          {index === 0 ? 'A' : 'B'}
                        </Text>
                      </View>
                      <Text
                        style={[
                          FONTS.textBold14,
                          {color: COLORS.black, flex: 1},
                        ]}>
                        {item.pilihan_jawaban}
                      </Text>
                    </View>
                  </TouchableNativeFeedback>
                ))}
              </ScrollView>
            </>
          )}
        </>
      )}
      {error.noInternet ? <ErrorNetwork onPress={handleRefresh} /> : null}
      {error.error ? <ErrorServer onPress={handleRefresh} /> : null}
    </Container>
  );
};
const styles = StyleSheet.create({
  wrapper: {paddingHorizontal: 16},
  title: {
    padding: 16,
    backgroundColor: COLORS.primary,
    marginTop: 24,
    marginBottom: 42,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.lightGray,
    padding: 16,
    marginBottom: 16,
    borderRadius: 6,
  },
  square: {
    backgroundColor: COLORS.primary,
    paddingVertical: 4,
    paddingHorizontal: 10,
    marginRight: 16,
    borderRadius: 4,
  },
  finish: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  refreshButton: {
    flexDirection: 'row',
    borderWidth: 1,
    width: '80%',
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
    marginTop: 44,
  },
});

export default QuizScreen;
