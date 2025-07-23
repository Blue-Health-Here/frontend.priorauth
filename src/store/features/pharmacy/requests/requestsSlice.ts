import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
    reqsData: [],
    reqComments: []
};

const pharmacyRequestsSlice = createSlice({
  name: 'pharmacyReqs',
    initialState, 
    reducers: {
        setRequestsData: (state, action) => {
            state.reqsData = action.payload?.data;
        },
        setRequestComments: (state, action) => {
            state.reqComments = action.payload;
        }
    }
});

export const { setRequestsData, setRequestComments } = pharmacyRequestsSlice.actions;

export default pharmacyRequestsSlice.reducer;