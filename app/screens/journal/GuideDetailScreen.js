import React, {useState, useContext, useEffect, useCallback} from 'react';
import {Container} from '../../components/Container';
import {HeaderTitle} from '../../components/Headers';
import {ErrorNetwork, ErrorServer} from '../../components/Errors';

import {getTempAPI} from '../../api/journal';
import {AppContext} from '../../index';
import useErrorHandler from '../../hooks/useErrorHandler';
import {
  InitGuid,
  ResultGuide,
  QuestionGuidDetail,
} from '../../components/Guide';
import {LoadingComponent} from '../../components/Loadings';

const GuideDetailScreen = ({navigation, route}) => {
  const {setLoading, token} = useContext(AppContext);
  const id = route.params.id || '';
  const month = route.params.month || '';
  const [data, setData] = useState([]);
  const [groupActive, setGroupActive] = useState(1);
  const [isGroup, setIsGroup] = useState(true);
  const [isFinish, setIsFinish] = useState(false);
  const [finishResult, setFinishResult] = useState(false);
  const [answereData, setAnswereData] = useState([]);
  const [isLoad, setIsLoad] = useState(true);
  const [error, setError] = useErrorHandler();

  useEffect(() => {
    getInitialData();
  }, []);

  const getInitialData = useCallback(async () => {
    try {
      const resDetail = await getTempAPI(token, id);
      let answer = [];
      resDetail.data.data.formulir_user.map(items => {
        items.formulir.map(item => {
          answer.push({
            id_panduan_sadari: item.id_panduan_sadari,
            value: item.jawaban_user,
          });
        });
      });
      setData(resDetail.data.data.formulir_user);
      setAnswereData(answer);
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

  const handleNextPage = async () => {
    if (groupActive === data.length) {
      setLoading(true);
      try {
        setFinishResult(true);
        setIsFinish(true);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(true);
      let checkAnswerZero = answereData.some(e => e['value'] == 0);
      if (checkAnswerZero) {
        try {
          setFinishResult(false);
          setIsFinish(true);
        } catch (err) {
          setError(err);
        } finally {
          setLoading(false);
        }
      } else {
        setGroupActive(state => state + 1);
        setIsGroup(true);
        setLoading(false);
      }
    }
  };

  return (
    <Container>
      <HeaderTitle
        title={`Jurnal Panduan SADARI ${month}`}
        onGoBack={() => navigation.goBack()}
      />
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
            <QuestionGuidDetail
              data={data}
              groupActive={groupActive - 1}
              back={handleBackToInit}
              next={handleNextPage}
              disable={true}
            />
          )}
        </>
      )}

      {/* <QuestionGuidDetail data={data} /> */}
      {error.noInternet ? <ErrorNetwork onPress={handleRefresh} /> : null}
      {error.error ? <ErrorServer onPress={handleRefresh} /> : null}
    </Container>
  );
};

export default GuideDetailScreen;
