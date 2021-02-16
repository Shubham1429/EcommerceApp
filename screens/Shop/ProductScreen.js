import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  ActivityIndicator,
  Button,
  RefreshControl,
  StyleSheet,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { ScrollView } from "react-native-gesture-handler";

import ProductList from "../../components/Layout/ProductList";
import HeaderRightButtons from "../../components/Buttons/HeaderRightButtons";
import DefaultText from "../../components/DefaultText";
import * as productActions from "../../store/actions/products";
import Colors from "../../constants/Colors";

const ProductScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const prodId = props.route.params?.params.productId;
  const token = props.route.params?.params.token;

  const availableProducts = useSelector(
    (state) => state.user.availableProducts
  );

  const displayedProducts = availableProducts.filter(
    (prod) => prod.categoryId.indexOf(prodId) >= 0
  );
  const cartQuantity = useSelector((state) => state.cart.cartQuantity);

  useEffect(() => {
    props.navigation.setParams({ cartQuant: cartQuantity });
  }, [cartQuantity]);

  const dispatch = useDispatch();

  const loadProducts = useCallback(async () => {
    setError(null);
    setIsRefreshing(true);
    try {
      await dispatch(productActions.fetchProducts(token));
    } catch (err) {
      setError(err.message);
    }
    setIsRefreshing(false);
  }, [dispatch, setIsLoading, setError]);

  useEffect(() => {
    const willFocusSub = props.navigation.addListener(
      "willFocus",
      loadProducts
    );

    return () => {
      willFocusSub;
    };
  }, [loadProducts]);

  useEffect(() => {
    setIsLoading(true);
    loadProducts().then(() => {
      setIsLoading(false);
    });
  }, [dispatch, loadProducts]);

  if (error) {
    return (
      <View style={styles.centered}>
        <DefaultText>An Error Occured!!</DefaultText>
        <DefaultText>Please try again later :D</DefaultText>
        <Button
          title="Try Again"
          onPress={loadProducts}
          color={Colors.accentColor}
        />
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.heartColor} />
      </View>
    );
  }

  if (!isLoading && displayedProducts.length === 0) {
    return (
      <View style={styles.centered}>
        <DefaultText>No Products found!!!</DefaultText>
        <DefaultText>Please start adding some :D</DefaultText>
      </View>
    );
  }
  return (
    <ScrollView
      refreshControl={
        <RefreshControl onRefresh={loadProducts} refreshing={isRefreshing} />
      }
    >
      <ProductList listData={displayedProducts} navigation={props.navigation} />
    </ScrollView>
  );
};

ProductScreen.navigationOptions = (data) => {
  const title = data.route.params?.params.categoryTitle;
  const cartQuant = data.route.params?.cartQuant;
  const finalQuant = data.route.params?.cartQuant ?? cartQuant;

  return {
    headerTitle: title,
    headerRight: () => (
      <HeaderRightButtons navigation={data.navigation} quantity={finalQuant} />
    ),
  };
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ProductScreen;
