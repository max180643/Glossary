import {
  Layout, Input, Text, Toggle, Spinner,
} from '@ui-kitten/components';
import React, { useState } from 'react';
import {
  StyleSheet, TouchableOpacity, Image, Alert, ScrollView,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import axios from 'axios';
import Constants from 'expo-constants';
import IconImage from '../assets/profile.png';
import colors from '../constants/colors';
import EvaIcon from '../components/EvaIcon';
import CreateVocab from '../components/Create/CreateVocab';

const Create = (props) => {
  const [GlossaryName, setGlossaryName] = useState('');
  const [Description, setDescription] = useState('');
  const [Word, setWord] = useState('');
  const [Meaning, setMeaning] = useState('');
  const [GlossaryList, setGlossaryList] = useState([]);
  const [Private, setPrivate] = useState(false);
  const [Loading, setLoading] = useState(false);

  const onCheckedChange = (isChecked) => {
    setPrivate(isChecked);
  };

  const addGlossary = () => {
    if (Word !== '' && Meaning !== '') {
      const WordData = { en: Word, th: Meaning };
      const GlossaryData = GlossaryList;
      GlossaryData.push(WordData);
      setGlossaryList(GlossaryData);
      setWord('');
      setMeaning('');
    }
  };

  const createGlossary = () => {
    if (GlossaryName !== '' && Description !== '' && GlossaryList.length >= 5) {
      setLoading(true);
      axios.post(`${Constants.manifest.extra.URL_API}/api/create/glossary`, {
        name: GlossaryName,
        description: Description,
        type: Private === true ? 'private' : 'unofficial',
        owner: 'nipnew',
        owner_id: 1,
        glossary: GlossaryList,
      }).then(() => {
        setGlossaryName('');
        setDescription('');
        setWord('');
        setMeaning('');
        setGlossaryList([]);
        props.navigation.navigate('MyVocab');
        setLoading(false);
      });
    } else if (GlossaryList.length < 5) {
      Alert.alert(
        'แจ้งเตือน',
        'คำศัพท์ต้องมีขั้นต่ำ 5 ชุด',
        [
          { text: 'OK' },
        ],
      );
    } else {
      Alert.alert(
        'แจ้งเตือน',
        'กรุณากรอกข้อมูลให้ครับถ้วน',
        [
          { text: 'OK' },
        ],
      );
    }
  };

  return (
    <Layout style={styles.container}>
      {Loading ? <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Spinner size="large" style={{ borderColor: colors.primary }} /></Layout> : []}

      {!Loading
        ? (
          <ScrollView>
            <Layout style={styles.card}>
              <Layout style={styles.imageDetail}>
                <Image
                  style={styles.icon}
                  source={IconImage}
                />
              </Layout>
            </Layout>
            <Layout>
              <Toggle checked={Private} onChange={onCheckedChange} style={{ margin: 5 }} status="info">
                ส่วนตัว
              </Toggle>
            </Layout>
            <Layout style={styles.textDetail}>
              <Input
                status="info"
                style={{ width: wp('70%') }}
                placeholder="ชื่อชุดคำศัพท์"
                accessoryRight={() => (
                  <EvaIcon color={colors.primary} name="book-open-outline" size={22} />
                )}
                value={GlossaryName}
                onChangeText={(text) => { setGlossaryName(text); }}
              />
            </Layout>
            <Layout style={styles.textDetail}>
              <Input
                multiline
                maxLength={200}
                status="info"
                style={{ width: wp('70%'), maxHeight: hp('12%') }}
                placeholder="คำอธิบาย"
                accessoryRight={() => (
                  <EvaIcon color={colors.primary} name="file-text-outline" size={22} />
                )}
                value={Description}
                onChangeText={(text) => { setDescription(text); }}
              />
            </Layout>
            <Text style={{ alignSelf: 'center', marginBottom: hp('1%') }} category="h5">- คำศัพท์ -</Text>
            <Layout style={styles.textDetail}>
              <Input
                status="info"
                style={{ width: wp('70%'), maxHeight: hp('12%') }}
                placeholder="คำศัพท์"
                accessoryRight={() => (
                  <EvaIcon color={colors.primary} name="book-outline" size={22} />
                )}
                maxLength={12}
                value={Word}
                onChangeText={(text) => { setWord(text); }}
              />
            </Layout>
            <Layout style={styles.textDetail}>
              <Input
                status="info"
                style={{ width: wp('70%'), maxHeight: hp('12%') }}
                placeholder="คำแปล"
                accessoryRight={() => (
                  <EvaIcon color={colors.primary} name="text-outline" size={22} />
                )}
                value={Meaning}
                onChangeText={(text) => { setMeaning(text); }}
              />
            </Layout>
            <Layout style={styles.addVocab}>
              <TouchableOpacity delayPressIn={0} onPress={() => addGlossary()}>
                <EvaIcon color={colors.primary} name="plus-circle-outline" size={40} />
              </TouchableOpacity>
            </Layout>
            <Layout style={styles.vocabCard}>
              {GlossaryList.map((item, index) => <CreateVocab item={item} key={index} />)}
            </Layout>
            <TouchableOpacity
              delayPressIn={0}
              onPress={() => createGlossary()}
              style={{
                alignSelf: 'center', backgroundColor: colors.primary, borderRadius: 10, padding: 15, margin: 10,
              }}
            >
              <Text>สร้างชุดคำศัพท์</Text>
            </TouchableOpacity>
          </ScrollView>
        )
        : []}
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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

    // maxHeight: hp('15%'),
  },
  addVocab: {
    alignItems: 'center',
  },
});

export default Create;
