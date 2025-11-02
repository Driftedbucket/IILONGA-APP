# Iilonga - Job Matching Platform for Namibian Youth

![Iilonga](https://img.shields.io/badge/Status-Active-success)
![React](https://img.shields.io/badge/React-18.2.0-blue)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.3.6-06B6D4)

## 🌟 Overview

**Iilonga** is a lightweight, responsive web application designed for Namibian youth (ages 15–34) to find short-term ("quick") or professional jobs. The platform connects unemployed youth with local job opportunities in a first-come-first-serve model inspired by Yango/Uber, adapted for job matching.

## ✨ Features

### Core Functionality
- ✅ **Landing Page** - Welcome message and intro with call-to-action buttons
- ✅ **Job Feed** - Browse available jobs with filtering and sorting
- ✅ **Job Posting** - Simple form for employers to post opportunities
- ✅ **Accept/Decline/Counter Offer** - Interactive job response options
- ✅ **Profile Verification** - Mock document upload for skill verification
- ✅ **Notifications** - Real-time job alerts and system messages
- ✅ **In-Memory Storage** - All data stored in JavaScript arrays (session-based)

### 🆕 New Features (v2.0)
- 🔐 **Authentication System** - Login/Register pages with validation
- 🌓 **Dark Mode** - Toggle between light and dark themes with persistence
- 🎭 **Enhanced Animations** - Smooth transitions, entrance effects, and micro-interactions
- 🔒 **Protected Routes** - Secure pages require authentication
- ⚡ **Loading States** - Beautiful spinners and feedback during operations

### Additional Features
- 🔍 **Filtering & Sorting** - Filter by category, sort by date/pay
- ✅ **Verification Badges** - Visual indicators for verified users
- 📊 **Summary Statistics** - Job counts and activity metrics
- 💾 **JSON Export** - Download session data as JSON file
- 📱 **Responsive Design** - Works on mobile, tablet, and desktop
- 🎨 **Modern UI** - Clean interface with youthful colors and animations

## 🎨 Design System

### Colors
- **Green (#2E7D32)** - Success, primary actions
- **Blue (#1976D2)** - Trust, secondary actions
- **Yellow (#F9A825)** - Energy, highlights

### Typography
- **Poppins** - Headings (bold, modern)
- **Inter** - Body text (readable, clean)

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher) - [Download from nodejs.org](https://nodejs.org/)
- npm (comes with Node.js) or yarn

### Installation

**First Time Setup:**

1. **Install Node.js** (if not already installed):
   - Visit https://nodejs.org/
   - Download and install the LTS version for Windows
   - Restart your terminal/PowerShell after installation

2. **Install dependencies:**
```powershell
npm install
```

3. **Start development server:**
```powershell
npm run dev
```

3. **Open in browser:**
The app will automatically open at `http://localhost:3000`

4. **Login:**
You'll be redirected to the login page. Use any email and password (6+ characters) to login, or click "Sign up now" to register a new account.

### Build for Production
```powershell
npm run build
```

### Preview Production Build
```powershell
npm run preview
```

## 📁 Project Structure

```
IILONGA/
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── Header.jsx     # Navigation header
│   │   ├── Footer.jsx     # Site footer
│   │   ├── Toast.jsx      # Toast notifications
│   │   └── Modal.jsx      # Modal dialogs
│   ├── pages/             # Page components
│   │   ├── Home.jsx       # Landing page
│   │   ├── Jobs.jsx       # Job feed
│   │   ├── PostJob.jsx    # Job posting form
│   │   ├── Profile.jsx    # User profile
│   │   └── Notifications.jsx # Notification center
│   ├── context/           # State management
│   │   └── AppContext.jsx # Global app state
│   ├── models/            # Data models
│   │   ├── Job.js         # Job class
│   │   ├── User.js        # User class
│   │   └── Message.js     # Message class
│   ├── App.jsx            # Main app component
│   ├── main.jsx           # Entry point
│   └── index.css          # Global styles
├── index.html             # HTML template
├── package.json           # Dependencies
├── vite.config.js         # Vite configuration
├── tailwind.config.js     # Tailwind configuration
└── postcss.config.js      # PostCSS configuration
```

## 💡 Usage Guide

### Getting Started
1. **Login/Register** - Create an account or login (demo mode accepts any credentials)
2. **Toggle Dark Mode** - Click the sun/moon icon in the header
3. **Choose Your Role** - Select between Job Seeker or Employer

### For Job Seekers
1. **Browse Jobs** - Navigate to "Find Jobs" to see available opportunities
2. **Filter & Sort** - Use filters to find jobs by category and pay rate
3. **Accept Jobs** - Click "Accept Job" to take a position
4. **Counter Offer** - Propose a different pay rate with reasoning
5. **Decline Jobs** - Remove jobs you're not interested in
6. **Verify Profile** - Upload credentials to get verified status

### For Employers
1. **Switch Role** - Use the role selector in the header
2. **Post a Job** - Navigate to "Post Job" and fill in the form
3. **Add Details** - Include title, description, pay, and contact info
4. **Track Posts** - View your posted jobs in your profile
5. **Receive Responses** - Check notifications for applicant responses

## 🔧 Technical Details

### Tech Stack
- **Frontend:** React 18.2
- **Routing:** React Router DOM 6.20
- **Styling:** TailwindCSS 3.3
- **Build Tool:** Vite 5.0
- **State Management:** React Context API

### Data Models

#### Job
```javascript
{
  id: number,
  title: string,
  description: string,
  pay: number,
  category: 'Quick Job' | 'Professional',
  status: 'Open' | 'Taken',
  posterName: string,
  contactInfo: string
}
```

#### User
```javascript
{
  id: number,
  name: string,
  role: 'Seeker' | 'Employer',
  verified: boolean
}
```

#### Message
```javascript
{
  id: number,
  sender: string,
  receiver: string,
  content: string,
  timestamp: Date,
  type: 'notification' | 'job-offer' | 'system'
}
```

## 🎯 Key Features Explained

### In-Memory Storage
All data is stored in React state (JavaScript arrays). This means:
- ✅ No database required
- ✅ Instant updates and interactions
- ⚠️ Data resets when you refresh the page
- 💾 Use "Export Data" to save your session

### Role Switching
Users can switch between "Job Seeker" and "Employer" modes:
- Different interfaces for different needs
- Role selector in the header
- Appropriate features shown for each role

### Counter Offers
Job seekers can negotiate:
- Propose different pay rate
- Provide reasoning
- Sent as notification to employer

### Verification System
Mock verification for job seekers:
- Simulate document upload
- Verified badge displayed
- Priority visibility (simulated)

## 📊 Sample Data

The app loads with sample data on startup:
- 5 sample jobs (mix of quick and professional)
- 2 sample users (seeker and employer)
- System welcome messages

## 🌐 Browser Support
- Chrome (recommended)
- Firefox
- Safari
- Edge

## 🤝 Contributing

This is a demonstration project for educational purposes.

## 📄 License

This project is for demonstration purposes.

## 📞 Contact

For questions or feedback:
- Email: info@iilonga.na
- Website: Coming soon

---

**Built with ❤️ for Namibian Youth**

*Connecting Namibian youth to real opportunities — one job at a time.*
