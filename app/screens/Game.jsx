import React from 'react';
import { Layout } from '@ui-kitten/components';
import {
  StyleSheet, TouchableOpacity, Text,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import colors from '../constants/colors';

const MyVocabList = () => (
  <Layout style={styles.container}>
    <TouchableOpacity delayPressIn={0}>
      <Layout style={styles.card}>
        <Layout style={styles.choice}>
          <Text style={{ fontSize: 30 }}>ตัวเลือก</Text>
        </Layout>
      </Layout>
    </TouchableOpacity>
    <TouchableOpacity delayPressIn={0}>
      <Layout style={styles.card}>
        <Layout style={styles.choice}>
          <Text style={{ fontSize: 30 }}>เปิดคำศัพท์</Text>
        </Layout>
      </Layout>
    </TouchableOpacity>
    <TouchableOpacity delayPressIn={0}>
      <Layout style={styles.card}>
        <Layout style={styles.choice}>
          <Text style={{ fontSize: 30 }}>เติมคำ</Text>
        </Layout>
      </Layout>
    </TouchableOpacity>
    <TouchableOpacity delayPressIn={0}>
      <Layout style={styles.card}>
        <Layout style={styles.choice}>
          <Text style={{ fontSize: 30 }}>ทายคำ</Text>
        </Layout>
      </Layout>
    </TouchableOpacity>
  </Layout>
);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: colors.primary,
    borderWidth: 4,
    borderRadius: 20,
    marginTop: hp('2%'),
    padding: 20,
  },
  choice: {
    padding: 20,
    alignItems: 'center',
    borderRadius: 20,
    width: wp('70%'),
  },
});
export default MyVocabList;
