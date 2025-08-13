import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeState {
    mode: ThemeMode;
    isDark: boolean;
}

// const getSystemTheme = (): boolean => {
//     if (typeof window !== 'undefined') {
//         return window.matchMedia('(prefers-color-scheme: dark)').matches;
//     }
//     return false;
// };

// const getInitialTheme = (): ThemeState => {
//     // Default to system preference
//     const systemIsDark = getSystemTheme();

//     return {
//         mode: 'system',
//         isDark: systemIsDark
//     };
// };

// const initialState: ThemeState = getInitialTheme();

// const themeSlice = createSlice({
//     name: 'theme',
//     initialState,
//     reducers: {
//         setThemeMode: (state, action: PayloadAction<ThemeMode>) => {
//             state.mode = action.payload;

//             if (action.payload === 'system') {
//                 state.isDark = getSystemTheme();
//             } else {
//                 state.isDark = action.payload === 'dark';
//             }
//         },
//         toggleTheme: (state) => {
//             if (state.mode === 'system') {
//                 // If currently system, switch to opposite of current system theme
//                 state.mode = state.isDark ? 'light' : 'dark';
//                 state.isDark = !state.isDark;
//             } else {
//                 // Toggle between light and dark
//                 state.mode = state.isDark ? 'light' : 'dark';
//                 state.isDark = !state.isDark;
//             }
//         },
//         updateSystemTheme: (state) => {
//             // Only update if mode is system
//             if (state.mode === 'system') {
//                 state.isDark = getSystemTheme();
//             }
//         }
//     }
// });

// export const { setThemeMode, toggleTheme, updateSystemTheme } = themeSlice.actions;
// export default themeSlice.reducer;

// themeSlice.ts
const getSystemTheme = (): boolean => {
    if (typeof window !== 'undefined' && window.matchMedia) {
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
};

const getInitialTheme = (): ThemeState => {
    return {
        mode: 'system',
        isDark: false // default placeholder, will be fixed after mount
    };
};

const themeSlice = createSlice({
    name: 'theme',
    initialState: getInitialTheme(),
    reducers: {
        setThemeMode: (state, action: PayloadAction<ThemeMode>) => {
            state.mode = action.payload;
            state.isDark =
                action.payload === 'system'
                    ? getSystemTheme()
                    : action.payload === 'dark';
        },
        toggleTheme: (state) => {
            if (state.mode === 'system') {
                state.mode = state.isDark ? 'light' : 'dark';
                state.isDark = !state.isDark;
            } else {
                state.mode = state.isDark ? 'light' : 'dark';
                state.isDark = !state.isDark;
            }
        },
        updateSystemTheme: (state) => {
            if (state.mode === 'system') {
                state.isDark = getSystemTheme();
            }
        }
    }
});

export const { setThemeMode, toggleTheme, updateSystemTheme } = themeSlice.actions;
export default themeSlice.reducer;

