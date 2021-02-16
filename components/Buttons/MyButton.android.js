import React from "react";
import { StyleSheet, Text, View, TouchableNativeFeedback } from "react-native";

const MyButton = (props) => {
  return (
    <TouchableNativeFeedback
      onPress={props.onPress}
      background={TouchableNativeFeedback.Ripple("#ccc", true)}
    >
      <View style={styles.buttonContainer}>
        <View style={styles.button}>
          <Text style={{ ...styles.buttonText, ...props.style }}>
            {props.children}
          </Text>
        </View>
      </View>
    </TouchableNativeFeedback>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    marginVertical: 3.5,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontFamily: "open-sans",
    fontSize: 18,
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",

    overflow: "hidden",
    width: "100%",
  },
});

export default MyButton;
