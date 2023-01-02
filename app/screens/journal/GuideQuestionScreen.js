import React, {useState, useContext, useEffect, useCallback} from 'react';
import {BackHandler, Alert} from 'react-native';
import {Container} from '../../components/Container';
import {HeaderTitle} from '../../components/Headers';
import {ErrorNetwork, ErrorServer} from '../../components/Errors';

import {
  getQuestionGuideAPI,
  createJournalGuideAPI,
  getTempAPI,
} from '../../api/journal';
import {AppContext} from '../../index';
import useErrorHandler from '../../hooks/useErrorHandler';
import {InitGuid, ResultGuide, QuestionGuide} from '../../components/Guide';
import {LoadingComponent} from '../../components/Loadings';

const GuideQuestionScreen = ({navigation, route}) => {
  const {setLoading, user, token} = useContext(AppContext);
  const type = route.params?.type || '';
  const id = route.params?.id || '';
  const [data, setData] = useState([]);
  const [groupActive, setGroupActive] = useState(1);
  const [isGroup, setIsGroup] = useState(true);
  const [isFinish, setIsFinish] = useState(false);
  const [finishResult, setFinishResult] = useState(false);
  const [answereData, setAnswereData] = useState([]);
  const [isLoad, setIsLoad] = useState(true);
  const [error, setError] = useErrorHandler();
  // console.log('answereData', answereData);
  const backAction = () => {
    if (isFinish) {
      navigation.goBack();
    } else {
      Alert.alert('', 'Apakah anda yakin tidak mengisi jurnal?', [
        {
          text: 'Ya',
          onPress: () => {
            navigation.goBack();
          },
        },
        {
          text: 'Tidak',
          onPress: () => {},
          style: 'cancel',
        },
      ]);
    }

    return true;
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    getInitialData();
    return () => backHandler.remove();
  }, []);

  const getInitialData = useCallback(async () => {
    try {
      const res = await getQuestionGuideAPI(token);
      if (type === 'edit') {
        const resTemp = await getTempAPI(token, id);
        console.log('resTemp', JSON.stringify(resTemp.data.data));
      }
      setData(res.data.data);
    } catch (e) {
      setError(e);
    } finally {
      setIsLoad(false);
    }
  }, [token]);

  const initHandler = () => {
    setIsGroup(false);
  };

  const handleRefresh = () => {
    setError();
    setIsLoad(true);
    getInitialData();
  };

  const handleBackToInit = () => setIsGroup(true);

  const handleNextPage = async val => {
    if (groupActive === data.length) {
      setLoading(true);
      try {
        const payloadData = {
          id_user: user.id_user,
          list: [...answereData, ...val],
        };
        console.log('payloadData', payloadData);
        const res = await createJournalGuideAPI(token, payloadData);
        setFinishResult(true);
        setIsFinish(true);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(true);
      const combineData = [...answereData, ...val];
      console.log('combineData', combineData);
      let checkAnswerZero = combineData.some(e => e['value'] == 0);
      console.log('checkAnswerZero', checkAnswerZero);
      if (checkAnswerZero) {
        // setAnswereData(combineData);
        // setGroupActive(3);
        // setIsGroup(true);
        try {
          const payloadData = {
            id_user: user.id_user,
            list: combineData,
          };
          console.log('payloadData', payloadData);
          const res = await createJournalGuideAPI(token, payloadData);
          setFinishResult(false);
          setIsFinish(true);
        } catch (err) {
          setError(err);
        } finally {
          setLoading(false);
        }
      } else {
        setAnswereData(combineData);
        setGroupActive(state => state + 1);
        setIsGroup(true);
      }
    }
  };

  return (
    <Container>
      <HeaderTitle title="Tulis Jurnal Panduan SADARI" onGoBack={backAction} />
      {isLoad ? (
        <LoadingComponent />
      ) : (
        <>
          {isFinish ? (
            <ResultGuide
              finishResult={finishResult}
              onBack={() => navigation.goBack()}
            />
          ) : isGroup ? (
            <InitGuid groupActive={groupActive} onPress={initHandler} />
          ) : (
            <QuestionGuide
              data={data}
              groupActive={groupActive - 1}
              back={handleBackToInit}
              next={handleNextPage}
            />
          )}
        </>
      )}

      {/* <QuestionGuide data={data} /> */}
      {error.noInternet ? <ErrorNetwork onPress={handleRefresh} /> : null}
      {error.error ? <ErrorServer onPress={handleRefresh} /> : null}
    </Container>
  );
};

export default GuideQuestionScreen;
