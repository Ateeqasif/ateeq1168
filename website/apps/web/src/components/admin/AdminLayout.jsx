import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import {
  LayoutDashboard, Building2, CalendarDays, CreditCard,
  Crown, Users, Headphones, LogOut, Menu, X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const navItems = [
  { path: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/admin/courts', label: 'Courts', icon: Building2 },
  { path: '/admin/bookings', label: 'Bookings', icon: CalendarDays },
  { path: '/admin/payments', label: 'Payments', icon: CreditCard },
  { path: '/admin/vip', label: 'VIP Members', icon: Crown },
  { path: '/admin/users', label: 'Users', icon: Users },
  { path: '/admin/tickets', label: 'Support Tickets', icon: Headphones },
];

const AdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { admin, adminLogout } = useAdminAuth();

  const handleLogout = () => {
    adminLogout();
    navigate('/admin/login');
  };

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Sidebar */}
      <aside className={cn(
        'fixed inset-y-0 left-0 z-50 w-64 bg-[#0f1e2e] text-white flex flex-col transition-transform duration-200 lg:translate-x-0 lg:static lg:flex',
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      )}>
        <div className="flex items-center gap-2 px-5 py-4 border-b border-white/10">
          <Link to="/" className="flex items-center gap-1">
            <img src="/logo.svg" alt="PaddlesPK" className="h-12 w-auto" />
          </Link>
          <span className="ml-auto text-xs bg-orange-500 px-2 py-0.5 rounded font-semibold">Admin</span>
          <button className="lg:hidden ml-1 text-white/60 hover:text-white" onClick={() => setSidebarOpen(false)}>
            <X className="h-4 w-4" />
          </button>
        </div>

        <nav className="flex-1 py-3 overflow-y-auto">
          {navItems.map(({ path, label, icon: Icon }) => (
            <Link
              key={path}
              to={path}
              onClick={() => setSidebarOpen(false)}
              className={cn(
                'flex items-center gap-3 px-5 py-3 text-sm font-medium transition-colors hover:bg-white/10',
                location.pathname === path
                  ? 'bg-orange-500/20 text-orange-400 border-r-2 border-orange-500'
                  : 'text-gray-300'
              )}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {label}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10">
          <p className="text-xs text-gray-500 truncate mb-2">{admin?.email}</p>
          <Button
            variant="ghost" size="sm"
            onClick={handleLogout}
            className="w-full justify-start text-gray-400 hover:text-white hover:bg-white/10 px-2"
          >
            <LogOut className="h-4 w-4 mr-2" /> Logout
          </Button>
        </div>
      </aside>

      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="bg-white border-b px-4 py-3 flex items-center gap-3 lg:hidden shrink-0">
          <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(true)}>
            <Menu className="h-5 w-5" />
          </Button>
          <span className="font-bold text-[#0f1e2e]">PaddlesPK Admin</span>
        </header>
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
