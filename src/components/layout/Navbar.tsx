import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Menu, X, Globe, User, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    closeMenu();
  };

  const getGreeting = () => {
    if (!user) return '';
    return `${user.name} (${user.role})`;
  };

  return (
    <header className="sticky top-0 z-50 bg-primary-700 shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-2">
            <Link
              to="/"
              className="flex items-center space-x-2 text-white transition hover:opacity-90"
              onClick={closeMenu}
            >
              <Globe size={24} className="text-white" />
              <span className="text-xl font-bold">OpenHire</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex space-x-8">
              <li>
                <NavLink
                  to="/projects"
                  className={({ isActive }) =>
                    `text-sm ${
                      isActive
                        ? 'font-bold text-white'
                        : 'text-primary-100 hover:text-white'
                    }`
                  }
                >
                  Projects
                </NavLink>
              </li>
              {isAuthenticated ? (
                <>
                  <li>
                    <NavLink
                      to="/dashboard"
                      className={({ isActive }) =>
                        `text-sm ${
                          isActive
                            ? 'font-bold text-white'
                            : 'text-primary-100 hover:text-white'
                        }`
                      }
                    >
                      Dashboard
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/profile"
                      className={({ isActive }) =>
                        `text-sm ${
                          isActive
                            ? 'font-bold text-white'
                            : 'text-primary-100 hover:text-white'
                        }`
                      }
                    >
                      Profile
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <NavLink
                      to="/login"
                      className={({ isActive }) =>
                        `text-sm ${
                          isActive
                            ? 'font-bold text-white'
                            : 'text-primary-100 hover:text-white'
                        }`
                      }
                    >
                      Login
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/register"
                      className={({ isActive }) =>
                        `text-sm ${
                          isActive
                            ? 'font-bold text-white'
                            : 'text-primary-100 hover:text-white'
                        }`
                      }
                    >
                      Register
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </nav>

          {/* User Info and Mobile Menu Button */}
          <div className="flex items-center">
            {isAuthenticated && (
              <div className="hidden md:flex items-center mr-4">
                <div className="flex items-center space-x-2 text-white">
                  <User size={18} />
                  <span className="text-sm font-medium">{getGreeting()}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="ml-4 flex items-center text-primary-100 hover:text-white"
                >
                  <LogOut size={18} />
                </button>
              </div>
            )}
            <button
              className="rounded-md p-2 text-white md:hidden"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <nav className="py-4">
              <ul className="space-y-4">
                <li>
                  <NavLink
                    to="/projects"
                    className={({ isActive }) =>
                      `block ${
                        isActive
                          ? 'font-bold text-white'
                          : 'text-primary-100 hover:text-white'
                      }`
                    }
                    onClick={closeMenu}
                  >
                    Projects
                  </NavLink>
                </li>
                {isAuthenticated ? (
                  <>
                    <li>
                      <NavLink
                        to="/dashboard"
                        className={({ isActive }) =>
                          `block ${
                            isActive
                              ? 'font-bold text-white'
                              : 'text-primary-100 hover:text-white'
                          }`
                        }
                        onClick={closeMenu}
                      >
                        Dashboard
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/profile"
                        className={({ isActive }) =>
                          `block ${
                            isActive
                              ? 'font-bold text-white'
                              : 'text-primary-100 hover:text-white'
                          }`
                        }
                        onClick={closeMenu}
                      >
                        Profile
                      </NavLink>
                    </li>
                    <li className="border-t border-primary-600 pt-2">
                      <div className="text-white mb-2">{getGreeting()}</div>
                      <button
                        onClick={handleLogout}
                        className="flex items-center text-primary-100 hover:text-white"
                      >
                        <LogOut size={18} className="mr-2" />
                        Log out
                      </button>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <NavLink
                        to="/login"
                        className={({ isActive }) =>
                          `block ${
                            isActive
                              ? 'font-bold text-white'
                              : 'text-primary-100 hover:text-white'
                          }`
                        }
                        onClick={closeMenu}
                      >
                        Login
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/register"
                        className={({ isActive }) =>
                          `block ${
                            isActive
                              ? 'font-bold text-white'
                              : 'text-primary-100 hover:text-white'
                          }`
                        }
                        onClick={closeMenu}
                      >
                        Register
                      </NavLink>
                    </li>
                  </>
                )}
              </ul>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;