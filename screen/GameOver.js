import React from "react";
import { StyleSheet, View, Text, Button, Image } from "react-native";
import colors from "../components/constants/colors";
import ButtonMain from "../components/ButtonMain";
const GameOver = (props) => {
  return (
    <View style={styles.screen}>
      <Text style={{  fontSize: 20 }}> The game is over!</Text>
      <View style={styles.imageContainer}>
        <Image
          resizeMode="cover"
          style={styles.imagestyle}
          source={require("../assets/success.png")}
        />
      </View>
      <View style={styles.secondPart}>
        <Text style={{  fontSize: 15 }}>
          Number of rounds: 
          <Text style={{ color: "red", fontSize: 15 }}>{props.number}</Text>
        </Text>
        <Text  style={{  fontSize: 15 }}>
          Number was: 
          <Text style={{ color: "red", fontSize: 15 }}>
            {props.userNumbers}
          </Text>
        </Text>
        <View style={styles.button}>
        <ButtonMain onPress={props.onRestart}>Restart</ButtonMain>
        
        </View>
      
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "column",
    marginVertical: 50,
  },
  imagestyle: {
    width: "100%",
    height: "100%",
  },
  imageContainer: {
    width: "80%",
    height: 300,
    borderRadius: 200,
    borderWidth: 2,
    borderColor: "black",
    overflow: "hidden",
    marginVertical: 30,
  },
  secondPart: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',

  },
  button: {
    padding: 20,
    
  },
});

export default GameOver;
