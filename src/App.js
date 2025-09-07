import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DataProvider } from './context/DataContext';

// Components
import HomePage from './components/HomePage';
import BatchDashboard from './components/BatchDashboard';
import SubjectDashboard from './components/SubjectDashboard';
import AdminLogin from './components/AdminLogin';
import AdminPanel from './components/AdminPanel';
import VideoPlayer from './components/VideoPlayer';

function App() {
  return (
    <DataProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/batch/:batchId" element={<BatchDashboard />} />
          <Route path="/batch/:batchId/subject/:subjectId" element={<SubjectDashboard />} />
          <Route path="/lecture/:lectureId" element={<VideoPlayer />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
      </Router>
    </DataProvider>
  );
}

export default App;
