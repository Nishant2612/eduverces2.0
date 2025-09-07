import React, { createContext, useState, useEffect } from 'react';
import dataService from '../firebase/dataService';

// Create context
export const DataContext = createContext();

// Initial empty data structure
const initialData = {
  batches: [],
  subjects: [],
  lectures: [],
  notes: [],
  dpps: [],
  students: []
};

// Initial sync status
const initialSyncStatus = {
  online: navigator.onLine,
  lastSynced: null
};

export const DataProvider = ({ children }) => {
  const [data, setData] = useState(initialData);
  const [syncStatus, setSyncStatus] = useState(initialSyncStatus);
  
  // Subscribe to data service for real-time updates
  useEffect(() => {
    const unsubscribe = dataService.subscribe((newData, status) => {
      // Ensure data has the correct structure with empty arrays as fallbacks
      const structuredData = {
        batches: newData.batches || [],
        subjects: newData.subjects || [],
        lectures: newData.lectures || [],
        notes: newData.notes || [],
        dpps: newData.dpps || [],
        students: newData.students || []
      };
      
      setData(structuredData);
      setSyncStatus(status);
    });
    
    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);
  
  // Function to update data
  const updateData = async (newData) => {
    return await dataService.updateData(newData);
  };
  
  // Helper functions for specific data types
  
  // Batches
  const addBatch = async (batch) => {
    const newBatch = {
      id: `batch_${Date.now()}`,
      ...batch
    };
    
    const newData = {
      ...data,
      batches: [...data.batches, newBatch]
    };
    
    return await updateData(newData);
  };
  
  const updateBatch = async (batchId, updates) => {
    const newBatches = data.batches.map(batch => 
      batch.id === batchId ? { ...batch, ...updates } : batch
    );
    
    const newData = {
      ...data,
      batches: newBatches
    };
    
    return await updateData(newData);
  };
  
  const deleteBatch = async (batchId) => {
    const newBatches = data.batches.filter(batch => batch.id !== batchId);
    
    const newData = {
      ...data,
      batches: newBatches
    };
    
    return await updateData(newData);
  };
  
  // Subjects
  const addSubject = async (subject) => {
    const newSubject = {
      id: `subject_${Date.now()}`,
      ...subject
    };
    
    const newData = {
      ...data,
      subjects: [...data.subjects, newSubject]
    };
    
    return await updateData(newData);
  };
  
  const updateSubject = async (subjectId, updates) => {
    const newSubjects = data.subjects.map(subject => 
      subject.id === subjectId ? { ...subject, ...updates } : subject
    );
    
    const newData = {
      ...data,
      subjects: newSubjects
    };
    
    return await updateData(newData);
  };
  
  const deleteSubject = async (subjectId) => {
    const newSubjects = data.subjects.filter(subject => subject.id !== subjectId);
    
    const newData = {
      ...data,
      subjects: newSubjects
    };
    
    return await updateData(newData);
  };
  
  // Lectures
  const addLecture = async (lecture) => {
    const newLecture = {
      id: `lecture_${Date.now()}`,
      ...lecture
    };
    
    const newData = {
      ...data,
      lectures: [...data.lectures, newLecture]
    };
    
    return await updateData(newData);
  };
  
  const updateLecture = async (lectureId, updates) => {
    const newLectures = data.lectures.map(lecture => 
      lecture.id === lectureId ? { ...lecture, ...updates } : lecture
    );
    
    const newData = {
      ...data,
      lectures: newLectures
    };
    
    return await updateData(newData);
  };
  
  const deleteLecture = async (lectureId) => {
    const newLectures = data.lectures.filter(lecture => lecture.id !== lectureId);
    
    const newData = {
      ...data,
      lectures: newLectures
    };
    
    return await updateData(newData);
  };
  
  // Notes
  const addNote = async (note) => {
    const newNote = {
      id: `note_${Date.now()}`,
      ...note
    };
    
    const newData = {
      ...data,
      notes: [...data.notes, newNote]
    };
    
    return await updateData(newData);
  };
  
  const updateNote = async (noteId, updates) => {
    const newNotes = data.notes.map(note => 
      note.id === noteId ? { ...note, ...updates } : note
    );
    
    const newData = {
      ...data,
      notes: newNotes
    };
    
    return await updateData(newData);
  };
  
  const deleteNote = async (noteId) => {
    const newNotes = data.notes.filter(note => note.id !== noteId);
    
    const newData = {
      ...data,
      notes: newNotes
    };
    
    return await updateData(newData);
  };
  
  // DPPs
  const addDPP = async (dpp) => {
    const newDPP = {
      id: `dpp_${Date.now()}`,
      ...dpp
    };
    
    const newData = {
      ...data,
      dpps: [...data.dpps, newDPP]
    };
    
    return await updateData(newData);
  };
  
  const updateDPP = async (dppId, updates) => {
    const newDPPs = data.dpps.map(dpp => 
      dpp.id === dppId ? { ...dpp, ...updates } : dpp
    );
    
    const newData = {
      ...data,
      dpps: newDPPs
    };
    
    return await updateData(newData);
  };
  
  const deleteDPP = async (dppId) => {
    const newDPPs = data.dpps.filter(dpp => dpp.id !== dppId);
    
    const newData = {
      ...data,
      dpps: newDPPs
    };
    
    return await updateData(newData);
  };
  
  // Students
  const addStudent = async (student) => {
    const newStudent = {
      id: `student_${Date.now()}`,
      ...student
    };
    
    const newData = {
      ...data,
      students: [...data.students, newStudent]
    };
    
    return await updateData(newData);
  };
  
  const updateStudent = async (studentId, updates) => {
    const newStudents = data.students.map(student => 
      student.id === studentId ? { ...student, ...updates } : student
    );
    
    const newData = {
      ...data,
      students: newStudents
    };
    
    return await updateData(newData);
  };
  
  const deleteStudent = async (studentId) => {
    const newStudents = data.students.filter(student => student.id !== studentId);
    
    const newData = {
      ...data,
      students: newStudents
    };
    
    return await updateData(newData);
  };
  
  // Context value
  const contextValue = {
    data,
    syncStatus,
    updateData,
    // Direct access to data arrays for convenience
    batches: data.batches,
    subjects: data.subjects,
    lectures: data.lectures,
    notes: data.notes,
    dpps: data.dpps,
    students: data.students,
    // CRUD operations
    addBatch,
    updateBatch,
    deleteBatch,
    addSubject,
    updateSubject,
    deleteSubject,
    addLecture,
    updateLecture,
    deleteLecture,
    addNote,
    updateNote,
    deleteNote,
    addDPP,
    updateDPP,
    deleteDPP,
    addStudent,
    updateStudent,
    deleteStudent
  };

  return (
    <DataContext.Provider value={contextValue}>
      {children}
    </DataContext.Provider>
  );
};