export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const SET_FAV = "SET_FAV";
export const SET_FILTERS = "SET_FILTERS";

export const addToCart = (product) => {
  return {
    type: ADD_TO_CART,
    product: product,
  };
};

export const removeFromCart = (productId) => {
  return {
    type: REMOVE_FROM_CART,
    pId: productId,
  };
};

export const setFav = (id) => {
  return {
    type: SET_FAV,
    productId: id,
  };
};

export const setFilters = (filterProducts) => {
  return {
    type: SET_FILTERS,
    filters: filterProducts,
  };
};
