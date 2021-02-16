import React, { useState } from "react";
import {
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Platform,
  Dimensions,
  TouchableHighlight,
} from "react-native";

const GridTile = (props) => {
  const [cardHeight, setCardHeight] = useState(
    Dimensions.get("window").width * 0.5
  );
  const [cardMarginHor, setCardMarginHor] = useState(
    Dimensions.get("window").height / 40
  );
  const [cardMarginVert, setCardMarginVert] = useState(
    Dimensions.get("window").height / 60
  );

  //For Responsiveness ( To be Adjusted)
  //   useEffect(() => {
  //     const updateLayout = () => {
  //       setCardHeight(Dimensions.get("window").width * 0.7);
  //       setCardMargin(Dimensions.get("window").height / 30);
  //     };

  //     Dimensions.addEventListener("change", updateLayout);

  //     return () => {
  //       Dimensions.removeEventListener("change", updateLayout);
  //     };
  //   });

  let TouchableCmp = TouchableOpacity;

  if (Platform.OS === "android") {
    TouchableCmp = TouchableHighlight;
  }

  return (
    <View style={styles.container}>
      <TouchableCmp
        activeOpacity={0.9}
        underlayColor={"#f2f2f2"}
        style={styles.gridItem}
        onPress={props.onSelect}
      >
        <View
          style={[
            styles.item,
            {
              height: cardHeight,
              marginHorizontal: cardMarginHor,
              marginVertical: cardMarginVert,
            },
          ]}
        >
          <ImageBackground
            imageStyle={{ borderRadius: 10 }}
            source={{ uri: props.image }}
            style={styles.bgImage}
          >
            <View style={styles.titleContainer}>
              <Text style={styles.title}>{props.title}</Text>
            </View>
          </ImageBackground>
        </View>
      </TouchableCmp>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 10,
  },
  item: {
    borderRadius: 10,
    elevation: 6,
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    overflow:
      Platform.OS === "android" && Platform.Version >= 21
        ? "hidden"
        : "visible",
  },
  gridItem: {
    flex: 1,
  },

  bgImage: {
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
  },
  titleContainer: {
    backgroundColor: "rgba(0,0,0,0.3)",
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderBottomEndRadius: 10,
    borderBottomLeftRadius: 10,
  },
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 18,
    color: "white",
    textAlign: "center",
  },
});

export default GridTile;
