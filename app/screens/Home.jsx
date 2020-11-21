import React, { useState } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { Layout, Input, Icon } from '@ui-kitten/components';
import { useRecoilValue } from 'recoil';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
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
              fill="skyblue"
              name="search"
            />
          )}
        />
      </Layout>
      <SegmentedControlTab
        tabsContainerStyle={styles.tabContainer}
        tabTextStyle={styles.tabTextStyle}
        tabStyle={styles.tabStyle}
        activeTabStyle={styles.activeTabStyle}
        values={['TOP', 'OFFICIAL', 'LASTEST']}
        selectedIndex={selectedIndex}
        onTabPress={handleIndexSelect}
      />
      <ScrollView>
        <Layout style={styles.listContain}>
          <VocabList />
          <VocabList />
          <VocabList />
          <VocabList />
          <VocabList />
          <VocabList />
          <VocabList />
          <VocabList />
        </Layout>
      </ScrollView>
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
    width: wp('90%'),
    padding: 10,
  },
  listContain: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  inputSearch: {
    width: wp('90%'),
    padding: 10,
  },
});

export default Home;
