import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./productReducer";
import CartReducer from "./CartReducer";

//store holds the whole state tree of your application
const store = configureStore({
    reducer:{
        product:productReducer,
        cart:CartReducer
    }
})

export default store;