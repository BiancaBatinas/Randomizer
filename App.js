import { StyleSheet, Text, View } from "react-native";
import Header from "./components/Header";
import React, { useReducer, useState } from "react";
import StartGameScreen from "./screen/StartGameScreen";
import GameScreen from "./screen/GameScreen";
import GameOver from "./screen/GameOver";

export default function App() {
  const [userNumber, SetUserNumber] = useState();
  const [rounds, SetRounds] = useState(0);


  const startGame = (selectedNumber) => {
    SetUserNumber(selectedNumber);
  };

  const GameOverHandler = (round) => {
    SetRounds(round);
  };

  const restartGame = (start) => {
    SetRounds(0);
    SetUserNumber(null);
  };

  //preia numarul ales din start gamews
  //GameScreen preia nr ales din startgame
  let content = <StartGameScreen onStartGame={startGame} />;
  if (userNumber && rounds <= 0) { //trecem la GameScreen doar daca avem nr de la utilizator si nr de runde jucate este 0 
    content = (
      <GameScreen userChoise={userNumber} onGameOver={GameOverHandler} />// returneaza nr de la utilizator si rundele jucate
    );
  } else if (rounds > 0) { //daca nr de runde jucate e mai mare ca 0 atunci deja s a jucat
    content = (
      <GameOver
        number={rounds}
        userNumbers={userNumber}
        onRestart={restartGame}
      />
    );
  }

  return (
    <View style={styles.container}>
      <Header title="Randomizer" />
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});


