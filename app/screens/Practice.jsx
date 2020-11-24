import React from 'react';
import {
  StyleSheet, Image, Text, TouchableOpacity,
} from 'react-native';
import {
  Layout,
} from '@ui-kitten/components';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import colors from '../constants/colors';
import Vocab from '../components/Practice/Vocab';

const Practice = () => (
  <Layout style={styles.container}>
    <Text style={{ fontSize: 40, marginVertical: 20 }}>TOEIC 2020</Text>
    <Vocab />
    <Vocab />
    <Vocab />
    <Vocab />
  </Layout>

);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 10,
    flex: 1,
  },
});

export default Practice;
