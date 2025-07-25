import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import globalReducer from "./features/global/globalSlice";
import themeReducer from "./features/theme/themeSlice";
import reqStatusesReducer from "./features/admin/requests/statusesSlice";
import prescribersReducer from "./features/pharmacy/prescribers/prescribersSlice";

// Admin Imports
import adminReqsReducer from "./features/admin/requests/requestsSlice";
import adminPharmacyReducer from "./features/admin/pharmacies/pharmaciesSlice";

// Pharmacy Imports
import pharmacyReqsReducer from "./features/pharmacy/requests/requestsSlice";
import pharmacyRequestProgressNotesReducer from "./features/pharmacy/requests/requestProgressNotesSlice";
const rootReducer = combineReducers({
    auth: authReducer,
    global: globalReducer,
    theme: themeReducer,
    reqStatuses: reqStatusesReducer,
    prescribers: prescribersReducer,

    // Admin Reducers
    adminReqs: adminReqsReducer,
    adminPharmacies: adminPharmacyReducer,

    // Pharmacy Reducers
    pharmacyReqs: pharmacyReqsReducer,
    pharmacyRequestProgressNotes: pharmacyRequestProgressNotesReducer
});

export default rootReducer;
