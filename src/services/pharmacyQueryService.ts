import toast from "react-hot-toast";
import { axiosAdmin } from "../api/instance";

// Types
type ApiMethod = 'get' | 'post' | 'put' | 'delete' | 'patch';
type ApiResponse<T = any> = {
    data: T & { success?: boolean };
    status?: number;
};
type ErrorResponse = {
    message?: string;
    status?: number;
    response?: { data?: { detail?: string } };
};

// Generic API handler that centralizes common logic
const apiHandler = async <T = any>(
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
            case 'patch':
                response = await axiosAdmin.patch(url, data, config);
                break;
            case 'delete':
                response = await axiosAdmin.delete(url, config);
                break;
        }

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
            toast.error(error?.message);
        }

        if (onError) {
            onError(error);
        }

        return null;
    }
};

// Requests
export const getPharmacyRequests = async (
    prescriberId?: string, 
    pharmacyId?: string, 
    userId?: string
) => {
    if (prescriberId) {
        return apiHandler('get', `/pa_request/get_by_id/requests/prescriber/${prescriberId}`, {});
    }
    if (pharmacyId) {
        return apiHandler('get', `/pa_request/get_by_id/requests/user/${pharmacyId}`, {});
    }
    return apiHandler('get', `/pa_request/get_by_id/requests/user/${userId}`, {});
};

export const updateRequestStatusQuery = async (id?: string, data?: any) => {
    return apiHandler('put', `/pa_request/update/${id}`, { data });
};

export const updateRequestNotesQuery = async (id?: string, data?: any) => {
    return apiHandler('patch', `/pa_request/update/${id}/notes`, { data });
};

export const getRequestStatuses = async () => {
    return apiHandler('post', `/status/get_all`, {
        data: {
            pagedListRequest: {
                pageNo: 1,
                pageSize: 10000,
                getAllRecords: true
            }
        }
    });
};

export const extractMedsICDCodes = async (data: any) => {
    return apiHandler('post', '/pa_request/add/extract-meds-icd-codes', { data })
};

export const handleAddNewRequest = async (data: any) => {
    return apiHandler('post', `/pa_request/add`, { data })
};

// Request Details and Status History
export const getRequestDetailsQuery = async (id?: string) => {
    return apiHandler('get', `/pa_request/get_by_id/${id}`, {});
};

export const getStatusHistoryByRequestQuery = async (id?: string) => {
    return apiHandler('get', `/status-history/get_by_id/${id}/statuses`, {});
};

// Request Files
export const postRequestUploadFilesQuery = async (id?: string, formData?: FormData) => {
    return apiHandler('patch', `/pa_request/update/${id}/files/upload`, {
        isFormData: true,
        data: formData,
    });
};

export const postChartNotesFilesQuery = async (id?: string, formData?: FormData) => {
    return apiHandler('patch', `/pa_request/update/${id}/chartNotes`, {
        isFormData: true,
        data: formData,
    });
};

export const deleteReqUploadedFileQuery = async (reqId?: string, id?: string) => {
    return apiHandler('delete', `/pa_request/delete/${reqId}/file/${id}`, {});
};

export const postStartAiAnalysisQuery = async (id?: string) => {
    return apiHandler('post', `/pa_request/add/${id}/chartNotesAnalyzer`, {});
};

export const fetchAiAnalysisQuery = async (id?: string) => {
    return apiHandler('get', `/pa_request/get_by_id/chartNotesAnalysis/${id}`, {});
};

export const postGenerateMedicalNecessityQuery = async (id?: string) => {
    return apiHandler('post', `/pa_request/add/${id}/generate-letter-of-medical-necessity`, {});
};
