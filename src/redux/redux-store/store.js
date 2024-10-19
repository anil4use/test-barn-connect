import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../redux-slice/user.slice";
import productReducer from "../redux-slice/product.slice";
import cartReducer from "../redux-slice/cart.slice"
import wishlistReducer from "../redux-slice/wishlist.slice";
import OtherReducer from '../redux-slice/others.slice';


export const store = configureStore({
  reducer: {
    user: userReducer,
    productData: productReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
    other: OtherReducer,

  },
});
