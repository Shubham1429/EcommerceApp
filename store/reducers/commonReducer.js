// import { PRODUCTS } from "../../data/dummy-data";
// // import { SET_FAV } from "../actions/actions";

// const initialState = {
//   products: PRODUCTS,
//   filteredProducts: PRODUCTS,
//   favouriteProducts: [],
// };

// export default (state = initialState, action) => {
//   switch (action.type) {
//     case SET_FAV:
//       const existingIndex = state.favouriteProducts.findIndex(
//         (product) => product.id === action.productId
//       );
//       if (existingIndex >= 0) {
//         const newFav = [...state.favouriteProducts];
//         newFav.splice(existingIndex, 1);
//         return {
//           ...state,
//           favouriteProducts: newFav,
//         };
//       } else {
//         const product = state.products.find(
//           (data) => data.id === action.productId
//         );

//         return {
//           ...state,
//           favouriteProducts: state.favouriteProducts.concat(product),
//         };
//       }
//     // // case ADD_TO_CART:
//     // //   const existing = state.favouriteProducts.findIndex(
//     // //     (product) => product.id === action.productId
//     // //   );
//     // //   if (existing >= 0) {
//     // //     const newFav = [...state.favouriteProducts];
//     // //     newFav.splice(existing, 1);
//     // //     return {
//     // //       ...state,
//     // //       favouriteProducts: newFav,
//     // //     };
//     // //   } else {
//     // //     const product = state.products.find(
//     // //       (data) => data.id === action.productId
//     // //     );

//     // //     return {
//     // //       ...state,
//     // //       cartItems: [...state.cartItems, product],
//     // //     };
//     //   }
//     default:
//       return state;
//   }
// };
