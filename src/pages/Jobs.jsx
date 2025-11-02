import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import Modal from '../components/Modal';

const Jobs = () => {
  const { jobs, acceptJob, declineJob, counterOffer } = useApp();
  const [filter, setFilter] = useState('All');
  const [sortBy, setSortBy] = useState('newest');
  const [showCounterModal, setShowCounterModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [counterPay, setCounterPay] = useState('');
  const [counterReason, setCounterReason] = useState('');

  const filteredJobs = jobs
    .filter(job => job.status === 'Open')
    .filter(job => filter === 'All' || job.category === filter)
    .sort((a, b) => {
      if (sortBy === 'newest') return b.id - a.id;
      if (sortBy === 'highest') return b.pay - a.pay;
      if (sortBy === 'lowest') return a.pay - b.pay;
      return 0;
    });

  const handleCounterOffer = (job) => {
    setSelectedJob(job);
    setCounterPay(job.pay);
    setCounterReason('');
    setShowCounterModal(true);
  };

  const submitCounterOffer = () => {
    if (counterPay && counterReason) {
      counterOffer(selectedJob.id, counterPay, counterReason);
      setShowCounterModal(false);
      setSelectedJob(null);
      setCounterPay('');
      setCounterReason('');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold font-poppins mb-4 text-light-text-primary dark:text-dark-text-primary">Find Jobs</h1>
        <p className="text-light-text-secondary dark:text-dark-text-secondary text-lg">Browse available opportunities and start earning today!</p>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-dark-card p-6 rounded-xl shadow-md mb-8 border border-light-border dark:border-dark-border dark-transition">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex items-center gap-4 w-full md:w-auto">
            <label className="font-semibold text-light-text-primary dark:text-dark-text-primary">Filter:</label>
            <select 
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="border border-light-border dark:border-dark-border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-iilonga-green-500 bg-white dark:bg-dark-bg text-light-text-primary dark:text-dark-text-primary dark-transition"
            >
              <option value="All">All Jobs</option>
              <option value="Quick Job">Quick Jobs</option>
              <option value="Professional">Professional</option>
            </select>
          </div>
          
          <div className="flex items-center gap-4 w-full md:w-auto">
            <label className="font-semibold text-light-text-primary dark:text-dark-text-primary">Sort by:</label>
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-light-border dark:border-dark-border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-iilonga-green-500 bg-white dark:bg-dark-bg text-light-text-primary dark:text-dark-text-primary dark-transition"
            >
              <option value="newest">Newest First</option>
              <option value="highest">Highest Pay</option>
              <option value="lowest">Lowest Pay</option>
            </select>
          </div>
        </div>
      </div>

      {/* Job Count */}
      <div className="mb-6">
        <p className="text-light-text-secondary dark:text-dark-text-secondary">
          Showing <span className="font-semibold text-iilonga-green-600 dark:text-iilonga-green-400">{filteredJobs.length}</span> {filter !== 'All' ? filter.toLowerCase() : 'job'}(s)
        </p>
      </div>

      {/* Job Cards */}
      {filteredJobs.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-dark-card rounded-xl border border-light-border dark:border-dark-border dark-transition">
          <div className="text-6xl mb-4">📭</div>
          <h3 className="text-2xl font-bold mb-2 text-light-text-primary dark:text-dark-text-primary">No jobs available</h3>
          <p className="text-light-text-secondary dark:text-dark-text-secondary">Check back later for new opportunities!</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.map(job => (
            <div key={job.id} className="bg-white dark:bg-dark-card rounded-xl shadow-md hover:shadow-xl transition p-6 border border-light-border dark:border-dark-border dark-transition card-hover">
              <div className="flex items-start justify-between mb-4">
                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                  job.category === 'Quick Job' 
                    ? 'bg-iilonga-yellow-500 text-gray-900' 
                    : 'bg-iilonga-blue-500 text-white'
                }`}>
                  {job.category}
                </span>
                <span className="text-2xl font-bold text-iilonga-green-600 dark:text-iilonga-green-400">N${job.pay}</span>
              </div>
              
              <h3 className="text-xl font-bold mb-2 font-poppins text-light-text-primary dark:text-dark-text-primary">{job.title}</h3>
              <p className="text-light-text-secondary dark:text-dark-text-secondary mb-4 line-clamp-3">{job.description}</p>
              
              {job.location && (
                <div className="flex items-center gap-1 mb-2">
                  <span className="text-sm">📍</span>
                  <p className="text-sm text-iilonga-blue-600 dark:text-iilonga-blue-400 font-medium">{job.location}</p>
                </div>
              )}
              
              {job.posterName && (
                <p className="text-sm text-light-text-muted dark:text-dark-text-muted mb-1">Posted by: <span className="font-semibold text-light-text-secondary dark:text-dark-text-secondary">{job.posterName}</span></p>
              )}
              {job.contactInfo && (
                <p className="text-sm text-light-text-muted dark:text-dark-text-muted mb-4">Contact: {job.contactInfo}</p>
              )}
              
              <div className="flex flex-col gap-2 mt-4">
                <button 
                  onClick={() => acceptJob(job.id)}
                  className="bg-iilonga-green-600 dark:bg-iilonga-green-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-iilonga-green-700 dark:hover:bg-iilonga-green-600 transition dark-transition"
                >
                  ✅ Accept Job
                </button>
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleCounterOffer(job)}
                    className="flex-1 bg-iilonga-blue-600 dark:bg-iilonga-blue-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-iilonga-blue-700 dark:hover:bg-iilonga-blue-600 transition dark-transition text-sm"
                  >
                    💬 Counter Offer
                  </button>
                  <button 
                    onClick={() => declineJob(job.id)}
                    className="flex-1 bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-200 py-2 px-4 rounded-lg font-semibold hover:bg-gray-400 dark:hover:bg-gray-600 transition dark-transition text-sm"
                  >
                    ❌ Decline
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Counter Offer Modal */}
      <Modal 
        isOpen={showCounterModal} 
        onClose={() => setShowCounterModal(false)}
        title="Make a Counter Offer"
      >
        {selectedJob && (
          <div>
            <div className="mb-4">
              <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary mb-2">Original Job:</p>
              <p className="font-bold text-lg text-light-text-primary dark:text-dark-text-primary">{selectedJob.title}</p>
              <p className="text-iilonga-green-600 dark:text-iilonga-green-400 font-semibold">Original Pay: N${selectedJob.pay}</p>
            </div>
            
            <div className="mb-4">
              <label className="block font-semibold mb-2 text-light-text-primary dark:text-dark-text-primary">Your Proposed Pay (N$)</label>
              <input 
                type="number"
                value={counterPay}
                onChange={(e) => setCounterPay(e.target.value)}
                className="w-full border border-light-border dark:border-dark-border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-iilonga-green-500 bg-white dark:bg-dark-bg text-light-text-primary dark:text-dark-text-primary dark-transition"
                placeholder="Enter amount"
              />
            </div>
            
            <div className="mb-6">
              <label className="block font-semibold mb-2 text-light-text-primary dark:text-dark-text-primary">Reason for Counter Offer</label>
              <textarea 
                value={counterReason}
                onChange={(e) => setCounterReason(e.target.value)}
                className="w-full border border-light-border dark:border-dark-border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-iilonga-green-500 h-24 bg-white dark:bg-dark-bg text-light-text-primary dark:text-dark-text-primary dark-transition"
                placeholder="Explain why you're proposing this amount..."
              />
            </div>
            
            <button 
              onClick={submitCounterOffer}
              disabled={!counterPay || !counterReason}
              className="w-full bg-iilonga-blue-600 dark:bg-iilonga-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-iilonga-blue-700 dark:hover:bg-iilonga-blue-600 transition dark-transition disabled:bg-gray-300 dark:disabled:bg-gray-700 disabled:cursor-not-allowed"
            >
              Send Counter Offer
            </button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Jobs;
