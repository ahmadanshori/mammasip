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

const GuideQuestionScreen = ({navigation}) => {
  const {setLoading, user, token} = useContext(AppContext);
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
      const resTemp = await getTempAPI(token);
      const res = await getQuestionGuideAPI(token);
      // console.log('resTemp', JSON.stringify(resTemp.data.data));
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
  // console.log('answereData', answereData);
  const handleNextPage = async val => {
    // console.log('val', val);
    // console.log('groupActive', groupActive);
    // console.log(' data.length', data.length);
    if (groupActive === data.length) {
      setLoading(true);
      try {
        const combineData = {
          id_user: user.id_user,
          list: [...answereData, ...val],
        };
        // console.log('combineData', combineData);
        // const res = await createJournalGuideAPI(token, combineData);
        // setFinishResult(res.data.status == 1 ? true : false);
        setIsFinish(true);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    } else {
      setAnswereData(state => [...state, ...val]);
      setGroupActive(state => state + 1);
      setIsGroup(true);
    }
  };
  // console.log('data', JSON.stringify(data));
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
