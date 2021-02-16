import React from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import Icons from "@expo/vector-icons/AntDesign";

import DefaultText from "../DefaultText";

const { height } = Dimensions.get("window");

const CartProducts = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: props.image }} style={styles.image} />
      </View>
      <View style={styles.infoContainer}>
        <View style={{ flex: 1 }}>
          <View style={styles.titleContainer}>
            <DefaultText style={styles.title}>{props.title}</DefaultText>
          </View>

          <View style={styles.innerContainer}>
            <View style={styles.dataContainer}>
              <DefaultText style={styles.text}>Price -</DefaultText>
              <View style={styles.textStyle}>
                <DefaultText style={styles.textInner}>
                  ₹ {props.price.toFixed(2)}
                </DefaultText>
              </View>
            </View>
            <View style={styles.dataContainer}>
              <DefaultText style={styles.text}>Quantity - </DefaultText>
              <View style={styles.textStyle}>
                <DefaultText style={styles.textInner}>
                  {props.quantity}
                </DefaultText>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          {props.deletable && (
            <TouchableOpacity activeOpacity={0.2} onPress={props.onRemove}>
              <View style={styles.button}>
                <Icons name="delete" size={22} />
              </View>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    borderColor: "#ccc",
    borderWidth: 1,
    elevation: 4,
    overflow: "hidden",
    marginVertical: 10,
    height: height / 3.5,
    width: "90%",
    marginHorizontal: 15,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
  },
  imageContainer: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 6,
    width: "65%",
  },
  image: {
    height: "100%",
    width: "90%",
    borderRadius: 10,
    borderColor: "#ccc",
    borderWidth: 1,
  },
  infoContainer: {
    marginVertical: 15,
    width: "40%",
    padding: 5,
    borderRadius: 5,
    flexDirection: "column",
    justifyContent: "flex-end",
  },
  titleContainer: {
    backgroundColor: "#f2f2f2",
    borderRadius: 5,
    marginRight: 5,
    width: "90%",
  },
  title: {
    textAlign: "center",

    fontFamily: "open-sans-bold",
    fontSize: 15,
  },
  innerContainer: {
    marginTop: 10,
    flexDirection: "column",
  },
  dataContainer: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  text: {
    fontSize: 14,
    fontWeight: "bold",
  },
  textInner: {
    fontSize: 11,
  },
  buttonContainer: {
    overflow: "hidden",
    backgroundColor: "#ff6666",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  button: {
    paddingVertical: 5,
    paddingHorizontal: 30,
    marginVertical: 5,
  },
  textStyle: {
    borderColor: "#ccc",
    borderWidth: 1,
    backgroundColor: "#f2f2f2",
    elevation: 5,
    borderRadius: 5,
  },
});

export default CartProducts;
