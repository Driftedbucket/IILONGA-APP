import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const PostJob = () => {
  const navigate = useNavigate();
  const { addJob } = useApp();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    pay: '',
    category: 'Quick Job',
    posterName: '',
    contactInfo: '',
    location: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (formData.title && formData.description && formData.pay) {
      addJob(formData);
      setFormData({
        title: '',
        description: '',
        pay: '',
        category: 'Quick Job',
        posterName: '',
        contactInfo: '',
        location: ''
      });
      
      setTimeout(() => navigate('/jobs'), 1500);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold font-poppins mb-4 text-light-text-primary dark:text-dark-text-primary">Post a Job</h1>
          <p className="text-light-text-secondary dark:text-dark-text-secondary text-lg">Fill in the details below to post your job opportunity.</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white dark:bg-dark-card rounded-xl shadow-md p-8 border border-light-border dark:border-dark-border dark-transition">
          <div className="mb-6">
            <label className="block font-semibold mb-2 text-light-text-primary dark:text-dark-text-primary">
              Job Title <span className="text-red-500">*</span>
            </label>
            <input 
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full border border-light-border dark:border-dark-border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-iilonga-green-500 bg-white dark:bg-dark-bg text-light-text-primary dark:text-dark-text-primary dark-transition"
              placeholder="e.g., Yard Cleaning, Web Development"
            />
          </div>

          <div className="mb-6">
            <label className="block font-semibold mb-2 text-light-text-primary dark:text-dark-text-primary">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea 
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows="5"
              className="w-full border border-light-border dark:border-dark-border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-iilonga-green-500 bg-white dark:bg-dark-bg text-light-text-primary dark:text-dark-text-primary dark-transition"
              placeholder="Describe the job, requirements, and expectations..."
            />
          </div>

          <div className="mb-6">
            <label className="block font-semibold mb-2 text-light-text-primary dark:text-dark-text-primary">
              Pay Rate (N$) <span className="text-red-500">*</span>
            </label>
            <input 
              type="number"
              name="pay"
              value={formData.pay}
              onChange={handleChange}
              required
              min="0"
              className="w-full border border-light-border dark:border-dark-border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-iilonga-green-500 bg-white dark:bg-dark-bg text-light-text-primary dark:text-dark-text-primary dark-transition"
              placeholder="e.g., 150"
            />
          </div>

          <div className="mb-6">
            <label className="block font-semibold mb-2 text-light-text-primary dark:text-dark-text-primary">
              Category <span className="text-red-500">*</span>
            </label>
            <select 
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full border border-light-border dark:border-dark-border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-iilonga-green-500 bg-white dark:bg-dark-bg text-light-text-primary dark:text-dark-text-primary dark-transition"
            >
              <option value="Quick Job">Quick Job</option>
              <option value="Professional">Professional</option>
            </select>
            <p className="text-sm text-light-text-muted dark:text-dark-text-muted mt-1">
              Quick jobs are short-term tasks. Professional jobs require specific skills.
            </p>
          </div>

          <div className="mb-6">
            <label className="block font-semibold mb-2 text-light-text-primary dark:text-dark-text-primary">
              Your Name (optional)
            </label>
            <input 
              type="text"
              name="posterName"
              value={formData.posterName}
              onChange={handleChange}
              className="w-full border border-light-border dark:border-dark-border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-iilonga-green-500 bg-white dark:bg-dark-bg text-light-text-primary dark:text-dark-text-primary dark-transition"
              placeholder="e.g., John Doe"
            />
          </div>

          <div className="mb-6">
            <label className="block font-semibold mb-2 text-light-text-primary dark:text-dark-text-primary">
              Contact Info (optional)
            </label>
            <input 
              type="text"
              name="contactInfo"
              value={formData.contactInfo}
              onChange={handleChange}
              className="w-full border border-light-border dark:border-dark-border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-iilonga-green-500 bg-white dark:bg-dark-bg text-light-text-primary dark:text-dark-text-primary dark-transition"
              placeholder="Phone number or email"
            />
          </div>

          <div className="mb-6">
            <label className="block font-semibold mb-2 text-light-text-primary dark:text-dark-text-primary">
              Location (optional)
            </label>
            <input 
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full border border-light-border dark:border-dark-border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-iilonga-green-500 bg-white dark:bg-dark-bg text-light-text-primary dark:text-dark-text-primary dark-transition"
              placeholder="e.g., Rocky Crest, Windhoek or Academia, Windhoek"
            />
            <p className="text-sm text-light-text-muted dark:text-dark-text-muted mt-1">
              Specify the suburb and city where the job is located
            </p>
          </div>

          <div className="flex gap-4">
            <button 
              type="submit"
              className="flex-1 bg-iilonga-green-600 dark:bg-iilonga-green-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-iilonga-green-700 dark:hover:bg-iilonga-green-600 transition dark-transition text-lg"
            >
              📝 Post Job
            </button>
            <button 
              type="button"
              onClick={() => navigate('/')}
              className="flex-1 bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-200 py-3 px-6 rounded-lg font-semibold hover:bg-gray-400 dark:hover:bg-gray-600 transition dark-transition"
            >
              Cancel
            </button>
          </div>
        </form>

        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-bold text-lg mb-2 text-blue-800">💡 Tips for Posting Jobs</h3>
          <ul className="space-y-2 text-sm text-blue-700">
            <li>• Be clear and specific about what you need</li>
            <li>• Set fair and competitive pay rates</li>
            <li>• Include contact information for faster responses</li>
            <li>• Choose the right category for better visibility</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PostJob;
