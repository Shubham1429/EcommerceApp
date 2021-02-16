import React, { useEffect, useCallback, useReducer } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import HeaderButton from "../../components/Buttons/HeaderButton";
import * as categoryActions from "../../store/actions/category";
import Input from "../../components/Layout/Input";

const FORM_INPUT_UPDATE = "UPDATE";

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };

    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid,
    };

    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      FormIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues,
    };
  }
};

const AddCategoryScreen = (props) => {
  const id = useSelector(
    (state) => state.categories.availableCategories.length + 1
  );
  const index = "00Category00" + id;

  const dispatch = useDispatch();
  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      title: "",
      imageUrl: "",
    },
    inputValidities: {
      title: false,
      imageUrl: false,
    },
    FormIsValid: false,
  });

  const submitHandler = useCallback(() => {
    if (!formState.FormIsValid) {
      Alert.alert("Wrong Input", "Please check your inputs", [
        {
          text: "Okay",
        },
      ]);
      return;
    }

    dispatch(
      categoryActions.createCategory(
        index,
        formState.inputValues.title,
        formState.inputValues.imageUrl
      )
    );
  }, [dispatch, formState, index]);

  useEffect(() => {
    props.navigation.setParams({ submit: submitHandler });
  }, [submitHandler]);

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier,
      });
    },
    [dispatchFormState]
  );

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="padding"
      keyboardVerticalOffset={50}
    >
      <ScrollView>
        <View style={styles.form}>
          <Input
            id="title"
            label="Title"
            keyboardType="default"
            autoCapitalize="sentences"
            autoCorrect
            returnKeyType="next"
            errorText="Enter a valid Title"
            onInputChange={inputChangeHandler}
            initialValue={""}
            initiallyValid={true}
            required
          />

          <Input
            id="imageUrl"
            label="Image Url"
            keyboardType="default"
            returnKeyType="next"
            errorText="Enter a valid Image Url"
            onInputChange={inputChangeHandler}
            initialValue={""}
            initiallyValid={true}
            required
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

AddCategoryScreen.navigationOptions = (data) => {
  const submitFunc = data.route.params?.submit;

  return {
    headerTitle: "Add Category",
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Save"
          iconName="content-save-outline"
          onPress={submitFunc}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
});

export default AddCategoryScreen;
