import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getPharmacyRequests, updateRequestNotesQuery, updateRequestStatusQuery, getRequestStatuses, extractMedsICDCodes, handleAddNewRequest } from '@/services/pharmacyQueryService';
// import { extractMedsICDCodes, handleAddNewRequest } from '@/services/pharmacyService';
import { toast } from 'react-hot-toast';

// Query keys for consistent caching
export const pharmacyRequestsKeys = {
  all: ['pharmacyRequests'] as const,
  lists: () => [...pharmacyRequestsKeys.all, 'list'] as const,
  list: (filters: { prescriberId?: string; pharmacyId?: string; userId?: string }) => 
    [...pharmacyRequestsKeys.lists(), filters] as const,
  details: () => [...pharmacyRequestsKeys.all, 'detail'] as const,
  detail: (id: string) => [...pharmacyRequestsKeys.details(), id] as const,
  statuses: () => [...pharmacyRequestsKeys.all, 'statuses'] as const,
};

// Hook to fetch pharmacy requests
export const usePharmacyRequests = (
  prescriberId?: string,
  pharmacyId?: string,
  userId?: string
) => {
  // Filter out undefined values for consistent query keys
  const filters = {
    ...(prescriberId && { prescriberId }),
    ...(pharmacyId && { pharmacyId }),
    ...(userId && { userId })
  };
  
  return useQuery({
    queryKey: pharmacyRequestsKeys.list(filters),
    queryFn: async () => {
      return await getPharmacyRequests(prescriberId, pharmacyId, userId);
    },
    staleTime: 10 * 60 * 1000, // 5 minutes
    gcTime: 15 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
  });
};

// Hook to fetch request statuses
export const useRequestStatuses = () => {
  return useQuery({
    queryKey: pharmacyRequestsKeys.statuses(),
    queryFn: async () => {
      return await getRequestStatuses();
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 20 * 60 * 1000, // 20 minutes
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
  });
};

// Hook to extract medication and ICD codes
export const useExtractCodes = () => {
  return useMutation({
    mutationFn: async (rejectionClaim: string) => {
      return await extractMedsICDCodes({ rejectionclaim: rejectionClaim });
    },
    onError: (error: any) => {
      toast.error("Failed to extract medication and ICD codes", error?.message);
    },
  });
};

// Hook to add new request
export const useAddRequest = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (requestData: any) => {
      return await handleAddNewRequest(requestData);
    },
    onSuccess: () => {
      // Invalidate and refetch pharmacy requests
      queryClient.invalidateQueries({ queryKey: pharmacyRequestsKeys.lists() });
      toast.success("Request added successfully");
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message || error.message || "Failed to add request";
      toast.error(errorMessage);
    },
  });
};

// Hook to update request status
export const useUpdateRequestStatus = () => {
  // const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ 
      requestId, 
      statusData 
    }: { 
      requestId: string; 
      statusData: { statusId: string; paStatus: string; notes: string | null } 
    }) => {
      return await updateRequestStatusQuery(requestId, statusData);
    },
    onSuccess: () => {
      // Don't invalidate the main list - status updates don't affect the list
      toast.success('Status has been updated successfully!');
    },
    onError: (error: any) => {
      toast.error(error?.message || 'Failed to update status');
    },
  });
};

// Hook to update request notes
export const useUpdateRequestNotes = () => {
  // const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ 
      requestId, 
      notes 
    }: { 
      requestId: string; 
      notes: string 
    }) => {
      return await updateRequestNotesQuery(requestId, { notes });
    },
    onSuccess: () => {
      // Don't invalidate the main list - notes updates don't affect the list
      toast.success('Notes updated successfully!');
    },
    onError: (error: any) => {
      toast.error(error?.message || 'Failed to update notes');
    },
  });
};
