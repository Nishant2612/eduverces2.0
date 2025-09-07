import React, { useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { DataContext } from '../context/DataContext';
import SyncStatus from './SyncStatus';

const BatchDashboard = () => {
  const { batchId } = useParams();
  const navigate = useNavigate();
  const { data } = useContext(DataContext);
  
  // Get batch details
  const batch = data?.batches?.find(b => b.id === batchId) || {
    name: 'Loading...',
    subjects: []
  };
  
  // Get subjects for this batch
  const batchSubjects = data?.subjects?.filter(subject => 
    subject.batches?.includes(batchId)
  ) || [];

  // Subject icons with their respective colors
  const subjectIcons = {
    'Mathematics': { color: '#10b981' },
    'Science': { color: '#3b82f6' },
    'Social Science': { color: '#f59e0b' },
    'Hindi': { color: '#ef4444' },
    'English': { color: '#8b5cf6' },
    'Sanskrit': { color: '#f97316' },
    'Information Technology': { color: '#06b6d4' },
  };

  return (
    <div className="batch-dashboard">
      <header className="dashboard-header">
        <div className="header-left">
          <button className="back-button" onClick={() => navigate('/')}>
            <ArrowLeft size={20} />
          </button>
          <h1>{batch.name}</h1>
        </div>
        <SyncStatus />
      </header>

      <main>
        <section className="subjects-section">
          <h2>Select a Subject</h2>
          
          <div className="subjects-grid">
            {batchSubjects.map(subject => {
              const iconStyle = subjectIcons[subject.name] || { color: '#64748b' };
              
              return (
                <div 
                  key={subject.id} 
                  className="subject-card"
                  onClick={() => navigate(`/batch/${batchId}/subject/${subject.id}`)}
                  style={{ borderLeft: `4px solid ${iconStyle.color}` }}
                >
                  <div className="subject-icon" style={{ backgroundColor: iconStyle.color }}>
                    {subject.name.charAt(0)}
                  </div>
                  <div className="subject-info">
                    <h3>{subject.name}</h3>
                    <p>
                      {subject.lectureCount || 0} Lectures • 
                      {subject.notesCount || 0} Notes • 
                      {subject.dppCount || 0} DPPs
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
};

export default BatchDashboard;