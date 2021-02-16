import React from "react";
import { FlatList, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

import ProductItem from "./ProductItem";
const ProductList = (props) => {
  const favProducts = useSelector((state) => state.user.favouriteProducts);

  const renderProduct = (data) => {
    return (
      <ProductItem
        title={data.item.title}
        image={data.item.imageUrl}
        price={data.item.price}
        onSelect={() => {
          props.navigation.navigate("ProductDetails", {
            params: {
              categoryId: data.item.categoryId,
              productId: data.item.id,
              productTitle: data.item.title,
              setFav: favProducts,
            },
          });
        }}
      />
    );
  };

  return (
    <FlatList
      style={styles.data}
      data={props.listData}
      renderItem={renderProduct}
      numColumns={2}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    // flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
  },
  data: {
    width: "100%",
  },
});

export default ProductList;
