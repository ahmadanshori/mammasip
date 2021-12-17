import React, {useState, useContext} from 'react';
import {StyleSheet, Keyboard} from 'react-native';
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
import {getBmiAPI} from '../../api/calculator';
import {AppContext} from '../../index';

const CancerQuestionScreen = ({route}) => {
  const {setLoading} = useContext(AppContext);
  const {age, gender} = route.params;
  const [page, setPage] = useState(1);
  const [isFinish, setIsFinish] = useState(false);
  const [data, setData] = useState(
    {page1: false, pick1: null},
    {page2: false, pick2: null},
    {page3: false, pick3: null},
    {page4: false, pick4: null},
    {page6: false, pick6: null},
  );
  const [field, setField] = useState({
    age: age,
    weight: '',
    height: '',
    gender: gender,
  });
  const [imt, setImt] = useState({page6: false, bmi: null});

  const handlePage = (event, type, val, pick, valuePick) => {
    setData(state => ({...state, [type]: val, [pick]: valuePick}));
    setPage(event);
  };
  const handleImt = (event, val) => {
    setField(state => ({...state, ...val}));
    setPage(event);
  };
  const handleCalculation = async val => {
    Keyboard.dismiss();
    setLoading(true);
    try {
      const res = await getBmiAPI(field);
      setImt({page6: val, bmi: res.data.data.bmi});
      setIsFinish(true);
    } catch (e) {
      console.log('e', e);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Container>
      <HeaderTitle title="Analisa Resiko Kanker" />

      {isFinish ? (
        <Answer data={data} imt={imt} />
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
            <Question6 onPress={handleCalculation} />
          ) : null}
        </>
      )}
    </Container>
  );
};
// const styles = StyleSheet.create({});

export default CancerQuestionScreen;
