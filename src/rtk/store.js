import { configureStore } from "@reduxjs/toolkit";
import { cartSlice } from "./features/cartSlice";
import wishlistSlice from "./features/wishlistSlice";
import userSlice from "./features/userSlice";

export const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
    wishlist: wishlistSlice.reducer,
    user: userSlice.reducer,
  },
});