
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import colors from "./constants/colors";

const Header = (props) => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>{props.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 110,
    padding: 40,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },

  headerText: {
    color: 'black',
    fontSize: 18,
  },
});

export default Header;