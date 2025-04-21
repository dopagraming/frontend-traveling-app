import { configureStore } from "@reduxjs/toolkit";
import { cartSlice } from "./features/cartSlice";
import wishlistSlice from "./features/wishlistSlice";
export const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
    wishlist: wishlistSlice.reducer
  },
});
