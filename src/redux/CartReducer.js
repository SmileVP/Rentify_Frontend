import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  cartTotalQuantity: 0,
  cartTotalHours: 0,
  cartTotalAmount: 0,
  cartDateFrom : 0,
  cartDateTo : 0
};

const CartReducer = createSlice({
  name: "cart",
  initialState,

  reducers: {
    addToCart(state, action) {
      state.cartItems = [];
      state.cartItems.push(action.payload);
      
    },
    cartTotalAmount(state, action) {
      state.cartTotalAmount = action.payload.amount;
      state.cartTotalHours = action.payload.hours;
      state.cartTotalQuantity =action.payload.quantity;
      state.cartDateFrom =action.payload.from;
      state.cartDateTo =action.payload.to;
    },
    deleteCart: (state, action) => {
      state.cartItems.splice(action.payload.index, 1);
      state.cartTotalAmount = state.cartTotalAmount - action.payload.price;
    },

    clearCart: (state, action) => {
      state.cartItems = []
      state.cartTotalQuantity = action.payload;
      state.cartTotalAmount = action.payload
    },
  },
});

export const { addToCart, deleteCart, clearCart, cartTotalAmount } =
  CartReducer.actions;
export default CartReducer.reducer;
