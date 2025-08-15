import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getRequestDetailsQuery,
  getStatusHistoryByRequestQuery,
  postRequestUploadFilesQuery,
  postChartNotesFilesQuery,
  deleteReqUploadedFileQuery,
  postStartAiAnalysisQuery,
  fetchAiAnalysisQuery,
  postGenerateMedicalNecessityQuery,
} from '@/services/pharmacyQueryService';

export const requestDetailsKeys = {
  all: ['requestDetails'] as const,
  detail: (id: string) => [...requestDetailsKeys.all, 'detail', id] as const,
  statuses: (id: string) => [...requestDetailsKeys.all, 'statuses', id] as const,
  files: (id: string) => [...requestDetailsKeys.all, 'files', id] as const,
};

export const useRequestDetails = (id?: string) => {
  return useQuery({
    queryKey: id ? requestDetailsKeys.detail(id) : requestDetailsKeys.detail('unknown'),
    queryFn: async () => {
      if (!id) return null;
      return await getRequestDetailsQuery(id);
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};

export const useRequestStatusesHistory = (id?: string) => {
  return useQuery({
    queryKey: id ? requestDetailsKeys.statuses(id) : requestDetailsKeys.statuses('unknown'),
    queryFn: async () => {
      if (!id) return null;
      return await getStatusHistoryByRequestQuery(id);
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};

export const useUploadRequestFiles = (id?: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (formData: FormData) => {
      if (!id) throw new Error('Missing request id');
      return await postRequestUploadFilesQuery(id, formData);
    },
    onSuccess: () => {
      if (id) {
        queryClient.invalidateQueries({ queryKey: requestDetailsKeys.files(id) });
        queryClient.invalidateQueries({ queryKey: requestDetailsKeys.detail(id) });
      }
    },
  });
};

export const useUploadChartNotes = (id?: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (formData: FormData) => {
      if (!id) throw new Error('Missing request id');
      return await postChartNotesFilesQuery(id, formData);
    },
    onSuccess: () => {
      if (id) {
        queryClient.invalidateQueries({ queryKey: requestDetailsKeys.files(id) });
        queryClient.invalidateQueries({ queryKey: requestDetailsKeys.detail(id) });
      }
    },
  });
};

export const useDeleteRequestFile = (reqId?: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (fileId: string) => {
      if (!reqId) throw new Error('Missing request id');
      return await deleteReqUploadedFileQuery(reqId, fileId);
    },
    onSuccess: () => {
      if (reqId) {
        queryClient.invalidateQueries({ queryKey: requestDetailsKeys.files(reqId) });
        queryClient.invalidateQueries({ queryKey: requestDetailsKeys.detail(reqId) });
      }
    },
  });
};

export const useStartAiAnalysis = (id?: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      if (!id) throw new Error('Missing request id');
      return await postStartAiAnalysisQuery(id);
    },
    onSuccess: () => {
      if (id) {
        queryClient.invalidateQueries({ queryKey: requestDetailsKeys.detail(id) });
      }
    },
  });
};

export const useFetchAiAnalysis = (id?: string) => {
  return useQuery({
    queryKey: ['aiAnalysis', id],
    queryFn: async () => {
      if (!id) return null;
      return await fetchAiAnalysisQuery(id);
    },
    enabled: !!id,
    staleTime: 0,
  });
};

export const useGenerateMedicalNecessity = (id?: string) => {
  return useMutation({
    mutationFn: async () => {
      if (!id) throw new Error('Missing request id');
      return await postGenerateMedicalNecessityQuery(id);
    },
  });
};
