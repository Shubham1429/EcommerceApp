import React, { useState, useEffect } from "react";
import { LogBox } from "react-native";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";
// import { composeWithDevTools } from "redux-devtools-extension";

import ShopNavigator from "./navigation/ShopNavigator";
import cartReducer from "./store/reducers/cartReducer";
import orderReducer from "./store/reducers/orderReducer";
import productReducer from "./store/reducers/productReducer";
import categoryReducer from "./store/reducers/categoryReducer";

const rootReducer = combineReducers({
  cart: cartReducer,
  orders: orderReducer,
  user: productReducer,
  categories: categoryReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });
};

export default function App() {
  LogBox.ignoreLogs([
    "Non-serializable values were found in the navigation state",
  ]);
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    LogBox.ignoreLogs(
      ["VirtualizedLists should never be nested"],
      ["Non-serializable values were found in the navigation state"]
    );
  }, []);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
        onError={(err) => console.log(err)}
      />
    );
  }

  return (
    <Provider store={store}>
      <ShopNavigator />
    </Provider>
  );
}
