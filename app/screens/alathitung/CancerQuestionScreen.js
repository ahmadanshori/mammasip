import React, {useState, useContext} from 'react';
import {Keyboard} from 'react-native';
import {Container} from '../../components/Container';
import {HeaderTitle} from '../../components/Headers';
import {
  Number,
  Question1,
  Question2,
  Question3,
  Question4,
  Question5,
  Question6,
  Answer,
} from '../../components/CancerRisk';
import {NoInternet, ErrorServer} from '../../components/Errors';
import {getBmiAPI} from '../../api/calculator';
import {AppContext} from '../../index';
import useErrorHandler from '../../hooks/useErrorHandler';

const CancerQuestionScreen = ({route, navigation}) => {
  const {setLoading, token} = useContext(AppContext);
  const {age, gender} = route.params;
  const [page, setPage] = useState(1);
  const [isFinish, setIsFinish] = useState(false);
  const [data, setData] = useState(
    {page1: false, pick1: null},
    {page2: false, pick2: null},
    {page3: false, pick3: null},
    {page4: false, pick4: null},
  );
  const [field, setField] = useState({
    age: age,
    weight: '',
    height: '',
    gender: gender,
  });
  const [imt, setImt] = useState({page5: false, page6: false, bmi: null});
  const [activity, setActivity] = useState({
    activity: null,
    time: null,
    title: null,
  });
  const [error, setError] = useErrorHandler();

  const handlePage = (event, type, val, pick, valuePick) => {
    setData(state => ({...state, [type]: val, [pick]: valuePick}));
    setPage(event);
  };
  const handleImt = (event, val) => {
    setField(state => ({...state, ...val}));
    setPage(event);
  };
  const handleCalculation = async (val, type, time) => {
    Keyboard.dismiss();
    setLoading(true);
    try {
      const res = await getBmiAPI(token, field);
      setImt({
        page5: res.data.data.cap_en === 'Normal Weight' ? true : false,
        page6: val,
        bmi: res.data.data.bmi.toFixed(2),
      });
      setActivity({activity: type, time: time});
      setIsFinish(true);
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  };

  const handleRefreshQuestion = () => {
    // setData(
    //   {page1: false, pick1: null},
    //   {page2: false, pick2: null},
    //   {page3: false, pick3: null},
    //   {page4: false, pick4: null},
    //   {page6: false, pick6: null},
    // );
    // setField({age: age, weight: '', height: '', gender: gender});
    // setImt({page6: false, bmi: null});
    // setActivity({activity: null, time: null});
    // setPage(1);
    // setIsFinish(false);
    navigation.goBack();
  };

  const handleRefresh = () => {
    setError();
    handleCalculation();
  };
  return (
    <Container>
      <HeaderTitle title="Analisa Risiko Kanker" />
      {isFinish ? (
        <Answer
          data={data}
          imt={imt}
          activity={activity}
          onRefresh={handleRefreshQuestion}
        />
      ) : (
        <>
          <Number page={page} />
          {page === 1 ? (
            <Question1 onPress={handlePage} selected={data.pick1} />
          ) : page === 2 ? (
            <Question2 onPress={handlePage} selected={data.pick2} />
          ) : page === 3 ? (
            <Question3 onPress={handlePage} selected={data.pick3} />
          ) : page === 4 ? (
            <Question4 onPress={handlePage} selected={data.pick4} />
          ) : page === 5 ? (
            <Question5 onPress={handleImt} data={field} />
          ) : page === 6 ? (
            <Question6
              onPress={handleCalculation}
              onPressBack={() => setPage(5)}
            />
          ) : null}
        </>
      )}
      {error.noInternet ? <NoInternet onPress={handleRefresh} /> : null}
      {error.error ? <ErrorServer onPress={handleRefresh} /> : null}
    </Container>
  );
};

export default CancerQuestionScreen;
