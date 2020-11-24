import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
} from 'react-native';
import { DeviceMotion } from 'expo-sensors';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { RFPercentage } from 'react-native-responsive-fontsize';
import CustomHeaderButton from '../../components/navigations/CustomHeaderButton';
import EvaIcon from '../../components/EvaIcon';
import colors from '../../constants/colors';

// screen status
// [1] waiting, [2] playing, [3] finish

const Charades = (props) => {
  const { route } = props;
  const { VocabData } = route.params;

  const [status, setStatus] = useState('waiting');
  const [displayText, setDisplayText] = useState('หันจอไปทางเพื่อน');
  const [displayTextSmall, setDisplayTextSmall] = useState('');
  const [check, setCheck] = useState(null);

  const [word, setWord] = useState(VocabData);

  useEffect(() => {
    props.navigation.setOptions({
      headerLeft: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title="Menu"
            iconName="ios-arrow-back"
            onPress={() => props.navigation.goBack()}
          />
        </HeaderButtons>
      ),
    });
  }, []);

  const skipWord = () => {
    try {
      setWord(word.slice(1));
      setDisplayText(word[0].en);
      setDisplayTextSmall(word[0].th);
    } catch (error) {
      setStatus('finish');
    }
  };

  const gameStart = (event) => {
    const getPosition = event.accelerationIncludingGravity;
    if (getPosition.z >= 6 && check !== 'pass') { setCheck('pass'); setDisplayText('ถูกต้อง'); setDisplayTextSmall(''); }
    if (getPosition.z <= -6 && check !== 'skip') { setCheck('skip'); setDisplayText('ข้าม'); setDisplayTextSmall(''); }
    if (getPosition.z > -6 && getPosition.z < 6 && check !== 'reset') { setCheck('reset'); skipWord(); }
    console.log(`z: ${getPosition.z}, ${check}, ${displayText}, ${status}`);
  };

  const checkDeviceRotate = (event) => {
    if (event.orientation === -90) {
      DeviceMotion.removeAllListeners();
      DeviceMotion.addListener(gameStart);
      DeviceMotion.setUpdateInterval(100);
    }
  };

  const addDeviceMotion = async () => {
    const isAvailable = await DeviceMotion.isAvailableAsync();
    if (isAvailable) {
      DeviceMotion.addListener(checkDeviceRotate);
      DeviceMotion.setUpdateInterval(100);
    }
  };

  const screenColor = (e) => {
    if (e === 'pass') return 'green';
    if (e === 'skip') return 'orange';
    return 'white';
  };

  const Content = () => {
    if (status === 'waiting') {
      return (
        <TouchableOpacity style={styles.button} onPress={() => setStatus('playing')}>
          <Text style={{ fontSize: RFPercentage(3) }}>
            <EvaIcon
              color="black"
              name="play-circle-outline"
              size={RFPercentage(3)}
            />
            {' '}
            เริ่มเกม
          </Text>
        </TouchableOpacity>
      );
    }
    if (status === 'playing') {
      addDeviceMotion();
      return (
        <View style={{ alignItems: 'center', ...styles.rotateText }}>
          <Text style={styles.textBig}>{displayText}</Text>
          <Text style={styles.textSmall}>{displayTextSmall}</Text>
        </View>
      );
    }
    if (status === 'finish') {
      DeviceMotion.removeAllListeners();
      return (
        <Text>จบเกม</Text>
      );
    }
    return null;
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: screenColor(check),
      justifyContent: 'center',
      alignItems: 'center',
    },
    rotateText: {
      transform: [{ rotate: '90deg' }],
    },
    textBig: {
      fontSize: RFPercentage(7),
    },
    textSmall: {
      fontSize: RFPercentage(4),
    },
    button: {
      backgroundColor: colors.secondary,
      padding: 10,
      borderRadius: 5,
    },
  });

  return (
    <View style={styles.container}>
      <Content />
    </View>
  );
};

export default Charades;
