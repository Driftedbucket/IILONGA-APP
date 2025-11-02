import React from 'react';

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 dark:bg-opacity-70 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-dark-card rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto border border-light-border dark:border-dark-border dark-transition">
        <div className="sticky top-0 bg-white dark:bg-dark-card border-b border-light-border dark:border-dark-border px-6 py-4 flex items-center justify-between dark-transition">
          <h3 className="text-xl font-bold font-poppins text-light-text-primary dark:text-dark-text-primary">{title}</h3>
          <button 
            onClick={onClose}
            className="text-light-text-muted dark:text-dark-text-muted hover:text-light-text-primary dark:hover:text-dark-text-primary text-2xl font-bold transition"
          >
            ×
          </button>
        </div>
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
