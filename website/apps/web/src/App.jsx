import React from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop.jsx';
import { AuthProvider } from './contexts/AuthContext.jsx';
import { AdminAuthProvider } from './contexts/AdminAuthContext.jsx';
import HomePage from './pages/HomePage.jsx';
import SignInPage from './pages/SignInPage.jsx';
import SignUpPage from './pages/SignUpPage.jsx';
import VIPPage from './pages/VIPPage.jsx';
import MyBookingsPage from './pages/MyBookingsPage.jsx';
import PartnerPage from './pages/PartnerPage.jsx';
import SupportPage from './pages/SupportPage.jsx';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage.jsx';
import TermsPage from './pages/TermsPage.jsx';
import AdminLoginPage from './pages/admin/AdminLoginPage.jsx';
import DashboardPage from './pages/admin/DashboardPage.jsx';
import CourtsPage from './pages/admin/CourtsPage.jsx';
import BookingsPage from './pages/admin/BookingsPage.jsx';
import PaymentsPage from './pages/admin/PaymentsPage.jsx';
import VIPMembersPage from './pages/admin/VIPMembersPage.jsx';
import UsersPage from './pages/admin/UsersPage.jsx';
import SupportTicketsPage from './pages/admin/SupportTicketsPage.jsx';
import AdminRoute from './components/admin/AdminRoute.jsx';
import { Toaster } from '@/components/ui/sonner';

function App() {
  return (
    <Router>
      <AdminAuthProvider>
        <AuthProvider>
          <ScrollToTop />
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/vip" element={<VIPPage />} />
            <Route path="/my-bookings" element={<MyBookingsPage />} />
            <Route path="/partner" element={<PartnerPage />} />
            <Route path="/support" element={<SupportPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/terms" element={<TermsPage />} />

            {/* Admin routes */}
            <Route path="/admin/login" element={<AdminLoginPage />} />
            <Route path="/admin/dashboard" element={<AdminRoute><DashboardPage /></AdminRoute>} />
            <Route path="/admin/courts" element={<AdminRoute><CourtsPage /></AdminRoute>} />
            <Route path="/admin/bookings" element={<AdminRoute><BookingsPage /></AdminRoute>} />
            <Route path="/admin/payments" element={<AdminRoute><PaymentsPage /></AdminRoute>} />
            <Route path="/admin/vip" element={<AdminRoute><VIPMembersPage /></AdminRoute>} />
            <Route path="/admin/users" element={<AdminRoute><UsersPage /></AdminRoute>} />
            <Route path="/admin/tickets" element={<AdminRoute><SupportTicketsPage /></AdminRoute>} />
          </Routes>
          <Toaster />
        </AuthProvider>
      </AdminAuthProvider>
    </Router>
  );
}

export default App;
