import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  ActivityIndicator,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { FlatList } from "react-native-gesture-handler";

import DefaultText from "../../components/DefaultText";
import HeaderRightButtons from "../../components/Buttons/HeaderRightButtons";
import CartProducts from "../../components/Layout/CartProducts";
import MyButton from "../../components/Buttons/MyButton";
import Colors from "../../constants/Colors";
import * as cartActions from "../../store/actions/actions";
import * as ordersAction from "../../store/actions/orderActions";

const CartScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);

  const cartTotal = useSelector((state) => state.cart.totalAmount);
  const cartQuantity = useSelector((state) => state.cart.cartQuantity);
  const cartItems = useSelector((state) => {
    const transformedCart = [];
    for (const key in state.cart.items) {
      transformedCart.push({
        productId: key,
        productTitle: state.cart.items[key].productTitle,
        productPrice: state.cart.items[key].productPrice,
        image: state.cart.items[key].image,
        quantity: state.cart.items[key].quantity,
        sum: state.cart.items[key].sum,
      });
    }
    return transformedCart.sort((a, b) => (a.productId > b.productId ? 1 : -1));
  });

  const dispatch = useDispatch();

  useEffect(() => {
    props.navigation.setParams({ cartQuant: cartQuantity });
  }, [cartQuantity]);

  const sendOrderHandler = async () => {
    setIsLoading(true);
    await dispatch(ordersAction.addOrder(cartItems, cartTotal));
    setIsLoading(false);
  };

  if (cartItems.length === 0 || !cartItems) {
    return (
      <View style={styles.screenEmpty}>
        <DefaultText>Looks like your Cart is empty!!!</DefaultText>
        <Button
          title="Shop More"
          color={Colors.heartColor}
          onPress={() => {
            props.navigation.navigate("Welcome");
          }}
        />
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <View style={styles.container}>
        <FlatList
          data={cartItems}
          keyExtractor={(item) => item.productId}
          renderItem={(itemData) => (
            <CartProducts
              quantity={itemData.item.quantity}
              title={itemData.item.productTitle}
              image={itemData.item.image}
              price={itemData.item.sum}
              deletable
              onRemove={() => {
                dispatch(cartActions.removeFromCart(itemData.item.productId));
              }}
            />
          )}
        />
      </View>

      {isLoading ? (
        <ActivityIndicator size="small" color={Colors.textPrimary} />
      ) : (
        <View style={styles.cartButton}>
          <View>
            <MyButton onPress={sendOrderHandler}>
              <Text style={styles.cartStyle}>
                Cart Total :{" "}
                <Text>{Math.round((cartTotal.toFixed(2) * 100) / 100)}</Text>
              </Text>
            </MyButton>
          </View>
          <View style={styles.text}>
            <DefaultText style={styles.clickStyle}>
              ( Click to Buy )
            </DefaultText>
          </View>
        </View>
      )}
    </View>
  );
};

CartScreen.navigationOptions = (data) => {
  const cartQuant = data.route.params?.cartQuant;
  const finalQuant = data.route.params?.cartQuant ?? cartQuant;

  return {
    headerTitle: "Your Cart",
    headerRight: () => (
      <HeaderRightButtons navigation={data.navigation} quantity={finalQuant} />
    ),
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  screenEmpty: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
  },
  cartStyle: {
    textTransform: "uppercase",
    fontSize: 15,
    fontWeight: "bold",
  },
  cartButton: {
    backgroundColor: Colors.green,
  },
  text: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: -20,
  },
  clickStyle: {
    color: "white",
    fontSize: 10,
  },
});

export default CartScreen;
