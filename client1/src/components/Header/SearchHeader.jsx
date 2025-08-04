import React from 'react';
import './SearchHeader.css';

const SearchHeader = () => {
  return (
    <div className="search-header-container">
      {/* LEFT SECTION */}
      <div className="left-section">
        <div className="search-row">
          <input
            type="text"
            placeholder="Search by skill, title, location, etc..."
            className="search-input"
          />
          <button className="search-button">Search CVs</button>
          <div className="advanced-filters">
            <span>Advanced filters</span>
            <span className="arrow">&#9662;</span>
          </div>
        </div>

        <div className="match-options">
          <label><input type="radio" name="match" defaultChecked /> All words</label>
          <label><input type="radio" name="match" /> Any words</label>
          <label><input type="radio" name="match" /> Exact order</label>
          <label>
            <input type="radio" name="match" /> Boolean search
            <span className="info-icon">i</span>
          </label>
        </div>
      </div>

      {/* RIGHT SECTION */}
      <div className="right-section">
        <span className="reset-search">Reset search</span>
        <span className="settings-icon">&#9881;</span>
      </div>
    </div>
  );
};

export default SearchHeader;
