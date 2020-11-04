import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Layout } from '@ui-kitten/components';
import { useRecoilValue } from 'recoil';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import { Locate } from '../states/atom';
import i18n from '../lang/i18n';
import VocabList from '../components/Home/VocabList';

const Home = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const LocateData = useRecoilValue(Locate);

  const handleIndexSelect = (index) => {
    setSelectedIndex(index);
  };

  return (
    <Layout style={styles.container} locate={LocateData}>
      <SegmentedControlTab
        tabsContainerStyle={styles.tabContainer}
        tabTextStyle={styles.tabTextStyle}
        tabStyle={styles.tabStyle}
        activeTabStyle={styles.activeTabStyle}
        values={['TOP', 'OFFICIAL', 'LASTEST']}
        selectedIndex={selectedIndex}
        onTabPress={handleIndexSelect}
      />
      <Layout style={styles.listContain}>
        <VocabList />
        <VocabList />
        <VocabList />
        <VocabList />
      </Layout>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  tabStyle: {
    borderColor: 'skyblue',
  },
  activeTabStyle: {
    backgroundColor: 'skyblue',
  },
  tabTextStyle: {
    color: 'black',
  },
  tabContainer: {
    padding: 20,
  },
  listContain: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
});

export default Home;
