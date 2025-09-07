import React, { useState, useContext, useEffect } from 'react';
import { DataContext } from '../context/DataContext';
import { ChevronLeft, Upload, Trash2, Video } from 'lucide-react';
import BatchSelector from './BatchSelector';

const ManageLectures = () => {
  const { batches, subjects, lectures, addLecture, deleteLecture, updateLecture } = useContext(DataContext);
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [subjectId, setSubjectId] = useState('');
  const [duration, setDuration] = useState('');
  const [selectedBatches, setSelectedBatches] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Reset form when exiting edit mode
  useEffect(() => {
    if (!editingId) {
      setTitle('');
      setDescription('');
      setVideoUrl('');
      setThumbnailUrl('');
      setSubjectId('');
      setDuration('');
      setSelectedBatches([]);
    }
  }, [editingId]);
  
  // Load lecture data when editing
  useEffect(() => {
    if (editingId && lectures) {
      const lectureToEdit = lectures.find(lecture => lecture.id === editingId);
      if (lectureToEdit) {
        setTitle(lectureToEdit.title);
        setDescription(lectureToEdit.description);
        setVideoUrl(lectureToEdit.videoUrl);
        setThumbnailUrl(lectureToEdit.thumbnailUrl || '');
        setSubjectId(lectureToEdit.subjectId);
        setDuration(lectureToEdit.duration || '');
        setSelectedBatches(lectureToEdit.batches || []);
      }
    }
  }, [editingId, lectures]);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate required fields
    if (!title) {
      alert('Please enter a lecture title');
      return;
    }
    
    if (!description) {
      alert('Please enter a lecture description');
      return;
    }
    
    if (!videoUrl) {
      alert('Please enter a video URL');
      return;
    }
    
    if (!subjectId) {
      alert('Please select a subject');
      return;
    }
    
    if (selectedBatches.length === 0) {
      alert('Please select at least one batch');
      return;
    }
    
    const lectureData = {
      title,
      description,
      videoUrl,
      thumbnailUrl: thumbnailUrl || '',
      subjectId,
      duration: duration || '00:00',
      batches: selectedBatches,
      timestamp: new Date().toISOString()
    };
    
    if (editingId) {
      updateLecture(editingId, lectureData);
      setEditingId(null);
    } else {
      addLecture(lectureData);
    }
    
    // Reset form
    setTitle('');
    setDescription('');
    setVideoUrl('');
    setThumbnailUrl('');
    setSubjectId('');
    setDuration('');
    setSelectedBatches([]);
  };
  
  const handleEdit = (lecture) => {
    setEditingId(lecture.id);
  };
  
  const handleDelete = (lectureId) => {
    if (window.confirm('Are you sure you want to delete this lecture?')) {
      deleteLecture(lectureId);
    }
  };
  
  const formatDuration = (duration) => {
    if (!duration) return '00:00';
    return duration;
  };
  
  const filteredLectures = lectures ? lectures.filter(lecture => 
    lecture.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lecture.description.toLowerCase().includes(searchTerm.toLowerCase())
  ) : [];
  
  return (
    <div className="admin-section">
      <div className="section-header">
        <h2>{editingId ? 'Edit Lecture' : 'Add New Lecture'}</h2>
        {editingId && (
          <button 
            className="back-button" 
            onClick={() => setEditingId(null)}
          >
            <ChevronLeft size={20} />
            Cancel Edit
          </button>
        )}
      </div>
      
      <form onSubmit={handleSubmit} className="admin-form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Lecture Title"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="subject">Subject</label>
            <select
              id="subject"
              value={subjectId}
              onChange={(e) => setSubjectId(e.target.value)}
              required
            >
              <option value="">Select Subject</option>
              {subjects && subjects.map(subject => (
                <option key={subject.id} value={subject.id}>
                  {subject.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Brief description of the lecture"
            required
          />
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="videoUrl">Video URL</label>
            <input
              type="text"
              id="videoUrl"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              placeholder="URL to the video"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="thumbnailUrl">Thumbnail URL (Optional)</label>
            <input
              type="text"
              id="thumbnailUrl"
              value={thumbnailUrl}
              onChange={(e) => setThumbnailUrl(e.target.value)}
              placeholder="URL to the thumbnail image"
            />
          </div>
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="duration">Duration (Optional)</label>
            <input
              type="text"
              id="duration"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              placeholder="HH:MM:SS"
            />
          </div>
        </div>
        
        <div className="form-group">
          <label>Select Batches</label>
          <BatchSelector 
            selectedBatches={selectedBatches} 
            onChange={setSelectedBatches} 
          />
        </div>
        
        <button type="submit" className="submit-button">
          <Upload size={20} />
          {editingId ? 'Update Lecture' : 'Add Lecture'}
        </button>
      </form>
      
      <div className="section-divider"></div>
      
      <div className="section-header">
        <h2>Manage Lectures</h2>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search lectures..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Subject</th>
              <th>Description</th>
              <th>Duration</th>
              <th>Batches</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredLectures.length > 0 ? (
              filteredLectures.map(lecture => {
                const subject = subjects?.find(s => s.id === lecture.subjectId);
                return (
                  <tr key={lecture.id}>
                    <td>
                      <div className="table-item-with-icon">
                        <Video size={18} />
                        {lecture.title}
                      </div>
                    </td>
                    <td>{subject ? subject.name : 'Unknown'}</td>
                    <td className="description-cell">{lecture.description}</td>
                    <td>{formatDuration(lecture.duration)}</td>
                    <td>
                      <div className="batch-badges">
                        {lecture.batches?.map(batchId => {
                          const batch = batches?.find(b => b.id === batchId);
                          return batch ? (
                            <span key={batchId} className="batch-badge">
                              {batch.name}
                            </span>
                          ) : null;
                        })}
                      </div>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button 
                          className="edit-button" 
                          onClick={() => handleEdit(lecture)}
                        >
                          Edit
                        </button>
                        <button 
                          className="delete-button" 
                          onClick={() => handleDelete(lecture.id)}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="6" className="empty-table-message">
                  {searchTerm ? 'No lectures match your search' : 'No lectures added yet'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageLectures;