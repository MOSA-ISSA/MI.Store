import { ActivityIndicator, StyleSheet, } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from 'expo-router';
import { Screen, Txt } from '@elements/Elements';
import { getFromStorage } from '../constants/local';

const index = () => {
  const navigation = useNavigation();

  async function prepare() {
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
    } catch (e) {
      console.warn(e);
    } finally {
      navigation.replace('Home');
    }
  }

  useEffect(() => {
    const restoreData = async () => {
      try {
        await prepare()
        const user = await getFromStorage('user');
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

