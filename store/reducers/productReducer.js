import { PRODUCTS } from "../../data/dummy-data";
import {
  CREATE_PRODUCT,
  DELETE_PRODUCT,
  SET_PRODUCTS,
  UPDATE_PRODUCT,
} from "../actions/products";
import { SET_FAV } from "../actions/actions";

import Product from "../../models/product";

const initialState = {
  availableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter((prod) => prod.ownerId === "o1"),
  favouriteProducts: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return {
        ...state,
        availableProducts: action.products,
        userProducts: action.products.filter((prod) => prod.ownerId === "o1"),
      };

    case CREATE_PRODUCT:
      const newProduct = new Product(
        "o1",
        action.productData.catId,
        action.productData.title,
        action.productData.imageUrl,
        action.productData.description,
        action.productData.price,
        action.productData.id
      );
      return {
        ...state,
        availableProducts: state.availableProducts.concat(newProduct),
        userProducts: state.userProducts.concat(newProduct),
      };
    case UPDATE_PRODUCT:
      const productIndex = state.userProducts.findIndex(
        (prod) => prod.id === action.pId
      );
      const updatedProd = new Product(
        action.pId,
        state.userProducts[productIndex].ownerId,
        action.productData.categoryId,
        action.productData.title,
        action.productData.imageUrl,
        action.productData.description,
        state.userProducts[productIndex].price
      );
      const updatedUserProducts = [...state.userProducts];
      updatedUserProducts[productIndex] = updatedProd;
      const availableProductIndex = state.availableProducts.findIndex(
        (prod) => prod.id === action.pId
      );
      const updatedAvailableProducts = [...state.availableProducts];
      updatedAvailableProducts[availableProductIndex] = updatedProd;

      return {
        ...state,
        availableProducts: updatedAvailableProducts,
        userProducts: updatedUserProducts,
      };
    case DELETE_PRODUCT:
      return {
        ...state,
        userProducts: state.userProducts.filter(
          (product) => product.id !== action.pId
        ),
        availableProducts: state.availableProducts.filter(
          (product) => product.id !== action.pId
        ),
      };
    case SET_FAV:
      const existingIndex = state.favouriteProducts.findIndex(
        (product) => product.id === action.productId
      );
      if (existingIndex >= 0) {
        const newFav = [...state.favouriteProducts];
        newFav.splice(existingIndex, 1);
        return {
          ...state,
          favouriteProducts: newFav,
        };
      } else {
        const product = state.availableProducts.find(
          (data) => data.id === action.productId
        );

        return {
          ...state,
          favouriteProducts: state.favouriteProducts.concat(product),
        };
      }
  }
  return state;
};
