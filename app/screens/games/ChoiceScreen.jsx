import React, { useState, useEffect } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, Modal,
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import colors from '../../constants/colors';
import CustomHeaderButton from '../../components/navigations/CustomHeaderButton';

const ChoiceScreen = (props) => {
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

  const choiceGenerator = (ans) => {
    let total = 0;
    const listOfChoice = [ans];
    while (total < 3) {
      const toCheck = questionList[Math.floor(Math.random() * questionList.length)].th;
      if (!listOfChoice.includes(toCheck)) {
        total += 1;
        listOfChoice.push(toCheck);
      }
    }
    return listOfChoice;
  };

  const nextQuestion = () => {
    if (problem < questionList.length - 1) {
      setProblem(problem + 1);
      setQuestionText(questionList[problem + 1].en);
      setAnswerChoice(shuffle(choiceGenerator(questionList[problem + 1].th)));
    } else {
      setScoreModal(true);
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
  const [questionText, setQuestionText] = useState(questionList[problem].en);
  const [answerChoice, setAnswerChoice] = useState(
    shuffle(choiceGenerator(questionList[problem].th)),
  );

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
            onPress={() => props.navigation.goBack()}
          >
            <Text style={styles.homeText}>Back To Home</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <TouchableOpacity style={styles.questionField}>
        <Text style={styles.questionText}>{questionText}</Text>
      </TouchableOpacity>

      <View style={styles.answerField}>
        {answerChoice.map((item) => (
          <TouchableOpacity
            key={item}
            onPress={() => {
              if (item === questionList[problem].th) {
                setScore(score + 1);
              }
              nextQuestion();
            }}
            style={styles.answerChoice}
          >
            <Text style={styles.answerText}>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    margin: 20,
  },
  questionField: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  questionText: {
    fontSize: 60,
    fontWeight: 'bold',
  },
  answerField: {
    flex: 1,
  },
  answerChoice: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
    width: 250,
    margin: 5,
    borderRadius: 10,
  },
  answerText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
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

export default ChoiceScreen;
