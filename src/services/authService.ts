import toast from "react-hot-toast";
import api from "../api/instance";
import { AppDispatch } from "../store";
import { setIsLoading } from "../store/features/global/globalSlice";
import { FormikValues } from "formik";
import { setUser } from "../store/features/auth/authSlice";

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

        // console.log(url, data, method, config, "rdler");
        switch (method) {
            case 'get':
                response = await api.get(url, config);
                break;
            case 'post':
                response = await api.post(url, data, config);
                break;
            case 'put':
                response = await api.put(url, data, config);
                break;
            case 'delete':
                response = await api.delete(url, config);
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
            if (error?.response?.data?.detail) {
                toast.success(error.response.data.detail);
            }

            if (onError) {
                onError(error);
            }
        } if (error?.status === 409) {
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

// ============= Auth Screens & Logout =============

export const submitLogin = async (dispatch: AppDispatch, values?: FormikValues) => {
    return apiHandler(dispatch, 'post', '/auth/login', {
        data: values,
        successMessage: "User has logged in successfully!",
        onSuccess: (data) => {
            localStorage.setItem("user", JSON.stringify(data));
            dispatch(setUser(data))
        },
        onError: () => dispatch(setUser(null))
    });
};

export const handleLogout = async () => {
    localStorage.clear();
}

export const handleInviteValidate = async (dispatch: AppDispatch, data: any, inviteCode?: string) => {
    return apiHandler(dispatch, 'post', `/prescriber-invite/get_one_by_query/validate-invite/${inviteCode}`, {
        data
    });
};

export const handleAccessInvite = async (dispatch: AppDispatch, data: any, inviteCode?: string) => {
    return apiHandler(dispatch, 'post', `/prescriber-invite/get_one_by_query/access-invite/${inviteCode}`, {
        data
    });
};
