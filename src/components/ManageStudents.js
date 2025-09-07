import React, { useState, useContext, useEffect } from 'react';
import { DataContext } from '../context/DataContext';
import { ChevronLeft, Upload, Trash2, UserPlus } from 'lucide-react';
import BatchSelector from './BatchSelector';

const ManageStudents = () => {
  const { batches, students, addStudent, deleteStudent, updateStudent } = useContext(DataContext);
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedBatches, setSelectedBatches] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Reset form when exiting edit mode
  useEffect(() => {
    if (!editingId) {
      setName('');
      setEmail('');
      setPhone('');
      setSelectedBatches([]);
    }
  }, [editingId]);
  
  // Load student data when editing
  useEffect(() => {
    if (editingId && students) {
      const studentToEdit = students.find(student => student.id === editingId);
      if (studentToEdit) {
        setName(studentToEdit.name);
        setEmail(studentToEdit.email || '');
        setPhone(studentToEdit.phone || '');
        setSelectedBatches(studentToEdit.batches || []);
      }
    }
  }, [editingId, students]);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!name || !email || selectedBatches.length === 0) {
      alert('Please fill all required fields and select at least one batch');
      return;
    }
    
    const studentData = {
      name,
      email,
      phone: phone || '',
      batches: selectedBatches,
      timestamp: new Date().toISOString()
    };
    
    if (editingId) {
      updateStudent(editingId, studentData);
      setEditingId(null);
    } else {
      addStudent(studentData);
    }
    
    // Reset form
    setName('');
    setEmail('');
    setPhone('');
    setSelectedBatches([]);
  };
  
  const handleEdit = (student) => {
    setEditingId(student.id);
  };
  
  const handleDelete = (studentId) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      deleteStudent(studentId);
    }
  };
  
  const filteredStudents = students ? students.filter(student => 
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (student.email && student.email.toLowerCase().includes(searchTerm.toLowerCase()))
  ) : [];
  
  return (
    <div className="admin-section">
      <div className="section-header">
        <h2>{editingId ? 'Edit Student' : 'Add New Student'}</h2>
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
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Student Name"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="student@example.com"
              required
            />
          </div>
        </div>
        
        <div className="form-group">
          <label htmlFor="phone">Phone Number (Optional)</label>
          <input
            type="tel"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone Number"
          />
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
          {editingId ? 'Update Student' : 'Add Student'}
        </button>
      </form>
      
      <div className="section-divider"></div>
      
      <div className="section-header">
        <h2>Manage Students</h2>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search students..."
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
              <th>Email</th>
              <th>Phone</th>
              <th>Batches</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.length > 0 ? (
              filteredStudents.map(student => (
                <tr key={student.id}>
                  <td>
                    <div className="table-item-with-icon">
                      <UserPlus size={18} />
                      {student.name}
                    </div>
                  </td>
                  <td>{student.email || '-'}</td>
                  <td>{student.phone || '-'}</td>
                  <td>
                    <div className="batch-badges">
                      {student.batches?.map(batchId => {
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
                        onClick={() => handleEdit(student)}
                      >
                        Edit
                      </button>
                      <button 
                        className="delete-button" 
                        onClick={() => handleDelete(student.id)}
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
                  {searchTerm ? 'No students match your search' : 'No students added yet'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageStudents;