
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, Phone } from 'lucide-react';

const Footer = () => {
  const scrollToSection = (e, href) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-slate-950 text-slate-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div>
            <div className="flex items-center mb-4">
              <span className="text-2xl font-extrabold text-primary">Paddles</span>
              <span className="text-2xl font-extrabold text-secondary">PK</span>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">
              Pakistan's premier padel court booking platform. Find and book the best courts across the country.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <span className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-4 block">Quick Links</span>
            <ul className="space-y-2">
              <li>
                <a href="#home" onClick={(e) => scrollToSection(e, '#home')} className="text-sm text-slate-300 hover:text-primary transition-colors duration-200">
                  Home
                </a>
              </li>
              <li>
                <a href="#arenas" onClick={(e) => scrollToSection(e, '#arenas')} className="text-sm text-slate-300 hover:text-primary transition-colors duration-200">
                  Arenas
                </a>
              </li>
              <li>
                <a href="#about" onClick={(e) => scrollToSection(e, '#about')} className="text-sm text-slate-300 hover:text-primary transition-colors duration-200">
                  About
                </a>
              </li>
              <li>
                <a href="#contact" onClick={(e) => scrollToSection(e, '#contact')} className="text-sm text-slate-300 hover:text-primary transition-colors duration-200">
                  Contact
                </a>
              </li>
              <li>
                <Link to="/terms" className="text-sm text-slate-300 hover:text-primary transition-colors duration-200">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-sm text-slate-300 hover:text-primary transition-colors duration-200">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <span className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-4 block">Contact Us</span>
            <ul className="space-y-3 mb-6">
              <li className="flex items-center space-x-2 text-sm text-slate-300">
                <Mail className="h-4 w-4 text-primary" />
                <span>info@paddlespk.com</span>
              </li>
              <li className="flex items-center space-x-2 text-sm text-slate-300">
                <Phone className="h-4 w-4 text-primary" />
                <span>+92 300 1234567</span>
              </li>
            </ul>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-primary transition-colors duration-200">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-primary transition-colors duration-200">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-primary transition-colors duration-200">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-8 pt-8 text-center">
          <p className="text-sm text-slate-400">
            © {new Date().getFullYear()} PaddlesPK. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
