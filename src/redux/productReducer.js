import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { url } from "../App";

//to get all the product details
export const fetchProducts = createAsyncThunk(
  "/product/fetchProducts",
  async () => {
    try {
      let response = await axios.get(`${url}/product/product-details`);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

export const productReducer = createSlice({
  name: "products",
  initialState: {
    products: [],
    loading: true,
  },
  reducers: {},

  //it returns a promise
  extraReducers: {
    [fetchProducts.pending]: (state, action) => {
      state.loading = true;
    },

    [fetchProducts.fulfilled]: (state, action) => {
      state.loading = false;
      state.products = action.payload;
    },

    [fetchProducts.rejected]: (state, action) => {
      state.loading = true;
    },
  },
});

export default productReducer.reducer;
