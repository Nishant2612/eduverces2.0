import React, { useState, useContext, useEffect } from 'react';
import { DataContext } from '../context/DataContext';
import { ChevronLeft, Upload, Trash2, FileText } from 'lucide-react';
import BatchSelector from './BatchSelector';

const ManageDPPs = () => {
  const { batches, subjects, dpps, addDPP, deleteDPP, updateDPP } = useContext(DataContext);
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [fileUrl, setFileUrl] = useState('');
  const [subjectId, setSubjectId] = useState('');
  const [difficulty, setDifficulty] = useState('medium');
  const [selectedBatches, setSelectedBatches] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Reset form when exiting edit mode
  useEffect(() => {
    if (!editingId) {
      setTitle('');
      setDescription('');
      setFileUrl('');
      setSubjectId('');
      setDifficulty('medium');
      setSelectedBatches([]);
    }
  }, [editingId]);
  
  // Load DPP data when editing
  useEffect(() => {
    if (editingId && dpps) {
      const dppToEdit = dpps.find(dpp => dpp.id === editingId);
      if (dppToEdit) {
        setTitle(dppToEdit.title);
        setDescription(dppToEdit.description);
        setFileUrl(dppToEdit.fileUrl);
        setSubjectId(dppToEdit.subjectId);
        setDifficulty(dppToEdit.difficulty || 'medium');
        setSelectedBatches(dppToEdit.batches || []);
      }
    }
  }, [editingId, dpps]);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!title || !description || !fileUrl || !subjectId || selectedBatches.length === 0) {
      alert('Please fill all fields and select at least one batch');
      return;
    }
    
    const dppData = {
      title,
      description,
      fileUrl,
      subjectId,
      difficulty,
      batches: selectedBatches,
      timestamp: new Date().toISOString()
    };
    
    if (editingId) {
      updateDPP(editingId, dppData);
      setEditingId(null);
    } else {
      addDPP(dppData);
    }
    
    // Reset form
    setTitle('');
    setDescription('');
    setFileUrl('');
    setSubjectId('');
    setDifficulty('medium');
    setSelectedBatches([]);
  };
  
  const handleEdit = (dpp) => {
    setEditingId(dpp.id);
  };
  
  const handleDelete = (dppId) => {
    if (window.confirm('Are you sure you want to delete this DPP?')) {
      deleteDPP(dppId);
    }
  };
  
  const getDifficultyColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case 'easy':
        return '#10b981'; // green
      case 'medium':
        return '#f59e0b'; // orange
      case 'hard':
        return '#ef4444'; // red
      default:
        return '#6b7280'; // gray
    }
  };
  
  const filteredDPPs = dpps ? dpps.filter(dpp => 
    dpp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dpp.description.toLowerCase().includes(searchTerm.toLowerCase())
  ) : [];
  
  return (
    <div className="admin-section">
      <div className="section-header">
        <h2>{editingId ? 'Edit DPP' : 'Add New DPP'}</h2>
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
              placeholder="DPP Title"
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
            placeholder="Brief description of the DPP"
            required
          />
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="fileUrl">File URL</label>
            <input
              type="text"
              id="fileUrl"
              value={fileUrl}
              onChange={(e) => setFileUrl(e.target.value)}
              placeholder="URL to the PDF file"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="difficulty">Difficulty Level</label>
            <select
              id="difficulty"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
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
          {editingId ? 'Update DPP' : 'Add DPP'}
        </button>
      </form>
      
      <div className="section-divider"></div>
      
      <div className="section-header">
        <h2>Manage DPPs</h2>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search DPPs..."
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
              <th>Difficulty</th>
              <th>Batches</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredDPPs.length > 0 ? (
              filteredDPPs.map(dpp => {
                const subject = subjects?.find(s => s.id === dpp.subjectId);
                return (
                  <tr key={dpp.id}>
                    <td>
                      <div className="table-item-with-icon">
                        <FileText size={18} />
                        {dpp.title}
                      </div>
                    </td>
                    <td>{subject ? subject.name : 'Unknown'}</td>
                    <td className="description-cell">{dpp.description}</td>
                    <td>
                      <span 
                        className="difficulty-badge"
                        style={{ backgroundColor: getDifficultyColor(dpp.difficulty) }}
                      >
                        {dpp.difficulty || 'Medium'}
                      </span>
                    </td>
                    <td>
                      <div className="batch-badges">
                        {dpp.batches?.map(batchId => {
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
                          onClick={() => handleEdit(dpp)}
                        >
                          Edit
                        </button>
                        <button 
                          className="delete-button" 
                          onClick={() => handleDelete(dpp.id)}
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
                  {searchTerm ? 'No DPPs match your search' : 'No DPPs added yet'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageDPPs;