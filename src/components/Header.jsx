import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, isAuthenticated, switchUserRole, messages, darkMode, toggleDarkMode, logout } = useApp();
  
  const unreadCount = messages.filter(m => !m.read).length;
  
  const isActive = (path) => location.pathname === path;
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  return (
    <header className="bg-white dark:bg-dark-card shadow-md sticky top-0 z-50 dark-transition animate-slide-down border-b border-light-border dark:border-dark-border">
      <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-1.5 sm:space-x-2 transform hover:scale-105 transition-transform">
            <div className="bg-gradient-to-br from-iilonga-green-500 to-iilonga-blue-500 text-white w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold text-lg sm:text-xl shadow-lg">
              I
            </div>
            <span className="text-xl sm:text-2xl font-bold text-iilonga-green-500 dark:text-iilonga-green-400 font-poppins">Iilonga</span>
          </Link>
          
          {isAuthenticated && (
            <nav className="hidden md:flex items-center space-x-6">
              <Link 
                to="/" 
                className={`text-light-text-secondary dark:text-dark-text-secondary hover:text-iilonga-green-500 dark:hover:text-iilonga-green-400 font-medium transition-smooth ${isActive('/') ? 'text-iilonga-green-500 dark:text-iilonga-green-400' : ''}`}
              >
                Home
              </Link>
              <Link 
                to="/jobs" 
                className={`text-light-text-secondary dark:text-dark-text-secondary hover:text-iilonga-green-500 dark:hover:text-iilonga-green-400 font-medium transition-smooth ${isActive('/jobs') ? 'text-iilonga-green-500 dark:text-iilonga-green-400' : ''}`}
              >
                Find Jobs
              </Link>
              <Link 
                to="/post-job" 
                className={`text-light-text-secondary dark:text-dark-text-secondary hover:text-iilonga-green-500 dark:hover:text-iilonga-green-400 font-medium transition-smooth ${isActive('/post-job') ? 'text-iilonga-green-500 dark:text-iilonga-green-400' : ''}`}
              >
                Post Job
              </Link>
              <Link 
                to="/profile" 
                className={`text-light-text-secondary dark:text-dark-text-secondary hover:text-iilonga-green-500 dark:hover:text-iilonga-green-400 font-medium transition-smooth ${isActive('/profile') ? 'text-iilonga-green-500 dark:text-iilonga-green-400' : ''}`}
              >
                Profile
              </Link>
              <Link 
                to="/notifications" 
                className={`relative text-light-text-secondary dark:text-dark-text-secondary hover:text-iilonga-green-500 dark:hover:text-iilonga-green-400 font-medium transition-smooth ${isActive('/notifications') ? 'text-iilonga-green-500 dark:text-iilonga-green-400' : ''}`}
              >
                Notifications
                {unreadCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                    {unreadCount}
                  </span>
                )}
              </Link>
            </nav>
          )}
          
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-1.5 sm:p-2 rounded-lg bg-light-bg dark:bg-dark-bg hover:bg-gray-200 dark:hover:bg-gray-700 transition-smooth transform hover:scale-110 active:scale-95 border border-light-border dark:border-dark-border"
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-iilonga-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-light-text-secondary" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>

            {isAuthenticated ? (
              <>
                <div className="hidden lg:flex items-center space-x-2">
                  <span className="text-xs sm:text-sm text-light-text-secondary dark:text-dark-text-secondary truncate max-w-[100px]">{currentUser?.name}</span>
                  {currentUser?.verified && (
                    <span className="bg-iilonga-blue-500 text-white text-xs px-2 py-0.5 sm:py-1 rounded-full animate-pulse-subtle whitespace-nowrap">✓</span>
                  )}
                </div>
                <select 
                  value={currentUser?.role}
                  onChange={(e) => switchUserRole(e.target.value)}
                  className="hidden sm:block text-xs sm:text-sm border border-light-border dark:border-dark-border bg-white dark:bg-dark-card text-light-text-primary dark:text-dark-text-primary rounded-lg px-2 sm:px-3 py-1 sm:py-1.5 focus:outline-none focus:ring-2 focus:ring-iilonga-green-500 transition-smooth"
                >
                  <option value="Seeker">Job Seeker</option>
                  <option value="Employer">Employer</option>
                </select>
                <button
                  onClick={handleLogout}
                  className="text-xs sm:text-sm bg-red-500 hover:bg-red-600 text-white px-2.5 sm:px-4 py-1 sm:py-1.5 rounded-lg font-medium transition-smooth transform hover:scale-105 active:scale-95 shadow-md"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to="/login"
                  className="text-xs sm:text-sm text-light-text-secondary dark:text-dark-text-secondary hover:text-iilonga-green-500 dark:hover:text-iilonga-green-400 font-medium transition-smooth"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="text-xs sm:text-sm bg-gradient-to-r from-iilonga-green-500 to-iilonga-blue-500 hover:from-iilonga-green-600 hover:to-iilonga-blue-600 text-white px-2.5 sm:px-4 py-1 sm:py-1.5 rounded-lg font-medium transition-smooth transform hover:scale-105 active:scale-95 shadow-md whitespace-nowrap"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isAuthenticated && (
          <nav className="md:hidden flex items-center justify-around mt-4 pt-4 border-t border-light-border dark:border-dark-border">
            <Link to="/" className={`text-xs transition-smooth ${isActive('/') ? 'text-iilonga-green-500' : 'text-light-text-muted dark:text-dark-text-muted'}`}>Home</Link>
            <Link to="/jobs" className={`text-xs transition-smooth ${isActive('/jobs') ? 'text-iilonga-green-500' : 'text-light-text-muted dark:text-dark-text-muted'}`}>Jobs</Link>
            <Link to="/post-job" className={`text-xs transition-smooth ${isActive('/post-job') ? 'text-iilonga-green-500' : 'text-light-text-muted dark:text-dark-text-muted'}`}>Post</Link>
            <Link to="/profile" className={`text-xs transition-smooth ${isActive('/profile') ? 'text-iilonga-green-500' : 'text-light-text-muted dark:text-dark-text-muted'}`}>Profile</Link>
            <Link to="/notifications" className={`text-xs relative transition-smooth ${isActive('/notifications') ? 'text-iilonga-green-500' : 'text-light-text-muted dark:text-dark-text-muted'}`}>
              Alerts
              {unreadCount > 0 && <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center animate-pulse">{unreadCount}</span>}
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
