import React from 'react';
import SearchHeader from '../components/Header/SearchHeader';
import SidebarFilter from '../components/sidebar/Sidebar';
import CandidateCard from '../components/Card/ProfileCard';

const dummyCandidates = [
  {
    name: 'Syed Saad Hussain Shah',
    position: 'HR Manpower Analyst / Assistant Manager',
    company: 'Company hidden',
    location: 'Doha, Qatar',
    nationality: 'Pakistan',
    age: '37',
    experience: '13 years, 6 months',
    phoneVerified: '4 months ago',
    education: 'HR, Hidden university +1 more education',
    photo: 'https://via.placeholder.com/80x100.png?text=Photo',
    lastVisited: '1 month ago',
    lastUpdated: '5 days ago',
  },
  {
    name: 'Awais Khan',
    position: 'Full Stack Developer',
    company: 'Company hidden',
    location: 'Karachi, Pakistan',
    nationality: 'Pakistan',
    age: '28',
    experience: '5 years',
    phoneVerified: '2 months ago',
    education: 'BSCS, FAST University',
    photo: 'https://via.placeholder.com/80x100.png?text=Photo',
    lastVisited: '2 weeks ago',
    lastUpdated: '3 days ago',
  },
  // Add more dummy candidates as needed
];

const DashboardPage = () => {
  return (
    <div>
      <SearchHeader />
      <div style={{ display: 'flex' }}>
        <SidebarFilter />
        <div style={{ padding: 20, flex: 1 }}>
          {dummyCandidates.map((candidate, index) => (
            <CandidateCard key={index} {...candidate} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
