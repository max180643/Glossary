import React from 'react';
import { Layout, Icon } from '@ui-kitten/components';
import {
  StyleSheet, Image, Text, TouchableOpacity,
} from 'react-native';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import IconImage from '../../assets/profile.png';
import colors from '../../constants/colors';
import EvaIcon from '../EvaIcon';

const MyVocabList = () => (
  <Layout style={styles.container}>
    <Layout style={styles.card}>
      <Layout style={styles.imageDetail}>
        <Image
          style={styles.icon}
          source={IconImage}
        />
      </Layout>
      <Layout style={styles.textDetail}>
        <Layout style={styles.vocabName}>
          <EvaIcon color={colors.primary} name="book-open-outline" size={22} style={{ marginRight: wp('2%') }} />
          <Text style={{ maxWidth: wp('40%'), fontSize: 18 }}>TOEIC 2020</Text>
        </Layout>
        <Layout style={styles.buttonDetail}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.textButton}>ลบ</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.textButton}>แก้ไข</Text>
          </TouchableOpacity>
        </Layout>
      </Layout>

    </Layout>
  </Layout>

);
const styles = StyleSheet.create({
  icon: {
    height: hp('15%'),
    width: wp('30%'),
    borderRadius: 10,
  },
  container: {
    alignItems: 'center',
  },
  button: {
    backgroundColor: colors.primary,
    padding: 10,
    margin: 5,
    borderRadius: 10,
    width: wp('20%'),
    alignItems: 'center',
    marginTop: hp('2%'),
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: colors.primary,
    borderWidth: 4,
    borderRadius: 20,
    marginTop: hp('2%'),
  },
  imageDetail: {
    padding: 10,
    borderRadius: 20,
  },
  textDetail: {
    padding: 10,
    alignItems: 'center',
    borderRadius: 20,
  },
  buttonDetail: {
    flexDirection: 'row',
  },
  textButton: {
    fontSize: 16,
  },
  vocabName: {
    flexDirection: 'row',
    alignContent: 'center',
  },
});
export default MyVocabList;
