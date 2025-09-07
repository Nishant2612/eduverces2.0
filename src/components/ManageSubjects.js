import React, { useState, useContext, useEffect } from 'react';
import { DataContext } from '../context/DataContext';
import { ChevronLeft, Upload, Trash2, BookOpen } from 'lucide-react';
import BatchSelector from './BatchSelector';

const ManageSubjects = () => {
  const { batches, subjects, addSubject, deleteSubject, updateSubject } = useContext(DataContext);
  
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [iconName, setIconName] = useState('book');
  const [color, setColor] = useState('#3b82f6');
  const [selectedBatches, setSelectedBatches] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Reset form when exiting edit mode
  useEffect(() => {
    if (!editingId) {
      setName('');
      setDescription('');
      setIconName('book');
      setColor('#3b82f6');
      setSelectedBatches([]);
    }
  }, [editingId]);
  
  // Load subject data when editing
  useEffect(() => {
    if (editingId && subjects) {
      const subjectToEdit = subjects.find(subject => subject.id === editingId);
      if (subjectToEdit) {
        setName(subjectToEdit.name);
        setDescription(subjectToEdit.description || '');
        setIconName(subjectToEdit.iconName || 'book');
        setColor(subjectToEdit.color || '#3b82f6');
        setSelectedBatches(subjectToEdit.batches || []);
      }
    }
  }, [editingId, subjects]);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!name || selectedBatches.length === 0) {
      alert('Please enter a subject name and select at least one batch');
      return;
    }
    
    const subjectData = {
      name,
      description: description || '',
      iconName: iconName || 'book',
      color: color || '#3b82f6',
      batches: selectedBatches,
      timestamp: new Date().toISOString()
    };
    
    if (editingId) {
      updateSubject(editingId, subjectData);
      setEditingId(null);
    } else {
      addSubject(subjectData);
    }
    
    // Reset form
    setName('');
    setDescription('');
    setIconName('book');
    setColor('#3b82f6');
    setSelectedBatches([]);
  };
  
  const handleEdit = (subject) => {
    setEditingId(subject.id);
  };
  
  const handleDelete = (subjectId) => {
    if (window.confirm('Are you sure you want to delete this subject? This will also delete all associated lectures, notes, and DPPs.')) {
      deleteSubject(subjectId);
    }
  };
  
  const iconOptions = [
    { name: 'book', label: 'Book' },
    { name: 'calculator', label: 'Calculator' },
    { name: 'flask', label: 'Flask' },
    { name: 'globe', label: 'Globe' },
    { name: 'pen-tool', label: 'Pen' },
    { name: 'atom', label: 'Atom' },
    { name: 'code', label: 'Code' },
    { name: 'database', label: 'Database' },
  ];
  
  const colorOptions = [
    { value: '#3b82f6', label: 'Blue' },
    { value: '#10b981', label: 'Green' },
    { value: '#ef4444', label: 'Red' },
    { value: '#f59e0b', label: 'Orange' },
    { value: '#8b5cf6', label: 'Purple' },
    { value: '#ec4899', label: 'Pink' },
    { value: '#6b7280', label: 'Gray' },
    { value: '#000000', label: 'Black' },
  ];
  
  const filteredSubjects = subjects ? subjects.filter(subject => 
    subject.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (subject.description && subject.description.toLowerCase().includes(searchTerm.toLowerCase()))
  ) : [];
  
  return (
    <div className="admin-section">
      <div className="section-header">
        <h2>{editingId ? 'Edit Subject' : 'Add New Subject'}</h2>
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
            <label htmlFor="name">Subject Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Subject Name"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="iconName">Icon</label>
            <select
              id="iconName"
              value={iconName}
              onChange={(e) => setIconName(e.target.value)}
            >
              {iconOptions.map(icon => (
                <option key={icon.name} value={icon.name}>
                  {icon.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="form-group">
          <label htmlFor="description">Description (Optional)</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Brief description of the subject"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="color">Color</label>
          <div className="color-selector">
            {colorOptions.map(colorOption => (
              <div 
                key={colorOption.value} 
                className={`color-option ${color === colorOption.value ? 'selected' : ''}`}
                style={{ backgroundColor: colorOption.value }}
                onClick={() => setColor(colorOption.value)}
                title={colorOption.label}
              />
            ))}
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
          {editingId ? 'Update Subject' : 'Add Subject'}
        </button>
      </form>
      
      <div className="section-divider"></div>
      
      <div className="section-header">
        <h2>Manage Subjects</h2>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search subjects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Icon</th>
              <th>Batches</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredSubjects.length > 0 ? (
              filteredSubjects.map(subject => (
                <tr key={subject.id}>
                  <td>
                    <div className="table-item-with-icon">
                      <BookOpen size={18} style={{ color: subject.color || '#3b82f6' }} />
                      {subject.name}
                    </div>
                  </td>
                  <td className="description-cell">{subject.description || '-'}</td>
                  <td>
                    <div className="icon-preview" style={{ backgroundColor: subject.color || '#3b82f6' }}>
                      {subject.iconName || 'book'}
                    </div>
                  </td>
                  <td>
                    <div className="batch-badges">
                      {subject.batches?.map(batchId => {
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
                        onClick={() => handleEdit(subject)}
                      >
                        Edit
                      </button>
                      <button 
                        className="delete-button" 
                        onClick={() => handleDelete(subject.id)}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="empty-table-message">
                  {searchTerm ? 'No subjects match your search' : 'No subjects added yet'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageSubjects;