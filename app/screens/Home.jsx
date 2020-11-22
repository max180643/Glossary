import React, { useState, useEffect } from 'react';
import {
  StyleSheet, FlatList,
} from 'react-native';
import {
  Layout, Spinner, Input, Icon,
} from '@ui-kitten/components';
import { useRecoilValue } from 'recoil';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import axios from 'axios';
import { Locate, Search } from '../states/atom';
import i18n from '../lang/i18n';
import VocabList from '../components/Home/VocabList';
import colors from '../constants/colors';

const Home = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [VocabData, setVocabData] = useState([]);
  const [Refreshing, setRefreshing] = useState(false);
  const [Loading, setLoading] = useState(true);
  const category = ['public', 'official', 'latest'];
  const LocateData = useRecoilValue(Locate);
  const SearchData = useRecoilValue(Search);

  const handleIndexSelect = (index) => {
    setSelectedIndex(index);
    setLoading(true);
  };

  const handleRefresh = () => {
    setRefreshing(true);
    axios.get(`${process.env.API_URL}/api/data/${category[selectedIndex]}`).then((res) => {
      setVocabData(res.data.response);
      setRefreshing(false);
    });
  };

  useEffect(() => {
    axios.get(`${process.env.API_URL}/api/data/${category[selectedIndex]}`).then((res) => {
      setVocabData(res.data.response);
      setLoading(false);
    });
  }, [selectedIndex]);

  return (
    <Layout style={styles.container} locate={LocateData}>
      {SearchData && (
      <Layout>
        <Input
          style={styles.inputSearch}
          placeholder="Place your Text"
          accessoryRight={() => (
            <Icon
              style={{
                height: 22,
                width: 22,
              }}
              fill={colors.primary}
              name="search"
            />
          )}
          returnKeyType="search"
          onSubmitEditing={() => console.log('Hello')}
        />
      </Layout>
      )}

      <SegmentedControlTab
        tabsContainerStyle={styles.tabContainer}
        tabTextStyle={styles.tabTextStyle}
        tabStyle={styles.tabStyle}
        activeTabStyle={styles.activeTabStyle}
        values={[i18n.t('Home.Top'), i18n.t('Home.Official'), i18n.t('Home.Latest')]}
        selectedIndex={selectedIndex}
        onTabPress={handleIndexSelect}
      />

      {Loading && (<Layout style={{ flex: 1, justifyContent: 'center' }}><Spinner size="large" style={{ borderColor: colors.primary }} /></Layout>)}

      {!Loading
      && (
      <FlatList
        numColumns={2}
        contentContainerStyle={styles.listContain}
        data={VocabData}
        renderItem={VocabList}
        keyExtractor={(item) => item.id}
        refreshing={Refreshing}
        onRefresh={handleRefresh}
      />
      )}

    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  tabStyle: {
    borderColor: colors.primary,
  },
  activeTabStyle: {
    backgroundColor: colors.primary,
  },
  tabTextStyle: {
    color: 'black',
  },
  tabContainer: {
    width: wp('90%'),
    padding: 10,
  },
  listContain: {
    justifyContent: 'space-between',
  },
  inputSearch: {
    width: wp('90%'),
    padding: 10,
    paddingBottom: 0,
  },
});

export default Home;
