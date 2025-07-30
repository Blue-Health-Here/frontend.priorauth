import toast from "react-hot-toast";
import { axiosPortal } from "../api/instance";
import { AppDispatch } from "../store";
import { setIsLoading } from "../store/features/global/globalSlice";
import { setProfileData } from "../store/features/global/globalSlice";

// Types
type ApiMethod = 'get' | 'post' | 'put' | 'delete' | 'patch';
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
                response = await axiosPortal.get(url, config);
                break;
            case 'post':
                response = await axiosPortal.post(url, data, config);
                break;
            case 'put':
                response = await axiosPortal.put(url, data, config);
                break;
                break;
            case 'patch':
                response = await axiosPortal.patch(url, data, config);
                break;
            case 'delete':
                response = await axiosPortal.delete(url, config);
                break;
        }
        // console.log(response, "response api handler");
        // Handle success
        if (
            (response && response.status === 200) ||
            (response && response.data && response.data.success) ||
            (response && response.status === 201)
        ) {
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
        console.log(error, "error");
        // Handle 404 differently in some cases
        if (error?.status === 404) {
            if (errorMessage) {
                toast.success(errorMessage);
            }
        } else if (error?.status === 409) {
            if (error?.response?.data?.detail) {
                toast.success(error.response.data.detail);
            }
        } else if (error?.status === 400) {
            toast.error(error?.response.data.error || error?.message);
        } else {
            // Handle other errors
            toast.error(error?.message || errorMessage);
        }

        if (onError) {
            onError(error);
        }

        return null;
    } finally {
        dispatch(setIsLoading(false));
    }
};

// ============= Dashboard & Profile =============

export const handleStartPortal = async (dispatch: AppDispatch, data: any) => {
    return apiHandler(dispatch, 'post', `/vnc/start`, {
        data
    });
}

export const handleSessionCleanup = async (dispatch: AppDispatch, id: any) => {
    return apiHandler(dispatch, 'get', `/vnc/${id}/cleanup`, {});
}

export const handleFetchPortalStatus = async (dispatch: AppDispatch, id: any) => {
    return apiHandler(dispatch, 'get', `/vnc/status/pharmacy/${id}`, {});
}
