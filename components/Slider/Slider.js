import React, { useEffect, useState, useRef } from "react";
import {
  View,
  FlatList,
  Animated,
  Dimensions,
  StyleSheet,
  Image,
  Text,
} from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";

const { width, heigth } = Dimensions.get("window");

const Slider = ({ data, incData }) => {
  const scrollX = new Animated.Value(0);
  let position = Animated.divide(scrollX, width);
  const [dataList, setDataList] = useState(data);
  const [index, setIndex] = useState(0);

  const flatList = useRef();

  function infiniteScroll(dataList) {
    const numberOfData = dataList.length;
    let scrollValue = 0,
      scrolled = 0;
    if (width) {
      setInterval(function () {
        scrolled++;
        if (scrolled <= numberOfData) scrollValue = scrollValue + width;
        else {
          scrollValue = 0;
          scrolled = 0;
        }

        flatList.current.scrollTo({
          animated: true,
          x: scrollValue,
          y: 0,
        });
      }, 3000);
    }
  }

  // const renderSlider = (itemData) => {
  //   return (
  //     <SliderItem
  //       image={itemData.item.imageUrl}
  //       onSelect={() => {
  //         incData.navigation.navigate("ProductDetails", {
  //           params: {
  //             productId: itemData.item.id,
  //             productTitle: itemData.item.title,
  //           },
  //         });
  //       }}
  //     />
  //   );
  // };

  useEffect(() => {
    setDataList(data);
    infiniteScroll(dataList);
  }, []);

  // const change = (event) => {
  //   //width of the viewSize
  //   const viewSize = event.nativeEvent.layoutMeasurement.width;
  //   //get current position of the scrollview
  //   const contentOffset = event.nativeEvent.contentOffset.x;

  //   const scroll = Math.floor(contentOffset / viewSize);

  //   setIndex(scroll);
  // };

  const pressHandler = (categoryId, id, title) => {
    incData.navigation.navigate("ProductDetails", {
      categoryId: categoryId,
      productId: id,
      productTitle: title,
    });
  };

  if (data && data.length) {
    return (
      <View>
        {/* <FlatList
          data={data}
          ref={flatList}
          horizontal
          pagingEnabled
          snapToAlignment="center"
          scrollEventThrottle={24}
          decelerationRate="fast"
          showsHorizontalScrollIndicator={false}
          renderItem={renderSlider}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
        /> */}
        {/* <View style={styles.dotView}>
          {data.map((_, i) => {
            let opacity = position.interpolate({
              inputRange: [i - 1, i, i + 1],
              outputRange: [0.3, 1, 0.3],
              extrapolate: "clamp",
            });
            return (
              <Animated.View
                key={i}
                style={{
                  opacity,
                  height: 5,
                  width: 7,
                  backgroundColor: "#595959",
                  margin: 5,
                  borderRadius: 5,
                }}
              />
            );
          })}
        </View> */}
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          snapToAlignment="center"
          decelerationRate="fast"
          ref={flatList}
          scrollEventThrottle={24}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
        >
          {data.map((item, k) => (
            <TouchableOpacity
              key={k}
              activeOpacity={0.8}
              onPress={() => {
                incData.navigation.navigate("ProductDetails", {
                  params: {
                    productId: item.id,
                    productTitle: item.title,
                  },
                });
              }}
            >
              <Image source={{ uri: item.imageUrl }} style={styles.image} />
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.dotView}>
          {data.map((_, i) => {
            let opacity = position.interpolate({
              inputRange: [i - 1, i, i + 1],
              outputRange: [0.3, 1, 0.3],
              extrapolate: "clamp",
            });
            return (
              <Animated.View
                key={i}
                style={{
                  opacity,
                  height: 9,
                  width: 11,
                  backgroundColor: "#fff",
                  margin: 5,
                  borderRadius: 5,
                }}
              />
            );
          })}
        </View>
      </View>
    );
  }
  console.log("Please Provide Images");
  return null;
};

const styles = StyleSheet.create({
  dotView: {
    flexDirection: "row",
    justifyContent: "center",
    position: "absolute",
    alignItems: "center",
    width: "100%",
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  image: {
    width: width,
    height: width * 0.6,
    resizeMode: "cover",
  },
});
export default Slider;
