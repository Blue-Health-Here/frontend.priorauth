import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "../store";
import { updateSystemTheme } from "../store/features/theme/themeSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

// Theme effect component that runs inside Redux Provider
const ThemeEffect: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isDark } = useAppSelector(state => state.theme);

  useEffect(() => {
    const root = document.documentElement;

    // Remove existing theme classes
    root.classList.remove('light', 'dark');

    // Add current theme class
    root.classList.add(isDark ? 'dark' : 'light');
  }, [isDark]);

  useEffect(() => {
    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = () => {
      dispatch(updateSystemTheme());
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [dispatch]);

  return null;
};

export default function ThemeProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeEffect />
        {children}
      </PersistGate>
    </Provider>
  );
}