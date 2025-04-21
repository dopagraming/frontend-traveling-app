import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  cart: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const newCart = [...state.cart, action.payload]
      localStorage.setItem("cart", JSON.stringify(newCart))
      state.cart = newCart
    },
    removeFromCart: (state, action) => {
      const newCart = state.wishlist.filter((e) => e._id !== action.payload);
      localStorage.setItem("wishlist", JSON.stringify(newCart));
      state.wishlist = newCart;
    }
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice;
