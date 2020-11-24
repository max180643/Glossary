import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, Modal,
} from 'react-native';
import colors from '../../constants/colors';

const FillInScreen = (props) => {
  const shuffle = (item) => {
    let i; let j; let c;
    for (i = item.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      c = item[i];
      item[i] = item[j];
      item[j] = c;
    }
    return item;
  };

  const nextQuestion = () => {
    if (problem < questionList.length - 1) {
      setProblem(problem + 1);
      setQuestionText(questionList[problem + 1].th);
      setAnswerText((questionList[problem + 1].en.toUpperCase()).split(''));
      setAnswerShow(randomShow(questionList[problem + 1].en.toUpperCase()));
    } else {
      setScoreModal(true);
    }
  };

  const randomShow = (item) => {
    const maxLength = item.length;
    const toShow = Math.ceil(maxLength * 0.3);
    const listToShow = Array(maxLength).fill('');
    const listIndexToShow = [];
    let i;
    while (listIndexToShow.length < toShow) {
      i = Math.floor(Math.random() * maxLength);
      if (!listIndexToShow.includes(i)) {
        listIndexToShow.push(i);
        listToShow[i] = item[i];
      }
    }
    return listToShow;
  };

  const questionList = [
    {
      en: 'Cat', th: 'แมว',
    },
    {
      en: 'Dog', th: 'หมา',
    },
    {
      en: 'Bird', th: 'นก',
    },
    {
      en: 'Chair', th: 'เก้าอี้',
    },
    {
      en: 'Tree', th: 'ต้นไม้',
    },
  ];

  const [problem, setProblem] = useState(0);
  const [score, setScore] = useState(0);
  const [ScoreModal, setScoreModal] = useState(false);
  const [questionText, setQuestionText] = useState(questionList[problem].th);
  const [answerText, setAnswerText] = useState((questionList[problem].en.toUpperCase()).split(''));
  const [answerShow, setAnswerShow] = useState(randomShow(questionList[problem].en.toUpperCase()));

  return (
    <View style={styles.screen}>
      <Modal
        animationType="slide"
        transparent
        visible={ScoreModal}
      >
        <View style={styles.scoreModal}>
          <Text style={styles.mTitleText}>Congrat</Text>
          <Text style={styles.mSubTitleText}>Your Score</Text>
          <Text style={styles.mScoreText}>
            {score}
            /5
          </Text>
          <TouchableOpacity
            style={styles.homeButton}

            // onPress={() => props.navigation.navigate('Home')}
          >
            <Text style={styles.homeText}>Back To Home</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <View style={styles.TopField}>
        <View style={styles.questionField}>
          <Text style={styles.questionText}>{questionText}</Text>
        </View>
        <View style={styles.answerField}>
          {answerShow.map((item) => (
            <View style={item !== '' ? styles.answerBoxEnable : styles.answerBoxDisable}>
              <Text style={styles.answerText}>{item}</Text>
            </View>
          ))}
        </View>
        <View style={styles.toolField}>
          <TouchableOpacity style={styles.skipField} onPress={() => nextQuestion()}>
            <Text style={styles.toolText}>ข้าม</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.resetField}>
            <Text style={styles.toolText}>รีเซ็ท</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.bottomField}>
        <View>
          <TouchableOpacity style={styles.guessBox}><Text style={styles.guessText}>C</Text></TouchableOpacity>
          <TouchableOpacity style={styles.guessBox}><Text style={styles.guessText}>K</Text></TouchableOpacity>
          <TouchableOpacity style={styles.guessBox}><Text style={styles.guessText}>B</Text></TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity style={styles.guessBox}><Text style={styles.guessText}>A</Text></TouchableOpacity>
          <TouchableOpacity style={styles.guessBox}><Text style={styles.guessText}>T</Text></TouchableOpacity>
          <TouchableOpacity style={styles.guessBox}><Text style={styles.guessText}>Z</Text></TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity style={styles.guessBox}><Text style={styles.guessText}>B</Text></TouchableOpacity>
          <TouchableOpacity style={styles.guessBox}><Text style={styles.guessText}>D</Text></TouchableOpacity>
          <TouchableOpacity style={styles.guessBox}><Text style={styles.guessText}>E</Text></TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    margin: 20,
  },
  topField: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomField: {
    flex: 1,
    flexDirection: 'row',
    marginTop: -75,
  },
  questionField: {
    flex: 0.35,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  questionText: {
    fontSize: 60,
    fontWeight: 'bold',
  },
  answerField: {
    flex: 0.15,
    flexDirection: 'row',
    width: 350,
  },
  answerBoxEnable: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 2,
    borderRadius: 10,
    backgroundColor: colors.boxFilled,
  },
  answerBoxDisable: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 2,
    borderRadius: 10,
    backgroundColor: colors.boxUnFilled,
  },
  answerText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'white',
  },
  guessBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: 110,
    margin: 5,
    borderRadius: 10,
    backgroundColor: colors.primary,
  },
  guessText: {
    fontWeight: 'bold',
    fontSize: 25,
    color: 'white',
  },
  toolField: {
    flex: 0.15,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  skipField: {
    flex: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: colors.toolSkip,
  },
  resetField: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: colors.toolReset,
  },
  toolText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white',
  },
  scoreModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  mTitleText: {
    fontSize: 70,
    fontWeight: 'bold',
    marginBottom: 25,
  },
  mSubTitleText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  mScoreText: {
    fontSize: 80,
    fontWeight: 'bold',
  },
  homeButton: {
    borderRadius: 10,
    marginTop: 20,
    padding: 10,
    backgroundColor: colors.primary,
  },
  homeText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'white',
  },
});

export default FillInScreen;
