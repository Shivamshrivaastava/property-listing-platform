import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, Menu, X } from 'lucide-react';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/login');
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link
          to="/"
          className="flex items-center space-x-2 text-xl font-bold"
          onClick={closeMobileMenu}
        >
          <Home className="text-primary-600" size={28} />
          <span
            className={`${
              isScrolled ? 'text-gray-900' : 'text-white'
            } transition-colors duration-300`}
          >
            HomeFinder
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <NavLink to="/" isActive={isActive('/')} isScrolled={isScrolled}>
            Home
          </NavLink>
          <NavLink to="/properties" isActive={isActive('/properties')} isScrolled={isScrolled}>
            Properties
          </NavLink>
          <NavLink to="/favorites" isActive={isActive('/favorites')} isScrolled={isScrolled}>
            Favorites
          </NavLink>
          <NavLink to="/contact" isActive={isActive('/contact')} isScrolled={isScrolled}>
            Contact
          </NavLink>
          <button
            onClick={handleLogout}
            className={`px-4 py-1 rounded-md text-sm font-semibold border transition ${
              isScrolled
                ? 'text-red-500 border-red-500 hover:bg-red-100'
                : 'text-white border-white hover:bg-white hover:text-red-500'
            }`}
          >
            Logout
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex items-center"
          onClick={toggleMobileMenu}
          aria-label="Toggle Menu"
        >
          {isMobileMenuOpen ? (
            <X className={isScrolled ? 'text-gray-900' : 'text-white'} size={24} />
          ) : (
            <Menu className={isScrolled ? 'text-gray-900' : 'text-white'} size={24} />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <MobileNavLink to="/" isActive={isActive('/')} onClick={closeMobileMenu}>
              Home
            </MobileNavLink>
            <MobileNavLink to="/properties" isActive={isActive('/properties')} onClick={closeMobileMenu}>
              Properties
            </MobileNavLink>
            <MobileNavLink to="/favorites" isActive={isActive('/favorites')} onClick={closeMobileMenu}>
              Favorites
            </MobileNavLink>
            <MobileNavLink to="/contact" isActive={isActive('/contact')} onClick={closeMobileMenu}>
              Contact
            </MobileNavLink>
            <button
              onClick={() => {
                handleLogout();
                closeMobileMenu();
              }}
              className="py-2 px-4 text-lg font-medium text-red-600 hover:text-red-700 border-t border-gray-200 pt-4 text-left"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

interface NavLinkProps {
  to: string;
  isActive: boolean;
  isScrolled: boolean;
  children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ to, isActive, isScrolled, children }) => (
  <Link
    to={to}
    className={`font-medium transition-colors duration-300 border-b-2 ${
      isActive
        ? 'border-primary-600 text-primary-600'
        : `border-transparent ${
            isScrolled
              ? 'text-gray-700 hover:text-primary-600'
              : 'text-white hover:text-primary-100'
          }`
    }`}
  >
    {children}
  </Link>
);

interface MobileNavLinkProps {
  to: string;
  isActive: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

const MobileNavLink: React.FC<MobileNavLinkProps> = ({ to, isActive, onClick, children }) => (
  <Link
    to={to}
    className={`py-2 px-4 text-lg font-medium ${
      isActive
        ? 'text-primary-600 bg-gray-100 rounded-md'
        : 'text-gray-700 hover:text-primary-600'
    }`}
    onClick={onClick}
  >
    {children}
  </Link>
);

export default Header;
