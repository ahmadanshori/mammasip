import React, {useState, useEffect, useContext} from 'react';
import {StyleSheet, ScrollView} from 'react-native';

import {Container} from '../../components/Container';
import {HeaderTitle} from '../../components/Headers';
import {CalorieItem} from '../../components/Items';
import {LoadingComponent} from '../../components/Loadings';
import {ErrorNetwork, ErrorServer} from '../../components/Errors';
import {getHealtyCaloriesAPI} from '../../api/healtyMenu';
import useErrorHandler from '../../hooks/useErrorHandler';
import {AppContext} from '../../index';

const CaloriesJournalScreen = ({navigation}) => {
  const {token} = useContext(AppContext);
  const [caloriesData, setCaloriesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useErrorHandler();

  useEffect(() => {
    getInitialData();
  }, []);

  const getInitialData = async () => {
    try {
      const res = await getHealtyCaloriesAPI(token);
      setCaloriesData(res.data.data);
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    setError();
    setLoading(true);
    getInitialData();
  };
  return (
    <Container>
      <HeaderTitle title="Saran Menu Makanan" />
      {loading ? (
        <LoadingComponent />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.container}>
          {caloriesData?.map(item => (
            <CalorieItem
              key={item.tipe_menu_sehat}
              data={item}
              onPress={val =>
                navigation.navigate('CaloriesDetail', {
                  caloriesData: val,
                })
              }
            />
          ))}
        </ScrollView>
      )}
      {error.noInternet ? <ErrorNetwork onPress={handleRefresh} /> : null}
      {error.error ? <ErrorServer onPress={handleRefresh} /> : null}
    </Container>
  );
};
const styles = StyleSheet.create({
  container: {paddingHorizontal: 16, paddingBottom: 16},
});
export default CaloriesJournalScreen;
