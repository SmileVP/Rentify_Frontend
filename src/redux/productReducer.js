import {createSlice } from "@reduxjs/toolkit";

export const productReducer = createSlice({
  name: "products",
  initialState: {
    products: [],
    loading: true,
  },
  reducers: {
    addItems(state, action) {
      state.products = action.payload;
    },
    filterItems(state, action) {
      state.products = [];
      state.products = action.payload;
    },
  },

});

export const { filterItems, addItems } = productReducer.actions;
export default productReducer.reducer;
