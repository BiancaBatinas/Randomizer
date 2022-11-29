import React, { useState, ureRef, useRef, useEffect } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  Button,
  Alert,
  ScrollView,
  FlatList,
} from "react-native";
import Summary from "../components/Summary";
import Card from "../components/Card";
import colors from "../components/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import ButtonMain from "../components/ButtonMain";

const generateRandomNumber = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.ceil(max);
  const rndNum = Math.floor(Math.random() * (max - min) + min);
  if (rndNum == exclude) {
    return generateRandomNumber(min, max, exclude);
  } else {
    return rndNum;
  }
};
const renderList = (value, numOfRound) => (
  <View key={value} style={styles.listItem}>
    <Text>#{numOfRound}</Text>
    <Text>{value}</Text>
  </View>
);

//mai jos preia ca date initiale un nr intre 1 si 100 dar exclude nr dat de utilizator
const GameScreen = (props) => {
  const initialGuess = generateRandomNumber(1, 100, props.userChoise);
  const [currentGues, SetCurrentGues] = useState(initialGuess);
  const [rounds, SetRounds] = useState([initialGuess]);
  const currentLow = useRef(1);
  const currentGreater = useRef(100);
  const { userChoise, onGameOver } = props;

  useEffect(() => {
    if (currentGues === userChoise) {
      onGameOver(rounds.length);
    }
  }, [currentGues, userChoise, onGameOver]);

  //legam functia de butoane prin bind
  const nextNumberHandler = (modificari) => {
    //daca am apasat butonul lower si numarul ales de PC este mai mic decat cel ales de user
    if (
      (modificari === "lower" && currentGues < props.userChoise) ||
      (modificari === "greater" && currentGues > props.userChoise)
    ) {
      Alert.alert("Liar!", "Your choise is wrong!", [
        { text: "Sorry", style: "cancel" },
      ]);
      return;
    }

    if (modificari === "lower") {
      currentGreater.current = currentGues;
    } else {
      currentLow.current = currentGues + 1;
    }
    let nextNumber = generateRandomNumber(
      currentLow.current,
      currentGreater.current,
      currentGues
    );
    SetCurrentGues(nextNumber);
    //SetRounds((rounds) => rounds + 1);
    SetRounds((curPastGuess) => [nextNumber, ...curPastGuess]);
  };

  return (
    <View style={styles.screenContainer}>
      <Text>Opponent's guess</Text>
      <Summary number={currentGues} />
      <Card style={styles.buttonContainer}>
        <ButtonMain onPress={nextNumberHandler.bind(this, "lower")}>
          <Ionicons name="md-remove" size={24} color="white" />{" "}
        </ButtonMain>
        <ButtonMain onPress={nextNumberHandler.bind(this, "greater")}>
          <Ionicons name="md-add" size={24} color="white" />{" "}
        </ButtonMain>
      </Card>
      <View style={styles.listStyle}>
      <ScrollView contentContainerStyle={styles.list}>{rounds.map((guess,index) => renderList(guess, rounds.length - index))}</ScrollView>
      </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    width: 250,
    height: 110,
    justifyContent: "space-between",
  },
  listItem: {
    borderColor: "#ccc",
    padding: 15,
    marginVertical: 10,
    backgroundColor: "white",
    borderWidth: 1,
    flexDirection: "row",
    borderRadius: 5,
    justifyContent: 'space-between'
  },
  listStyle: {
    width: '60%',
    flex: 1
  },
  list: {
    justifyContent: 'flex-end'
  }
 
});
export default GameScreen;
