import React from "react";
import { HeaderButton } from "react-navigation-header-buttons";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";

const CustomButton = (props) => {
  return (
    <HeaderButton
      {...props}
      IconComponent={MaterialCommunityIcons}
      iconSize={23}
      color="#000033"
      style={{ marginRight: -5 }}
    />
  );
};

export default CustomButton;
