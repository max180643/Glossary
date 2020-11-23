import React, { useState, useEffect } from 'react';
import { Layout, Spinner } from '@ui-kitten/components';
import { StyleSheet, FlatList } from 'react-native';
import { useRecoilValue } from 'recoil';
import axios from 'axios';
import Constants from 'expo-constants';
import MyVocabList from '../components/MyVocab/MyVocabList';
import { Locate } from '../states/atom';
import { UserID } from '../states/auth';
import colors from '../constants/colors';

const MyVocab = () => {
  const LocateData = useRecoilValue(Locate);
  const UserIDData = useRecoilValue(UserID);

  const [MyGlossary, setMyGlossary] = useState([]);
  const [Loading, setLoading] = useState(true);
  const [Refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    axios.get(`${Constants.manifest.extra.URL_API}/api/data/glossary?id=nipnew`).then((res) => {
      setMyGlossary(res.data.response);
      setLoading(false);
    });
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    axios.get(`${Constants.manifest.extra.URL_API}/api/data/glossary?id=nipnew`).then((res) => {
      setMyGlossary(res.data.response);
      setRefreshing(false);
    });
  };

  const handleReload = () => {
    setLoading(true);
    axios.get(`${Constants.manifest.extra.URL_API}/api/data/glossary?id=nipnew`).then((res) => {
      setMyGlossary(res.data.response);
      setLoading(false);
    });
  };

  return (
    <Layout style={styles.container} locate={LocateData}>
      {Loading ? <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Spinner size="large" style={{ borderColor: colors.primary }} /></Layout> : []}

      {!Loading
        ? (
          <FlatList
            data={MyGlossary}
            renderItem={({ item }) => <MyVocabList item={item} handleReload={handleReload} />}
            keyExtractor={(item) => item.id.toString()}
            refreshing={Refreshing}
            onRefresh={handleRefresh}
          />
        )
        : []}
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default MyVocab;
