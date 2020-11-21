import React from 'react';
import { Layout } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';
import MyVocabList from '../components/MyVocab/MyVocabList';

const MyVocab = () => (
  <Layout style={styles.container}>
    <MyVocabList />
    <MyVocabList />
    <MyVocabList />
    <MyVocabList />
    <MyVocabList />
  </Layout>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default MyVocab;
