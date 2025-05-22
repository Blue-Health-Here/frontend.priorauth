import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    pharmaciesData: []
};

const pharmaciesSlice = createSlice({
  name: 'adminPharmacies',
    initialState, 
    reducers: {
        setPharmaciesData: (state, action) => {
            state.pharmaciesData = action.payload?.data;
        }
    }
});

export const { setPharmaciesData } = pharmaciesSlice.actions;

export default pharmaciesSlice.reducer;