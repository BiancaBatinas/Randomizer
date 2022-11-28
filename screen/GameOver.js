import React from "react";
import { StyleSheet, View, Text, Button } from "react-native";

const GameOver =(props) =>{
    return(
        <View style={styles.screen}>
            <Text> The game is over!</Text>
            <Text> Number of rounds: {props.number}</Text>
            <Text> Number was: {props.userNumbers}</Text>
            <Button title="Restart" onPress={props.onRestart}/>
        </View>
    );
};

const styles= StyleSheet.create({
    screen: {
        flrex: 1,
        justifyContent: 'center',
        alignItems: 'center',  
    },
});

export default GameOver;