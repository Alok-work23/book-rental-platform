import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header'; // Uses the Header component you already have

export default function Layout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        {/* The Outlet will render the current page (e.g., BooksPage, ProfilePage) */}
        <Outlet />
      </main>
    </div>
  );
}