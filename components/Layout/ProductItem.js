import React from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";

import DefaultText from "../DefaultText";
import Colors from "../../constants/Colors";

const { height, width } = Dimensions.get("window");

const ProductItem = (props) => {
  return (
    <View style={styles.productItem}>
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.item}
        onPress={props.onSelect}
      >
        <View style={styles.productHeader}>
          <Image source={{ uri: props.image }} style={styles.image} />
        </View>
        <View style={{ ...styles.productRow, ...styles.productBody }}>
          <DefaultText style={styles.title}>{props.title}</DefaultText>
          <DefaultText style={styles.price}>₹{props.price}</DefaultText>
          <View style={styles.Button}>{props.children}</View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  productItem: {
    flex: 1,
    overflow: "hidden",
    height: height / 2.5,
    margin: 4,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
  },
  item: {
    flex: 1,
  },
  productRow: {
    flexDirection: "column",
  },
  productHeader: {
    height: "60%",
  },
  productBody: {
    height: "40%",
    paddingHorizontal: 10,
  },
  image: {
    borderWidth: 0.5,
    width: "100%",
    height: "100%",
    borderRadius: 3,
  },
  title: {
    fontSize: 18,
  },
  price: {
    color: Colors.accentColor,
  },
  Button: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 15,
  },
});

export default ProductItem;
