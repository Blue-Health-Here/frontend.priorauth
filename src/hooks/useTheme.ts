import { setThemeMode, ThemeMode, toggleTheme } from "@/store/features/theme/themeSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

export const useTheme = () => {
    const dispatch = useAppDispatch();
    const { mode, isDark } = useAppSelector(state => state.theme);

    const setTheme = (newMode: ThemeMode) => {
        dispatch(setThemeMode(newMode));
    };

    const toggle = () => {
        dispatch(toggleTheme());
    };

    return {
        mode,
        isDark,
        isLight: !isDark,
        setTheme,
        toggleTheme: toggle
    };
};
