import toast from "react-hot-toast";
import { axiosAdmin } from "../api/instance";
import { AppDispatch } from "../store";
import { setIsLoading } from "../store/features/global/globalSlice";
import { setReqStatusesData } from "@/store/features/admin/requests/statusesSlice";
import { setRequestsData } from "@/store/features/pharmacy/requests/requestsSlice";
import { setProfileData } from "../store/features/global/globalSlice";
import { setPrescribersData } from "@/store/features/pharmacy/prescribers/prescribersSlice";
import { setProfilePassword } from "../store/features/global/globalSlice";

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
                response = await axiosAdmin.get(url, config);
                break;
            case 'post':
                response = await axiosAdmin.post(url, data, config);
                break;
            case 'put':
                response = await axiosAdmin.put(url, data, config);
                break;
                break;
            case 'patch':
                response = await axiosAdmin.patch(url, data, config);
                break;
            case 'delete':
                response = await axiosAdmin.delete(url, config);
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

export const fetchProfileData = async (dispatch: AppDispatch) => {
    return apiHandler(dispatch, 'get', '/auth/profile', {
        successMessage: "Profile has fetched successfully!",
        onSuccess: (data) => {
            dispatch(setProfileData(data))
        },
        onError: () => dispatch(setProfileData(null))
    })
}
// ============= Update Profile =============

export const updateProfileData = async (dispatch: AppDispatch, userId: string, data: any) => {
    return apiHandler(dispatch, 'put', `/user/update/${userId}`, {
        data,
        successMessage: "Profile updated successfully!",
        onSuccess: (updatedData) => {
            dispatch(setProfileData(updatedData));
        }
    });
}

// ============= Requests Statuses =============

export const getAllReqStatuses = async (dispatch: AppDispatch) => {
    return apiHandler(dispatch, 'post', '/status/get_all', {
        data: {
            pagedListRequest: {
                pageNo: 1,
                pageSize: 10000,
                getAllRecords: true
            }
        },
        // successMessage: "Requests Statuses have been fetched successfully!",
        onSuccess: (data) => {
            dispatch(setReqStatusesData(data))
        },
        onError: (error) => {
            if (error.status === 404) {
                dispatch(setReqStatusesData([]));
            }
        },
        errorMessage: "Requests not found."
    })
};

