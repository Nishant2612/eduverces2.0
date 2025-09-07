# EduVerse 2.0 - Modern Educational Platform

A comprehensive educational web application built with React, featuring **real-time synchronization** and **advanced batch-specific content management**.

## 🆕 Latest Updates

### 🚀 v2.1.0 - Batch Selection System
- ✅ **Selective Content Distribution**: Admins can choose specific batches for each piece of content
- ✅ **Visual Batch Selector**: Interactive UI for selecting target batches  
- ✅ **Student Impact Preview**: See exactly how many students will receive content
- ✅ **Enhanced Tables**: Green badges show selected batches vs all available batches

### 📡 v2.0.0 - Real-Time Sync
- ✅ **Firebase Realtime Database** integration for instant updates across all devices
- ✅ **Offline-first approach** with localStorage backup
- ✅ **Live sync status** indicators showing online/offline state
- ✅ **Zero data loss** with automatic conflict resolution

## 🚀 Features

### User Interface
- **Homepage (Batch Selection)**: Clean interface with colorful batch cards and pricing information
- **Batch Dashboard**: Subject selection with colorful icons and topic counts
- **Subject Dashboard**: Tabbed interface for Lectures, Notes, and DPPs
- **Mobile Responsive**: Works seamlessly on desktop and mobile devices

### Admin Panel
- **Dashboard**: Overview with statistics and recent activities
- **Batch Management**: Create, edit, and manage learning batches
- **Subject Management**: Add and organize subjects with icons
- **Lecture Management**: Upload and manage video lectures
- **Student Management**: View student progress and enrollment data
- **Notes & DPPs**: Manage downloadable content and practice problems

### Key Features
- **Admin Access**: Special key-based access (Key: `26127`)
- **Modern Design**: White background, rounded cards, gradient headers
- **Colorful Subject Icons**: Intuitive visual identification
- **Professional UI**: Clean typography with Inter font family
- **Responsive Layout**: Optimized for all screen sizes

## 🎨 Design System

### Color Palette
- **Primary Blue**: `#667eea` to `#764ba2` (gradient)
- **Success Green**: `#10b981`
- **Warning Orange**: `#f59e0b`
- **Danger Red**: `#ef4444`
- **Background**: `#ffffff` (white)
- **Text**: `#1f2937` (dark gray)

### Subject Color Coding
- **Mathematics**: Green (`#10b981`)
- **Science**: Blue (`#3b82f6`)
- **Social Science**: Orange (`#f59e0b`)
- **Hindi**: Red (`#ef4444`)
- **English**: Purple (`#8b5cf6`)
- **Sanskrit**: Orange (`#f97316`)
- **Information Technology**: Cyan (`#06b6d4`)

## 🛠️ Tech Stack

- **React** 18.2.0 - Frontend framework
- **React Router** 6.8.1 - Client-side routing  
- **Firebase** - Realtime Database for cross-device synchronization
- **Lucide React** - Modern icon library
- **CSS3** - Custom styling with modern features
- **Context API** - State management with real-time updates

## 📁 Project Structure

```
app/
├── public/
│   ├── index.html
│   └── manifest.json
├── src/
│   ├── components/
│   │   ├── HomePage.js          # Batch selection screen
│   │   ├── BatchDashboard.js    # Subject selection screen
│   │   ├── SubjectDashboard.js  # Lectures/Notes/DPPs screen
│   │   ├── AdminLogin.js        # Admin authentication
│   │   ├── AdminPanel.js        # Complete admin dashboard
│   │   ├── BatchSelector.js     # 🆕 Visual batch selection component
│   │   ├── BatchSubjectSelector.js # 🆕 Subject/batch relationship UI
│   │   ├── SyncStatus.js        # 🆕 Real-time sync status indicator
│   │   ├── ManageNotes.js       # Enhanced with batch selection
│   │   ├── ManageDPPs.js        # Enhanced with batch selection
│   │   └── VideoPlayer.js       # Video lecture player
│   ├── context/
│   │   └── DataContext.js       # 🔄 Enhanced with Firebase sync
│   ├── firebase/                # 🆕 Firebase integration
│   │   ├── config.js           # Firebase configuration
│   │   └── dataService.js      # Real-time data operations
│   ├── App.js                   # Main app with routing
│   ├── index.js                 # React app entry point
│   └── index.css                # Global styles
├── package.json
├── FIREBASE_SETUP.md           # 🆕 Firebase setup guide
├── SOLUTION_SUMMARY.md         # 🆕 Complete feature overview
└── README.md
```

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Firebase (Required for Real-time Sync)
1. Create a Firebase project at `https://console.firebase.google.com/` 
2. Enable Realtime Database
3. Copy your config from Project Settings
4. Update `src/firebase/config.js` with your credentials

**📄 See detailed setup instructions in `FIREBASE_SETUP.md`**

### 3. Start Development Server
```bash
npm start
```

### 4. Access the Application
- **User Interface**: `http://localhost:3000`
- **Admin Access**: Press `Ctrl+Enter` on homepage or use key `26127`
- **Real-time sync**: Works across all devices once Firebase is configured

## 🔐 Admin Access

### Method 1: Secret Key Input
- On the homepage, press `Ctrl+Enter`
- Enter the admin key: `26127`
- Access granted to admin panel

### Method 2: Direct Navigation
- Navigate to `/admin-login`
- Enter admin key: `26127`
- Redirected to admin dashboard

## 📱 User Flow

1. **Homepage** → Select class batch (9/10/11)
2. **Batch Dashboard** → Choose subject to study
3. **Subject Dashboard** → Access lectures, notes, or DPPs
4. **Admin Panel** → Manage all content and students

## 🎯 Admin Panel Features

### Dashboard Overview
- Total students enrolled
- Active batches count
- Subjects created
- Lectures uploaded
- Recent activity feed
- Quick action buttons

### Management Sections
- **Batches**: Create/edit learning batches with pricing and subject assignments
- **Subjects**: Add subjects with icons and assign to specific batches
- **Lectures**: Upload video content with **batch-specific targeting** 🆕
- **Notes**: Manage downloadable study materials with batch selection
- **DPPs**: Daily practice problems with batch-specific distribution
- **Students**: View and manage student enrollment and progress

## 📄 Additional Documentation

- **FIREBASE_SETUP.md**: Detailed guide for setting up Firebase
- **SOLUTION_SUMMARY.md**: Technical overview of implemented features

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.
