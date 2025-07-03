import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
    reqsProgressNotesUploaded: [],
};

const requestProgressNotesSlice = createSlice({
    name: "requestProgressNotes",
    initialState,
    reducers: {
        setRequestProgressNotes: (state, action) => {
            const { requestId, uploadedFiles }: any = action.payload;
            const existingIndex = state.reqsProgressNotesUploaded.findIndex(
                (item: any) => item.requestId === requestId
            );

            if (existingIndex !== -1) {
                // Replace existing entry
                state.reqsProgressNotesUploaded[existingIndex] = {
                    requestId,
                    uploadedFiles,
                };
            } else {
                // Add new entry
                state.reqsProgressNotesUploaded.push({
                    requestId,
                    uploadedFiles,
                });
            }
        },

        // Delete a file from a request's uploadedFiles array
        deleteUploadedProgressNote: (state, action) => {
            const { requestId, fileName } = action.payload;
            const requestEntry = state.reqsProgressNotesUploaded.find(
                (item: any) => item.requestId === requestId
            );

            if (requestEntry) {
                requestEntry.uploadedFiles = requestEntry.uploadedFiles.filter(
                    (file: any) => file.name !== fileName
                );
            }
        },

        resetRequestProgressNotes: (state) => {
            state.reqsProgressNotesUploaded = [];
        },
    },
});

export const { setRequestProgressNotes, deleteUploadedProgressNote, resetRequestProgressNotes } = requestProgressNotesSlice.actions;

export default requestProgressNotesSlice.reducer;
