import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    profileData: null,
    isSidebarCollapsed: false
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
        },
        setIsSidebarCollapsed: (state, action) => {
            state.isSidebarCollapsed = action.payload;
        }
    }
});

export const {
    setIsLoading, setProfileData, setIsSidebarCollapsed
} = globalSlice.actions;

export default globalSlice.reducer;
