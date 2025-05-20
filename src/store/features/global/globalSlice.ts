import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    profileData: null,
};

const globalSlice = createSlice({
    name: 'global',
    initialState,
    reducers: {
        setIsLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        setProfileData: (state, action) => {
            state.profileData = action.payload;
        }
    }
});

export const {
    setIsLoading, setProfileData
} = globalSlice.actions;

export default globalSlice.reducer;
