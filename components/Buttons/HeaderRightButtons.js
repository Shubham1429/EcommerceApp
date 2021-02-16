import React from "react";
import { StyleSheet, View } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { withBadge, Badge } from "react-native-elements";
import HeaderButton from "./HeaderButton";

const HeaderRightButtons = (props) => {
  const CartBadge = withBadge(props.quantity ? props.quantity : "0")(Item);

  return (
    <View style={styles.content}>
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Wishlist"
          iconName="heart-outline"
          onPress={() => {
            props.navigation.navigate("Favourites");
          }}
        />
      </HeaderButtons>
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        {props.quantity ? (
          <CartBadge
            title="Cart"
            iconName="cart-outline"
            onPress={() => {
              props.navigation.navigate("Cart");
            }}
          />
        ) : (
          <Item
            iconName="cart-outline"
            onPress={() => {
              props.navigation.navigate("Cart");
            }}
          />
        )}
      </HeaderButtons>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    flexDirection: "row",
    padding: 15,
  },
});

export default HeaderRightButtons;
