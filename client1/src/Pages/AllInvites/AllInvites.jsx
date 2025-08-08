import React, { useEffect, useState } from 'react';
import { ClipLoader } from 'react-spinners';
import { format } from 'date-fns';
import { Users, Clock, CheckCircle, AlertCircle, Calendar, Mail } from 'lucide-react';
import './AllInvites.css';
import { useNavigate, useParams } from 'react-router-dom';
import LoadingState from '../../components/States/LoadingState';

const TestCandidates = () => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const params = useParams()
  const navigate=useNavigate()
  const fetchCandidates = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(`${import.meta.env.VITE_LOCAL_BACKEND_API}/api/admin/getInvite/${params.testid}`);
      const data = await res.json();
      console.log(data);
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
    fetchCandidates();
  }, []);
  //got to attempt route
  const GotoAttempt=(id)=>{
      navigate(`/attempt/${id}`)
  }

  // Calculate statistics
  const completedCount = candidates?.filter(c => c.status === 'completed').length;
  const pendingCount = candidates?.filter(c => c.status === 'pending').length;
  const totalCount = candidates?.length;

  const getStatusBadgeClass = (status) => {
    switch (status?.toLowerCase()) {
      case 'completed':
        return 'status-badge status-completed';
      case 'pending':
        return 'status-badge status-pending';
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

  return (
    <div className="invites-container">
      <div className="invites-wrapper">
        {/* Header Section */}
        <div className="invites-header">
          <div className="invites-header-content">
            <h1 className="invites-title">Test Invitations</h1>
            <p className="invites-subtitle">
              Monitor and track all candidate invitations and their progress
            </p>

            <div className="invites-stats">
              <div className="stat-item">
                <span className="stat-number">{totalCount}</span>
                <span className="stat-label">Total Invites</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">{completedCount}</span>
                <span className="stat-label">Completed</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">{pendingCount}</span>
                <span className="stat-label">Pending</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Card */}
        <div className="invites-content-card">
          {loading ? (
           <LoadingState text={'Loading candidate data...'}/>
          ) : error ? (
            <div className="invites-error">
              <div className="error-content">
                <div className="error-icon">
                  <AlertCircle size={24} color="#dc2626" />
                </div>
                <h3 className="error-title">Unable to Load Data</h3>
                <p className="error-message">{error}</p>
              </div>
            </div>
          ) : candidates.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">
                <Users size={24} color="#64748b" />
              </div>
              <h3 className="empty-state-title">No Invitations Found</h3>
              <p className="empty-state-message">
                You haven't sent any test invitations yet. Create a test and start inviting candidates.
              </p>
            </div>
          ) : (
            <div className="table-container">
              <div className="table-header">
                <h2 className="table-title">All Candidates ({totalCount})</h2>
              </div>

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
                      <th>attempts</th>
                    </tr>
                  </thead>
                  <tbody className="table-body">
                    {candidates.map((candidate, index) => (
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
                          onClick={()=>GotoAttempt(candidate._id)}
                            disabled={candidate.status === 'pending'}
                            className={`status-button ${candidate.status === 'completed' ? 'completed' : 'pending'
                              }`}
                          >
                            {candidate.status === 'completed' ? '✔ Attempted' : '✖ Not Attempted'}
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
    </div>
  );
};

export default TestCandidates;