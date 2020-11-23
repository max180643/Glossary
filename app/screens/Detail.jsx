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
          <Text numberOfLines={1} ellipsizeMode="tail">
            <EvaIcon color="pink" name="book-outline" size={16} />
            <Text style={{ maxWidth: wp('40%'), fontSize: 18 }}>{` ${data.name}`}</Text>
          </Text>
          <Layout style={styles.textDetail}>
            <Text numberOfLines={1} ellipsizeMode="tail">
              <EvaIcon color="orange" name="people-outline" size={16} />
              <Text style={{ maxWidth: wp('40%'), fontSize: 18 }}>{` ${data.owner}`}</Text>
            </Text>
          </Layout>
          <Layout style={styles.textDetail}>
            <Text>
              <EvaIcon color="#3466ff" name="hash-outline" size={15} />
              <Text style={{ maxWidth: wp('40%'), fontSize: 18 }}>{` ${data.id}`}</Text>
            </Text>
          </Layout>
          <Layout style={styles.textDetail}>
            <Text>
              <EvaIcon color="#ff3d71" name="heart" size={15} />
              <Text style={{ maxWidth: wp('40%'), fontSize: 18 }}>{` ${data.like}`}</Text>
            </Text>
          </Layout>
        </Layout>
      </Layout>
      <Layout>
        <Text style={styles.vocabDetail}>{`        ${data.description}`}</Text>
      </Layout>
      <Layout style={styles.buttonDetail}>
        <TouchableOpacity style={styles.button}>
          <Text>ฝึกฝน</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text onPress={() => props.navigation.navigate('Game')}>เล่นเกม</Text>
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
    maxWidth: wp('50%'),
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
    backgroundColor: '#edf0f4',
    marginVertical: hp('2%'),
  },
  button: {
    backgroundColor: 'orange',
    padding: 5,
    borderRadius: 10,
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
    width: wp('20%'),
    height: hp('5%'),
  },
  buttonDetail: {
    flexDirection: 'row',
  },
});

export default Detail;
