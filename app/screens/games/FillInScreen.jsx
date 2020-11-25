import React, { useState, useEffect } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, Modal,
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { RFPercentage } from 'react-native-responsive-fontsize';
import colors from '../../constants/colors';
import CustomHeaderButton from '../../components/navigations/CustomHeaderButton';

const FillInScreen = (props) => {
  const { route } = props;
  const { data, VocabData } = route.params;

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

  const nextQuestion = () => {
    if (problem < questionList.length - 1) {
      setProblem(problem + 1);
      setQuestionText(questionList[problem + 1].th);
      setAnswerText((questionList[problem + 1].en.toUpperCase()).split(''));

      //   Game
      const [answerBox, hint, indexShow] = randomShow(questionList[problem + 1].en.toUpperCase());
      setAnswerShow([...answerBox]);
      setSaveHint([...hint]);
      setSaveIndexShow([...indexShow]);
      setCalIndexShow([...indexShow]);
      SetGuessList(guessRandom(questionList[problem + 1].en.toUpperCase(), [...indexShow]));
      setCheckGuessTouch(Array(9).fill(false));
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
    return [listToShow, listToShow, listIndexToShow];
  };

  const guessRandom = (item, listIndexToShow) => {
    const listNotShow = [];
    const listAlphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    let i; let j;
    for (i = 0; i < item.length; i++) {
      if (!listIndexToShow.includes(i)) listNotShow.push(item[i]);
    }
    while (listNotShow.length < 9) {
      listNotShow.push(listAlphabet[Math.floor(Math.random() * listAlphabet.length)]);
    }
    return shuffle(listNotShow);
  };

  const checkPosition = (item) => {
    let check = 0;
    while (item.sort().includes(check)) {
      check += 1;
    }
    calIndexShow.push(check);
    return check;
  };

  const checkAutoAnswer = (item) => {
    const copy = [...answerShow];
    const index = copy.indexOf('');
    if (index !== -1) copy[index] = item;
    if (calIndexShow.length === answerText.length) {
      if (copy.join('') === answerText.join('')) {
        setScore(score + 1);
        nextQuestion();
      }
    }
  };

  const questionList = VocabData;
  const [problem, setProblem] = useState(0);
  const [score, setScore] = useState(0);
  const [ScoreModal, setScoreModal] = useState(false);
  const [questionText, setQuestionText] = useState(questionList[problem].th);
  const [answerText, setAnswerText] = useState((questionList[problem].en.toUpperCase()).split(''));
  const [answerBox, hint, indexShow] = randomShow(questionList[problem].en.toUpperCase());
  const [answerShow, setAnswerShow] = useState([...answerBox]);
  const [saveHint, setSaveHint] = useState([...hint]);
  const [saveIndexShow, setSaveIndexShow] = useState([...indexShow]);
  const [calIndexShow, setCalIndexShow] = useState([...indexShow]);
  const [guessList, SetGuessList] = useState(
    problem !== 0 ? [] : guessRandom(questionList[problem].en.toUpperCase(), saveIndexShow),
  );
  const [checkGuessTouch, setCheckGuessTouch] = useState(Array(9).fill(false));

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

      <View style={styles.TopField}>
        <View style={styles.questionField}>
          <Text style={styles.questionText}>{questionText}</Text>
        </View>
        <View style={styles.answerField}>
          {answerShow.map((item, index) => (
            <View style={item !== '' ? styles.answerBoxEnable : styles.answerBoxDisable} key={`${item}${index}`}>
              <Text style={styles.answerText}>{item}</Text>
            </View>
          ))}
        </View>
        <View style={styles.toolField}>
          <TouchableOpacity style={styles.skipField} onPress={() => nextQuestion()}>
            <Text style={styles.toolText}>ข้าม</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.resetField}>
            <Text
              style={styles.toolText}
              onPress={() => {
                setAnswerShow([...saveHint]);
                setCalIndexShow([...saveIndexShow]);
                setCheckGuessTouch(Array(9).fill(false));
              }}
            >
              รีเซ็ท
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.bottomField}>
        {
        [guessList.slice(0, 3), guessList.slice(3, 6), guessList.slice(6, 9)].map((item, index) => (
          <View key={`${item}${index}`}>
            <TouchableOpacity
              style={checkGuessTouch[0] ? styles.guessBoxTouch : styles.guessBox}
              onPress={() => {
                if (calIndexShow.length < answerText.length && !checkGuessTouch[index * 3 + 0]) {
                  const pos = checkPosition(calIndexShow);
                  setAnswerShow(() => {
                    const markers = [...answerShow];
                    markers[pos] = item[0];
                    checkGuessTouch[index * 3 + 0] = true;
                    return markers;
                  });
                  checkAutoAnswer(item[0]);
                }
              }}
            >
              <Text style={styles.guessText}>{item[0]}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={checkGuessTouch[1] ? styles.guessBoxTouch : styles.guessBox}
              onPress={() => {
                if (calIndexShow.length < answerText.length && !checkGuessTouch[index * 3 + 1]) {
                  const pos = checkPosition(calIndexShow);
                  setAnswerShow(() => {
                    const markers = [...answerShow];
                    markers[pos] = item[1];
                    checkGuessTouch[index * 3 + 1] = true;
                    return markers;
                  });
                  checkAutoAnswer(item[1]);
                }
              }}
            >
              <Text style={styles.guessText}>{item[1]}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={checkGuessTouch[2] ? styles.guessBoxTouch : styles.guessBox}
              onPress={() => {
                if (calIndexShow.length < answerText.length && !checkGuessTouch[index * 3 + 2]) {
                  const pos = checkPosition(calIndexShow);
                  setAnswerShow(() => {
                    const markers = [...answerShow];
                    markers[pos] = item[2];
                    checkGuessTouch[index * 3 + 2] = true;
                    return markers;
                  });
                  checkAutoAnswer(item[2]);
                }
              }}
            >
              <Text style={styles.guessText}>{item[2]}</Text>
            </TouchableOpacity>
          </View>
        ))
        }
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
    justifyContent: 'space-around',
  },
  questionField: {
    flex: 0.35,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  questionText: {
    fontSize: RFPercentage(5),
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
    fontSize: RFPercentage(4),
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
  guessBoxTouch: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: 110,
    margin: 5,
    borderRadius: 10,
    backgroundColor: colors.primary,

    // opacity: 0.25,
  },
  guessText: {
    fontWeight: 'bold',
    fontSize: RFPercentage(4),
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
    fontSize: RFPercentage(3),
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
    fontSize: RFPercentage(10),
    fontWeight: 'bold',
    marginBottom: 25,
  },
  mSubTitleText: {
    fontSize: RFPercentage(3),
    fontWeight: 'bold',
  },
  mScoreText: {
    fontSize: RFPercentage(12),
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
    fontSize: RFPercentage(3),
    color: 'white',
  },
});

export default FillInScreen;
