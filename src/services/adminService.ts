import toast from "react-hot-toast";
import { axiosAdmin } from "../api/instance";
import { AppDispatch } from "../store";
import { setIsLoading, setProfileData, setUserRequestsData } from "../store/features/global/globalSlice";
import { setRequestsData } from "../store/features/admin/requests/requestsSlice";
import { setPharmaciesData } from "../store/features/admin/pharmacies/pharmaciesSlice";
import { setPrescribersData } from "@/store/features/pharmacy/prescribers/prescribersSlice";

// Types
type ApiMethod = 'get' | 'post' | 'put' | 'delete';
type ApiResponse<T = any> = {
    data?: T & { success?: boolean };
    status?: number;
};
type ErrorResponse = {
    message?: string;
    status?: number;
    response?: { data?: { detail?: string } };
};

// Generic API handler that centralizes common logic
const apiHandler = async <T = any>(
    dispatch: AppDispatch,
    method: ApiMethod,
    endpoint: string,
    options: {
        data?: any;
        params?: Record<string, string | undefined>;
        successMessage?: string;
        errorMessage?: string;
        onSuccess?: (data: T) => void;
        onError?: (error: ErrorResponse) => void;
        isFormData?: boolean;
    }
): Promise<T | null> => {
    const {
        data,
        params,
        successMessage,
        errorMessage = "Something went wrong",
        onSuccess,
        onError,
        isFormData = false,
    } = options;
    try {
        dispatch(setIsLoading(true));

        // Build URL with query parameters if needed
        let url = endpoint;
        if (params) {
            const queryParams = Object.entries(params)
                .filter(([_, value]) => value !== undefined)
                .map(([key, value]) => `${key}=${value}`)
                .join('&');

            url = queryParams ? `${endpoint}?${queryParams}` : endpoint;
        }

        // Configure request
        const config: any = {};
        if (isFormData) {
            config.headers = { "Content-Type": "multipart/form-data" };
        }

        // Make API call
        let response: ApiResponse<T>;

        console.log(url, data, method, config, "rdler");
        switch (method) {
            case 'get':
                response = await axiosAdmin.get(url, config);
                break;
            case 'post':
                response = await axiosAdmin.post(url, data, config);
                break;
            case 'put':
                response = await axiosAdmin.put(url, data, config);
                break;
            case 'delete':
                response = await axiosAdmin.delete(url, config);
                break;
        }
        // console.log(response, "response api handler");
        // Handle success
        if (response?.status === 200 || response?.data?.success || response?.status === 201) {
            if (successMessage) {
                toast.success(successMessage);
            }

            if (onSuccess && response.data) {
                onSuccess(response.data);
            }

            return response.data || null;
        }

        return null;
    } catch (error: any) {
        // Handle 404 differently in some cases
        if (error?.status === 404) {
            if (errorMessage) {
                toast.success(errorMessage);
            }

            if (onError) {
                onError(error);
            }
        } else if (error?.status === 409) {
            if (error?.response?.data?.detail) {
                toast.success(error.response.data.detail);
            }

            if (onError) {
                onError(error);
            }
        } else {
            // Handle other errors
            toast.error(error?.message || errorMessage);
            if (onError) {
                onError(error);
            }
        }

        return null;
    } finally {
        dispatch(setIsLoading(false));
    }
};

// ============= Dashboard & Profile =============

export const fetchProfileData = async (dispatch: AppDispatch) => {
    return apiHandler(dispatch, 'get', '/auth/profile', {
        successMessage: "Profile has fetched successfully!",
        onSuccess: (data) => {
            dispatch(setProfileData(data))
        },
        onError: () => dispatch(setProfileData(null))
    })
}

// ============= Pharmacies =============

export const fetchAllPharmacies = async (dispatch: AppDispatch) => {
    return apiHandler(dispatch, 'get', '/user/pharmacies', {
        data: {},
        onSuccess: (data) => dispatch(setPharmaciesData(data)),
        onError: (error) => {
            if (error.status === 404) {
                dispatch(setPharmaciesData([]));
            }
        },
    })
}

export const addNewPharmacy = async (dispatch: AppDispatch, data: any) => {
    return apiHandler(dispatch, 'post', '/pharmacy/add', {
        data,
        successMessage: "Pharmacy has been created successfully!",
        // onSuccess: () => fetchAllPharmacies(dispatch)
    })
}

export const fetchPharmacyDetails = async (dispatch: AppDispatch, id?: string) => {
    return apiHandler(dispatch, 'get', '/pharmacy/get_by_id/' + id, {
        successMessage: "Pharmacy has been fetched successfully!",
        // onSuccess: () => fetchAllPharmacies(dispatch)
    })
}

// ============= Requests =============

export const fetchAllRequests = async (dispatch: AppDispatch) => {
    return apiHandler(dispatch, 'post', '/request/get_all', {
        data: {},
        successMessage: "Requests have been fetched successfully!",
        onSuccess: (data) => {
            dispatch(setRequestsData(data))
        },
        onError: (error) => {
            if (error.status === 404) {
                dispatch(setRequestsData([]));
            }
        },
        errorMessage: "Requests not found."
    })
}

// ============= Get All Prescribers  =============

export const getAllUserPrescribers = async (dispatch: AppDispatch) => {
    return apiHandler(dispatch, 'get', '/user/prescribers', {
        data: {},
        onSuccess: (data) => {
            dispatch(setPrescribersData(data?.data))
        },
        onError: (error) => {
            if (error.status === 404) {
                dispatch(setPrescribersData([]));
            }
        },
        errorMessage: "Prescribers not found."
    })
};

// ============= Get User Requests   =============
export const getUserRequests = async (dispatch: AppDispatch, id?: string) => {
    return apiHandler(dispatch, 'get', '/pa_request/get_by_id/requests/user/' + id, {
        data: {},
        onSuccess: (data) => {
            dispatch(setUserRequestsData(data)); // Changed to use the new action
        },
        onError: (error) => {
            if (error.status === 404) {
                dispatch(setUserRequestsData([])); // Changed to use the new action
            }
        },
        errorMessage: "User requests not found."
    })
};
