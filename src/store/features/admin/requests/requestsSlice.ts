import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    reqsData: []
};

const requestsSlice = createSlice({
  name: 'adminReqs',
    initialState, 
    reducers: {
        setRequestsData: (state, action) => {
            state.reqsData = action.payload?.data;
        }
    }
});

export const { setRequestsData } = requestsSlice.actions;

export default requestsSlice.reducer;