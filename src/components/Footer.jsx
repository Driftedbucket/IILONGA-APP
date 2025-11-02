import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-light-text-primary dark:bg-dark-bg text-white mt-12 dark-transition border-t border-light-border dark:border-dark-border">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold font-poppins mb-4 text-white dark:text-dark-text-primary">Iilonga</h3>
            <p className="text-gray-300 dark:text-dark-text-secondary text-sm">
              Connecting Namibian youth to real opportunities — one job at a time.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-white dark:text-dark-text-primary">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="text-gray-300 dark:text-dark-text-secondary hover:text-iilonga-green-400 transition">Home</Link></li>
              <li><Link to="/jobs" className="text-gray-300 dark:text-dark-text-secondary hover:text-iilonga-green-400 transition">Find Jobs</Link></li>
              <li><Link to="/post-job" className="text-gray-300 dark:text-dark-text-secondary hover:text-iilonga-green-400 transition">Post a Job</Link></li>
              <li><Link to="/profile" className="text-gray-300 dark:text-dark-text-secondary hover:text-iilonga-green-400 transition">Profile</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-white dark:text-dark-text-primary">Contact</h4>
            <ul className="space-y-2 text-sm text-gray-300 dark:text-dark-text-secondary">
              <li>Email: info@iilonga.na</li>
              <li>Phone: +264 61 123 4567</li>
              <li>Windhoek, Namibia</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-600 dark:border-dark-border mt-8 pt-6 text-center text-sm text-gray-300 dark:text-dark-text-secondary">
          <p>&copy; {new Date().getFullYear()} Iilonga. All rights reserved. | <Link to="/terms" className="hover:text-iilonga-green-400 transition">Terms of Service</Link> | <Link to="/about" className="hover:text-iilonga-green-400 transition">About Us</Link></p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
