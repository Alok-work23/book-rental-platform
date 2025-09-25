import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { AuthProvider } from './contexts/AuthContext.tsx';
import { BookProvider } from './contexts/BookContext.tsx';
import { CartProvider } from './contexts/CartContext.tsx';
import { OrderProvider } from './contexts/OrderContext.tsx';
import { ThemeProvider } from './contexts/ThemeContext.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <BookProvider>
          <CartProvider>
            <OrderProvider>
              <App />
            </OrderProvider>
          </CartProvider>
        </BookProvider>
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>
);