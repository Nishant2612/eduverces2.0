import React, { useState, useContext, useEffect } from 'react';
import { DataContext } from '../context/DataContext';
import { ChevronLeft, Upload, Trash2, FileText } from 'lucide-react';
import BatchSelector from './BatchSelector';

const ManageNotes = () => {
  const { batches, subjects, notes, addNote, deleteNote, updateNote } = useContext(DataContext);
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [fileUrl, setFileUrl] = useState('');
  const [subjectId, setSubjectId] = useState('');
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
      setSelectedBatches([]);
    }
  }, [editingId]);
  
  // Load note data when editing
  useEffect(() => {
    if (editingId && notes) {
      const noteToEdit = notes.find(note => note.id === editingId);
      if (noteToEdit) {
        setTitle(noteToEdit.title);
        setDescription(noteToEdit.description);
        setFileUrl(noteToEdit.fileUrl);
        setSubjectId(noteToEdit.subjectId);
        setSelectedBatches(noteToEdit.batches || []);
      }
    }
  }, [editingId, notes]);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!title || !description || !fileUrl || !subjectId || selectedBatches.length === 0) {
      alert('Please fill all fields and select at least one batch');
      return;
    }
    
    const noteData = {
      title,
      description,
      fileUrl,
      subjectId,
      batches: selectedBatches,
      timestamp: new Date().toISOString()
    };
    
    if (editingId) {
      updateNote(editingId, noteData);
      setEditingId(null);
    } else {
      addNote(noteData);
    }
    
    // Reset form
    setTitle('');
    setDescription('');
    setFileUrl('');
    setSubjectId('');
    setSelectedBatches([]);
  };
  
  const handleEdit = (note) => {
    setEditingId(note.id);
  };
  
  const handleDelete = (noteId) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      deleteNote(noteId);
    }
  };
  
  const filteredNotes = notes ? notes.filter(note => 
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.description.toLowerCase().includes(searchTerm.toLowerCase())
  ) : [];
  
  return (
    <div className="admin-section">
      <div className="section-header">
        <h2>{editingId ? 'Edit Note' : 'Add New Note'}</h2>
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
              placeholder="Note Title"
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
            placeholder="Brief description of the note"
            required
          />
        </div>
        
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
          <label>Select Batches</label>
          <BatchSelector 
            selectedBatches={selectedBatches} 
            onChange={setSelectedBatches} 
          />
        </div>
        
        <button type="submit" className="submit-button">
          <Upload size={20} />
          {editingId ? 'Update Note' : 'Add Note'}
        </button>
      </form>
      
      <div className="section-divider"></div>
      
      <div className="section-header">
        <h2>Manage Notes</h2>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search notes..."
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
              <th>Batches</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredNotes.length > 0 ? (
              filteredNotes.map(note => {
                const subject = subjects?.find(s => s.id === note.subjectId);
                return (
                  <tr key={note.id}>
                    <td>
                      <div className="table-item-with-icon">
                        <FileText size={18} />
                        {note.title}
                      </div>
                    </td>
                    <td>{subject ? subject.name : 'Unknown'}</td>
                    <td className="description-cell">{note.description}</td>
                    <td>
                      <div className="batch-badges">
                        {note.batches?.map(batchId => {
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
                          onClick={() => handleEdit(note)}
                        >
                          Edit
                        </button>
                        <button 
                          className="delete-button" 
                          onClick={() => handleDelete(note.id)}
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
                <td colSpan="5" className="empty-table-message">
                  {searchTerm ? 'No notes match your search' : 'No notes added yet'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageNotes;