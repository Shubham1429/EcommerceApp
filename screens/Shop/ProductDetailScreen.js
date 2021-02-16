import React, { useCallback, useEffect } from "react";
import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useDispatch, useSelector } from "react-redux";
import * as Animatable from "react-native-animatable";
import Icon from "@expo/vector-icons/AntDesign";
import { withBadge } from "react-native-elements";

import { setFav } from "../../store/actions/actions";
import * as cartActions from "../../store/actions/actions";
import Colors from "../../constants/Colors";
import DefaultText from "../../components/DefaultText";
import MyButton from "../../components/Buttons/MyButton";
import HeaderButton from "../../components/Buttons/HeaderButton";

const { height, width } = Dimensions.get("window");
const AnimatedIcon = Animatable.createAnimatableComponent(Icon);
let handledAnimation;

const ProductDetailScreen = (props) => {
  const cartQuantity = useSelector((state) => state.cart.cartQuantity);
  const prodId = props.route.params?.params.productId;
  const selectedProduct = useSelector((state) =>
    state.user.availableProducts.find((prod) => prod.id === prodId)
  );

  const currentFav = useSelector((state) =>
    state.user.favouriteProducts.some((prod) => prod.id === prodId)
  );

  const toggleFavourite = props.route.params?.setFav;

  const dispatch = useDispatch();

  useEffect(() => {
    props.navigation.setParams({ cart: cartQuantity });
  }, [cartQuantity]);

  // const isFavourite = props.route.params?.isFav;
  // const isMarked = props.route.params.isFav ?? isFavourite;

  const animateIcon = () => {
    handledAnimation.stopAnimation();

    if (currentFav) {
      handledAnimation.pulse(300);
    } else {
      handledAnimation.bounceIn();
    }
  };

  const toggleHandler = useCallback(() => {
    animateIcon();
    handledAnimation.bounceIn();
    dispatch(setFav(prodId));
  }, [dispatch, prodId]);

  useEffect(() => {
    props.navigation.setParams({ setFav: toggleHandler });
  }, [setFav]);

  return (
    <View style={styles.screen}>
      <View style={styles.bodyContainer}>
        <ScrollView>
          <View>
            <ImageBackground
              source={{ uri: selectedProduct.imageUrl }}
              style={styles.img}
            >
              <View style={styles.favButton}>
                <TouchableOpacity activeOpacity={1} onPress={toggleFavourite}>
                  <AnimatedIcon
                    ref={(animation) => (handledAnimation = animation)}
                    name={currentFav ? "heart" : "hearto"}
                    color={currentFav ? Colors.heartColor : Colors.textPrimary}
                    size={24}
                  />
                </TouchableOpacity>
              </View>
            </ImageBackground>
          </View>
          <View style={styles.body}>
            <Text style={styles.title}>{selectedProduct.title}</Text>
            <DefaultText style={styles.price}>
              ₹{selectedProduct.price}
            </DefaultText>
            <View style={styles.desContainer}>
              <DefaultText style={styles.desc}>
                {selectedProduct.description}
              </DefaultText>
            </View>
          </View>
        </ScrollView>
      </View>
      <View style={styles.buttonContainer}>
        <MyButton
          onPress={() => {
            dispatch(cartActions.addToCart(selectedProduct));
          }}
        >
          <Text style={styles.buttonText}>Add To Cart</Text>
        </MyButton>
      </View>
    </View>
  );
};

ProductDetailScreen.navigationOptions = (data) => {
  const prodTitle = data.route.params?.params.productTitle;
  const title = data.route.params?.params.productTitle ?? prodTitle;
  const cartQuant = data.route.params?.cart;
  const finalQuant = data.route.params?.cart ?? cartQuant;
  const CartBadge = withBadge(finalQuant ? finalQuant : "0")(Item);

  return {
    headerTitle: title,
    headerRight: () => (
      <View style={styles.cartBadge}>
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          {finalQuant ? (
            <CartBadge
              title="Cart"
              iconName="cart-outline"
              onPress={() => {
                data.navigation.navigate("Cart");
              }}
            />
          ) : (
            <Item
              iconName="cart-outline"
              onPress={() => {
                data.navigation.navigate("Cart");
              }}
            />
          )}
        </HeaderButtons>
      </View>
    ),
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },

  bodyContainer: {
    flex: 1,
  },
  title: {
    padding: 10,
    paddingLeft: 20,
    marginVertical: 10,
    fontFamily: "open-sans-bold",
    fontSize: 20,
    textTransform: "uppercase",
    color: "#333333",
  },
  desContainer: {
    marginVertical: 10,
    padding: 10,
    paddingLeft: 20,
    backgroundColor: "#e6e6e6",
  },
  desc: {
    fontSize: 13,
  },
  body: {
    borderTopColor: "#ccc",
    borderTopWidth: 1,
  },
  img: {
    width: width,
    height: height / 2,
  },
  price: {
    paddingLeft: 20,

    fontSize: 20,
    color: Colors.accentColor,
  },
  buttonText: {
    textTransform: "uppercase",
    fontSize: 15,
  },
  buttonContainer: {
    backgroundColor: Colors.accentColor,
  },
  favContainer: {
    marginVertical: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  favText: {
    textTransform: "uppercase",
  },
  favButton: {
    justifyContent: "flex-start",
    alignItems: "flex-end",
    padding: 10,
    marginRight: 10,
  },
  cartBadge: {
    marginRight: 15,
  },
});

export default ProductDetailScreen;
