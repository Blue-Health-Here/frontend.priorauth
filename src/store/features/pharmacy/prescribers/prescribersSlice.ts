import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    prescribersData: []
};

const prescribersSlice = createSlice({
  name: 'prescribers',
    initialState, 
    reducers: {
        setPrescribersData: (state, action) => {
            state.prescribersData = action.payload?.prescribers || action.payload?.data || [];
        }
    }
});

export const { setPrescribersData } = prescribersSlice.actions;

export default prescribersSlice.reducer;