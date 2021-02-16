import Category from "../../models/category";

export const SET_CATEGORIES = "SET_CATEGORIES";
export const CREATE_CATEGORIES = "CREATE_CATEGORIES";
export const UPDATE_CATEGORIES = "UPDATE_CATEGORIES";
export const DELETE_CATEGORIES = "DELETE_CATEGORIES";

export const fetchCategory = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        "https://ecommerce-app-99a69-default-rtdb.firebaseio.com/category.json"
      );

      if (!response.ok) {
        throw new Error("Something Went Wrong !!");
      }

      const resData = await response.json();
      const loadedCategories = [];

      for (const key in resData) {
        loadedCategories.push(
          new Category(
            resData[key].id,
            resData[key].title,
            resData[key].imageUrl,
            key
          )
        );
      }
      dispatch({
        type: SET_CATEGORIES,
        categories: loadedCategories,
      });
    } catch (err) {
      throw err;
    }
  };
};

export const createCategory = (id, title, imageUrl) => {
  return async (dispatch) => {
    //any Async code you want!!!
    const response = await fetch(
      "https://ecommerce-app-99a69-default-rtdb.firebaseio.com/category.json",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          title,
          imageUrl,
        }),
      }
    );

    const resData = await response.json();

    dispatch({
      type: CREATE_CATEGORIES,
      categoryData: {
        id,
        title,
        imageUrl,
        token: resData.name,
      },
    });
  };
};
