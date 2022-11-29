import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  Alert
} from "react-native";
import Card from "../components/Card.js";
import colors from "../components/constants/colors.js";
import Input from "../components/Input.js";
import Summary from "../components/Summary.js";
import BodyText from "../components/BodyText.js";
import ButtonMain from "../components/ButtonMain.js";

const StartGameScreen = (props) => {
  const [enteretValue, setEnteredValue] = useState(" ");
  const [confirmed, setConfirmed] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState();
  const numberInputHadler = (inputText) => {
    setEnteredValue(inputText.replace(/[^0-9]/g, "")); ///o sa inlocuiasca orice nu e numar (global)
    //cu un string gol
  };
  const resetInputHandler = () =>
  {
      setEnteredValue(""); //sterge input-ul
      setConfirmed(false);  //daca apasa reset atunci nu incepe jocul deci nu e confirmat
  };

  const confirmInputHandler = () => {
    const choseNum = parseInt(enteretValue);
    if(choseNum ===NaN || choseNum <=0 || choseNum >=99)
    {
      Alert.alert('Invalid number','Number has to be between 1-99', [{text:'Okay', style:'destructive', onPress:resetInputHandler}]);
      return; //daca nu indeplineste conditiile
    }
      setConfirmed(true); //intreaba daca e sigur ca incepe jocul
      setEnteredValue(""); // sterge input ul
      setSelectedNumber(choseNum);
  };

  let confirmedOutput;
  if(confirmed) {
    confirmedOutput = <Card style ={styles.comfirmedView}>

      <Text style={{marginHorizontal: 20}}>Chosen Number: </Text>  
      <View style={styles.confirmedContainer}>
        <Summary  number={selectedNumber}/>
      <ButtonMain onPress={()=>props.onStartGame(selectedNumber)}>START GAME</ButtonMain>
      </View>
       
    </Card>
  }
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={styles.screen}>
        <Text style={styles.title}>Start a new game!</Text>
        <Card style={styles.inputContainer}>
         
          <BodyText>Select a number</BodyText>
          <Input
            style={styles.input}
            blurOnSubmit
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="numeric"
            maxLength={2}
            onChangeText={numberInputHadler}
            value={enteretValue}
          />
          <View style={styles.buttonContainer}>
            <View style={styles.button}>
              <Button title="Reset" onPress={resetInputHandler} color={colors.primary} />
            </View>
            <View style={styles.button}>
              <Button
                title="Confirm"
                onPress={confirmInputHandler}
                color={colors.accent}
              />
            </View>
          </View>
        </Card>
        {confirmedOutput}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    marginVertical: 10, 
   
  },
  inputContainer: {
    width: 300,
    maxWidth: "80%",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  button: {
    width: 90,
  },
  input: {
    width: 110,
    textAlign: "center",
  },
  comfirmedView: {
   marginTop: 25,
    width: 200,
  },  
  confirmedContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
export default StartGameScreen;