// Requests
export const getAllPharmacyReqs = async (dispatch: AppDispatch, prescriberId?: string) => {
    if (prescriberId) {
        return apiHandler(dispatch, 'get', `/pa_request/get_by_id/requests/prescriber/${prescriberId}`, {
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
    return apiHandler(dispatch, 'post', '/pa_request/get_all', {
        data: {
            pagedListRequest: {
                pageNo: 1,
                pageSize: 10000,
                getAllRecords: true
            }
        },
        onSuccess: (data) => {
            dispatch(setRequestsData(data))
        },
        onError: (error) => {
            if (error.status === 404) {
                dispatch(setRequestsData([]));
            }
        },
        errorMessage: "Requests not found."
    });
};

export const updateRequestStatus = async (dispatch: AppDispatch, id?: string, data?: any, successMessage = 'Status has been updated successfully!') => {
    return apiHandler(dispatch, 'put', `/pa_request/update/${id}`, {
        data,
        successMessage: successMessage
    });
};

export const extractMedsICDCodes = async (dispatch: AppDispatch, data: any) => {
    return apiHandler(dispatch, 'post', '/pa_request/add/extract-meds-icd-codes', {
        data,
    })
};

export const handleAddNewRequest = async (dispatch: AppDispatch, data: any) => {
    return apiHandler(dispatch, 'post', `/pa_request/add`, {
        data
    })
};

export const getRequestDetails = async (dispatch: AppDispatch, id?: string) => {
    return apiHandler(dispatch, 'get', `/pa_request/get_by_id/${id}`, {});
};

export const getRequestStatuses = async (dispatch: AppDispatch, id?: string) => {
    return apiHandler(dispatch, 'get', `/status-history/get_by_id/${id}/statuses`, {});
};

// Request Files
export const postGenerateMedicalNecessity = async (dispatch: AppDispatch, id?: string) => {
    return apiHandler(dispatch, 'post', `/pa_request/add/${id}/generate-letter-of-medical-necessity`, {});
};

export const postChartNotesFiles = async (dispatch: AppDispatch, id?: string, formData?: any) => {
    return apiHandler(dispatch, 'patch', `/pa_request/update/${id}/chartNotes`, {
        isFormData: true,
        data: formData
    });
};

export const postRequestUploadFiles = async (dispatch: AppDispatch, id?: string, formData?: any) => {
    return apiHandler(dispatch, 'patch', `/pa_request/update/${id}/files/upload`, {
        isFormData: true,
        data: formData,
        successMessage: "Files have been uploaded."
    });
};

export const postStartAiAnalysis = async (dispatch: AppDispatch, id?: string) => {
    return apiHandler(dispatch, 'post', `/pa_request/add/${id}/chartNotesAnalyzer`, {});
};

export const fetchAiAnalysis = async (dispatch: AppDispatch, id?: string) => {
    return apiHandler(dispatch, 'get', `/pa_request/get_by_id/chartNotesAnalysis/${id}`, {});
};

export const deleteReqUploadedFile = async (dispatch: AppDispatch, reqId?: string,  id?: string) => {
    return apiHandler(dispatch, 'delete', `/pa_request/delete/${reqId}/file/${id}`, {});
};

// Request Notes
export const updateRequestNotes = async (dispatch: AppDispatch, id?: string, data?: any) => {
    return apiHandler(dispatch, 'patch', `/status-history/update/${id}`, {
        data,
        successMessage: "Notes have been added."
    });
};

// Request Comments
export const addNewReqComment = async (dispatch: AppDispatch, id?: string, data?: any) => {
    return apiHandler(dispatch, 'post', `/pa_request/add/${id}/comments`, {
        data,
        successMessage: "Comments have been added."
    })
};

// ============= Get All Prescribers  =============

export const getAllPrescribers = async (dispatch: AppDispatch, id?: string) => {
    return apiHandler(dispatch, 'get', '/pa-request-prescriber/get_by_id/user/' + id, {
        data: {},
        onSuccess: (data) => {
            dispatch(setPrescribersData(data))
        },
        onError: (error) => {
            if (error.status === 404) {
                dispatch(setPrescribersData([]));
            }
        },
        errorMessage: "Prescribers not found."
    })
};

export const fetchPrescriberDetails = async (dispatch: AppDispatch, id?: string) => {
    return apiHandler(dispatch, 'get', `/pa-request-prescriber/get_by_id/${id}`, {});
};

export const updatePrescriberById = async (dispatch: AppDispatch, data?: any) => {
    return apiHandler(dispatch, 'put', `/pa-request-prescriber/update/${data.id}`, {
        data,
        successMessage: "Prescriber updated successfully!"
    });
};

export const uploadPrescriberImage = async (dispatch: AppDispatch, id?: string, formData?: any) => {
    return apiHandler(dispatch, 'patch', `/pa-request-prescriber/${id}/profile-pic`, {
        isFormData: true,
        data: formData,
        successMessage: "Picture have been updated."
    });
};

// ============= Update settings Password  =============
export const updateProfilePassword = async (dispatch: AppDispatch, userId: string, data: any) => {
    return apiHandler(dispatch, 'post', `/user/change-password/${userId}`, {
        data,
        onSuccess: (updatedData) => {
            dispatch(setProfilePassword(updatedData));
        }
    });
}


export const updateProfilePicture = async (
  dispatch: AppDispatch, 
  userId: string, 
  formData: FormData
) => {
  return apiHandler(dispatch, 'patch', `/user/update/${userId}/profile-pic`, {
    data: formData,
    isFormData: true, 
    successMessage: "Profile picture updated successfully!",
    onSuccess: (updatedData) => {
      dispatch(setProfileData(updatedData));
    }
  });
};