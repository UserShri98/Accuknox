import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Search } from 'lucide-react';
import { setSearchTerm } from '../store/dashboardSlice';

const SearchBar = () => {
  const dispatch = useDispatch();
  const searchTerm = useSelector(state => state.dashboard.searchTerm);

  const handleSearchChange = (e) => {
    dispatch(setSearchTerm(e.target.value));
  };

  return (
    <div className="search-bar">
      <Search className="search-icon" size={20} />
      <input
        type="text"
        placeholder="Search widgets..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="search-input"
      />
    </div>
  );
};

export default SearchBar;