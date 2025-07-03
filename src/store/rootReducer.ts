import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import globalReducer from "./features/global/globalSlice"
import reqStatusesReducer from "./features/admin/requests/statusesSlice";

// Admin Imports
import adminReqsReducer from "./features/admin/requests/requestsSlice";
import adminPharmacyReducer from "./features/admin/pharmacies/pharmaciesSlice";

// Pharmacy Imports
import pharmacyReqsReducer from "./features/pharmacy/requests/requestsSlice";
import pharmacyRequestProgressNotesReducer from "./features/pharmacy/requests/requestProgressNotesSlice";
// import adminChecklistReducer from "./features/admin/checklist/adminChecklistSlice"
// import adminMarketingReducer from "./features/admin/marketing/adminMarketingSlice"
// import adminCategoryReducer from "./features/admin/category/adminCategorySlice"
// import adminExpenseReducer from "./features/admin/expense/adminExpenseSlice";
// import adminPharmacyReducer from "./features/admin/pharmacy/adminPharmacySlice";

const rootReducer = combineReducers({
    auth: authReducer,
    global: globalReducer,
    reqStatuses: reqStatusesReducer,

    // Admin Reducers
    adminReqs: adminReqsReducer,
    adminPharmacies: adminPharmacyReducer,

    // Pharmacy Reducers
    pharmacyReqs: pharmacyReqsReducer,
    pharmacyRequestProgressNotes: pharmacyRequestProgressNotesReducer
    // checklist: adminChecklistReducer,
    // marketing: adminMarketingReducer,
    // category: adminCategoryReducer,
    // expense: adminExpenseReducer,
    // pharmacy: adminPharmacyReducer
});

export default rootReducer;
