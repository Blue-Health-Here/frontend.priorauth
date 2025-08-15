# Frontend Prior Auth Application

This is a React-based frontend application for managing prior authorization requests in the healthcare industry.

## Features

- **React Query Integration**: Uses `@tanstack/react-query` for efficient data fetching, caching, and state management
- **Redux**: State management for authentication and global app state
- **TypeScript**: Full TypeScript support for better development experience
- **Tailwind CSS**: Modern CSS framework for styling
- **Responsive Design**: Mobile-first approach with responsive components

## React Query Integration

The application now uses React Query for data fetching operations, which provides:

- **Automatic Caching**: Data is cached and reused across components
- **Background Updates**: Data is automatically refreshed in the background
- **Loading States**: Built-in loading states that don't show on every refetch
- **Error Handling**: Centralized error handling for API calls
- **Optimistic Updates**: Immediate UI updates with automatic rollback on errors

### Key Benefits

1. **No More Loading Spinners on Revisit**: Data is cached and immediately available when revisiting components
2. **Better User Experience**: Smooth transitions between data states
3. **Reduced API Calls**: Smart caching reduces unnecessary network requests
4. **Real-time Updates**: Automatic background refetching keeps data fresh

### Usage Example

```typescript
import { usePharmacyRequests } from '@/hooks/usePharmacyRequests';

const MyComponent = () => {
  const { data, isLoading, error } = usePharmacyRequests(prescriberId, pharmacyId, userId);
  
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  return <div>{/* Render your data */}</div>;
};
```

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```

## Project Structure

```
src/
├── components/          # Reusable UI components
├── hooks/              # Custom React hooks including React Query hooks
├── pages/              # Page components
├── providers/          # Context providers including QueryProvider
├── services/           # API services
├── store/              # Redux store configuration
└── utils/              # Utility functions
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## Dependencies

- **React Query**: `@tanstack/react-query` for data fetching
- **Redux**: `@reduxjs/toolkit` and `react-redux` for state management
- **UI Components**: Custom components built with Tailwind CSS
- **Form Handling**: Formik and Yup for form validation
- **Routing**: React Router for navigation
