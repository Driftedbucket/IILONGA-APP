import React, { createContext, useState, useContext } from 'react';
import { Job } from '../models/Job';
import { User } from '../models/User';
import { Message } from '../models/Message';

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  // Initialize sample data
  const [jobs, setJobs] = useState([
    new Job(1, "Yard Cleaning", "Help clean yard for 3 hours", 150, "Quick Job", "Open", "Maria Johnson", "+264 81 234 5678", "Rocky Crest, Windhoek"),
    new Job(2, "Build a Portfolio Website", "Create a portfolio for a student", 1000, "Professional", "Open", "Tech Solutions", "info@techsol.na", "Pioneerspark, Windhoek"),
    new Job(3, "Laundry Assistance", "Wash and iron clothes", 200, "Quick Job", "Open", "Sarah Peters", "", "Academia, Windhoek"),
    new Job(4, "Social Media Manager", "Manage Instagram and Facebook for small business", 800, "Professional", "Open", "Green Cafe", "", "Klein Windhoek, Windhoek"),
    new Job(5, "Moving Help", "Help move furniture to new apartment", 300, "Quick Job", "Open", "John Davis", "", "Olympia, Windhoek"),
  ]);

  const [users, setUsers] = useState([
    new User(1, "John", "Seeker", true),
    new User(2, "Maria", "Employer", false),
  ]);

  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [messages, setMessages] = useState([
    new Message(1, "System", "Guest", "Welcome to Iilonga! Start finding jobs today.", new Date(), "system"),
    new Message(2, "System", "Guest", "3 new jobs available in your area!", new Date(), "notification"),
  ]);

  const [toast, setToast] = useState(null);
  const [hiddenJobs, setHiddenJobs] = useState([]);
  
  // Dark Mode State
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });

  // Apply dark mode class to document
  React.useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    showToast(darkMode ? 'Light mode enabled' : 'Dark mode enabled', 'info');
  };

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const addJob = (jobData) => {
    const newJob = new Job(
      jobs.length + 1,
      jobData.title,
      jobData.description,
      jobData.pay,
      jobData.category,
      'Open',
      jobData.posterName || currentUser.name,
      jobData.contactInfo,
      jobData.location || ''
    );
    setJobs([newJob, ...jobs]);
    
    const newMessage = new Message(
      messages.length + 1,
      "System",
      "All Users",
      `New ${jobData.category} posted: ${jobData.title}`,
      new Date(),
      "system"
    );
    setMessages([newMessage, ...messages]);
    
    showToast('Job posted successfully!', 'success');
    return newJob;
  };

  const acceptJob = (jobId) => {
    setJobs(jobs.map(job => 
      job.id === jobId ? { ...job, status: 'Taken' } : job
    ));
    
    const job = jobs.find(j => j.id === jobId);
    const newMessage = new Message(
      messages.length + 1,
      currentUser.name,
      job.posterName,
      `${currentUser.name} accepted your job: ${job.title}`,
      new Date(),
      "job-offer"
    );
    setMessages([newMessage, ...messages]);
    
    showToast('Job accepted! Check notifications for details.', 'success');
  };

  const declineJob = (jobId) => {
    setHiddenJobs([...hiddenJobs, jobId]);
    showToast('Job removed from your feed.', 'info');
  };

  const counterOffer = (jobId, newPay, reason) => {
    const job = jobs.find(j => j.id === jobId);
    const newMessage = new Message(
      messages.length + 1,
      currentUser.name,
      job.posterName,
      `Counter offer for "${job.title}": N$${newPay}. Reason: ${reason}`,
      new Date(),
      "job-offer"
    );
    setMessages([newMessage, ...messages]);
    
    showToast('Counter offer sent!', 'success');
  };

  const verifyUser = (fileName) => {
    setCurrentUser({ ...currentUser, verified: true });
    setUsers(users.map(user => 
      user.id === currentUser.id ? { ...user, verified: true } : user
    ));
    
    const newMessage = new Message(
      messages.length + 1,
      "System",
      currentUser.name,
      `Your profile has been verified with ${fileName}`,
      new Date(),
      "system"
    );
    setMessages([newMessage, ...messages]);
    
    showToast('Profile verified successfully!', 'success');
  };

  const switchUserRole = (role) => {
    setCurrentUser({ ...currentUser, role });
    showToast(`Switched to ${role} mode`, 'info');
  };

  const login = (email) => {
    const user = users.find(u => u.name.toLowerCase().includes(email.split('@')[0].toLowerCase())) || users[0];
    setCurrentUser(user);
    setIsAuthenticated(true);
    showToast(`Welcome back, ${user.name}!`, 'success');
  };

  const register = (name, email, role) => {
    const newUser = new User(users.length + 1, name, role, false);
    setUsers([...users, newUser]);
    setCurrentUser(newUser);
    setIsAuthenticated(true);
    
    const welcomeMsg = new Message(
      messages.length + 1,
      "System",
      name,
      `Welcome to Iilonga, ${name}! Start exploring opportunities today.`,
      new Date(),
      "system"
    );
    setMessages([welcomeMsg, ...messages]);
    
    showToast(`Account created successfully! Welcome, ${name}!`, 'success');
  };

  const logout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    showToast('Logged out successfully', 'info');
  };

  const exportData = () => {
    const data = {
      jobs: jobs.filter(job => !hiddenJobs.includes(job.id)),
      users,
      messages,
      exportDate: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(data, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `iilonga-data-${Date.now()}.json`;
    link.click();
    
    showToast('Data exported successfully!', 'success');
  };

  const getStats = () => {
    const openJobs = jobs.filter(job => job.status === 'Open' && !hiddenJobs.includes(job.id)).length;
    const takenJobs = jobs.filter(job => job.status === 'Taken').length;
    const quickJobs = jobs.filter(job => job.category === 'Quick Job' && job.status === 'Open').length;
    const professionalJobs = jobs.filter(job => job.category === 'Professional' && job.status === 'Open').length;
    
    return { openJobs, takenJobs, quickJobs, professionalJobs };
  };

  const value = {
    jobs: jobs.filter(job => !hiddenJobs.includes(job.id)),
    allJobs: jobs,
    users,
    currentUser,
    isAuthenticated,
    messages,
    toast,
    darkMode,
    addJob,
    acceptJob,
    declineJob,
    counterOffer,
    verifyUser,
    switchUserRole,
    exportData,
    getStats,
    showToast,
    login,
    register,
    logout,
    toggleDarkMode,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
