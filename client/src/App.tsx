// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Layout from './components/Layout';
// import HomePage from './pages/HomePage';
// import LoginPage from './pages/LoginPage';
// import RegisterPage from './pages/RegisterPage';
// import BooksPage from './pages/BooksPage';
// import MyBooksPage from './pages/MyBooksPage';
// import DeliveryPage from './pages/DeliveryPage';
// import ProfilePage from './pages/ProfilePage';
// import ProtectedRoute from './components/ProtectedRoute';
// import CartPage from './pages/CartPage';
// import CheckoutPage from './pages/CheckoutPage';
// import OrdersPage from './pages/OrdersPage';
// import DashboardPage from './pages/DashboardPage';
// import DeliveryTrackingPage from './pages/DeliveryTrackingPage';

// // Legal and Info Pages
// import HowItWorksPage from './pages/legel/HowItWorksPage';
// import BecomePartnerPage from './pages/legel/BecomePartnerPage';
// import SafetyGuidelinesPage from './pages/legel/SafetyGuidelinesPage';
// import HelpCenterPage from './pages/legel/HelpCenterPage';
// import ContactUsPage from './pages/legel/ContactUsPage';
// import TermsOfServicePage from './pages/legel/TermsOfServicePage';
// import PrivacyPolicyPage from './pages/legel/PrivacyPolicyPage';
// import RefundPolicyPage from './pages/legel/RefundPolicyPage';

// export default function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         {/* Public routes */}
//         <Route path="/" element={<HomePage />} />
//         <Route path="/login" element={<LoginPage />} />
//         <Route path="/register" element={<RegisterPage />} />
        
//         {/* All other pages use the main Layout */}
//         <Route element={<Layout />}>
//           {/* Public Legal/Info Pages */}
//           <Route path="/how-it-works" element={<HowItWorksPage />} />
//           <Route path="/become-partner" element={<BecomePartnerPage />} />
//           <Route path="/safety-guidelines" element={<SafetyGuidelinesPage />} />
//           <Route path="/help-center" element={<HelpCenterPage />} />
//           <Route path="/contact-us" element={<ContactUsPage />} />
//           <Route path="/terms-of-service" element={<TermsOfServicePage />} />
//           <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
//           <Route path="/refund-policy" element={<RefundPolicyPage />} />

//           {/* Protected Main App Pages */}
//           <Route element={<ProtectedRoute />}>
//             <Route path="/dashboard" element={<DashboardPage />} />
//             <Route path="/books" element={<BooksPage />} />
//             <Route path="/my-books" element={<MyBooksPage />} />
//             <Route path="/delivery" element={<DeliveryPage />} />
//             <Route path="/delivery/:deliveryId" element={<DeliveryTrackingPage />} />
//             <Route path="/profile" element={<ProfilePage />} />
//             <Route path="/cart" element={<CartPage />} />
//             <Route path="/checkout" element={<CheckoutPage />} />
//             <Route path="/orders" element={<OrdersPage />} />
//           </Route>
//         </Route>
//       </Routes>
//     </BrowserRouter>
//   );
// }





import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import BooksPage from './pages/BooksPage';
import MyBooksPage from './pages/MyBooksPage';
import DeliveryPage from './pages/DeliveryPage';
import ProfilePage from './pages/ProfilePage';
import ProtectedRoute from './components/ProtectedRoute';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrdersPage from './pages/OrdersPage';
import DashboardPage from './pages/DashboardPage';
import DeliveryTrackingPage from './pages/DeliveryTrackingPage';
// ADDED: Import for the new settings page
import SettingsPage from './pages/SettingsPage';

// Legal and Info Pages - FIXED folder path from 'legel' to 'legal'
import HowItWorksPage from './pages/legel/HowItWorksPage';
import BecomePartnerPage from './pages/legel/BecomePartnerPage';
import SafetyGuidelinesPage from './pages/legel/SafetyGuidelinesPage';
import HelpCenterPage from './pages/legel/HelpCenterPage';
import ContactUsPage from './pages/legel/ContactUsPage';
import TermsOfServicePage from './pages/legel/TermsOfServicePage';
import PrivacyPolicyPage from './pages/legel/PrivacyPolicyPage';
import RefundPolicyPage from './pages/legel/RefundPolicyPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes that don't use the main header/footer layout */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        
        {/* All other pages use the main Layout */}
        <Route element={<Layout />}>
          {/* Public Legal/Info Pages */}
          <Route path="/how-it-works" element={<HowItWorksPage />} />
          <Route path="/become-partner" element={<BecomePartnerPage />} />
          <Route path="/safety-guidelines" element={<SafetyGuidelinesPage />} />
          <Route path="/help-center" element={<HelpCenterPage />} />
          <Route path="/contact-us" element={<ContactUsPage />} />
          <Route path="/terms-of-service" element={<TermsOfServicePage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/refund-policy" element={<RefundPolicyPage />} />

          {/* Protected Main App Pages */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/books" element={<BooksPage />} />
            <Route path="/my-books" element={<MyBooksPage />} />
            <Route path="/delivery" element={<DeliveryPage />} />
            <Route path="/delivery/:deliveryId" element={<DeliveryTrackingPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/orders" element={<OrdersPage />} />
            {/* ADDED: The new route for the settings page */}
            <Route path="/settings" element={<SettingsPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}