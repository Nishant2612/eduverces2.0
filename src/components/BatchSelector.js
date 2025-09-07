import React, { useState, useContext, useEffect } from 'react';
import { DataContext } from '../context/DataContext';

const BatchSelector = ({ selectedBatches = [], onChange }) => {
  const { batches, students } = useContext(DataContext);
  const [selected, setSelected] = useState(selectedBatches);
  
  // Update local state when selectedBatches prop changes
  useEffect(() => {
    setSelected(selectedBatches);
  }, [selectedBatches]);
  
  const batchesList = batches || [];
  const totalStudents = students?.length || 0;
  
  // Calculate how many students will be impacted
  const impactedStudents = students?.filter(student => 
    selected.some(batchId => student.batches?.includes(batchId))
  ).length || 0;
  
  const handleBatchToggle = (batchId) => {
    let newSelected;
    
    if (selected.includes(batchId)) {
      // Remove batch if already selected
      newSelected = selected.filter(id => id !== batchId);
    } else {
      // Add batch if not selected
      newSelected = [...selected, batchId];
    }
    
    setSelected(newSelected);
    
    // Call onChange prop if provided
    if (onChange) {
      onChange(newSelected);
    }
  };

  return (
    <div className="batch-selector">
      <h3>Select Target Batches</h3>
      <p className="selector-description">
        Choose which batches will receive this content
      </p>
      
      <div className="batch-options">
        {batchesList.map(batch => (
          <div 
            key={batch.id}
            className={`batch-option ${selected.includes(batch.id) ? 'selected' : ''}`}
            onClick={() => handleBatchToggle(batch.id)}
          >
            <div className="checkbox">
              {selected.includes(batch.id) && <span className="checkmark">✓</span>}
            </div>
            <div className="batch-option-info">
              <span className="batch-name">{batch.name}</span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="impact-summary">
        <div className="impact-badge">
          <span className="impact-count">{selected.length}</span>
          <span className="impact-label">Batches Selected</span>
        </div>
        
        <div className="impact-badge">
          <span className="impact-count">{impactedStudents}</span>
          <span className="impact-label">Students Impacted</span>
        </div>
        
        <div className="impact-badge">
          <span className="impact-count">{Math.round((impactedStudents / totalStudents) * 100)}%</span>
          <span className="impact-label">of Total Students</span>
        </div>
      </div>
      
      <div className="selected-summary">
        <div className="selected-batches">
          {selected.length > 0 ? (
            <div className="batch-badges">
              {selected.map(batchId => {
                const batch = batchesList.find(b => b.id === batchId);
                return batch ? (
                  <span key={batchId} className="batch-badge">
                    {batch.name}
                  </span>
                ) : null;
              })}
            </div>
          ) : (
            <span className="no-selection">No batches selected</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default BatchSelector;