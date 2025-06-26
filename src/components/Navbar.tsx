import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Code, User, Briefcase, BookOpen, Mail } from 'lucide-react';
import ReactDOM from 'react-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const navItems = [
    { path: '/', label: 'HOME', icon: Code },
    { path: '/about', label: 'ABOUT', icon: User },
    { path: '/projects', label: 'PROJECTS', icon: Briefcase },
    { path: '/blog', label: 'BLOG', icon: BookOpen },
    { path: '/contact', label: 'CONTACT', icon: Mail },
  ];

  const mobileMenu = (
    <div className="md:hidden fixed inset-0 bg-cream-100 z-50 mobile-nav-overlay">
      <div className="flex flex-col items-center justify-center h-full space-y-6 mobile-nav-menu">
        {navItems.map(({ path, label, icon: Icon }) => (
          <Link
            key={path}
            to={path}
            onClick={() => setIsOpen(false)}
            className={`flex items-center space-x-4 px-6 py-4 rounded-xl transition-all duration-300 touch-button w-full max-w-xs justify-center oxford-card ${
              location.pathname === path
                ? 'text-oxford-700 underline bg-cream-200'
                : 'text-ink-900 hover:text-oxford-700'
            }`}
          >
            <Icon size={24} />
            <span className="text-lg font-medium font-serif">{label}</span>
          </Link>
        ))}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-8 right-6 p-3 rounded-lg text-ink-600 hover:text-oxford-700 transition-colors touch-button oxford-card"
          aria-label="Close menu"
        >
          <X size={24} />
        </button>
      </div>
    </div>
  );

  return (
    <nav className={`fixed top-0 w-full z-50 bg-cream-100 border-b border-parchment-100 py-3`}>
      {isOpen && typeof window !== 'undefined' && ReactDOM.createPortal(mobileMenu, document.body)}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link 
            to="/" 
            className="text-xl sm:text-2xl font-bold text-ink-900 hover:text-oxford-700 transition-colors touch-button flex items-center font-serif"
          >
          </Link>
          <div className="hidden md:flex space-x-4 lg:space-x-8">
            {navItems.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={`nav-link flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 touch-button ${
                  location.pathname === path
                    ? 'text-oxford-700 underline'
                    : 'text-ink-900 hover:text-oxford-700'
                }`}
              >
                <Icon size={16} />
                <span className="text-sm font-medium font-serif">{label}</span>
              </Link>
            ))}
          </div>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-3 rounded-lg text-ink-600 hover:text-oxford-700 transition-colors touch-button oxford-card"
            aria-label="Toggle mobile menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;