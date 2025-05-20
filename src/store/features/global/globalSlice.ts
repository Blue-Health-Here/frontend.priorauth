import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isSidebarOpen: false,
    isLoading: false,
    profileData: null,
    pharmacyDetailsData: null,
    licenseData: [],
    certificationsData: [],
    expenseCategories: [],
    expenseGraphData: null,
    pharmacyStatsData: null,
    pharmacyChecklists: [],
    pharmacyAssignChecklists: [],
    selectedChecklistItem: null,
    isAddQuestion: false,
};

const globalSlice = createSlice({
    name: 'global',
    initialState,
    reducers: {
        setIsSidebarOpen: (state, action) => {
            state.isSidebarOpen = action.payload;
        },
        setIsLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        setProfileData: (state, action) => {
            state.profileData = action.payload;
        },
        setLicenseData: (state, action) => {
            state.licenseData = action.payload;
        },
        setCertificationsData: (state, action) => {
            state.certificationsData = action.payload;
        },
        setExpenseCategories: (state, action) => {
            state.expenseCategories = action.payload;
        },
        setExpenseGraphData: (state, action) => {
            state.expenseGraphData = action.payload;
        },
        setPharmacyStatsData: (state, action) => {
            state.pharmacyStatsData = action.payload;
        },
        setPharmacyDetailsData: (state, action) => {
            state.pharmacyDetailsData = action.payload?.pharmacy_details;
            state.licenseData = action?.payload?.licenses;
            state.certificationsData = action?.payload?.certifications;
        },
        setPharmacyChecklists: (state, action) => {
            state.pharmacyChecklists = action.payload;
        },
        setPharmacyAssignChecklists: (state, action) => {
            state.pharmacyAssignChecklists = action.payload;
        },
        setSelectedChecklistItem: (state, action) => {
            state.selectedChecklistItem = action.payload;
          },  
          setIsAddQuestion: (state, action) => {
            state.isAddQuestion = action.payload
        },
    }
});
export const { 
    setIsSidebarOpen, setIsLoading, setProfileData, setLicenseData, 
    setCertificationsData, setExpenseCategories, setPharmacyStatsData, 
    setExpenseGraphData, setPharmacyDetailsData, setPharmacyChecklists, 
    setPharmacyAssignChecklists, setSelectedChecklistItem, setIsAddQuestion,
} = globalSlice.actions;
export default globalSlice.reducer;
