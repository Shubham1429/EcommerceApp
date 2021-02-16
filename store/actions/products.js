import Product from "../../models/product";

export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const SET_PRODUCTS = "SET_PRODUCTS";

export const fetchProducts = (id) => {
  return async (dispatch) => {
    //any Async code you want!!!

    try {
      const response = await fetch(
        `https://ecommerce-app-99a69-default-rtdb.firebaseio.com/category/${id}/zproducts.json`
      );

      if (!response.ok) {
        throw new Error("Something Went Wrong!!");
      }

      const resData = await response.json();
      const loadedProducts = [];

      for (const key in resData) {
        loadedProducts.push(
          new Product(
            "o1",
            key,
            resData[key].categoryId,
            resData[key].title,
            resData[key].imageUrl,
            resData[key].description,
            resData[key].price
          )
        );
      }
      dispatch({
        type: SET_PRODUCTS,
        products: loadedProducts,
      });
    } catch (err) {
      //send to custom server
      throw err;
    }
  };
};

export const deleteProduct = (productId, token) => {
  console.log("Deleted Token : " + token + " Deleted Id : " + productId);
  return async (dispatch) => {
    const response = await fetch(
      `https://ecommerce-app-99a69-default-rtdb.firebaseio.com/category/${token}/zproducts/${productId}.json`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw new Error("Something Went Wrong!!");
    }

    dispatch({
      type: DELETE_PRODUCT,
      pId: productId,
    });
  };
};

export const createProduct = (
  categoryId,
  title,
  imageUrl,
  description,
  price,
  categoryToken
) => {
  return async (dispatch) => {
    //any Async code you want!!!
    const response = await fetch(
      `https://ecommerce-app-99a69-default-rtdb.firebaseio.com/category/${categoryToken}/zproducts.json`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          categoryId,
          title,
          description,
          imageUrl,
          price,
        }),
      }
    );

    const resData = await response.json();

    dispatch({
      type: CREATE_PRODUCT,
      productData: {
        categoryId,
        title,
        imageUrl,
        description,
        price,
        id: resData.name,
      },
    });
  };
};

export const updateProduct = (
  id,
  categoryId,
  title,
  imageUrl,
  description,
  token
) => {
  return async (dispatch) => {
    const response = await fetch(
      `https://ecommerce-app-99a69-default-rtdb.firebaseio.com/category/${token}/zproducts/${id}.json`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          categoryId,
          title,
          description,
          imageUrl,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Something Went Wrong!!");
    }

    dispatch({
      type: UPDATE_PRODUCT,
      pId: id,
      productData: {
        categoryId,
        title,
        description,
        imageUrl,
      },
    });
  };
};
