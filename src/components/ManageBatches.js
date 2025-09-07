import React, { useState, useContext, useEffect } from 'react';
import { DataContext } from '../context/DataContext';
import { ChevronLeft, Upload, Trash2, Users } from 'lucide-react';

const ManageBatches = () => {
  const { batches, addBatch, deleteBatch, updateBatch } = useContext(DataContext);
  
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [year, setYear] = useState('');
  const [studentCount, setStudentCount] = useState('');
  const [price, setPrice] = useState('');
  const [color, setColor] = useState('#3b82f6');
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Reset form when exiting edit mode
  useEffect(() => {
    if (!editingId) {
      setName('');
      setDescription('');
      setYear('');
      setStudentCount('');
      setPrice('');
      setColor('#3b82f6');
    }
  }, [editingId]);
  
  // Load batch data when editing
  useEffect(() => {
    if (editingId && batches) {
      const batchToEdit = batches.find(batch => batch.id === editingId);
      if (batchToEdit) {
        setName(batchToEdit.name);
        setDescription(batchToEdit.description || '');
        setYear(batchToEdit.year || '');
        setStudentCount(batchToEdit.studentCount || '');
        setPrice(batchToEdit.price || '');
        setColor(batchToEdit.color || '#3b82f6');
      }
    }
  }, [editingId, batches]);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!name) {
      alert('Please enter a batch name');
      return;
    }
    
    const batchData = {
      name,
      description: description || '',
      year: year || new Date().getFullYear().toString(),
      studentCount: studentCount || '0',
      price: price || '',
      color: color || '#3b82f6',
      timestamp: new Date().toISOString()
    };
    
    if (editingId) {
      updateBatch(editingId, batchData);
      setEditingId(null);
    } else {
      addBatch(batchData);
    }
    
    // Reset form
    setName('');
    setDescription('');
    setYear('');
    setStudentCount('');
    setPrice('');
    setColor('#3b82f6');
  };
  
  const handleEdit = (batch) => {
    setEditingId(batch.id);
  };
  
  const handleDelete = (batchId) => {
    if (window.confirm('Are you sure you want to delete this batch? This will also remove this batch from all subjects, lectures, notes, and DPPs.')) {
      deleteBatch(batchId);
    }
  };
  
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
  
  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: 5 }, (_, i) => currentYear - 2 + i);
  
  const filteredBatches = batches ? batches.filter(batch => 
    batch.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (batch.description && batch.description.toLowerCase().includes(searchTerm.toLowerCase()))
  ) : [];
  
  return (
    <div className="admin-section">
      <div className="section-header">
        <h2>{editingId ? 'Edit Batch' : 'Add New Batch'}</h2>
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
            <label htmlFor="name">Batch Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Batch Name"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="year">Year</label>
            <select
              id="year"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            >
              <option value="">Select Year</option>
              {yearOptions.map(year => (
                <option key={year} value={year.toString()}>
                  {year}
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
            placeholder="Brief description of the batch"
          />
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="studentCount">Number of Students</label>
            <input
              type="number"
              id="studentCount"
              value={studentCount}
              onChange={(e) => setStudentCount(e.target.value)}
              placeholder="Number of students"
              min="0"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="price">Price (Optional)</label>
            <input
              type="text"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="e.g., ₹1999/month"
            />
          </div>
        </div>
        
        <div className="form-row">
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
        </div>
        
        <button type="submit" className="submit-button">
          <Upload size={20} />
          {editingId ? 'Update Batch' : 'Add Batch'}
        </button>
      </form>
      
      <div className="section-divider"></div>
      
      <div className="section-header">
        <h2>Manage Batches</h2>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search batches..."
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
              <th>Year</th>
              <th>Students</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBatches.length > 0 ? (
              filteredBatches.map(batch => (
                <tr key={batch.id}>
                  <td>
                    <div className="table-item-with-icon">
                      <Users size={18} style={{ color: batch.color || '#3b82f6' }} />
                      {batch.name}
                    </div>
                  </td>
                  <td className="description-cell">{batch.description || '-'}</td>
                  <td>{batch.year || '-'}</td>
                  <td>{batch.studentCount || '0'}</td>
                  <td>{batch.price || '-'}</td>
                  <td>
                    <div className="action-buttons">
                      <button 
                        className="edit-button" 
                        onClick={() => handleEdit(batch)}
                      >
                        Edit
                      </button>
                      <button 
                        className="delete-button" 
                        onClick={() => handleDelete(batch.id)}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="empty-table-message">
                  {searchTerm ? 'No batches match your search' : 'No batches added yet'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageBatches;