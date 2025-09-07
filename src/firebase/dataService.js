import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, onValue, off } from 'firebase/database';
import firebaseConfig from './config';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Local storage keys
const STORAGE_KEY = 'eduverse_data';
const LAST_SYNC_KEY = 'eduverse_last_sync';

/**
 * Data service for handling Firebase real-time database operations
 * with offline-first approach using localStorage as backup
 */
class DataService {
  constructor() {
    this.listeners = [];
    this.online = navigator.onLine;
    this.syncStatus = { online: this.online, lastSynced: null };
    
    // Listen for online/offline events
    window.addEventListener('online', this.handleOnlineStatus);
    window.addEventListener('offline', this.handleOnlineStatus);
  }
  
  /**
   * Handle online/offline status changes
   */
  handleOnlineStatus = () => {
    this.online = navigator.onLine;
    this.syncStatus.online = this.online;
    
    if (this.online) {
      // When coming back online, sync with Firebase
      this.syncWithFirebase();
    }
    
    // Notify listeners of status change
    this.notifyListeners();
  };
  
  /**
   * Subscribe to data changes
   * @param {Function} listener - Callback function to receive data updates
   * @returns {Function} - Unsubscribe function
   */
  subscribe = (listener) => {
    this.listeners.push(listener);
    
    // Immediately provide current data
    const localData = this.getLocalData();
    listener(localData, this.syncStatus);
    
    // Set up Firebase listener if online
    if (this.online) {
      this.setupFirebaseListener();
    }
    
    // Return unsubscribe function
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
      
      // If no more listeners, remove Firebase listener
      if (this.listeners.length === 0) {
        this.removeFirebaseListener();
      }
    };
  };
  
  /**
   * Set up Firebase real-time listener
   */
  setupFirebaseListener = () => {
    const dataRef = ref(database, 'data');
    
    onValue(dataRef, (snapshot) => {
      const firebaseData = snapshot.val() || {};
      
      // Update local storage with Firebase data
      localStorage.setItem(STORAGE_KEY, JSON.stringify(firebaseData));
      
      // Update last sync timestamp
      const now = new Date().toISOString();
      localStorage.setItem(LAST_SYNC_KEY, now);
      this.syncStatus.lastSynced = now;
      
      // Notify listeners
      this.notifyListeners(firebaseData);
    });
  };
  
  /**
   * Remove Firebase listener
   */
  removeFirebaseListener = () => {
    const dataRef = ref(database, 'data');
    off(dataRef);
  };
  
  /**
   * Notify all listeners with current data
   * @param {Object} [data] - Data to send to listeners (if not provided, gets from local storage)
   */
  notifyListeners = (data) => {
    const currentData = data || this.getLocalData();
    this.listeners.forEach(listener => listener(currentData, this.syncStatus));
  };
  
  /**
   * Get data from local storage
   * @returns {Object} - Data from local storage or empty object with proper structure
   */
  getLocalData = () => {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      const parsedData = data ? JSON.parse(data) : {};
      
      // Ensure data has the correct structure with empty arrays as fallbacks
      return {
        batches: parsedData.batches || [],
        subjects: parsedData.subjects || [],
        lectures: parsedData.lectures || [],
        notes: parsedData.notes || [],
        dpps: parsedData.dpps || [],
        students: parsedData.students || []
      };
    } catch (error) {
      console.error('Error reading from local storage:', error);
      // Return properly structured empty data
      return {
        batches: [],
        subjects: [],
        lectures: [],
        notes: [],
        dpps: [],
        students: []
      };
    }
  };
  
  /**
   * Update data both in Firebase (if online) and local storage
   * @param {Object} newData - New data to save
   */
  updateData = async (newData) => {
    try {
      // Always update local storage first (offline-first approach)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
      
      // Update Firebase if online
      if (this.online) {
        const dataRef = ref(database, 'data');
        await set(dataRef, newData);
        
        // Update last sync timestamp
        const now = new Date().toISOString();
        localStorage.setItem(LAST_SYNC_KEY, now);
        this.syncStatus.lastSynced = now;
      }
      
      // Notify listeners
      this.notifyListeners(newData);
      
      return true;
    } catch (error) {
      console.error('Error updating data:', error);
      return false;
    }
  };
  
  /**
   * Sync local data with Firebase when coming back online
   */
  syncWithFirebase = async () => {
    if (!this.online) return;
    
    try {
      const localData = this.getLocalData();
      const dataRef = ref(database, 'data');
      await set(dataRef, localData);
      
      // Update last sync timestamp
      const now = new Date().toISOString();
      localStorage.setItem(LAST_SYNC_KEY, now);
      this.syncStatus.lastSynced = now;
      
      // Set up Firebase listener
      this.setupFirebaseListener();
      
      return true;
    } catch (error) {
      console.error('Error syncing with Firebase:', error);
      return false;
    }
  };
}

// Create and export a singleton instance
const dataService = new DataService();
export default dataService;