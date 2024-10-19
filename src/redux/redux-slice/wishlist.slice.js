import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    Wishlist: [],
 
};
//internally using immer lib (can create mutable state)
export const wishlistSlice = createSlice({
  name: "wishlistData",
  initialState,
  reducers: {
    updateAllWishlist: (state, action) => {
      state.Wishlist = action.payload;
    },
    resetWishlist: (state, action)=>{
      state.Wishlist = []; 
    }
  },
});
// this is for dispatch
export const {  updateAllWishlist,resetWishlist } = wishlistSlice.actions;
// this is for configureStore
export default wishlistSlice.reducer;