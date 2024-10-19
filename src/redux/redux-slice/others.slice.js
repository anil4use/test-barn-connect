import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    OrderHistory: [],
    ManageAddress: [],
    Services: [],
    Jobs: [],
};

export const OtherSlice = createSlice({
    name: 'OtherData',
    initialState,
    reducers: {
        setOrderHistory: (state, action) => {
            state.OrderHistory = action.payload;
        },
        manageAddress: (state, action) => {
            state.ManageAddress = action.payload;
        },
        services: (state, action) => {
            state.Services = action.payload;
        },
        job: (state, action) => {
            state.Jobs = action.payload;
        },
    },
});

export const { setOrderHistory, manageAddress, services, job } = OtherSlice.actions;

export default OtherSlice.reducer;
