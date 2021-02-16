import React, { useEffect } from "react";
import { View } from "react-native";
import { useSelector } from "react-redux";

import DefaultText from "../../components/DefaultText";
import HeaderRightButtons from "../../components/Buttons/HeaderRightButtons";
import HeaderLeftButtons from "../../components/Buttons/HeaderLeftButtons";
import ProductList from "../../components/Layout/ProductList";

const FavouriteProductScreen = (props) => {
  const favProducts = useSelector((state) => state.user.favouriteProducts);
  const cartQuantity = useSelector((state) => state.cart.cartQuantity);

  useEffect(() => {
    props.navigation.setParams({ cartQuant: cartQuantity });
  }, [cartQuantity]);

  if (favProducts.length === 0 || !favProducts) {
    return (
      <View>
        <DefaultText>WishList Empty</DefaultText>
      </View>
    );
  }
  return <ProductList listData={favProducts} navigation={props.navigation} />;
};

FavouriteProductScreen.navigationOptions = (data) => {
  const cartQuant = data.route.params?.cartQuant;
  const finalQuant = data.route.params?.cartQuant ?? cartQuant;

  return {
    headerLeft: () => <HeaderLeftButtons navigation={data.navigation} />,
    headerRight: () => (
      <HeaderRightButtons navigation={data.navigation} quantity={finalQuant} />
    ),
  };
};

export default FavouriteProductScreen;
