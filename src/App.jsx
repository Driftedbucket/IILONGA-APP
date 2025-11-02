import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Toast from './components/Toast';
import Home from './pages/Home';
import Jobs from './pages/Jobs';
import PostJob from './pages/PostJob';
import Profile from './pages/Profile';
import Notifications from './pages/Notifications';
import Login from './pages/Login';
import Register from './pages/Register';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useApp();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

const AppContent = () => {
  const { toast, showToast, isAuthenticated } = useApp();

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 dark-transition overflow-x-hidden w-full max-w-full">
        <Header />
        <main className="flex-1 overflow-x-hidden w-full">
          <Routes>
            <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/" replace />} />
            <Route path="/register" element={!isAuthenticated ? <Register /> : <Navigate to="/" replace />} />
            <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path="/jobs" element={<ProtectedRoute><Jobs /></ProtectedRoute>} />
            <Route path="/post-job" element={<ProtectedRoute><PostJob /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
        {toast && <Toast message={toast.message} type={toast.type} onClose={() => showToast(null)} />}
      </div>
    </Router>
  );
};

const AboutPage = () => (
  <div className="container mx-auto px-4 py-16 max-w-3xl animate-fade-in-up">
    <h1 className="text-4xl font-bold font-poppins mb-6 text-gray-900 dark:text-white">About Iilonga</h1>
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 space-y-4 dark-transition card-hover">
      <p className="text-lg text-gray-700 dark:text-gray-300">
        Iilonga is a lightweight platform designed specifically for Namibian youth aged 15–34 
        to connect with short-term and professional job opportunities.
      </p>
      <p className="text-gray-700 dark:text-gray-300">
        Our mission is to reduce youth unemployment by providing an accessible, user-friendly 
        platform where job seekers and employers can connect directly.
      </p>
      <p className="text-gray-700 dark:text-gray-300">
        Whether you're looking for a quick gig to earn extra income or a professional position 
        to advance your career, Iilonga is here to help you find the right opportunity.
      </p>
      <div className="bg-gradient-to-r from-iilonga-green to-iilonga-blue text-white p-6 rounded-lg mt-6 transform hover:scale-105 transition-transform">
        <h3 className="font-bold text-xl mb-2">Our Vision</h3>
        <p>Empowering Namibian youth through accessible job opportunities and economic growth.</p>
      </div>
    </div>
  </div>
);

const TermsPage = () => (
  <div className="container mx-auto px-4 py-16 max-w-3xl animate-fade-in-up">
    <h1 className="text-4xl font-bold font-poppins mb-6 text-gray-900 dark:text-white">Terms of Service</h1>
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 space-y-4 dark-transition card-hover">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">1. Acceptance of Terms</h2>
      <p className="text-gray-700 dark:text-gray-300">By using Iilonga, you agree to these terms and conditions.</p>
      
      <h2 className="text-2xl font-bold mt-6 text-gray-900 dark:text-white">2. User Responsibilities</h2>
      <p className="text-gray-700 dark:text-gray-300">Users must provide accurate information and treat all parties with respect.</p>
      
      <h2 className="text-2xl font-bold mt-6 text-gray-900 dark:text-white">3. Job Postings</h2>
      <p className="text-gray-700 dark:text-gray-300">Employers must post legitimate job opportunities and pay agreed rates.</p>
      
      <h2 className="text-2xl font-bold mt-6 text-gray-900 dark:text-white">4. Payment & Disputes</h2>
      <p className="text-gray-700 dark:text-gray-300">All payment arrangements are between employers and job seekers. Iilonga facilitates connections only.</p>
      
      <h2 className="text-2xl font-bold mt-6 text-gray-900 dark:text-white">5. Data & Privacy</h2>
      <p className="text-gray-700 dark:text-gray-300">This is a simulation app. No real data is stored permanently. All data is session-based only.</p>
    </div>
  </div>
);

const NotFoundPage = () => (
  <div className="container mx-auto px-4 py-16 text-center animate-fade-in-up">
    <div className="text-6xl mb-4 animate-bounce-in">🔍</div>
    <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">404 - Page Not Found</h1>
    <p className="text-gray-600 dark:text-gray-400 mb-8">The page you're looking for doesn't exist.</p>
    <a href="/" className="inline-block bg-gradient-to-r from-iilonga-green to-iilonga-blue text-white px-6 py-3 rounded-lg font-semibold hover:from-green-700 hover:to-blue-700 transition-smooth transform hover:scale-105 active:scale-95">
      Go Home
    </a>
  </div>
);

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
