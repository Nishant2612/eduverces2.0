# Firebase Real-time Sync Setup Guide

This guide will help you set up Firebase to enable real-time synchronization between admin and student devices.

## Current Issue
Changes made by the admin are only visible on their device and not syncing to other devices. This is because:

1. **Firebase configuration has placeholder values**
2. **Real-time database might not be enabled**
3. **Database rules might be blocking writes/reads**

## Step-by-Step Setup

### 1. Create/Configure Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select existing one
3. Enable **Realtime Database** (not Firestore)
   - Go to "Realtime Database" in the left menu
   - Click "Create Database"
   - Choose "Start in test mode" for now
   - Select your preferred location

### 2. Get Firebase Configuration

1. Go to Project Settings (gear icon)
2. Scroll down to "Your apps"
3. If no web app exists, click "Add app" and select web (</>) icon
4. Register your app with name "EduVerse"
5. Copy the `firebaseConfig` object

### 3. Update Firebase Configuration

Replace the content in `src/firebase/config.js` with your actual config:

```javascript
// Firebase configuration
const firebaseConfig = {
  apiKey: "your-actual-api-key",
  authDomain: "your-project-id.firebaseapp.com",
  databaseURL: "https://your-project-id-default-rtdb.firebaseio.com/",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id"
};

export default firebaseConfig;
```

**⚠️ Important**: Make sure the `databaseURL` points to your Realtime Database, not Firestore.

### 4. Configure Database Rules

In Firebase Console, go to Realtime Database → Rules and set:

**For Testing (Open Access)**:
```json
{
  "rules": {
    ".read": true,
    ".write": true
  }
}
```

**For Production (Recommended)**:
```json
{
  "rules": {
    "data": {
      ".read": true,
      ".write": true
    }
  }
}
```

### 5. Test the Setup

1. Open your app in two different browsers/devices
2. Make changes in admin panel on one device
3. Check if changes appear on the other device
4. Open browser console to see sync logs

## Debugging

The updated `dataService.js` now includes comprehensive logging. Check browser console for:

- `DataService initialized:` - Shows initial state
- `Setting up Firebase listener...` - When listener starts  
- `Firebase data received:` - When data comes from Firebase
- `Local storage updated from Firebase at:` - When sync completes
- `Firebase updated successfully at:` - When local changes push to Firebase

## Common Issues & Solutions

### Issue: "Cannot setup Firebase listener: config not ready or offline"
**Solution**: Check that your `firebaseConfig` has real values, not placeholders.

### Issue: Changes not syncing between devices
**Solutions**:
1. Check Firebase Database rules allow read/write
2. Verify `databaseURL` is correct Realtime Database URL
3. Ensure both devices are online
4. Check browser console for error messages

### Issue: "Permission denied" errors
**Solution**: Update Firebase Database rules to allow access.

## Security Notes

- Current setup uses open read/write rules for simplicity
- For production, implement proper authentication and security rules
- Consider adding user authentication to restrict admin access
- Set up proper data validation rules

## Testing Checklist

- [ ] Firebase project created
- [ ] Realtime Database enabled  
- [ ] Config file updated with real values
- [ ] Database rules allow read/write
- [ ] App builds without errors
- [ ] Console shows "DataService initialized" with `firebaseConfigured: true`
- [ ] Changes sync between different browsers/devices
- [ ] Network offline/online transitions work properly
