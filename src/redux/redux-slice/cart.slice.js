import { createSlice } from "@reduxjs/toolkit";
import {
    getCartLocal,
    setCartLocal,
    getPriceLocal,
    setPriceLocal,
} from "../../utils/localStorage.util";

const initialState = {
    Cart: [],
    // Cart: getCartLocal() ? getCartLocal() : [],
    TotalPrice: getPriceLocal() ? getPriceLocal() : 0,
};

const cartSystem = createSlice({
    name: "cartData",
    initialState,
    reducers: {
        getCartData: (state, action) => {
            state.Cart = action.payload;
            console.log(action.payload);
        },
        updateCart: (state, action) => {
            const { productId, coverImage, price, categoryId, name, quantity } = action.payload;
            const existingProduct = state.Cart.find(
                (item) => item.productId === productId
            );
            if (existingProduct) {
                existingProduct.quantity = quantity;
                existingProduct.totalPrice = existingProduct.quantity * existingProduct.price;
            } else {
                const newProduct = {
                    productId,
                    coverImage,
                    price,
                    categoryId,
                    name,
                    quantity: quantity,
                    totalPrice: price, // Initial total price is the product price itself
                };
                state.Cart.push(newProduct);
            }

            state.TotalPrice = state.Cart.reduce((total, product) => total + product.totalPrice, 0);

            setCartLocal(state.Cart);
            setPriceLocal(state.TotalPrice);
        },

        removeCart: (state, action) => {
            const { productId, price, quantity } = action.payload;

            // Find the product to remove
            const productToRemove = state.Cart.find((item) => item.productId === productId);

            if (productToRemove) {
                // Calculate the total price to subtract
                const totalPriceToRemove = quantity * price;

                // Update the TotalPrice
                state.TotalPrice -= totalPriceToRemove;

                // Remove the product from the cart
                state.Cart = state.Cart.filter((item) => item.productId !== productId);

                setCartLocal(state.Cart);
                setPriceLocal(state.TotalPrice);
            }
        },
        resetCart: (state, action) => {
            state.Cart = [];
            state.TotalPrice = 0;
        }
    },
});
export const { updateCart, removeCart, resetCart, getCartData } = cartSystem.actions;
export default cartSystem.reducer;
