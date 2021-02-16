import { ADD_TO_CART, REMOVE_FROM_CART } from "../actions/actions";
import CartItem from "../../models/cartItem";
import { ADD_ORDER } from "../actions/orderActions";
import { DELETE_PRODUCT } from "../actions/products";

const initialState = {
  items: {},
  totalAmount: 0,
  cartQuantity: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const addedProduct = action.product;
      const prodPrice = addedProduct.price;
      const prodTitle = addedProduct.title;
      const image = addedProduct.imageUrl;

      let updatedOrNewItem;

      if (state.items[addedProduct.id]) {
        //already have the item in the cart
        updatedOrNewItem = new CartItem(
          state.items[addedProduct.id].quantity + 1,
          prodPrice,
          prodTitle,
          state.items[addedProduct.id].sum + prodPrice,
          image
        );
      } else {
        updatedOrNewItem = new CartItem(
          1,
          prodPrice,
          prodTitle,
          prodPrice,
          image
        );
      }
      return {
        ...state,
        items: { ...state.items, [addedProduct.id]: updatedOrNewItem },
        totalAmount: state.totalAmount + prodPrice,
        cartQuantity: state.cartQuantity + 1,
      };
    case REMOVE_FROM_CART:
      const selectedItem = state.items[action.pId];
      const currentQty = selectedItem.quantity;

      let updatedCartItems;

      if (currentQty > 1) {
        //need to reduce by 1
        const updatedCartItem = new CartItem(
          selectedItem.quantity - 1,
          selectedItem.productPrice,
          selectedItem.productTitle,
          selectedItem.sum - selectedItem.productPrice,
          selectedItem.image
        );
        updatedCartItems = { ...state.items, [action.pId]: updatedCartItem };
      } else {
        updatedCartItems = { ...state.items };
        delete updatedCartItems[action.pId];
      }

      return {
        ...state,
        items: updatedCartItems,
        totalAmount: state.totalAmount - selectedItem.productPrice,
        cartQuantity: state.cartQuantity - 1,
      };
    case ADD_ORDER:
      return initialState;

    case DELETE_PRODUCT:
      if (!state.items[action.pId]) {
        return state;
      }
      const updatedItems = { ...state.items };
      const itemTotal = state.items[action.pId].sum;
      const cart = state.items[action.pId].quantity;
      delete updatedItems[action.pId];
      return {
        ...state,
        items: updatedItems,
        totalAmount: state.totalAmount - itemTotal,
        cartQuantity: state.cartQuantity - cart,
      };
  }
  return state;
};
