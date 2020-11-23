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
  console.log(props);
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
            <Text style={{ maxWidth: wp('40%'), fontSize: 18 }}>TOEIC 2020</Text>
          </Layout>
          <Layout style={styles.textDetail}>
            <Text style={{ maxWidth: wp('40%'), fontSize: 18 }}>By eiei2543</Text>
          </Layout>
          <Layout style={styles.textDetail}>
            <Text style={{ maxWidth: wp('40%'), fontSize: 18 }}>450</Text>
          </Layout>
        </Layout>
      </Layout>
      <Layout>
        <Text style={styles.vocabDetail}>{'        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'}</Text>
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
