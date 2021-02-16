import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Colors from "../../constants/Colors";

import CartProducts from "./CartProducts";

const OrderItem = (props) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <View style={styles.orderItem}>
      <View style={styles.summary}>
        <Text style={styles.totalAmount}>₹{props.amount.toFixed(2)}</Text>
        <Text style={styles.date}>{props.date}</Text>
      </View>
      <TouchableOpacity activeOpacity={0.8}>
        <Button
          color={Colors.accentColor}
          title={showDetails ? "Hide Details" : "Show Details"}
          onPress={() => {
            setShowDetails((prevState) => !prevState);
          }}
        />
      </TouchableOpacity>

      {showDetails && (
        <View style={styles.details}>
          {props.items.map((cartItem) => (
            <CartProducts
              key={cartItem.productId}
              quantity={cartItem.quantity}
              price={cartItem.sum}
              title={cartItem.productTitle}
              image={cartItem.image}
            />
          ))}
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  orderItem: {
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "white",
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    margin: 20,
    padding: 10,
    alignItems: "center",
  },
  summary: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 15,
  },
  totalAmount: {
    fontFamily: "open-sans-bold",
    fontSize: 16,
  },
  date: {
    fontFamily: "open-sans",
    fontSize: 16,
    color: "#888",
  },
  details: {
    width: "100%",
    minHeight: 200,
    // marginLeft: 5,
    marginVertical: 5,
  },
});

export default OrderItem;
