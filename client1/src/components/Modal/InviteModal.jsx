import React from 'react';
import { Mail, User, Briefcase, X, Send, Clock, FileText, Target } from 'lucide-react';
import './InviteModal.css';

const InviteModal = ({ test, invitationData, onInputChange, onSubmit, onClose }) => {
  return (
    <div id="invite-modal-overlay" onClick={onClose}>
      <div id="invite-modal-content" onClick={(e) => e.stopPropagation()}>
        <div id="invite-modal-header">
          <div>
            <h3 id="invite-modal-title">Send Test Invitation</h3>
            <p id="invite-modal-subtitle">{test?.name}</p>
          </div>
          <button
            id="invite-modal-close-button"
            onClick={onClose}
          >
            <X />
          </button>
        </div>

        <div id="invite-modal-body">
          <div className="invite-modal-form-group">
            <label className="invite-modal-label">
              <Mail className="invite-modal-label-icon" />
              Email Address
            </label>
            <input
              type="email"
              name="email"
              placeholder="candidate@example.com"
              value={invitationData.email}
              onChange={onInputChange}
              required
              className="invite-modal-input"
            />
          </div>

          <div className="invite-modal-form-group">
            <label className="invite-modal-label">
              <User className="invite-modal-label-icon" />
              Full Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="John Doe"
              value={invitationData.name}
              onChange={onInputChange}
              required
              className="invite-modal-input"
            />
          </div>

          <div className="invite-modal-form-group">
            <label className="invite-modal-label">
              <Briefcase className="invite-modal-label-icon" />
              Position
            </label>
            <input
              type="text"
              name="position"
              placeholder="Frontend Developer"
              value={invitationData.position}
              onChange={onInputChange}
              required
              className="invite-modal-input"
            />
          </div>

          {test && (
            <div className="invite-modal-test-summary">
              <h4 className="invite-modal-summary-title">Test Details</h4>
              <div className="invite-modal-summary-details">
                <p><strong>Duration:</strong> {test.duration} minutes</p>
                <p><strong>Questions:</strong> {test.questions?.length || 0}</p>
                <p><strong>Passing Score:</strong> {test.passingScore}%</p>
              </div>
            </div>
          )}

          <div id="invite-modal-buttons">
            <button
              type="button"
              onClick={onClose}
              className="invite-modal-cancel-button"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={onSubmit}
              className="invite-modal-submit-button"
            >
              <Send className="invite-modal-button-icon" />
              Send Invitation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InviteModal;