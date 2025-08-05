import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    profileData: null,
    profilePassword:null,
    isSidebarCollapsed: false,
    isSidebarOpen: false,
    userRequestsData: null
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
        setProfilePassword:(state, action) =>{
            state.profilePassword= action.payload
        },
        setIsSidebarCollapsed: (state, action) => {
            state.isSidebarCollapsed = action.payload;
        },
        setIsSidebarOpen: (state, action) => {
            state.isSidebarOpen = action.payload;
        },
        setUserRequestsData:(state, action) =>{
            state.userRequestsData = action.payload;
        }
    }
});

export const {
    setIsLoading, setProfileData, setIsSidebarCollapsed, setIsSidebarOpen, setProfilePassword, setUserRequestsData
} = globalSlice.actions;

export default globalSlice.reducer;
