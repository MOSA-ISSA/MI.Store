import { ActivityIndicator, StyleSheet, } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { useNavigation } from 'expo-router';
import { Screen, Txt } from '@elements/Elements';
import { getFromStorage } from '../constants/local';
import { getHomeData } from '@/api/_fetchApi';
import TheContext from '@/hooks/TheContext';

const index = () => {
  const { setProducts, setCategories } = useContext(TheContext)
  const navigation = useNavigation();

  useEffect(() => {
    const restoreData = async () => {
      try {
        const user = await getFromStorage('user');
        const data = await getHomeData(user?.email, user?.password);
        console.log('products', data.products.length);
        console.log('categories', data.categories.length);
        if (data?.success) {
          setProducts(data?.products || []);
          setCategories(data?.categories || []);
          navigation.replace('Home');
        }
      } catch (e) {
        console.log("error", e);
      }
    }
    restoreData();
  }, []);


  return (
    <Screen style={styles.index}>
      <Txt>MI.Store</Txt>
      <ActivityIndicator size="large" />
    </Screen>
  )
}

export default index

const styles = StyleSheet.create({
  index: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})

