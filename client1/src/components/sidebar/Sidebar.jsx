import React, { useState } from 'react';
import './Sidebar.css';
import { CandidateStore } from '../../Contexts/CandidateContexts';

const filterSections = [
  {
    title: 'CV freshness',
    subtitles: ['Last visited', 'Last updated'],
    options: ['Last 24 hours', 'Last 3 days', 'Last 7 days', 'Last visited'],
  },
  {
    title: 'Past experience',
    subtitles: ['Industry background'],
    options: ['0-1 years', '2-5 years', '5+ years'],
  },
  {
    title: 'Personal information',
    subtitles: ['Verification status'],
    options: ['Has email', 'Has phone number', 'Verified'],
  },
  {
    title: 'Target job',
    subtitles: ['Role category'],
    options: ['Frontend', 'Backend', 'Fullstack'],
  },
  {
    title: 'Education',
    subtitles: ['Degree level'],
    options: ['Bachelor', 'Master', 'PhD'],
  },
  {
    title: 'Additional information',
    subtitles: ['Attachments'],
    options: ['Has resume', 'Has portfolio'],
  },
  {
    title: 'Previous actions',
    subtitles: ['Interaction history'],
    options: ['Previously shortlisted', 'Previously contacted'],
  },
];

const SidebarFilter = () => {
  const [expanded, setExpanded] = useState({});
  const [isSidebarOpen, setSidebarOpen] = useState(false);

const {selectedCategory,setselectedCategory,selectedItem,setselectedItem}=CandidateStore()
  const toggleExpand = (title) => {
    setExpanded((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };
  const onselectCategory=(value)=>{
    setselectedCategory(value)
    console.log(value);
    console.log(selectedCategory);
    
    
  }

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <>
      {/* Hamburger button for mobile */}
      <button className="hamburger" onClick={toggleSidebar}>
        &#9776;
      </button>

      {/* Overlay */}
      {isSidebarOpen && <div className="overlay" onClick={closeSidebar}></div>}

      <div className={`sidebar-container ${isSidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <span className="sidebar-title">
            <i className="icon">&#9776;</i> Shortlist
          </span>
          <span className="clear-all">Clear all</span>
        </div>

        <div className="sidebar-scroll">
          {filterSections.map((section, index) => (
            <div key={index} className="sidebar-section">
              <div
                className="section-title"
                onClick={() => {toggleExpand(section.title);onselectCategory(section.title)}}
              >
                <span>{expanded[section.title] ? '−' : '+'}</span>
                <span>{section.title}</span>
              </div>
              {expanded[section.title] && (
                <>
                  {section.subtitles.map((sub, idx) => (
                    <div key={idx} className="section-subtitle">
                      {sub}
                    </div>
                  ))}
                  <div className="section-options">
                    {section.options.map((opt, i) => (
                      <label key={i}>
                        <input type="radio" name={section.title} /> {opt}
                      </label>
                    ))}
                  </div>
                </>
              )}
            </div>
          ))}

          <div className="sidebar-section">
            <div
              className="section-title"
              onClick={() => toggleExpand('Show only CVs')}
            >
              <span>{expanded['Show only CVs'] ? '−' : '+'}</span>
              <span>Show only CVs that have</span>
            </div>
            {expanded['Show only CVs'] && (
              <div className="section-options">
                <label><input type="checkbox" /> Contact information</label>
                <label><input type="checkbox" /> Mobile confirmation</label>
                <label><input type="checkbox" /> Photo</label>
              </div>
            )}
          </div>
        </div>

        <div className="sticky-footer">
          <button className="apply-btn">Apply</button>
        </div>
      </div>
    </>
  );
};

export default SidebarFilter;
