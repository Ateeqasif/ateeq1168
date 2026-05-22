import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, ChevronDown, LogOut, BookMarked, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/contexts/AuthContext';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const navLinks = [
    { name: 'Arenas', href: '/#arenas' },
    { name: 'Book a Court', href: '/#booking' },
    { name: 'About', href: '/#about' },
    { name: 'Partner', href: '/partner' },
    { name: 'VIP', href: '/vip' },
  ];

  const handleNavigation = (e, href) => {
    e.preventDefault();
    setIsOpen(false);

    if (href.startsWith('/#')) {
      const hash = href.substring(1);
      if (location.pathname !== '/') {
        navigate(href);
      } else {
        const element = document.querySelector(hash);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(href);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#1a2a4a]/95 backdrop-blur supports-[backdrop-filter]:bg-[#1a2a4a]/80">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 shrink-0">
            <span className="text-2xl font-extrabold text-white">Paddles</span>
            <span className="text-2xl font-extrabold text-primary">PK</span>
          </Link>

          {/* Center Navigation */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavigation(e, link.href)}
                className={`text-sm xl:text-base font-medium transition-colors duration-200 ${
                  location.pathname === link.href
                    ? 'text-primary'
                    : 'text-white/90 hover:text-primary'
                }`}
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right side: auth-aware */}
          <div className="hidden md:flex items-center space-x-4 xl:space-x-6">
            {user ? (
              <>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center gap-2 text-sm font-medium text-white/90 hover:text-primary transition-colors outline-none">
                      <div className="w-8 h-8 rounded-full bg-primary/30 flex items-center justify-center">
                        <User className="w-4 h-4 text-primary" />
                      </div>
                      <span className="max-w-[120px] truncate">{user.name || user.email}</span>
                      <ChevronDown className="h-4 w-4" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-[#1a2a4a] border-white/10 text-white w-48">
                    <DropdownMenuItem
                      onClick={() => navigate('/my-bookings')}
                      className="hover:bg-white/10 focus:bg-white/10 cursor-pointer gap-2"
                    >
                      <BookMarked className="w-4 h-4" /> My Bookings
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-white/10" />
                    <DropdownMenuItem
                      onClick={handleLogout}
                      className="hover:bg-white/10 focus:bg-white/10 cursor-pointer gap-2 text-red-400"
                    >
                      <LogOut className="w-4 h-4" /> Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button
                  onClick={(e) => handleNavigation(e, '/#booking')}
                  className="bg-[#FF6B35] text-white hover:bg-[#FF6B35]/90 hover:-translate-y-0.5 transition-all duration-200 active:scale-[0.98] font-semibold px-4 xl:px-6 h-11"
                >
                  Book an Arena
                </Button>
              </>
            ) : (
              <>
                <div className="flex items-center space-x-4 border-r border-white/20 pr-4 xl:pr-6">
                  <Link to="/signin" className="text-sm xl:text-base font-medium text-white hover:text-primary transition-colors">
                    Sign In
                  </Link>
                  <Link to="/signup" className="text-sm xl:text-base font-medium text-white hover:text-primary transition-colors">
                    Sign Up
                  </Link>
                </div>
                <Button
                  onClick={(e) => handleNavigation(e, '/#booking')}
                  className="bg-[#FF6B35] text-white hover:bg-[#FF6B35]/90 hover:-translate-y-0.5 transition-all duration-200 active:scale-[0.98] font-semibold px-4 xl:px-6 h-11"
                >
                  Book an Arena
                </Button>
              </>
            )}
          </div>

          {/* Mobile menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                <Menu className="h-7 w-7" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-[#1a2a4a] border-l-white/10 overflow-y-auto">
              <div className="flex flex-col space-y-6 mt-8">
                <div className="flex items-center mb-4">
                  <span className="text-2xl font-extrabold text-white">Paddles</span>
                  <span className="text-2xl font-extrabold text-primary">PK</span>
                </div>
                <div className="flex flex-col space-y-4 border-b border-white/10 pb-6">
                  {navLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      onClick={(e) => handleNavigation(e, link.href)}
                      className="text-lg font-medium text-white hover:text-primary transition-colors duration-200"
                    >
                      {link.name}
                    </a>
                  ))}
                </div>
                <div className="flex flex-col space-y-4 pt-2">
                  {user ? (
                    <>
                      <span className="text-sm text-muted-foreground">Signed in as {user.name || user.email}</span>
                      <Link
                        to="/my-bookings"
                        onClick={() => setIsOpen(false)}
                        className="text-lg font-medium text-white hover:text-primary flex items-center gap-2"
                      >
                        <BookMarked className="w-5 h-5" /> My Bookings
                      </Link>
                      <button
                        onClick={() => { setIsOpen(false); handleLogout(); }}
                        className="text-lg font-medium text-red-400 hover:text-red-300 flex items-center gap-2 text-left"
                      >
                        <LogOut className="w-5 h-5" /> Sign Out
                      </button>
                    </>
                  ) : (
                    <>
                      <Link to="/signin" className="text-lg font-medium text-white hover:text-primary" onClick={() => setIsOpen(false)}>
                        Sign In
                      </Link>
                      <Link to="/signup" className="text-lg font-medium text-white hover:text-primary" onClick={() => setIsOpen(false)}>
                        Sign Up
                      </Link>
                    </>
                  )}
                  <Button
                    onClick={(e) => handleNavigation(e, '/#booking')}
                    className="bg-[#FF6B35] text-white hover:bg-[#FF6B35]/90 w-full h-12 text-lg font-semibold transition-all duration-200 active:scale-[0.98] mt-4"
                  >
                    Book an Arena
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
