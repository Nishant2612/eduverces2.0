import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, ChevronRight } from 'lucide-react';
import { DataContext } from '../context/DataContext';
import SyncStatus from './SyncStatus';

const HomePage = () => {
  const navigate = useNavigate();
  const { batches } = useContext(DataContext);
  
  // Use dynamic batches from admin, with fallback to ensure there's always content
  const displayBatches = batches && batches.length > 0 ? batches : [
    { id: 'class9', name: 'Class 9', price: '₹1999/month', color: '#10b981' },
    { id: 'class10', name: 'Class 10', price: '₹2499/month', color: '#3b82f6' },
    { id: 'class11', name: 'Class 11', price: '₹2999/month', color: '#8b5cf6' },
  ];

  // Admin access with Ctrl+Enter
  const handleKeyDown = (e) => {
    if (e.ctrlKey && e.key === 'Enter') {
      navigate('/admin-login');
    }
  };

  React.useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="home-container" onKeyDown={handleKeyDown} tabIndex="0">
      <header className="app-header">
        <div className="logo">
          <BookOpen size={28} />
          <h1>EduVerse 2.0</h1>
        </div>
        <SyncStatus />
      </header>

      <main>
        <section className="hero-section">
          <h2>Select Your Learning Batch</h2>
          <p>Choose your class to access personalized learning materials</p>
        </section>

        <section className="batches-grid">
          {displayBatches.map((batch) => (
            <div 
              key={batch.id} 
              className="batch-card"
              onClick={() => navigate(`/batch/${batch.id}`)}
              style={{ borderTop: `4px solid ${batch.color || '#3b82f6'}` }}
            >
              <h3>{batch.name}</h3>
              <p className="price">{batch.price || 'Contact for pricing'}</p>
              <div className="card-footer">
                <span>View Subjects</span>
                <ChevronRight size={18} />
              </div>
            </div>
          ))}
        </section>
      </main>

      <footer>
        <p>© 2023 EduVerse Learning Platform</p>
      </footer>
    </div>
  );
};

export default HomePage;