import React from 'react';
import {
  StyleSheet, Image, Text, TouchableOpacity,
} from 'react-native';
import {
  Layout,
} from '@ui-kitten/components';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import IconImage from '../assets/profile.png';
import colors from '../constants/colors';
import EvaIcon from '../components/EvaIcon';

const Detail = (props) => {
  const { route } = props;
  const data = route.params.item;

  return (
    <Layout style={styles.container}>
      <Layout style={styles.flexRow}>
        <Layout style={styles.card}>
          <Layout style={styles.imageDetail}>
            <Image
              style={styles.icon}
              source={IconImage}
            />
          </Layout>
        </Layout>
        <Layout style={styles.textDetail}>
          <Layout style={styles.textDetail}>
            <Text style={{ maxWidth: wp('40%'), fontSize: 18 }}>{data.name}</Text>
          </Layout>
          <Layout style={styles.textDetail}>
            <Text style={{ maxWidth: wp('40%'), fontSize: 18 }}>{data.owner}</Text>
          </Layout>
          <Layout style={styles.textDetail}>
            <Text style={{ maxWidth: wp('40%'), fontSize: 18 }}>{data.like}</Text>
          </Layout>
        </Layout>
      </Layout>
      <Layout>
        <Text style={styles.vocabDetail}>{`        ${data.description}`}</Text>
      </Layout>
      <Layout>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.button}>เริ่ม</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.button} onPress={() => props.navigation.navigate('Game')}>เล่นเกม</Text>
        </TouchableOpacity>
      </Layout>
    </Layout>
  );
};

const styles = StyleSheet.create({
  icon: {
    height: hp('15%'),
    width: wp('30%'),
    borderRadius: 10,
  },
  container: {
    alignItems: 'center',
    flex: 1,
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: colors.primary,
    borderWidth: 4,
    borderRadius: 20,
    marginTop: hp('2%'),
    marginRight: wp('5%'),
  },
  imageDetail: {
    padding: 10,
    borderRadius: 20,
  },
  textDetail: {
    padding: 5,
    alignItems: 'center',
    borderRadius: 20,
  },
  vocabName: {
    flexDirection: 'row',
    alignContent: 'center',
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  vocabDetail: {
    padding: wp('5%'),
    marginHorizontal: wp('5%'),
  },
  button: {
    backgroundColor: colors.primary,
    padding: 5,
    borderRadius: 10,
    margin: 5,
    alignItems: 'center',
  },
});

export default Detail;
