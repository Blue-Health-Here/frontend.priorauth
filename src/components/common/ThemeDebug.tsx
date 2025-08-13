import React from 'react';
import { useTheme } from '@/hooks/useTheme';

// This component is only for debugging theme issues in production
const ThemeDebug: React.FC = () => {
  const { mode, isDark, isLight, setTheme, toggleTheme } = useTheme();

  // Only show in development or when explicitly enabled
  if (process.env.NODE_ENV !== 'development' && !window.location.search.includes('debug=theme')) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg p-4 shadow-lg z-50">
      <h3 className="text-sm font-semibold mb-2 text-gray-800 dark:text-white">Theme Debug</h3>
      <div className="space-y-2 text-xs text-gray-600 dark:text-gray-300">
        <div>Mode: {mode}</div>
        <div>Is Dark: {isDark ? 'Yes' : 'No'}</div>
        <div>Is Light: {isLight ? 'Yes' : 'No'}</div>
        <div>DOM Class: {document.documentElement.className}</div>
        <div>Data Theme: {document.documentElement.getAttribute('data-theme')}</div>
      </div>
      <div className="mt-3 space-x-2">
        <button
          onClick={() => setTheme('light')}
          className="px-2 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Light
        </button>
        <button
          onClick={() => setTheme('dark')}
          className="px-2 py-1 text-xs bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          Dark
        </button>
        <button
          onClick={() => setTheme('system')}
          className="px-2 py-1 text-xs bg-green-500 text-white rounded hover:bg-green-600"
        >
          System
        </button>
        <button
          onClick={toggleTheme}
          className="px-2 py-1 text-xs bg-purple-500 text-white rounded hover:bg-purple-600"
        >
          Toggle
        </button>
      </div>
    </div>
  );
};

export default ThemeDebug;
