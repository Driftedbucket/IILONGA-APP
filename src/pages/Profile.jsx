import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

const Profile = () => {
  const { currentUser, verifyUser, exportData, allJobs } = useApp();
  const [fileName, setFileName] = useState('');
  const [showUpload, setShowUpload] = useState(false);

  const handleVerification = () => {
    if (fileName.trim()) {
      verifyUser(fileName);
      setFileName('');
      setShowUpload(false);
    }
  };

  const userJobs = currentUser.role === 'Employer' 
    ? allJobs.filter(job => job.posterName === currentUser.name)
    : allJobs.filter(job => job.status === 'Taken');

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold font-poppins mb-8 text-light-text-primary dark:text-dark-text-primary">My Profile</h1>

        {/* Profile Card */}
        <div className="bg-white dark:bg-dark-card rounded-xl shadow-md p-8 mb-8 border border-light-border dark:border-dark-border dark-transition">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="bg-iilonga-green-600 dark:bg-iilonga-green-500 text-white w-20 h-20 rounded-full flex items-center justify-center text-3xl font-bold">
                {currentUser.name.charAt(0)}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-light-text-primary dark:text-dark-text-primary">{currentUser.name}</h2>
                <p className="text-light-text-secondary dark:text-dark-text-secondary">{currentUser.role}</p>
                {currentUser.verified && (
                  <span className="inline-block bg-iilonga-blue text-white text-sm px-3 py-1 rounded-full mt-2">
                    ✓ Verified
                  </span>
                )}
              </div>
            </div>
            
            {!currentUser.verified && (
              <button 
                onClick={() => setShowUpload(!showUpload)}
                className="bg-iilonga-blue text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Verify Profile
              </button>
            )}
          </div>

          {/* Verification Upload */}
          {showUpload && !currentUser.verified && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
              <h3 className="font-bold text-lg mb-4">Upload Verification Document</h3>
              <p className="text-sm text-gray-600 mb-4">
                Upload a certificate or document to verify your qualifications (Simulation mode - enter file name)
              </p>
              
              <div className="flex gap-3">
                <input 
                  type="text"
                  value={fileName}
                  onChange={(e) => setFileName(e.target.value)}
                  className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-iilonga-blue"
                  placeholder="e.g., Certificate_of_Plumbing.pdf"
                />
                <button 
                  onClick={handleVerification}
                  disabled={!fileName.trim()}
                  className="bg-iilonga-green text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  Upload
                </button>
              </div>
              
              <p className="text-xs text-gray-500 mt-2">
                Example: "Drivers_License.pdf", "IT_Certificate.pdf", "Skills_Portfolio.pdf"
              </p>
            </div>
          )}

          {currentUser.verified && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-green-700 font-semibold">✅ Your profile is verified!</p>
              <p className="text-sm text-green-600 mt-1">Verified profiles get priority access to jobs.</p>
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <div className="text-3xl font-bold text-iilonga-green mb-2">{userJobs.length}</div>
            <div className="text-gray-600">{currentUser.role === 'Employer' ? 'Jobs Posted' : 'Jobs Completed'}</div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <div className="text-3xl font-bold text-iilonga-blue mb-2">
              {currentUser.verified ? '100%' : '50%'}
            </div>
            <div className="text-gray-600">Profile Complete</div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <div className="text-3xl font-bold text-iilonga-yellow mb-2">4.8★</div>
            <div className="text-gray-600">Average Rating</div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-md p-8">
          <h3 className="text-2xl font-bold mb-6 font-poppins">
            {currentUser.role === 'Employer' ? 'My Posted Jobs' : 'Recent Jobs'}
          </h3>
          
          {userJobs.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>No jobs yet. {currentUser.role === 'Employer' ? 'Post your first job!' : 'Start accepting jobs!'}</p>
            </div>
          ) : (
            <div className="space-y-4">
              {userJobs.slice(0, 5).map(job => (
                <div key={job.id} className="border border-gray-200 rounded-lg p-4 flex justify-between items-center">
                  <div>
                    <h4 className="font-bold">{job.title}</h4>
                    <p className="text-sm text-gray-600">{job.category} • N${job.pay}</p>
                  </div>
                  <span className={`text-sm px-3 py-1 rounded-full ${
                    job.status === 'Open' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                  }`}>
                    {job.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Export Data */}
        <div className="mt-8 bg-gray-50 rounded-xl p-6 text-center">
          <h3 className="font-bold text-lg mb-2">Export Your Data</h3>
          <p className="text-sm text-gray-600 mb-4">Download all your job data as JSON</p>
          <button 
            onClick={exportData}
            className="bg-iilonga-blue text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            📥 Export Data
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
