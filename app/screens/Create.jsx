import { Layout, Input } from '@ui-kitten/components';
import React from 'react';
import {
  StyleSheet, TouchableOpacity, Text, Image,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import IconImage from '../assets/profile.png';
import colors from '../constants/colors';
import EvaIcon from '../components/EvaIcon';
import CreateVocab from '../components/Create/CreateVocab';

const Create = () => (
  <Layout style={StyleSheet.container}>
    <Layout style={styles.card}>
      <Layout style={styles.imageDetail}>
        <Image
          style={styles.icon}
          source={IconImage}
        />
      </Layout>
    </Layout>
    <Layout style={styles.textDetail}>
      <Layout style={{ marginRight: wp('5%') }}>
        <Input
          style={{ width: wp('40%') }}
          placeholder="ชื่อชุดคำศัพท์"
        />
      </Layout>
      <Layout>
        <TouchableOpacity>
          <EvaIcon color={colors.primary} name="edit-outline" size={22} />
        </TouchableOpacity>
      </Layout>
    </Layout>
    <Layout style={styles.textDetail}>
      <Layout style={{ marginRight: wp('5%') }}>
        <Input
          style={{ width: wp('40%') }}
          placeholder="คำอธิบาย"
        />
      </Layout>
      <Layout>
        <TouchableOpacity>
          <EvaIcon color={colors.primary} name="edit-outline" size={22} />
        </TouchableOpacity>
      </Layout>
    </Layout>
    <Layout style={styles.addVocab}>
      <TouchableOpacity>
        <EvaIcon color={colors.primary} name="plus-circle-outline" size={40} />
      </TouchableOpacity>
    </Layout>
    <Layout style={styles.vocabCard}>
      <CreateVocab />
      <CreateVocab />
    </Layout>
  </Layout>
);

const styles = StyleSheet.create({
  container: {
  },
  icon: {
    height: hp('15%'),
    width: wp('30%'),
    borderRadius: 10,
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: hp('2%'),
    marginBottom: hp('3%'),
  },
  imageDetail: {
    padding: 10,
    borderRadius: 20,
  },
  textDetail: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: hp('1%'),
  },
  vocabCard: {
    marginTop: 10,
  },
  addVocab: {
    alignItems: 'center',
  },
});

export default Create;
