import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
} from 'react-native';
import { DeviceMotion } from 'expo-sensors';

// screen status
// [1] waiting, [2] playing, [3] finish

const Charades = () => {
  const [status, setStatus] = useState('waiting');
  const [displayText, setDisplayText] = useState('หันจอไปทางเพื่อน');
  const [check, setCheck] = useState(null);

  const [word, setWord] = useState(['1', '2', '3', '4', '5', '6', '7']);

  const skipWord = () => {
    setWord(word.slice(1));
    setDisplayText(word[0]);
  };

  const gameStart = (event) => {
    const getPosition = event.accelerationIncludingGravity;
    if (getPosition.z >= 6 && check !== 'pass') { setCheck('pass'); setDisplayText('ถูกต้อง'); }
    if (getPosition.z <= -6 && check !== 'skip') { setCheck('skip'); setDisplayText('ข้าม'); }
    if (getPosition.z > -6 && getPosition.z < 6 && check !== 'reset') { setCheck('reset'); skipWord(); }
    console.log(`z: ${getPosition.z}, ${check}, ${displayText}`);
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
    return 'pink';
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: screenColor(check),
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      fontSize: 50,
      transform: [{ rotate: '90deg' }],
    },
    button: {
      backgroundColor: 'white',
      padding: 10,
    },
  });

  const Content = () => {
    if (status === 'waiting') {
      return (
        <TouchableOpacity style={styles.button} onPress={() => setStatus('playing')}>
          <Text>เริ่มเกม</Text>
        </TouchableOpacity>
      );
    }
    if (status === 'playing') {
      addDeviceMotion();
      return (
        <Text style={styles.text}>{displayText}</Text>
      );
    }
    if (status === 'finish') {
      return (
        <Text>จบเกม</Text>
      );
    }
    return null;
  };

  return (
    <View style={styles.container}>
      <Content />
    </View>
  );
};

export default Charades;
