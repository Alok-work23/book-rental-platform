// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Layout from './components/Layout';
// import HomePage from './pages/HomePage';
// import LoginPage from './pages/LoginPage';
// import BooksPage from './pages/BooksPage';
// import MyBooksPage from './pages/MyBooksPage';
// import DeliveryPage from './pages/DeliveryPage';
// import ProfilePage from './pages/ProfilePage';
// import CreateProfilePage from './pages/CreateProfilePage';
// import ProtectedRoute from './components/ProtectedRoute';

// export default function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         {/* Public routes that are accessible to everyone */}
//         <Route path="/" element={<HomePage />} />
//         <Route path="/login" element={<LoginPage />} />
//         <Route path="/create-profile" element={<CreateProfilePage />} />

//         {/* Protected routes that require login.
//           These routes share the main Layout (Header + content).
//         */}
//         <Route
//           element={
//             <ProtectedRoute>
//               <Layout />
//             </ProtectedRoute>
//           }
//         >
//           <Route path="/books" element={<BooksPage />} />
//           <Route path="/my-books" element={<MyBooksPage />} />
//           <Route path="/delivery" element={<DeliveryPage />} />
//           <Route path="/profile" element={<ProfilePage />} />
//         </Route>
//       </Routes>
//     </BrowserRouter>
//   );
// }
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage'; // Import RegisterPage
import BooksPage from './pages/BooksPage';
import MyBooksPage from './pages/MyBooksPage';
import DeliveryPage from './pages/DeliveryPage';
import ProfilePage from './pages/ProfilePage';
import CreateProfilePage from './pages/CreateProfilePage';
import ProtectedRoute from './components/ProtectedRoute';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} /> {/* Add register route */}
        <Route path="/create-profile" element={<CreateProfilePage />} />

        {/* Protected routes */}
        <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
          <Route path="/books" element={<BooksPage />} />
          <Route path="/my-books" element={<MyBooksPage />} />
          <Route path="/delivery" element={<DeliveryPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}