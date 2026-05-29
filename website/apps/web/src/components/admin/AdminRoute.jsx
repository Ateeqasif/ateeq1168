import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import { Loader2 } from 'lucide-react';

const AdminRoute = ({ children }) => {
  const { admin, loading } = useAdminAuth();
  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f1e2e]">
      <Loader2 className="h-8 w-8 animate-spin text-orange-500" />
    </div>
  );
  if (!admin) return <Navigate to="/admin/login" replace />;
  return children;
};

export default AdminRoute;
