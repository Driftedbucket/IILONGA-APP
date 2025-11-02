import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const Register = () => {
  const navigate = useNavigate();
  const { register } = useApp();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'Seeker',
    agreeTerms: false
  });
  
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value
    });
    // Clear error when user starts typing
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name) {
      newErrors.name = 'Name is required';
    }
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if (!formData.agreeTerms) {
      newErrors.agreeTerms = 'You must agree to the terms and conditions';
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    
    if (Object.keys(newErrors).length === 0) {
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
        register(formData.name, formData.email, formData.role);
        setIsLoading(false);
        navigate('/');
      }, 1500);
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-iilonga-green-400 via-iilonga-blue-400 to-iilonga-green-500 dark:from-dark-bg dark:via-dark-card dark:to-dark-bg py-8 sm:py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-500 overflow-x-hidden w-full">
      <div className="max-w-md w-full space-y-6 sm:space-y-8 animate-fade-in-up px-2 sm:px-0">
        {/* Card */}
        <div className="bg-white dark:bg-dark-card rounded-2xl shadow-2xl p-6 sm:p-8 transform hover:scale-[1.01] sm:hover:scale-[1.02] transition-all duration-300 border border-transparent dark:border-dark-border">
          {/* Logo and Header */}
          <div className="text-center animate-bounce-in">
            <div className="mx-auto h-14 w-14 sm:h-16 sm:w-16 bg-gradient-to-br from-iilonga-green-500 to-iilonga-blue-500 rounded-full flex items-center justify-center mb-3 sm:mb-4 shadow-lg">
              <span className="text-white text-2xl sm:text-3xl font-bold">I</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-light-text-primary dark:text-dark-text-primary font-poppins">
              Join Iilonga
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-light-text-secondary dark:text-dark-text-secondary">
              Start your journey to find opportunities
            </p>
          </div>

          {/* Form */}
          <form className="mt-6 sm:mt-8 space-y-4 sm:space-y-5" onSubmit={handleSubmit}>
            {/* Name Field */}
            <div className="animate-slide-in-left" style={{ animationDelay: '0.1s' }}>
              <label htmlFor="name" className="block text-xs sm:text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-1">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                className={`appearance-none relative block w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border ${
                  errors.name ? 'border-red-500' : 'border-light-border dark:border-dark-border'
                } placeholder-light-text-muted dark:placeholder-dark-text-muted text-light-text-primary dark:text-dark-text-primary bg-white dark:bg-dark-bg rounded-lg focus:outline-none focus:ring-2 focus:ring-iilonga-green-500 focus:border-transparent transition-all duration-300`}
                placeholder="John Doe"
              />
              {errors.name && (
                <p className="mt-1 text-xs sm:text-sm text-red-500 animate-shake">{errors.name}</p>
              )}
            </div>

            {/* Email Field */}
            <div className="animate-slide-in-right" style={{ animationDelay: '0.2s' }}>
              <label htmlFor="email" className="block text-xs sm:text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-1">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                className={`appearance-none relative block w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border ${
                  errors.email ? 'border-red-500' : 'border-light-border dark:border-dark-border'
                } placeholder-light-text-muted dark:placeholder-dark-text-muted text-light-text-primary dark:text-dark-text-primary bg-white dark:bg-dark-bg rounded-lg focus:outline-none focus:ring-2 focus:ring-iilonga-green-500 focus:border-transparent transition-all duration-300`}
                placeholder="john@example.com"
              />
              {errors.email && (
                <p className="mt-1 text-xs sm:text-sm text-red-500 animate-shake">{errors.email}</p>
              )}
            </div>

            {/* Role Selection */}
            <div className="animate-slide-in-left" style={{ animationDelay: '0.3s' }}>
              <label htmlFor="role" className="block text-xs sm:text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-1">
                I am a
              </label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="appearance-none relative block w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-light-border dark:border-dark-border text-light-text-primary dark:text-dark-text-primary bg-white dark:bg-dark-bg rounded-lg focus:outline-none focus:ring-2 focus:ring-iilonga-green-500 focus:border-transparent transition-all duration-300"
              >
                <option value="Seeker">Job Seeker</option>
                <option value="Employer">Employer</option>
              </select>
            </div>

            {/* Password Field */}
            <div className="animate-slide-in-right" style={{ animationDelay: '0.4s' }}>
              <label htmlFor="password" className="block text-xs sm:text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-1">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                value={formData.password}
                onChange={handleChange}
                className={`appearance-none relative block w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border ${
                  errors.password ? 'border-red-500' : 'border-light-border dark:border-dark-border'
                } placeholder-light-text-muted dark:placeholder-dark-text-muted text-light-text-primary dark:text-dark-text-primary bg-white dark:bg-dark-bg rounded-lg focus:outline-none focus:ring-2 focus:ring-iilonga-green-500 focus:border-transparent transition-all duration-300`}
                placeholder="••••••••"
              />
              {errors.password && (
                <p className="mt-1 text-xs sm:text-sm text-red-500 animate-shake">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div className="animate-slide-in-left" style={{ animationDelay: '0.5s' }}>
              <label htmlFor="confirmPassword" className="block text-xs sm:text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-1">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`appearance-none relative block w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border ${
                  errors.confirmPassword ? 'border-red-500' : 'border-light-border dark:border-dark-border'
                } placeholder-light-text-muted dark:placeholder-dark-text-muted text-light-text-primary dark:text-dark-text-primary bg-white dark:bg-dark-bg rounded-lg focus:outline-none focus:ring-2 focus:ring-iilonga-green-500 focus:border-transparent transition-all duration-300`}
                placeholder="••••••••"
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-xs sm:text-sm text-red-500 animate-shake">{errors.confirmPassword}</p>
              )}
            </div>

            {/* Terms Checkbox */}
            <div className="animate-fade-in" style={{ animationDelay: '0.6s' }}>
              <div className="flex items-start">
                <input
                  id="agreeTerms"
                  name="agreeTerms"
                  type="checkbox"
                  checked={formData.agreeTerms}
                  onChange={handleChange}
                  className="h-4 w-4 text-iilonga-green-500 focus:ring-iilonga-green-500 border-light-border dark:border-dark-border rounded mt-0.5 sm:mt-1"
                />
                <label htmlFor="agreeTerms" className="ml-2 block text-xs sm:text-sm text-light-text-secondary dark:text-dark-text-secondary">
                  I agree to the{' '}
                  <Link to="/terms" className="text-iilonga-blue-500 hover:text-iilonga-blue-600 dark:text-iilonga-blue-400 dark:hover:text-iilonga-blue-300">
                    Terms and Conditions
                  </Link>
                </label>
              </div>
              {errors.agreeTerms && (
                <p className="mt-1 text-xs sm:text-sm text-red-500 animate-shake">{errors.agreeTerms}</p>
              )}
            </div>

            {/* Submit Button */}
            <div className="animate-fade-in" style={{ animationDelay: '0.7s' }}>
              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center py-2.5 sm:py-3 px-4 border border-transparent text-sm sm:text-base font-medium rounded-lg text-white bg-gradient-to-r from-iilonga-green-500 to-iilonga-blue-500 hover:from-iilonga-green-600 hover:to-iilonga-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-iilonga-green-500 transform hover:scale-[1.01] sm:hover:scale-[1.02] active:scale-95 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-4 w-4 sm:h-5 sm:w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating account...
                  </span>
                ) : (
                  'Create Account'
                )}
              </button>
            </div>

            {/* Login Link */}
            <div className="text-center animate-fade-in" style={{ animationDelay: '0.8s' }}>
              <p className="text-xs sm:text-sm text-light-text-secondary dark:text-dark-text-secondary">
                Already have an account?{' '}
                <Link
                  to="/login"
                  className="font-medium text-iilonga-blue-500 hover:text-iilonga-blue-600 dark:text-iilonga-blue-400 dark:hover:text-iilonga-blue-300 transition-colors"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
