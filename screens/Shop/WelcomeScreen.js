import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import WelcomeLayout from "../../components/Layout/WelcomeLayout";
import HeaderRightButtons from "../../components/Buttons/HeaderRightButtons";
import HeaderLeftButtons from "../../components/Buttons/HeaderLeftButtons";

const ShopScreen = (props) => {
  const cartQuantity = useSelector((state) => state.cart.cartQuantity);

  useEffect(() => {
    props.navigation.setParams({ cartQuant: cartQuantity });
  }, [cartQuantity]);

  return <WelcomeLayout navigation={props.navigation} />;
};

ShopScreen.navigationOptions = (data) => {
  const cartQuant = data.route.params?.cartQuant;
  const finalQuant = data.route.params?.cartQuant ?? cartQuant;

  return {
    headerLeft: () => <HeaderLeftButtons navigation={data.navigation} />,
    headerRight: () => (
      <HeaderRightButtons navigation={data.navigation} quantity={finalQuant} />
    ),
  };
};

export default ShopScreen;
