import React, { useState, useCallback, useEffect } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  Button,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useSelector, useDispatch } from "react-redux";

import GridTile from "../Layout/GridTile";
import Colors from "../../constants/Colors";
import Slider from "../Slider/Slider";
import * as categoryActions from "../../store/actions/category";
import DefaultText from "../DefaultText";
import * as productActions from "../../store/actions/actions";

const WelcomeLayout = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();

  const categories = useSelector(
    (state) => state.categories.availableCategories
  );

  // const getToken = categories.map((item) => item.token);
  // console.log(getToken);
  // const products = useSelector((state) => state.user.availableProducts);

  const dispatch = useDispatch();

  // const loadProducts = useCallback(async () => {
  //   setError(null);
  //   setIsLoading(true);
  //   try {
  //     await dispatch(productActions.fetchCategory(getToken));
  //   } catch (err) {
  //     setError(err.message);
  //   }
  //   setIsLoading(false);
  // }, [dispatch, setError, setIsLoading]);

  // useEffect(() => {
  //   const willFocusSub = props.navigation.addListener("focus", loadProducts);

  //   return () => {
  //     willFocusSub;
  //   };
  // }, [loadProducts]);

  const loadCategories = useCallback(async () => {
    setError(null);
    setIsRefreshing(true);
    try {
      await dispatch(categoryActions.fetchCategory());
    } catch (err) {
      setError(err.message);
    }
    setIsRefreshing(false);
  }, [dispatch, setError, setIsLoading]);

  useEffect(() => {
    const willFocusSub = props.navigation.addListener("focus", loadCategories);

    return () => {
      willFocusSub;
    };
  }, [loadCategories]);

  useEffect(() => {
    setIsLoading(true);
    loadCategories().then(() => {
      setIsLoading(false);
    });
    // loadProducts();
  }, [dispatch, loadCategories]);

  const renderGrid = (itemData) => {
    return (
      <GridTile
        title={itemData.item.title}
        image={itemData.item.imageUrl}
        onSelect={() => {
          props.navigation.navigate("Products", {
            params: {
              productId: itemData.item.id,
              categoryTitle: itemData.item.title,
              token: itemData.item.token,
            },
          });
        }}
      />
    );
  };

  if (error) {
    return (
      <View style={styles.centered}>
        <DefaultText>An Error Occured!!</DefaultText>
        <DefaultText>Please try again later :D</DefaultText>
        <Button
          title="Try Again"
          onPress={loadCategories}
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

  if (!isLoading && categories.length === 0) {
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
        <RefreshControl onRefresh={loadCategories} refreshing={isRefreshing} />
      }
    >
      <View style={styles.container}>
        {/* <View style={styles.banner1Container}>
          <Text style={styles.banner1}>Fresh Arrival</Text>
        </View>
        <View style={styles.sliderContainer}>
          <Slider data={products} incData={props} />
        </View> */}
        <View style={styles.bannerContainer}>
          <Text style={styles.banner}>Our Products</Text>
        </View>
        <FlatList
          keyExtractor={(item) => {
            return item.id;
          }}
          data={categories}
          renderItem={renderGrid}
          numColumns={1}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },

  sliderContainer: {
    flex: 1,
    height: "auto",
  },
  bannerContainer: {
    marginVertical: 15,
    backgroundColor: "rgba(0,0,0,0.2)",
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
  banner: {
    fontFamily: "open-sans-bold",
    fontSize: 20,
    textTransform: "uppercase",
    color: Colors.primaryColor,
    textAlign: "center",
  },
  banner1Container: {
    backgroundColor: Colors.accentColor,
    paddingHorizontal: 12,
    paddingVertical: 5,
  },

  banner1: {
    fontFamily: "open-sans-bold",
    fontSize: 20,
    textTransform: "uppercase",
    color: Colors.primaryColor,
    textAlign: "center",
  },
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
export default WelcomeLayout;
