import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const Home = () => {
  const navigate = useNavigate();
  const { getStats, currentUser } = useApp();
  const stats = getStats();

  return (
    <div className="min-h-screen bg-light-bg dark:bg-dark-bg dark-transition overflow-x-hidden w-full">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-iilonga-green-500 to-iilonga-blue-500 dark:from-iilonga-green-700 dark:to-iilonga-blue-700 text-white py-12 sm:py-16 md:py-20 animate-fade-in overflow-x-hidden w-full">
        <div className="container mx-auto px-4 text-center max-w-full">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-poppins mb-4 sm:mb-6 animate-bounce-in">
            Welcome to Iilonga
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 max-w-3xl mx-auto animate-fade-in-up px-4" style={{ animationDelay: '0.2s' }}>
            Connecting Namibian youth to real opportunities — one job at a time.
          </p>
          <p className="text-sm sm:text-base md:text-lg mb-8 sm:mb-12 opacity-90 animate-fade-in-up px-4" style={{ animationDelay: '0.4s' }}>
            Find quick gigs or professional positions. Start your journey today!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center animate-fade-in-up px-4 max-w-full" style={{ animationDelay: '0.6s' }}>
            <button 
              onClick={() => navigate('/jobs')}
              className="w-full sm:w-auto max-w-full bg-white text-iilonga-green-600 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg hover:bg-gray-100 dark:bg-dark-card dark:text-iilonga-green-400 dark:hover:bg-gray-700 transition-smooth shadow-lg transform hover:scale-105 active:scale-95 btn-animate"
            >
              🔍 Find Jobs
            </button>
            <button 
              onClick={() => navigate('/post-job')}
              className="w-full sm:w-auto max-w-full bg-iilonga-yellow-500 text-gray-900 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg hover:bg-iilonga-yellow-600 dark:bg-iilonga-yellow-600 dark:hover:bg-iilonga-yellow-700 transition-smooth shadow-lg transform hover:scale-105 active:scale-95 btn-animate"
            >
              📝 Post a Job
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-8 sm:py-12 bg-white dark:bg-dark-card dark-transition">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
            <div className="text-center p-4 sm:p-6 bg-light-bg dark:bg-dark-bg rounded-xl card-hover animate-scale-in border border-light-border dark:border-dark-border" style={{ animationDelay: '0.1s' }}>
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-iilonga-green-500 dark:text-iilonga-green-400 mb-1 sm:mb-2">{stats.openJobs}</div>
              <div className="text-xs sm:text-sm text-light-text-secondary dark:text-dark-text-secondary">Open Jobs</div>
            </div>
            <div className="text-center p-4 sm:p-6 bg-light-bg dark:bg-dark-bg rounded-xl card-hover animate-scale-in border border-light-border dark:border-dark-border" style={{ animationDelay: '0.2s' }}>
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-iilonga-blue-500 dark:text-iilonga-blue-400 mb-1 sm:mb-2">{stats.takenJobs}</div>
              <div className="text-xs sm:text-sm text-light-text-secondary dark:text-dark-text-secondary">Jobs Filled</div>
            </div>
            <div className="text-center p-4 sm:p-6 bg-light-bg dark:bg-dark-bg rounded-xl card-hover animate-scale-in border border-light-border dark:border-dark-border" style={{ animationDelay: '0.3s' }}>
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-iilonga-yellow-500 dark:text-iilonga-yellow-400 mb-1 sm:mb-2">{stats.quickJobs}</div>
              <div className="text-xs sm:text-sm text-light-text-secondary dark:text-dark-text-secondary">Quick Jobs</div>
            </div>
            <div className="text-center p-4 sm:p-6 bg-light-bg dark:bg-dark-bg rounded-xl card-hover animate-scale-in border border-light-border dark:border-dark-border" style={{ animationDelay: '0.4s' }}>
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-iilonga-green-600 dark:text-iilonga-green-400 mb-1 sm:mb-2">{stats.professionalJobs}</div>
              <div className="text-xs sm:text-sm text-light-text-secondary dark:text-dark-text-secondary">Professional</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-12 sm:py-16 bg-light-bg dark:bg-dark-bg dark-transition">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12 font-poppins text-light-text-primary dark:text-dark-text-primary animate-fade-in-up">How Iilonga Works</h2>
          
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="bg-white dark:bg-dark-card p-6 sm:p-8 rounded-2xl shadow-md text-center card-hover animate-slide-in-left border border-light-border dark:border-dark-border" style={{ animationDelay: '0.1s' }}>
              <div className="text-4xl sm:text-5xl mb-3 sm:mb-4">👤</div>
              <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 font-poppins text-light-text-primary dark:text-dark-text-primary">Create Profile</h3>
              <p className="text-sm sm:text-base text-light-text-secondary dark:text-dark-text-secondary">Sign up and verify your skills to stand out to employers.</p>
            </div>
            
            <div className="bg-white dark:bg-dark-card p-6 sm:p-8 rounded-2xl shadow-md text-center card-hover animate-fade-in-up border border-light-border dark:border-dark-border" style={{ animationDelay: '0.2s' }}>
              <div className="text-4xl sm:text-5xl mb-3 sm:mb-4">🔍</div>
              <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 font-poppins text-light-text-primary dark:text-dark-text-primary">Browse Jobs</h3>
              <p className="text-sm sm:text-base text-light-text-secondary dark:text-dark-text-secondary">Find quick gigs or professional opportunities that match your skills.</p>
            </div>
            
            <div className="bg-white dark:bg-dark-card p-6 sm:p-8 rounded-2xl shadow-md text-center card-hover animate-slide-in-right border border-light-border dark:border-dark-border sm:col-span-2 md:col-span-1" style={{ animationDelay: '0.3s' }}>
              <div className="text-4xl sm:text-5xl mb-3 sm:mb-4">✅</div>
              <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 font-poppins text-light-text-primary dark:text-dark-text-primary">Accept & Earn</h3>
              <p className="text-sm sm:text-base text-light-text-secondary dark:text-dark-text-secondary">Accept jobs, negotiate offers, and start earning today!</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-iilonga-green-500 to-iilonga-blue-500 dark:from-iilonga-green-700 dark:to-iilonga-blue-700 text-white dark-transition">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 font-poppins animate-fade-in-up">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            {currentUser?.role === 'Seeker' 
              ? 'Browse available jobs and find your next opportunity.'
              : 'Post a job and connect with talented youth in your area.'}
          </p>
          <button 
            onClick={() => navigate(currentUser?.role === 'Seeker' ? '/jobs' : '/post-job')}
            className="bg-white dark:bg-dark-card text-iilonga-green-600 dark:text-iilonga-green-400 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-smooth shadow-lg transform hover:scale-110 active:scale-95 btn-animate animate-fade-in-up border border-light-border dark:border-dark-border"
            style={{ animationDelay: '0.4s' }}
          >
            {currentUser?.role === 'Seeker' ? 'Find Jobs Now' : 'Post a Job'}
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;
