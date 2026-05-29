import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const scrollToSection = (e, href) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center mb-4">
              <img src="/logo.svg" alt="PaddlesPK" className="h-16 w-auto" />
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
                <Link to="/partner" className="text-sm text-slate-300 hover:text-primary transition-colors duration-200">
                  Partner With Us
                </Link>
              </li>
              <li>
                <Link to="/vip" className="text-sm text-slate-300 hover:text-primary transition-colors duration-200">
                  VIP Membership
                </Link>
              </li>
              <li>
                <Link to="/about-us" className="text-sm text-slate-300 hover:text-primary transition-colors duration-200">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/support" className="text-sm text-slate-300 hover:text-primary transition-colors duration-200">
                  Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <span className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-4 block">Contact Us</span>
            <ul className="space-y-3 mb-6">
              <li className="flex items-center space-x-2 text-sm text-slate-300">
                <Mail className="h-4 w-4 text-primary shrink-0" />
                <a href="mailto:hello@paddlespk.com" className="hover:text-primary transition-colors">
                  hello@paddlespk.com
                </a>
              </li>
              <li className="flex items-center space-x-2 text-sm text-slate-300">
                <Phone className="h-4 w-4 text-primary shrink-0" />
                <a href="tel:03027799404" className="hover:text-primary transition-colors">
                  0302-7799404
                </a>
              </li>
              <li className="flex items-start space-x-2 text-sm text-slate-300">
                <MapPin className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <span>678/E, DHA Phase-5,<br />Lahore, Pakistan 54000</span>
              </li>
            </ul>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/paddlespk/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-300 hover:text-primary transition-colors duration-200"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://www.instagram.com/paddlespk/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-300 hover:text-primary transition-colors duration-200"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://www.linkedin.com/company/paddlespk/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-300 hover:text-primary transition-colors duration-200"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-sm text-slate-400">
            © {new Date().getFullYear()} PaddlesPK. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link to="/privacy-policy" className="text-xs text-slate-400 hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-xs text-slate-400 hover:text-primary transition-colors">
              Terms &amp; Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
