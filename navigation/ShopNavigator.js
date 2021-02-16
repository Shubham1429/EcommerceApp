import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { gestureHandlerRootHOC } from "react-native-gesture-handler";
import { Platform, StatusBar, Text } from "react-native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons } from "@expo/vector-icons";

import ProductScreen from "../screens/Shop/ProductScreen";
import ProductDetailScreen from "../screens/Shop/ProductDetailScreen";
import WelcomeScreen from "../screens/Shop/WelcomeScreen";
import CartScreen from "../screens/Shop/CartScreen";
import FavouriteProductScreen from "../screens/User/FavouriteProductScreen";
import DrawerContentScreen from "../screens/General/DrawerContentScreen";
import SettingScreen from "../screens/General/SettingScreen";
import SupportScreen from "../screens/General/SupportScreen";
import OrderScreen from "../screens/Shop/OrderScreen";
import Colors from "../constants/Colors";
import AddProductScreen from "../screens/User/AddProductScreen";
import EditProductScreen from "../screens/User/EditProductScreen";
import AddCategoryScreen from "../screens/User/AddCategoryScreen";
import UserLandingScreen from "../screens/User/UserLandingScreen";
import AuthScreen from "../screens/User/AuthScreen";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const TabAndroid = createMaterialBottomTabNavigator();
const TabIos = createBottomTabNavigator();

const defaultStackSettings = {
  headerTitleAlign: "center",
  headerTitleStyle: {
    fontSize: 17,
  },
};

const user = true;

const ShopNavigator = () => {
  return (
    <Stack.Navigator screenOptions={defaultStackSettings}>
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={WelcomeScreen.navigationOptions}
      />
      <Stack.Screen
        name="Products"
        component={ProductScreen}
        options={ProductScreen.navigationOptions}
      />
      <Stack.Screen
        name="ProductDetails"
        component={ProductDetailScreen}
        options={ProductDetailScreen.navigationOptions}
      />
      <Stack.Screen
        name="Cart"
        component={CartScreen}
        options={CartScreen.navigationOptions}
      />
    </Stack.Navigator>
  );
};

const FavNavigator = () => {
  return (
    <Stack.Navigator screenOptions={defaultStackSettings}>
      <Stack.Screen
        name="Favourites"
        component={FavouriteProductScreen}
        options={FavouriteProductScreen.navigationOptions}
      />
      <Stack.Screen
        name="ProductDetails"
        component={ProductDetailScreen}
        options={ProductDetailScreen.navigationOptions}
      />
    </Stack.Navigator>
  );
};

const SettingsNavigator = () => {
  return (
    <Stack.Navigator screenOptions={defaultStackSettings}>
      <Stack.Screen
        name="Settings"
        component={SettingScreen}
        options={SettingScreen.navigationOptions}
      />
    </Stack.Navigator>
  );
};
const SupportNavigator = () => {
  return (
    <Stack.Navigator screenOptions={defaultStackSettings}>
      <Stack.Screen
        name="Support"
        component={SupportScreen}
        options={SupportScreen.navigationOptions}
      />
    </Stack.Navigator>
  );
};

const categoryNavigator = () => {
  return (
    <Stack.Navigator screenOptions={defaultStackSettings}>
      <Stack.Screen
        name="User"
        component={UserLandingScreen}
        options={UserLandingScreen.navigationOptions}
      />
      <Stack.Screen
        name="ProdScreen"
        component={AddProductScreen}
        options={AddProductScreen.navigationOptions}
      />
      <Stack.Screen
        name="Edit"
        component={EditProductScreen}
        options={EditProductScreen.navigationOptions}
      />
    </Stack.Navigator>
  );
};

const OrdersNavigator = () => {
  return (
    <Stack.Navigator screenOptions={defaultStackSettings}>
      <Stack.Screen
        name="Orders"
        component={OrderScreen}
        options={OrderScreen.navigationOptions}
      />
    </Stack.Navigator>
  );
};

