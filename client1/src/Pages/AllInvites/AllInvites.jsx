import React, { useEffect, useState } from 'react';
import { ClipLoader } from 'react-spinners';
import { format } from 'date-fns';
import { 
  Users, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Calendar, 
  Mail, 
  UserPlus, 
  Send, 
  MailPlus,
  Search,
  Filter,
  ChevronDown,
  X,
  Eye,
  EyeClosed,
  EyeOff
} from 'lucide-react';
import './AllInvites.css';
import { useNavigate, useParams } from 'react-router-dom';
import LoadingState from '../../components/States/LoadingState';
import InviteModal from '../../components/Modal/InviteModal';
import Swal from 'sweetalert2';
import { CandidateStore } from '../../Contexts/CandidateContexts';
import BulkInviteModal from '../../components/Modal/BulkInviteModal';

const TestCandidates = () => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [Test, setTest] = useState({});
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [invitationData, setInvitationData] = useState({
    email: '',
    name: '',
    position: ''
  });
  const [ShowBulkInviteModal, setShowBulkInviteModal] = useState(false);
  
  // New state for filtering and tabs
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [showFilters, setShowFilters] = useState(false);
  
  const params = useParams();
  const navigate = useNavigate();
  const { sendSingleInvitation } = CandidateStore();

  const fetchTestById = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`${import.meta.env.VITE_LOCAL_BACKEND_API}/api/admin/getTestById/${params.testid}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await res.json();
      if (res.ok) {
        setTest(data);
      } else {
        setError(data.FailureMessage);
      }
    } catch (error) {
      console.log(error);
      setError(error.FailureMessage);
    } finally {
      setLoading(false);
      setError(false);
    }
  };

  const fetchCandidates = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(`${import.meta.env.VITE_LOCAL_BACKEND_API}/api/admin/getInvite/${params.testid}`);
      const data = await res.json();
      if (res.ok) {
        setCandidates(data);
      }
    } catch (err) {
      console.error(err);
      setError('Failed to fetch candidates. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestById();
  }, []);

  useEffect(() => {
    fetchCandidates();
  }, []);

  // Filter and sort candidates based on active tab and search
  const getFilteredCandidates = () => {
    let filtered = candidates;

    // Filter by tab
    switch (activeTab) {
      case 'pending':
        filtered = candidates.filter(c => c.status === 'pending');
        break;
      case 'completed':
        filtered = candidates.filter(c => c.status === 'completed');
        break;
      case 'shortlisted':
        filtered = candidates.filter(c => c.status === 'shortlisted');
        break;
      case 'discarded':
        filtered = candidates.filter(c => c.status === 'discarded' || c.status === 'expired');
        break;
      default:
        filtered = candidates;
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(candidate =>
        candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        candidate.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        candidate.position.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort candidates
    switch (sortBy) {
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'date':
        filtered.sort((a, b) => new Date(b.invitedAt) - new Date(a.invitedAt));
        break;
      case 'status':
        filtered.sort((a, b) => a.status.localeCompare(b.status));
        break;
      default:
        break;
    }

    return filtered;
  };

  const filteredCandidates = getFilteredCandidates();

  // Calculate statistics
  const allCount = candidates?.length || 0;
  const pendingCount = candidates?.filter(c => c.status === 'pending').length || 0;
  const completedCount = candidates?.filter(c => c.status === 'completed').length || 0;
  // const shortlistedCount = candidates?.filter(c => c.status === 'shortlisted').length || 0;
  // const discardedCount = candidates?.filter(c => c.status === 'discarded' || c.status === 'expired').length || 0;

  // Tab configuration
  const tabs = [
    { id: 'all', label: 'All Invites', count: allCount, color: 'default' },
    { id: 'pending', label: 'Pending', count: pendingCount, color: 'orange' },
    { id: 'completed', label: 'To Evaluate', count: completedCount, color: 'blue' },
    // { id: 'shortlisted', label: 'Shortlisted', count: shortlistedCount, color: 'green' },
    // { id: 'discarded', label: 'Discarded', count: discardedCount, color: 'red' }
  ];

  const handleBulkOpenModal = () => {
    setShowBulkInviteModal(true);
  };

  const handleBulkCloseModal = () => {
    setShowBulkInviteModal(false);
  };

  const GotoAttempt = (id) => {
    navigate(`/attempt/${id}`);
  };

  const handleOpenInviteModal = () => {
    setShowInviteModal(true);
  };

  const handleCloseInviteModal = () => {
    setShowInviteModal(false);
    setInvitationData({
      email: '',
      name: '',
      position: ''
    });
  };

  const handleInvitationInputChange = (e) => {
    const { name, value } = e.target;
    setInvitationData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmitInvitation = async (e) => {
    e.preventDefault();
    const result = await sendSingleInvitation({ invitationData, testId: Test._id });
    if (result.success) {
      handleCloseInviteModal();
      fetchCandidates();
    }
  };

  const handleBulkSubmit = async (candidates) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_LOCAL_BACKEND_API}/invite/sendBulkInvites`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          testId: Test._id,
          candidates,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        Swal.fire(data.SuccessMessage);
        handleBulkCloseModal();
        fetchCandidates();
      } else {
        Swal.fire(data.FailureMessage || 'Error sending bulk invitations.');
      }
    } catch (err) {
      Swal.fire('Something went wrong.');
    }
  };

  const getStatusBadgeClass = (status) => {
    switch (status?.toLowerCase()) {
      case 'completed':
        return 'status-badge status-completed';
      case 'pending':
        return 'status-badge status-pending';
      case 'shortlisted':
        return 'status-badge status-shortlisted';
      case 'discarded':
      case 'expired':
        return 'status-badge status-discarded';
      default:
        return 'status-badge status-expired';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '—';
    try {
      return format(new Date(dateString), 'MMM dd, yyyy • hh:mm a');
    } catch (error) {
      return '—';
    }
  };

  const clearSearch = () => {
    setSearchTerm('');
  };

  return (
    <div className="test-candidates-container">
      <div className="test-candidates-wrapper">
        {/* Header Section */}
        <div className="candidates-header">
          <div className="candidates-header-content">
            <div className="candidates-header-top">
              <div className="candidates-header-text">
                <h1 className="candidates-title">Test Invitations</h1>
                <p className="candidates-subtitle">
                  Monitor and track all candidate invitations and their progress
                </p>
              </div>
              <div className="candidates-actions">
                <button 
                  className="action-button primary-button"
                  onClick={handleOpenInviteModal}
                >
                  <UserPlus size={18} />
                  <span>Individual Invite</span>
                </button>
                <button 
                  className="action-button secondary-button"
                  onClick={handleBulkOpenModal}
                >
                  <MailPlus size={18} />
                  <span>Bulk Invite</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs and Controls */}
        <div className="candidates-controls">
          {/* Tab Navigation */}
          <div className="tab-navigation">
            {tabs.map(tab => (
              <button
                key={tab.id}
                className={`tab-button ${activeTab === tab.id ? 'active' : ''} ${tab.color}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <span className="tab-label">{tab.label}</span>
                <span className="tab-count">{tab.count}</span>
              </button>
            ))}
          </div>

          {/* Search and Filters */}
          <div className="candidates-filters">
            <div className="search-container">
              <Search size={18} className="search-icon" />
              <input
                type="text"
                placeholder="Search candidates by name, email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              {searchTerm && (
                <button onClick={clearSearch} className="clear-search">
                  <X size={16} />
                </button>
              )}
            </div>

            <div className="filter-controls">
              <div className="sort-container">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="sort-select"
                >
                  <option value="date">Sort by Date</option>
                  <option value="name">Sort by Name</option>
                  <option value="status">Sort by Status</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="candidates-content-card">
          {loading ? (
            <LoadingState text={'Loading candidate data...'} />
          ) : error ? (
            <div className="candidates-error">
              <div className="error-content">
                <div className="error-icon">
                  <AlertCircle size={24} color="#dc2626" />
                </div>
                <h3 className="error-title">Unable to Load Data</h3>
                <p className="error-message">{error}</p>
              </div>
            </div>
          ) : filteredCandidates.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">
                <Users size={24} color="#64748b" />
              </div>
              <h3 className="empty-state-title">
                {searchTerm ? 'No candidates found' : 'No Invitations Found'}
              </h3>
              <p className="empty-state-message">
                {searchTerm 
                  ? `No candidates match your search "${searchTerm}"`
                  : "You haven't sent any test invitations yet. Create a test and start inviting candidates."
                }
              </p>
              {!searchTerm && (
                <div className="empty-state-actions">
                  <button 
                    className="empty-state-button primary"
                    onClick={handleOpenInviteModal}
                  >
                    <Send size={18} />
                    Send First Invite
                  </button>
                  <button 
                    className="empty-state-button secondary"
                    onClick={handleBulkOpenModal}
                  >
                    <MailPlus size={18} />
                    Send Bulk Invites
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="table-container">
              <div className="table-wrapper">
                <table className="candidates-table">
                  <thead className="table-head">
                    <tr>
                      <th className="row-number">#</th>
                      <th>Candidate</th>
                      <th>Position</th>
                      <th>Status</th>
                      <th>Invited</th>
                      <th>Completed</th>
                     
                      <th>Details</th>
                    </tr>
                  </thead>
                  <tbody className="table-body">
                    {filteredCandidates.map((candidate, index) => (
                      <tr key={candidate._id}>
                        <td className="row-number">{index + 1}</td>
                        <td>
                          <div>
                            <div className="candidate-name">{candidate.name}</div>
                            <div className="candidate-email">{candidate.email}</div>
                          </div>
                        </td>
                        <td>
                          <span className="candidate-position">{candidate.position}</span>
                        </td>
                        <td>
                          <span className={getStatusBadgeClass(candidate.status)}>
                            {candidate.status === 'completed' && <CheckCircle size={12} style={{ marginRight: '4px' }} />}
                            {candidate.status === 'pending' && <Clock size={12} style={{ marginRight: '4px' }} />}
                            {candidate.status === 'shortlisted' && <CheckCircle size={12} style={{ marginRight: '4px' }} />}
                            {(candidate.status === 'discarded' || candidate.status === 'expired') && <X size={12} style={{ marginRight: '4px' }} />}
                            {candidate.status}
                          </span>
                        </td>
                        <td className="date-cell date-primary">
                          {formatDate(candidate.invitedAt)}
                        </td>
                        <td className="date-cell date-secondary">
                          {formatDate(candidate.completedAt)}
                        </td>
                        
                         <td>
                          <button
                            onClick={() => GotoAttempt(candidate._id)}
                            disabled={candidate.status === 'pending'}
                            className={`status-button ${candidate.status === 'completed' ? 'completed' : 'pending'}`}
                          >
                            {candidate.status === 'completed' ? 'View Details' : 'No Details Found'}
                            {candidate.status==='completed'?<Eye size={16}/>:<EyeOff size={16}/>}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      {showInviteModal && (
        <InviteModal
          test={Test}
          invitationData={invitationData}
          onInputChange={handleInvitationInputChange}
          onSubmit={handleSubmitInvitation}
          onClose={handleCloseInviteModal}
        />
      )}
      {ShowBulkInviteModal && (
        <BulkInviteModal
          test={Test}
          onSubmit={handleBulkSubmit}
          onClose={handleBulkCloseModal}
        />
      )}
    </div>
  );
};

export default TestCandidates;