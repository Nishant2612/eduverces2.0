import React, { useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Video, FileText, BookOpen } from 'lucide-react';
import { DataContext } from '../context/DataContext';
import SyncStatus from './SyncStatus';

const SubjectDashboard = () => {
  const { batchId, subjectId } = useParams();
  const navigate = useNavigate();
  const { data } = useContext(DataContext);
  const [activeTab, setActiveTab] = useState('lectures');
  
  // Get batch and subject details
  const batch = data?.batches?.find(b => b.id === batchId) || { name: 'Loading...' };
  const subject = data?.subjects?.find(s => s.id === subjectId) || { name: 'Loading...' };
  
  // Get content for this subject and batch
  const lectures = data?.lectures?.filter(l => 
    l.subjectId === subjectId && l.batches?.includes(batchId)
  ) || [];
  
  const notes = data?.notes?.filter(n => 
    n.subjectId === subjectId && n.batches?.includes(batchId)
  ) || [];
  
  const dpps = data?.dpps?.filter(d => 
    d.subjectId === subjectId && d.batches?.includes(batchId)
  ) || [];

  return (
    <div className="subject-dashboard">
      <header className="dashboard-header">
        <div className="header-left">
          <button className="back-button" onClick={() => navigate(`/batch/${batchId}`)}>
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1>{subject.name}</h1>
            <p className="subtitle">{batch.name}</p>
          </div>
        </div>
        <SyncStatus />
      </header>

      <div className="tabs">
        <button 
          className={`tab ${activeTab === 'lectures' ? 'active' : ''}`}
          onClick={() => setActiveTab('lectures')}
        >
          <Video size={18} />
          <span>Lectures</span>
        </button>
        <button 
          className={`tab ${activeTab === 'notes' ? 'active' : ''}`}
          onClick={() => setActiveTab('notes')}
        >
          <FileText size={18} />
          <span>Notes</span>
        </button>
        <button 
          className={`tab ${activeTab === 'dpps' ? 'active' : ''}`}
          onClick={() => setActiveTab('dpps')}
        >
          <BookOpen size={18} />
          <span>DPPs</span>
        </button>
      </div>

      <main>
        {activeTab === 'lectures' && (
          <section className="content-section">
            <h2>Video Lectures</h2>
            {lectures.length === 0 ? (
              <p className="empty-message">No lectures available for this subject yet.</p>
            ) : (
              <div className="content-grid">
                {lectures.map(lecture => (
                  <div 
                    key={lecture.id} 
                    className="content-card"
                    onClick={() => navigate(`/lecture/${lecture.id}`)}
                  >
                    <div className="thumbnail">
                      <Video size={24} />
                    </div>
                    <div className="content-info">
                      <h3>{lecture.title}</h3>
                      <p>{lecture.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {activeTab === 'notes' && (
          <section className="content-section">
            <h2>Study Notes</h2>
            {notes.length === 0 ? (
              <p className="empty-message">No notes available for this subject yet.</p>
            ) : (
              <div className="content-grid">
                {notes.map(note => (
                  <div 
                    key={note.id} 
                    className="content-card"
                    onClick={() => window.open(note.fileUrl, '_blank')}
                  >
                    <div className="thumbnail">
                      <FileText size={24} />
                    </div>
                    <div className="content-info">
                      <h3>{note.title}</h3>
                      <p>{note.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {activeTab === 'dpps' && (
          <section className="content-section">
            <h2>Daily Practice Problems</h2>
            {dpps.length === 0 ? (
              <p className="empty-message">No practice problems available for this subject yet.</p>
            ) : (
              <div className="content-grid">
                {dpps.map(dpp => (
                  <div 
                    key={dpp.id} 
                    className="content-card"
                    onClick={() => window.open(dpp.fileUrl, '_blank')}
                  >
                    <div className="thumbnail">
                      <BookOpen size={24} />
                    </div>
                    <div className="content-info">
                      <h3>{dpp.title}</h3>
                      <p>{dpp.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}
      </main>
    </div>
  );
};

export default SubjectDashboard;