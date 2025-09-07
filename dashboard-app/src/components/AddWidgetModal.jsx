import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { X } from 'lucide-react';
import { addWidget } from '../store/dashboardSlice';

const AddWidgetModal = ({ isOpen, onClose, categoryId, categoryName }) => {
  const dispatch = useDispatch();
  const [widgetName, setWidgetName] = useState('');
  const [widgetText, setWidgetText] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (widgetName.trim() && widgetText.trim()) {
      dispatch(addWidget({
        categoryId,
        widget: {
          name: widgetName.trim(),
          text: widgetText.trim()
        }
      }));
      setWidgetName('');
      setWidgetText('');
      onClose();
    }
  };

  const handleCancel = () => {
    setWidgetName('');
    setWidgetText('');
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Add Widget to {categoryName}</h3>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label htmlFor="widgetName">Widget Name:</label>
            <input
              id="widgetName"
              type="text"
              value={widgetName}
              onChange={(e) => setWidgetName(e.target.value)}
              placeholder="Enter widget name"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="widgetText">Widget Text:</label>
            <textarea
              id="widgetText"
              value={widgetText}
              onChange={(e) => setWidgetText(e.target.value)}
              placeholder="Enter widget content"
              rows={4}
              required
            />
          </div>
          <div className="modal-actions">
            <button type="button" onClick={handleCancel} className="btn-cancel">
              Cancel
            </button>
            <button type="submit" className="btn-confirm">
              Add Widget
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddWidgetModal;