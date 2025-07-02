import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    reqStatusesData: []
};

const requestStatusesSlice = createSlice({
  name: 'reqStatuses',
    initialState, 
    reducers: {
        setReqStatusesData: (state, action) => {
            state.reqStatusesData = action.payload;
        }
    }
});

export const { setReqStatusesData } = requestStatusesSlice.actions;

export default requestStatusesSlice.reducer;