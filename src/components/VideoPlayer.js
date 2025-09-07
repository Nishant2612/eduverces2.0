import React, { useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { DataContext } from '../context/DataContext';

const VideoPlayer = () => {
  const { lectureId } = useParams();
  const navigate = useNavigate();
  const { data } = useContext(DataContext);
  
  // Get lecture details
  const lecture = data?.lectures?.find(l => l.id === lectureId) || {
    title: 'Lecture not found',
    description: 'The requested lecture could not be found.',
    videoUrl: ''
  };
  
  // Get subject and batch details
  const subject = data?.subjects?.find(s => s.id === lecture.subjectId) || { name: 'Unknown Subject' };
  
  return (
    <div className="video-player-container">
      <header className="player-header">
        <button className="back-button" onClick={() => navigate(-1)}>
          <ArrowLeft size={20} />
        </button>
        <div className="lecture-info">
          <h1>{lecture.title}</h1>
          <p>{subject.name}</p>
        </div>
      </header>
      
      <main className="player-content">
        {lecture.videoUrl ? (
          <div className="video-container">
            <video 
              controls 
              autoPlay 
              className="video-element"
              src={lecture.videoUrl}
            >
              Your browser does not support the video tag.
            </video>
          </div>
        ) : (
          <div className="video-placeholder">
            <p>Video not available</p>
          </div>
        )}
        
        <div className="lecture-details">
          <h2>About this lecture</h2>
          <p>{lecture.description}</p>
        </div>
      </main>
    </div>
  );
};

export default VideoPlayer;