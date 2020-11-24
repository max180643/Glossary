import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, Modal,
} from 'react-native';
import colors from '../../constants/colors';

const FlashCardScreen = (props) => {
  const nextQuestion = () => {
    if (problem < questionList.length - 1) {
      setTimeout(() => {
        setProblem(problem + 1);
        setQuestionBox(questionList[problem + 1].en);
      }, 1000);
      setQuestionBox(questionList[problem].th);
    } else {
      setQuestionBox(questionList[problem].th);
      setTimeout(() => { setScoreModal(true); }, 1000);
    }
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
  const [questionBox, setQuestionBox] = useState(questionList[problem].en);

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
      <TouchableOpacity
        style={[styles.questionField, styles.cardBox]}
        onPress={() => setQuestionBox(questionList[problem].th)}
      >
        <Text style={styles.questionText}>{questionBox}</Text>
      </TouchableOpacity>

      <View style={[styles.answerField]}>
        <TouchableOpacity
          style={styles.correctField}
          onPress={() => {
            setScore(score + 1);
            nextQuestion();
          }}
        >
          <Text style={styles.passText}>ตอบถูก</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.incorrectField} onPress={() => nextQuestion()}>
          <Text style={styles.passText}>ข้ามหรือตอบผิด</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
  },
  questionField: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  questionText: {
    fontSize: 50,
    fontWeight: 'bold',
  },
  answerField: {
    flex: 1,
  },
  answerText: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  cardBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderRadius: 5,
    borderColor: colors.primary,
    margin: 20,
    padding: 10,
    width: '80%',
    height: '20%',
  },
  correctField: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 20,
    width: 250,
    borderRadius: 10,
    backgroundColor: colors.correct,
  },
  incorrectField: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 20,
    width: 250,
    borderRadius: 10,
    backgroundColor: colors.incorrect,
  },
  passText: {
    fontSize: 20,
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
    backgroundColor: colors.primary,
    borderRadius: 10,
    marginTop: 20,
    padding: 10,
  },
  homeText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
});

export default FlashCardScreen;
