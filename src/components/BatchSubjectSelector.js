import React, { useState, useContext } from 'react';
import { DataContext } from '../context/DataContext';

const BatchSubjectSelector = ({ selectedSubjects = [], onChange }) => {
  const { data } = useContext(DataContext);
  const [selected, setSelected] = useState(selectedSubjects);
  
  const subjects = data?.subjects || [];
  
  const handleSubjectToggle = (subjectId) => {
    let newSelected;
    
    if (selected.includes(subjectId)) {
      // Remove subject if already selected
      newSelected = selected.filter(id => id !== subjectId);
    } else {
      // Add subject if not selected
      newSelected = [...selected, subjectId];
    }
    
    setSelected(newSelected);
    
    // Call onChange prop if provided
    if (onChange) {
      onChange(newSelected);
    }
  };

  // Subject icons with their respective colors
  const subjectIcons = {
    'Mathematics': { color: '#10b981' },
    'Science': { color: '#3b82f6' },
    'Social Science': { color: '#f59e0b' },
    'Hindi': { color: '#ef4444' },
    'English': { color: '#8b5cf6' },
    'Sanskrit': { color: '#f97316' },
    'Information Technology': { color: '#06b6d4' },
  };

  return (
    <div className="batch-subject-selector">
      <h3>Select Subjects</h3>
      <p className="selector-description">
        Choose which subjects to include
      </p>
      
      <div className="subject-options">
        {subjects.map(subject => {
          const iconStyle = subjectIcons[subject.name] || { color: '#64748b' };
          
          return (
            <div 
              key={subject.id}
              className={`subject-option ${selected.includes(subject.id) ? 'selected' : ''}`}
              onClick={() => handleSubjectToggle(subject.id)}
              style={{ borderLeft: selected.includes(subject.id) ? `4px solid ${iconStyle.color}` : '' }}
            >
              <div className="checkbox">
                {selected.includes(subject.id) && <span className="checkmark">✓</span>}
              </div>
              <div className="subject-icon" style={{ backgroundColor: iconStyle.color }}>
                {subject.name.charAt(0)}
              </div>
              <div className="subject-option-info">
                <span className="subject-name">{subject.name}</span>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="selected-summary">
        <div className="selected-subjects">
          {selected.length > 0 ? (
            <div className="subject-badges">
              {selected.map(subjectId => {
                const subject = subjects.find(s => s.id === subjectId);
                const iconStyle = subject ? (subjectIcons[subject.name] || { color: '#64748b' }) : { color: '#64748b' };
                
                return subject ? (
                  <span 
                    key={subjectId} 
                    className="subject-badge"
                    style={{ backgroundColor: iconStyle.color + '20', color: iconStyle.color }}
                  >
                    {subject.name}
                  </span>
                ) : null;
              })}
            </div>
          ) : (
            <span className="no-selection">No subjects selected</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default BatchSubjectSelector;