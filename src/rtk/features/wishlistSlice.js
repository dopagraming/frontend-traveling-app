import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    wishlist: [],
};


const wishlistSlice = createSlice({
    name: "wishlist",
    initialState,
    reducers: {
        addToWishlist: (state, action) => {
            const newArray = [...state.wishlist, action.payload];
            localStorage.setItem("wishlist", JSON.stringify(newArray));
            state.wishlist = newArray;
        },
        removeFromWishlist: (state, action) => {
            const newArray = state.wishlist.filter((e) => e._id !== action.payload);
            localStorage.setItem("wishlist", JSON.stringify(newArray));
            state.wishlist = newArray;
        },
    },
});

export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions

export default wishlistSlice