import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { AuthProvider } from './contexts/AuthContext.tsx';
import { BookProvider } from './contexts/BookContext.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* Providers are now correctly wrapping the App */}
    <AuthProvider>
      <BookProvider>
        <App />
      </BookProvider>
    </AuthProvider>
  </StrictMode>
);