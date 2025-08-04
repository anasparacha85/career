import React, { useEffect, useState } from 'react';
import { Search, Mail, User, Briefcase, X, Send, Clock, FileText, Target } from 'lucide-react';
import './AllTests.css';
import InviteModal from '../../components/Modal/InviteModal';
import Swal from 'sweetalert2';


const AllTests = () => {
  const [tests, setTests] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedTestId, setSelectedTestId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [invitationData, setInvitationData] = useState({
    email: '',
    name: '',
    position: ''
  });

  const fetchTests = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_LOCAL_BACKEND_API}/test/all-tests`, {
        method: 'GET',
      });
      const data = await res.json();
      console.log(data);

      
      setTests(data);
    } catch (err) {
      console.error('Error fetching tests:', err);
    }
  };

  useEffect(() => {
    fetchTests();
  }, []);

  const handleOpenModal = (testId) => {
    setSelectedTestId(testId);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setInvitationData({ email: '', name: '', position: '' });
  };

  const handleInputChange = (e) => {
    setInvitationData({
      ...invitationData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitInvitation = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${import.meta.env.VITE_LOCAL_BACKEND_API}/invite/sendInvite`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...invitationData,
          testId: selectedTestId,
        }),
      });

      const data = await res.json();
      
      if (res.ok) {
        console.log(data);
        
        Swal.fire(data.SuccessMessage)
        handleCloseModal();
      } else {
        Swal.fire(data.FailureMessage || 'Error sending invitation.');
      }
    } catch (err) {
      console.error('Error:', err);
     
      Swal.fire('Something went wrong.');
    }
  };

  const filteredTests = tests.filter(test =>
    test.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    test.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedTest = tests.find(test => test._id === selectedTestId);

  return (
    <div id="all-tests-container">
      <div id="all-tests-header">
        <div id="all-tests-header-content">
          <div id="all-tests-header-top">
            <div>
              <h1 id="all-tests-title">Test Library</h1>
              <p id="all-tests-subtitle">Manage and send invitations for your assessments</p>
            </div>
            <div id="all-tests-search-container">
              <Search id="all-tests-search-icon" />
              <input
                id="all-tests-search-input"
                type="text"
                placeholder="Search tests..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div id="all-tests-stats-grid">
            <div className="all-tests-stat-card">
              <div className="all-tests-stat-content">
                <div className="all-tests-stat-icon">
                  <FileText />
                </div>
                <div>
                  <p className="all-tests-stat-label">Total Tests</p>
                  <p className="all-tests-stat-value">{tests.length}</p>
                </div>
              </div>
            </div>
            <div className="all-tests-stat-card">
              <div className="all-tests-stat-content">
                <div className="all-tests-stat-icon">
                  <Target />
                </div>
                <div>
                  <p className="all-tests-stat-label">Active Tests</p>
                  <p className="all-tests-stat-value">{tests.length}</p>
                </div>
              </div>
            </div>
            <div className="all-tests-stat-card">
              <div className="all-tests-stat-content">
                <div className="all-tests-stat-icon">
                  <Mail />
                </div>
                <div>
                  <p className="all-tests-stat-label">Invitations Sent</p>
                  <p className="all-tests-stat-value">156</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="all-tests-main-content">
        {filteredTests.length === 0 ? (
          <div id="all-tests-empty-state">
            <Search id="all-tests-empty-icon" />
            <h3>No tests found</h3>
            <p>Try adjusting your search criteria</p>
          </div>
        ) : (
          <div id="all-tests-grid">
            {filteredTests.map((test) => (
              <div
                key={test._id}
                className="all-tests-card"
              >
                <div className="all-tests-card-header">
                  <h3 className="all-tests-card-title">{test.name}</h3>
                  <p className="all-tests-card-description">{test.description}</p>
                </div>
                
                <div className="all-tests-card-details">
                  <div className="all-tests-details-grid">
                    <div className="all-tests-detail-item">
                      <Clock className="all-tests-detail-icon" />
                      <p className="all-tests-detail-label">Duration</p>
                      <p className="all-tests-detail-value">{test.duration} min</p>
                    </div>
                    <div className="all-tests-detail-item">
                      <FileText className="all-tests-detail-icon" />
                      <p className="all-tests-detail-label">Questions</p>
                      <p className="all-tests-detail-value">{test.questions?.length || 0}</p>
                    </div>
                    <div className="all-tests-detail-item">
                      <Target className="all-tests-detail-icon" />
                      <p className="all-tests-detail-label">Pass Score</p>
                      <p className="all-tests-detail-value">{test.passingScore}%</p>
                    </div>
                  </div>
                  
                  <button
                    className="all-tests-invite-button"
                    onClick={() => handleOpenModal(test._id)}
                  >
                    <Mail className="all-tests-button-icon" />
                    Send Invitation
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showModal && (
        <InviteModal 
          test={selectedTest}
          invitationData={invitationData}
          onInputChange={handleInputChange}
          onSubmit={handleSubmitInvitation}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default AllTests;