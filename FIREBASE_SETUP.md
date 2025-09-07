# Firebase Setup Guide for EduVerse 2.0

This guide will help you set up Firebase for EduVerse 2.0's real-time synchronization features. Follow these steps carefully to ensure proper configuration.

## 1. Create a Firebase Project

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Click on "Add project" or select an existing project
3. Enter a project name (e.g., "EduVerse")
4. Choose whether to enable Google Analytics (recommended)
5. Follow the prompts to complete project creation

## 2. Enable Realtime Database

1. In your Firebase project console, navigate to the left sidebar
2. Click on "Build" > "Realtime Database"
3. Click "Create Database"
4. Choose a starting mode:
   - For development: Select "Start in test mode"
   - For production: Select "Start in locked mode" (you'll need to set up security rules later)
5. Choose a database location closest to your users
6. Click "Enable"

## 3. Set Up Security Rules

For development purposes, you can use test mode. For production, set up proper security rules:

```json
{
  "rules": {
    ".read": "auth != null",
    ".write": "auth != null",
    "batches": {
      ".read": true,
      ".write": "auth != null"
    },
    "subjects": {
      ".read": true,
      ".write": "auth != null"
    },
    "lectures": {
      ".read": true,
      ".write": "auth != null"
    },
    "notes": {
      ".read": true,
      ".write": "auth != null"
    },
    "dpps": {
      ".read": true,
      ".write": "auth != null"
    }
  }
}
```

## 4. Get Your Firebase Configuration

1. In the Firebase console, click on the gear icon (⚙️) next to "Project Overview"
2. Select "Project settings"
3. Scroll down to the "Your apps" section
4. If you haven't added an app yet, click on the web icon (</>) to add a web app
5. Register your app with a nickname (e.g., "EduVerse Web")
6. Copy the Firebase configuration object that looks like this:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "your-project-id.firebaseapp.com",
  databaseURL: "https://your-project-id-default-rtdb.firebaseio.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

## 5. Update Your EduVerse Configuration

1. Open the file `src/firebase/config.js` in your EduVerse project
2. Replace the placeholder configuration with your actual Firebase configuration
3. Save the file

```javascript
// src/firebase/config.js
export const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "your-project-id.firebaseapp.com",
  databaseURL: "https://your-project-id-default-rtdb.firebaseio.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

## 6. Initialize Your Database Structure (Optional)

For a smoother start, you can initialize your database with some basic structure:

1. In the Firebase console, navigate to "Realtime Database"
2. Click on the three dots menu and select "Import JSON"
3. Upload a JSON file with this basic structure:

```json
{
  "batches": {
    "batch1": {
      "id": "batch1",
      "name": "Class 9",
      "price": "₹5,000",
      "studentCount": 45
    },
    "batch2": {
      "id": "batch2",
      "name": "Class 10",
      "price": "₹6,000",
      "studentCount": 38
    },
    "batch3": {
      "id": "batch3",
      "name": "Class 11",
      "price": "₹7,500",
      "studentCount": 32
    }
  },
  "subjects": {
    "subject1": {
      "id": "subject1",
      "name": "Mathematics",
      "color": "#10b981",
      "icon": "M",
      "batches": ["batch1", "batch2", "batch3"]
    },
    "subject2": {
      "id": "subject2",
      "name": "Science",
      "color": "#3b82f6",
      "icon": "S",
      "batches": ["batch1", "batch2"]
    },
    "subject3": {
      "id": "subject3",
      "name": "English",
      "color": "#8b5cf6",
      "icon": "E",
      "batches": ["batch1", "batch2", "batch3"]
    }
  }
}
```

## 7. Test Your Connection

1. Start your EduVerse application with `npm start`
2. Navigate through the application
3. Check the sync status indicator in the top right corner
4. If it shows "Online", your Firebase connection is working correctly

## 8. Troubleshooting

### Connection Issues

- Verify your API key and configuration details
- Check your internet connection
- Ensure your Firebase project is active
- Check browser console for any Firebase-related errors

### Database Access Issues

- Review your security rules
- Ensure your database URL is correct
- For test mode, check if the test mode period has expired (lasts 30 days)

### Data Not Syncing

- Check if the sync status shows "Online"
- Verify that your data structure matches what the application expects
- Look for any errors in the browser console

## 9. Additional Resources

- [Firebase Documentation](https://firebase.google.com/docs)
- [Realtime Database Guide](https://firebase.google.com/docs/database/web/start)
- [Security Rules Guide](https://firebase.google.com/docs/database/security)

## 10. Next Steps

After setting up Firebase, you might want to:

1. Add authentication for admin access
2. Set up Firebase Storage for file uploads
3. Configure more detailed security rules
4. Set up Firebase Hosting to deploy your application

For any issues not covered in this guide, please refer to the official Firebase documentation or contact support.