import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, BookOpen, Video, FileText, Book, LogOut } from 'lucide-react';
import { DataContext } from '../context/DataContext';
import SyncStatus from './SyncStatus';
import ManageBatches from './ManageBatches';
import ManageSubjects from './ManageSubjects';
import ManageLectures from './ManageLectures';
import ManageNotes from './ManageNotes';
import ManageDPPs from './ManageDPPs';
import ManageStudents from './ManageStudents';

const AdminPanel = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const { data } = useContext(DataContext);
  const navigate = useNavigate();
  
  // Check for admin access
  useEffect(() => {
    const hasAccess = sessionStorage.getItem('adminAccess') === 'true';
    if (!hasAccess) {
      navigate('/admin-login');
    }
  }, [navigate]);
  
  // Calculate statistics
  const stats = {
    batches: data?.batches?.length || 0,
    subjects: data?.subjects?.length || 0,
    lectures: data?.lectures?.length || 0,
    notes: data?.notes?.length || 0,
    dpps: data?.dpps?.length || 0,
    students: data?.students?.length || 0
  };
  
  // Handle logout
  const handleLogout = () => {
    sessionStorage.removeItem('adminAccess');
    navigate('/');
  };
  
  // Render the appropriate section based on activeSection state
  const renderSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return (
          <div className="admin-dashboard-section">
            <h2>Admin Dashboard</h2>
            
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon" style={{ backgroundColor: '#10b981' }}>
                  <Users size={24} />
                </div>
                <div className="stat-info">
                  <h3>{stats.students}</h3>
                  <p>Students</p>
                </div>
              </div>
              
              <div className="stat-card">
                <div className="stat-icon" style={{ backgroundColor: '#3b82f6' }}>
                  <BookOpen size={24} />
                </div>
                <div className="stat-info">
                  <h3>{stats.batches}</h3>
                  <p>Batches</p>
                </div>
              </div>
              
              <div className="stat-card">
                <div className="stat-icon" style={{ backgroundColor: '#8b5cf6' }}>
                  <Book size={24} />
                </div>
                <div className="stat-info">
                  <h3>{stats.subjects}</h3>
                  <p>Subjects</p>
                </div>
              </div>
              
              <div className="stat-card">
                <div className="stat-icon" style={{ backgroundColor: '#f59e0b' }}>
                  <Video size={24} />
                </div>
                <div className="stat-info">
                  <h3>{stats.lectures}</h3>
                  <p>Lectures</p>
                </div>
              </div>
            </div>
            
            <div className="recent-activity">
              <h3>Recent Activity</h3>
              <div className="activity-list">
                {/* This would be populated with actual activity data */}
                <p className="empty-message">No recent activity to display.</p>
              </div>
            </div>
          </div>
        );
        
      case 'batches':
        return <ManageBatches />;
        
      case 'subjects':
        return <ManageSubjects />;
        
      case 'lectures':
        return <ManageLectures />;
        
      case 'notes':
        return <ManageNotes />;
        
      case 'dpps':
        return <ManageDPPs />;

        
      case 'students':
        return <ManageStudents />;
        
      default:
        return <div>Select a section from the sidebar</div>;
    }
  };

  return (
    <div className="admin-panel">
      <aside className="admin-sidebar">
        <div className="admin-logo">
          <BookOpen size={24} />
          <h2>EduVerse Admin</h2>
        </div>
        
        <nav className="admin-nav">
          <button 
            className={`nav-item ${activeSection === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveSection('dashboard')}
          >
            <div className="nav-icon">📊</div>
            <span>Dashboard</span>
          </button>
          
          <button 
            className={`nav-item ${activeSection === 'batches' ? 'active' : ''}`}
            onClick={() => setActiveSection('batches')}
          >
            <div className="nav-icon">👨‍👩‍👧‍👦</div>
            <span>Batches</span>
          </button>
          
          <button 
            className={`nav-item ${activeSection === 'subjects' ? 'active' : ''}`}
            onClick={() => setActiveSection('subjects')}
          >
            <div className="nav-icon">📚</div>
            <span>Subjects</span>
          </button>
          
          <button 
            className={`nav-item ${activeSection === 'lectures' ? 'active' : ''}`}
            onClick={() => setActiveSection('lectures')}
          >
            <div className="nav-icon">🎬</div>
            <span>Lectures</span>
          </button>
          
          <button 
            className={`nav-item ${activeSection === 'notes' ? 'active' : ''}`}
            onClick={() => setActiveSection('notes')}
          >
            <div className="nav-icon">📝</div>
            <span>Notes</span>
          </button>
          
          <button 
            className={`nav-item ${activeSection === 'dpps' ? 'active' : ''}`}
            onClick={() => setActiveSection('dpps')}
          >
            <div className="nav-icon">✏️</div>
            <span>DPPs</span>
          </button>
          
          <button 
            className={`nav-item ${activeSection === 'students' ? 'active' : ''}`}
            onClick={() => setActiveSection('students')}
          >
            <div className="nav-icon">👨‍🎓</div>
            <span>Students</span>
          </button>
        </nav>
        
        <div className="admin-sidebar-footer">
          <button className="logout-button" onClick={handleLogout}>
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </aside>
      
      <main className="admin-content">
        <header className="admin-header">
          <h1>Admin Panel</h1>
          <SyncStatus />
        </header>
        
        <div className="admin-section">
          {renderSection()}
        </div>
      </main>
    </div>
  );
};

export default AdminPanel;