import React, { useEffect, useState, useCallback } from "react";
import {
  FlatList,
  Button,
  Alert,
  StyleSheet,
  View,
  Platform,
  ActivityIndicator,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import HeaderButton from "../../components/Buttons/HeaderButton";
import HeaderLeftButtons from "../../components/Buttons/HeaderLeftButtons";
import Colors from "../../constants/Colors";
import ProductItem from "../../components/Layout/ProductItem";
import * as productActions from "../../store/actions/products";
import DefaultText from "../../components/DefaultText";
const AddProductScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const catId = props.route.params?.categoryId;
  const catToken = props.route.params?.token;

  const dispatch = useDispatch();

  const availableProducts = useSelector(
    (state) => state.user.availableProducts
  );

  const userProducts = useSelector((state) => state.user.userProducts);

  const editProductHandler = (id, catId, catToken) => {
    props.navigation.navigate("Edit", {
      productId: id,
      categoryId: catId,
      categoryToken: catToken,
    });
  };

  useEffect(() => {
    props.navigation.setParams({ categoryId: catId });
  }, [catId]);

  const loadProducts = useCallback(async () => {
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(productActions.fetchProducts(catToken));
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  }, [dispatch, setError, setIsLoading]);

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
    loadProducts();
  }, [dispatch, loadProducts]);

  const deleteHandler = (id, token) => {
    Alert.alert("Are you sure?", "Do you really want to delete this item?", [
      { text: "No", style: "default" },
      {
        text: "Yes",
        style: "destructive",
        onPress: () => {
          dispatch(productActions.deleteProduct(id, token));
        },
      },
    ]);
  };

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

  if (!isLoading && availableProducts.length === 0) {
    return (
      <View style={styles.centered}>
        <DefaultText>No Products found!!!</DefaultText>
        <DefaultText>Please start adding some :D</DefaultText>
      </View>
    );
  }

  return (
    <FlatList
      data={availableProducts}
      keyExtractor={(item, index) => {
        return item.id;
      }}
      renderItem={(itemData) => (
        <ProductItem
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onSelect={() => {
            editProductHandler(itemData.item.id, catId, catToken);
          }}
        >
          <Button
            color={Colors.green}
            title="Edit"
            onPress={() => {
              editProductHandler(itemData.item.id, catToken);
            }}
          />
          <Button
            color={Colors.heartColor}
            title="Delete"
            onPress={() => {
              deleteHandler(itemData.item.id, catToken);
            }}
          />
        </ProductItem>
      )}
    />
  );
};

AddProductScreen.navigationOptions = (data) => {
  const catId = data.route.params?.categoryId;
  const categoryId = data.route.params?.catId ?? catId;

  const catToken = data.route.params?.token;
  const categoryToken = data.route.params?.catToken ?? catToken;

  return {
    headerTitle: "Your Products",
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Add"
          iconName={
            Platform.OS === "android"
              ? "pencil-circle-outline"
              : "pencil-circle"
          }
          onPress={() => {
            data.navigation.navigate("Edit", {
              categoryId: categoryId,
              categoryToken: categoryToken,
            });
          }}
        />
      </HeaderButtons>
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

export default AddProductScreen;
