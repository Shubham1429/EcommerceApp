import { CATEGORIES } from "../../data/dummy-data";
import Category from "../../models/category";
import { CREATE_CATEGORIES, SET_CATEGORIES } from "../actions/category";

const initialState = {
  availableCategories: CATEGORIES,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CATEGORIES:
      return {
        ...state,
        availableCategories: action.categories,
      };

    case CREATE_CATEGORIES:
      const newCategory = new Category(
        action.categoryData.id,
        action.categoryData.title,
        action.categoryData.imageUrl,
        action.categoryData.token
      );
      return {
        ...state,
        availableCategories: state.availableCategories.concat(newCategory),
      };
  }
  return state;
};
