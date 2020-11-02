import React from 'react';
import { StyleSheet } from 'react-native';
import { Layout, Text } from '@ui-kitten/components';
import { useRecoilValue } from 'recoil';
import { Locate } from '../states/atom';
import i18n from '../lang/i18n';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const Home = () => {
  const LocateData = useRecoilValue(Locate);

  return (
    <Layout style={styles.container} locate={LocateData}>
      <Text>{i18n.t('Home.Title')}</Text>
    </Layout>
  );
};

export default Home;
