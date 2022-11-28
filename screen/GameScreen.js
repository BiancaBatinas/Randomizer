import React, { useState, ureRef, useRef, useEffect } from "react";
import { View, StyleSheet, TextInput, Text, Button, Alert } from "react-native";
import Summary from "../components/Summary";
import Card from "../components/Card";
import colors from "../components/constants/colors";

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
//mai jos preia ca date initiale un nr intre 1 si 100 dar exclude nr dat de utilizator
const GameScreen = (props) => {
  const [currentGues, SetCurrentGues] = useState(
    generateRandomNumber(1, 100, props.userChoise)
  );
  const [rounds, SetRounds] = useState(0);
  const currentLow = useRef(1);
  const currentGreater = useRef(100);
  const { userChoise, onGameOver } = props;

  useEffect(() => {
    if (currentGues === userChoise) {
      onGameOver(rounds);
    }
  }, [currentGues,userChoise,onGameOver]);

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
      currentLow.current = currentGues;
    }
    let nextNumber = generateRandomNumber(
      currentLow.current,
      currentGreater.current,
      currentGues
    );
    SetCurrentGues(nextNumber);
    SetRounds((rounds) => rounds + 1);
  };

  return (
    <View style={styles.screenContainer}>
      <Text>Opponent's guess</Text>
      <Summary number={currentGues} />
      <Card style={styles.buttonContainer}>
        <Button
          title="LOWER"
          onPress={nextNumberHandler.bind(this, "lower")}
          color={colors.primary}
        />
        <Button
          title="GREATER"
          onPress={nextNumberHandler.bind(this, "greater")}
          color={colors.primary}
        />
      </Card>
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
    width: 200,
    height: 110,
    justifyContent: "space-between",
  },
});
export default GameScreen;
