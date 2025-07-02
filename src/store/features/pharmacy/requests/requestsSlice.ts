import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    reqsData: []
};

const pharmacyRequestsSlice = createSlice({
  name: 'pharmacyReqs',
    initialState, 
    reducers: {
        setRequestsData: (state, action) => {
            state.reqsData = action.payload?.data;
        }
    }
});

export const { setRequestsData } = pharmacyRequestsSlice.actions;

export default pharmacyRequestsSlice.reducer;