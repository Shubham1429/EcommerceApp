import React, { useEffect } from "react";
import { StyleSheet, FlatList, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import GridTile from "../../components/Layout/GridTile";
import HeaderLeftButtons from "../../components/Buttons/HeaderLeftButtons";
import * as productActions from "../../store/actions/products";

const UserLandingScreen = (props) => {
  const dispatch = useDispatch();
  const categories = useSelector(
    (state) => state.categories.availableCategories
  );

  const categoryClickHandler = (id, token) => {
    props.navigation.navigate("ProdScreen", { categoryId: id, token: token });
  };

  return (
    <FlatList
      data={categories}
      keyExtractor={(item) => {
        return item.id;
      }}
      renderItem={(itemData) => (
        <GridTile
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          onSelect={() => {
            categoryClickHandler(itemData.item.id, itemData.item.token);
          }}
        />
      )}
    />
  );
};

UserLandingScreen.navigationOptions = (data) => {
  return {
    headerTitle: "Manage Stuff",
    headerLeft: () => <HeaderLeftButtons navigation={data.navigation} />,
  };
};

export default UserLandingScreen;
