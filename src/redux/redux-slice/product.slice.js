import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    products: [],
    horses: [''],
    rentalToggle: false,

};

export const productSlice = createSlice({
    name: 'ProductData',
    initialState,
    reducers: {
        Allproducts: (state, action) => {
            state.products = action.payload;
        },
        AllHorses: (state, action) => {
            state.horses = action.payload;
        },
        RentalToggle: (state, action) => {
            state.rentalToggle = action.payload;
        },
    },
});

export const { Allproducts, AllHorses, RentalToggle } = productSlice.actions;

export default productSlice.reducer;
