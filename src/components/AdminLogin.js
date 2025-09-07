import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, ArrowRight } from 'lucide-react';

const AdminLogin = () => {
  const [key, setKey] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Check if the admin key is correct
    if (key === '26127') {
      // Store admin access in session storage
      sessionStorage.setItem('adminAccess', 'true');
      navigate('/admin');
    } else {
      setError('Invalid admin key. Please try again.');
    }
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-card">
        <div className="admin-login-header">
          <Lock size={32} />
          <h1>Admin Access</h1>
        </div>
        
        <form onSubmit={handleSubmit}>
          {error && <div className="error-message">{error}</div>}
          
          <div className="input-group">
            <label htmlFor="adminKey">Enter Admin Key</label>
            <input
              type="password"
              id="adminKey"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              placeholder="Enter the admin key"
              required
            />
          </div>
          
          <button type="submit" className="admin-login-button">
            <span>Access Admin Panel</span>
            <ArrowRight size={18} />
          </button>
        </form>
        
        <div className="back-link">
          <a href="/" onClick={(e) => { e.preventDefault(); navigate('/'); }}>
            Return to Homepage
          </a>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;