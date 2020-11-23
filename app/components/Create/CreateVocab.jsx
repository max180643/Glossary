import React from 'react';
import { Layout, Input } from '@ui-kitten/components';
import {
  StyleSheet, TouchableOpacity, Text, Image,
} from 'react-native';
import colors from '../../constants/colors';

const CreateVocab = () => (
  <Layout style={styles.vocabCard}>
    <Text style={{ fontSize: 50 }}>Ant</Text>
    <Text style={{ fontSize: 30 }}>มด</Text>
  </Layout>
);

const styles = StyleSheet.create({
  vocabCard: {
    borderRadius: 20,
    borderWidth: 4,
    borderColor: colors.primary,
    alignItems: 'center',
    padding: 20,
    margin: 10,
    marginHorizontal: 50,
  },
});

export default CreateVocab;
