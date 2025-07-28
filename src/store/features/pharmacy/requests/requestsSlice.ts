import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
    reqsData: [],
    reqComments: [],
    reqStatuses: []
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
        },
        setStatusItems: (state, action) => {
            state.reqStatuses = action.payload;
        }
    }
});

export const { setRequestsData, setRequestComments, setStatusItems } = pharmacyRequestsSlice.actions;

export default pharmacyRequestsSlice.reducer;