import React from "react";
import { View, StyleSheet, TextInput,Text } from "react-native";
import colors from "./constants/colors";

const Summary = (props) => {
  return <View style={styles.SummaryContainer}>
    <Text style={styles.summaryText}>{props.number}</Text>
  </View>;
};

const styles = StyleSheet.create({
  SummaryContainer: {
    width: 60,
    height: 50,
    borderWidth: 1,
    borderColor: colors.primary,
    marginVertical: 10,
    borderRadius: 5,
    
  },
  summaryText: {
    textAlign: 'center',
    marginVertical: 10,
    fontSize: 15,
    color: colors.primary,
  },
});
export default Summary;
