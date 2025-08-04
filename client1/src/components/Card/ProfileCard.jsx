import React from 'react';
import './ProfileCard.css';

const CandidateCard = ({ 
  name, position, company, location, nationality, age, experience, phoneVerified, education, photo, lastVisited, lastUpdated 
}) => {
  return (
    <div className="candidate-card">
      <div className='parent-top-bar'>
        <div className="top-bar">
          <span>Last visited: <strong>{lastVisited}</strong></span>
          <span>Last updated: <strong>{lastUpdated}</strong></span>
        </div>
        <div className="contact-buttons">
          <button className="contact-btn">Contact candidate</button>
          <button className="message-btn">💬 Message</button>
        </div>
      </div>

      <div className="card-body">
        <img src={photo} alt="Candidate" className="profile-img" />

        <div className="details">
          <div className="header-row">
            <h2 className="name">{name}</h2>
            <button className="upgrade-btn">Upgrade to see last name</button>
          </div>
          <p className="position">{position}</p>
          <p className="company"><i className="lock-icon">🔒</i> {company}</p>
          <p className="info-line">
            <span>Location: <strong>{location}</strong></span>
            <span>Nationality: <strong>{nationality}</strong></span>
            <span>Age: <strong>{age}</strong></span>
            <span>Work experience: <strong>{experience}</strong></span>
          </p>
          <p className="phone">Phone verified <strong>{phoneVerified}</strong> ✔️</p>
        </div>
      </div>

      <div className="education">
        <strong>Education</strong>
        <p>{education}</p>
      </div>
    </div>
  );
};

export default CandidateCard;
