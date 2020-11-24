import React, { useEffect } from 'react';
import {
  StyleSheet, Text,
} from 'react-native';
import {
  Layout,
} from '@ui-kitten/components';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import Vocab from '../components/Practice/Vocab';
import CustomHeaderButton from '../components/navigations/CustomHeaderButton';

const Practice = (props) => {
  useEffect(() => {
    props.navigation.setOptions({
      headerLeft: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title="Menu"
            iconName="ios-arrow-back"
            onPress={() => props.navigation.goBack()}
          />
        </HeaderButtons>
      ),
    });
  }, []);

  return (
    <Layout style={styles.container}>
      <Text style={{ fontSize: 40, marginVertical: 20 }}>TOEIC 2020</Text>
      <Vocab words={['opposition', 'ความขัดแย้ง']} />
      <Vocab words={['omit', 'ละไว้']} />
      <Vocab words={['collaborate', 'ร่วมกับคนอื่น']} />
      <Vocab words={['renovate', 'ซ่อมแซม']} />
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 10,
    flex: 1,
  },
});

export default Practice;