const AddCategory = () => {
  return (
    <Stack.Navigator screenOptions={defaultStackSettings}>
      <Stack.Screen
        name="AddCategory"
        component={AddCategoryScreen}
        options={AddCategoryScreen.navigationOptions}
      />
    </Stack.Navigator>
  );
};

const CategoryTabs = () => {
  if (Platform.OS === "android") {
    return (
      <TabAndroid.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color }) => {
            let iconName;
            if (route.name === "ManageCategory") {
              iconName = focused ? "shopping-cart" : "add-shopping-cart";
            } else if (route.name === "AddCategory") {
              iconName = focused ? "edit" : "edit-off";
            }
            return <MaterialIcons name={iconName} size={22} color={color} />;
          },
        })}
        activeColor={Colors.accentColor}
        barStyle={{ backgroundColor: "#f2f2f2" }}
        sceneAnimationEnabled={true}
      >
        <TabAndroid.Screen
          name="ManageCategory"
          component={categoryNavigator}
          options={{
            tabBarLabel: (
              <Text style={{ fontFamily: "open-sans-bold" }}>
                Manage Categories
              </Text>
            ),
          }}
        />
        <TabAndroid.Screen
          name="AddCategory"
          component={AddCategory}
          options={{
            tabBarLabel: (
              <Text style={{ fontFamily: "open-sans-bold" }}>
                Add categories
              </Text>
            ),
          }}
        />
      </TabAndroid.Navigator>
    );
  }
  return (
    <TabIos.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color }) => {
          let iconName;
          if (route.name === "ManageCategory") {
            iconName = focused ? "shopping-cart" : "add-shopping-cart";
          } else if (route.name === "AddCategory") {
            iconName = focused ? "edit" : "edit-off";
          }
          return <MaterialIcons name={iconName} size={22} color={color} />;
        },
      })}
      activeColor={Colors.accentColor}
      barStyle={{ backgroundColor: "#f2f2f2" }}
      sceneAnimationEnabled={true}
    >
      <TabIos.Screen
        name="ManageCategory"
        component={categoryNavigator}
        options={{
          tabBarLabel: (
            <Text style={{ fontFamily: "open-sans-bold" }}>
              Manage Category
            </Text>
          ),
        }}
      />
      <TabIos.Screen
        name="AddCategory"
        component={AddCategory}
        options={{
          tabBarLabel: (
            <Text style={{ fontFamily: "open-sans-bold" }}>Add categories</Text>
          ),
        }}
      />
    </TabIos.Navigator>
  );
};

const AuthenticateNavigator = () => {
  return (
    <Stack.Navigator screenOptions={defaultStackSettings}>
      <Stack.Screen
        name="Auth"
        component={AuthScreen}
        options={AuthScreen.navigationOptions}
      />
    </Stack.Navigator>
  );
};

const DrawerNavigator = gestureHandlerRootHOC(() => {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor="white" barStyle="dark-content" />

      {user ? (
        <Drawer.Navigator
          drawerContent={(props) => <DrawerContentScreen {...props} />}
        >
          <Drawer.Screen name="Auth" component={AuthenticateNavigator} />
        </Drawer.Navigator>
      ) : (
        <Drawer.Navigator
          drawerContent={(props) => <DrawerContentScreen {...props} />}
        >
          <Drawer.Screen name="Home" component={ShopNavigator} />
          <Drawer.Screen name="Settings" component={SettingsNavigator} />
          <Drawer.Screen name="Support" component={SupportNavigator} />
          <Drawer.Screen name="Favourites" component={FavNavigator} />
          <Drawer.Screen name="Orders" component={OrdersNavigator} />
          <Drawer.Screen name="User" component={CategoryTabs} />
        </Drawer.Navigator>
      )}
    </NavigationContainer>
  );
});

export default DrawerNavigator;
