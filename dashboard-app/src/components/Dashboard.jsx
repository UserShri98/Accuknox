import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RefreshCw, MoreVertical, Plus, Clock } from 'lucide-react';
import Category from './Category';
import SearchBar from './SearchBar';
import ManageWidgetsModal from './ManageWidgetsModal';

const Dashboard = () => {
  const categories = useSelector((s) => s.dashboard.categories);
  const searchTerm = useSelector((s) => s.dashboard.searchTerm);
  const [isManageModalOpen, setIsManageModalOpen] = useState(false);

  const filteredCategories = searchTerm
    ? categories.map(category => ({
        ...category,
        widgets: category.widgets.filter(widget =>
          (widget.name && widget.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (widget.text && widget.text.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (widget.message && widget.message.toLowerCase().includes(searchTerm.toLowerCase()))
        )
      })).filter(category => category.widgets.length > 0)
    : categories;

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="dashboard-title-section">
          <h1>CNAPP Dashboard</h1>
        </div>
        <div className="dashboard-controls">
          <button
            className="btn-add-widget"
            onClick={() => setIsManageModalOpen(true)}
          >
            Add Widget <Plus size={14} />
          </button>
          <button className="btn-icon">
            <RefreshCw size={16} />
          </button>
          <button className="btn-icon">
            <MoreVertical size={16} />
          </button>
          <div className="time-filter">
            <Clock size={14} />
            <span>Last 2 days</span>
            <svg width="12" height="12" viewBox="0 0 12 12" className="dropdown-arrow">
              <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" fill="none"/>
            </svg>
          </div>
        </div>
      </header>

      <div className="mb-4">
        <SearchBar />
      </div>

      <main className="dashboard-content">
        {filteredCategories.length > 0 ? (
          filteredCategories.map(category => (
            <Category key={category.id} category={category} />
          ))
        ) : (
          <div className="text-center py-10 text-gray-500">
            <p className="text-base">No widgets found matching your search.</p>
          </div>
        )}
      </main>

      <ManageWidgetsModal
        isOpen={isManageModalOpen}
        onClose={() => setIsManageModalOpen(false)}
      />
    </div>
  );
};

export default Dashboard;