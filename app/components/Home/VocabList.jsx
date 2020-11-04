import React from 'react';
import { StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Layout, Text } from '@ui-kitten/components';
import IconImage from '../../assets/profile.png';

const VocabList = () => (
  <TouchableOpacity>
    <Layout style={styles.iconContain}>
      <Image
        style={styles.icon}
        source={IconImage}
      />
    </Layout>
    <Layout style={styles.vocabText}>
      <Text>VOCAB NAME</Text>
      <Text>250</Text>
    </Layout>
  </TouchableOpacity>

);

const styles = StyleSheet.create({
  icon: {
    height: 120,
    width: 120,
    borderRadius: 10,
  },
  iconContain: {
    borderColor: 'skyblue',
    borderWidth: 4,
    padding: 10,
    margin: 20,
    marginBottom: 10,
    borderRadius: 20,
  },
  vocabText: {
    alignItems: 'center',
    padding: 10,
    marginLeft: 10,
    marginRight: 10,
  },
});

export default VocabList;
