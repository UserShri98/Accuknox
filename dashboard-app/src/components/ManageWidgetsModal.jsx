import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { X, Search } from 'lucide-react';
import { toggleWidget, addWidget } from '../store/dashboardSlice';

const ManageWidgetsModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const categories = useSelector(state => state.dashboard.categories);
  const [activeTab, setActiveTab] = useState('CSPM');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newWidgetName, setNewWidgetName] = useState('');
  const [newWidgetText, setNewWidgetText] = useState('');

  if (!isOpen) return null;

  const handleToggleWidget = (categoryId, widgetId, isVisible) => {
    dispatch(toggleWidget({ categoryId, widgetId, isVisible }));
  };

  const handleAddWidget = () => {
    if (newWidgetName.trim() && newWidgetText.trim()) {
      const categoryId = activeTab === 'CSPM' ? 'cspm-executive' : 
                        activeTab === 'CWPP' ? 'cwpp-dashboard' : 'registry-scan';
      
      dispatch(addWidget({
        categoryId,
        widget: {
          name: newWidgetName.trim(),
          text: newWidgetText.trim(),
          type: 'text'
        }
      }));
      
      setNewWidgetName('');
      setNewWidgetText('');
      setShowAddForm(false);
    }
  };

  const getCategoryWidgets = () => {
    const categoryMap = {
      'CSPM': 'cspm-executive',
      'CWPP': 'cwpp-dashboard', 
      'Image': 'registry-scan',
      'Ticket': 'registry-scan'
    };
    
    const categoryId = categoryMap[activeTab];
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.widgets : [];
  };

  const filteredWidgets = getCategoryWidgets().filter(widget =>
    widget.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const tabs = ['CSPM', 'CWPP', 'Image', 'Ticket'];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="add-widget-modal" onClick={e => e.stopPropagation()}>
        <div className="add-widget-header">
          <h3>Add Widget</h3>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>
                <div className="add-widget-content">
          <p className="add-widget-subtitle">
            Personalise your dashboard by adding the following widget
          </p>
          <div className="widget-tabs">
            {tabs.map(tab => (
              <button
                key={tab}
                className={`tab-button ${activeTab === tab ? 'active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="widget-search-bar">
            <Search className="search-icon" size={16} />
            <input
              type="text"
              placeholder="Search widgets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="widget-search-input"
            />
          </div>
          <div className="widget-list">
            {filteredWidgets.length > 0 ? (
              filteredWidgets.map(widget => (
                <div key={widget.id} className="widget-list-item">
                  <label className="widget-checkbox-label">
                    <input
                      type="checkbox"
                      checked={widget.isVisible !== false}
                      onChange={(e) => handleToggleWidget(
                        activeTab === 'CSPM' ? 'cspm-executive' : 
                        activeTab === 'CWPP' ? 'cwpp-dashboard' : 'registry-scan',
                        widget.id,
                        e.target.checked
                      )}
                      className="widget-checkbox"
                    />
                    <span className="checkmark"></span>
                    {widget.name}
                  </label>
                </div>
              ))
            ) : (
              <div className="no-results">
                <p>No widgets found in this category.</p>
              </div>
            )}
          </div>
          {showAddForm && (
            <div className="add-widget-form">
              <div className="form-group">
                <label>Widget Name</label>
                <input
                  type="text"
                  value={newWidgetName}
                  onChange={(e) => setNewWidgetName(e.target.value)}
                  placeholder="Enter widget name"
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label>Widget Text</label>
                <textarea
                  value={newWidgetText}
                  onChange={(e) => setNewWidgetText(e.target.value)}
                  placeholder="Enter widget text"
                  rows={3}
                  className="form-textarea"
                />
              </div>
              <div className="form-actions">
                <button 
                  className="btn-cancel"
                  onClick={() => setShowAddForm(false)}
                >
                  Cancel
                </button>
                <button 
                  className="btn-add"
                  onClick={handleAddWidget}
                >
                  Add Widget
                </button>
              </div>
            </div>
          )}

          {!showAddForm && (
            <button 
              className="btn-new-widget"
              onClick={() => setShowAddForm(true)}
            >
              + Add New Widget
            </button>
          )}
        </div>
        <div className="add-widget-footer">
          <button className="btn-cancel" onClick={onClose}>
            Cancel
          </button>
          <button className="btn-confirm" onClick={onClose}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManageWidgetsModal;