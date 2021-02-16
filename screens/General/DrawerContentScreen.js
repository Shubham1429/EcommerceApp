import React from "react";
import { StatusBar, StyleSheet, View } from "react-native";
import { DrawerItem, DrawerContentScrollView } from "@react-navigation/drawer";
import { Avatar, Title, Caption, Drawer } from "react-native-paper";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

const DrawerContentScreen = (props) => {
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.infoSection}>
            <View style={styles.infoContainer}>
              <Avatar.Image
                source={{
                  uri: "https://www.w3schools.com/howto/img_avatar.png",
                }}
                size={50}
              />
              <View style={{ marginLeft: 15 }}>
                <Title style={styles.title}>Shubham Bhardwaj</Title>
                <Caption style={styles.caption}>Sam142</Caption>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.section}>
                <Caption style={[styles.caption, { fontWeight: "bold" }]}>
                  Standard User
                </Caption>
              </View>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  props.navigation.navigate("User");
                }}
              >
                <View style={styles.section}>
                  <Caption style={[styles.caption, { fontWeight: "bold" }]}>
                    MORE
                  </Caption>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              label="Home"
              icon={({ color, size }) => (
                <MaterialCommunityIcons
                  name="home-outline"
                  color={color}
                  size={size}
                />
              )}
              onPress={() => {
                props.navigation.navigate("Home");
              }}
            />
            <DrawerItem
              label="Cart"
              icon={({ color, size }) => (
                <MaterialCommunityIcons
                  name="cart-outline"
                  color={color}
                  size={size}
                />
              )}
              onPress={() => {
                props.navigation.navigate("Cart");
              }}
            />
            <DrawerItem
              label="Your Orders"
              icon={({ color, size }) => (
                <MaterialCommunityIcons
                  name="shopping-outline"
                  color={color}
                  size={size}
                />
              )}
              onPress={() => {
                props.navigation.navigate("Orders");
              }}
            />
            <DrawerItem
              label="Settings"
              icon={({ color, size }) => (
                <Ionicons name="settings-outline" color={color} size={size} />
              )}
              onPress={() => {
                props.navigation.navigate("Settings");
              }}
            />
            <DrawerItem
              label="Support"
              icon={({ color, size }) => (
                <MaterialCommunityIcons
                  name="account-check-outline"
                  color={color}
                  size={size}
                />
              )}
              onPress={() => {
                props.navigation.navigate("Support");
              }}
            />
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>

      <Drawer.Section style={styles.bottomDrawer}>
        <DrawerItem
          label="Sign Out"
          icon={({ color, size }) => (
            <MaterialCommunityIcons
              name="exit-to-app"
              color={color}
              size={size}
              onPress={() => {
                console.log("hello");
              }}
            />
          )}
        />
      </Drawer.Section>
    </View>
  );
};

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  infoSection: {
    padding: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontFamily: "open-sans-bold",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
  },

  drawerSection: {
    marginTop: 25,
    paddingVertical: 10,
  },
  bottomDrawer: {
    marginBottom: 15,
    borderColor: "#f4f4f4",
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  infoContainer: {
    flexDirection: "row",
    marginTop: 15,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default DrawerContentScreen;
