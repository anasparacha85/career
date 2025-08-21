import React, { useState } from 'react';
import { Mail, User, Briefcase, X, Send, Upload, FileSpreadsheet } from 'lucide-react';
import * as XLSX from 'xlsx';
import './BulkInviteModal.css';


const BulkInviteModal = ({ test, onSubmit, onClose }) => {
  const [candidates, setCandidates] = useState([]);

  // file upload handler
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      const data = new Uint8Array(evt.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];

      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 0 });

      const unique = [];
      const seen = new Set();

      jsonData.forEach((row) => {
        const email = row.email?.trim().toLowerCase();
        if (email && !seen.has(email)) {
          seen.add(email);
          unique.push({
            email,
            name: row.name?.trim() || '',
            position: row.position?.trim() || '',
          });
        }
      });

      setCandidates(unique);
    };

    reader.readAsArrayBuffer(file);
  };

  const handleBulkSubmit = () => {
    if (candidates.length === 0) {
      alert('No candidates found.');
      return;
    }
    onSubmit(candidates);
  };

  return (
    <div id="bulk-invite-modal-overlay" onClick={onClose}>
      <div id="bulk-invite-modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div id="bulk-invite-modal-header">
          <h3 id="bulk-invite-modal-title">Bulk Upload Candidates</h3>
          <button id="bulk-invite-modal-close-button" onClick={onClose}>
            <X />
          </button>
        </div>

        {/* Instructions */}
        <div className="bulk-invite-instructions">
          <h4 className="bulk-invite-instructions-title">Instructions</h4>
          <p>
            Click the button below to download the template file, edit it with candidate information,
            and then re-upload it here. The system will send invitations one by one to all candidates
            and highlight any duplicates or previously invited candidates.
          </p>

      <a href="/templatefile.xlsx" download>
  <button className="download-template-btn">
    <FileSpreadsheet size={18} /> Download Template
  </button>
</a>

          {/* <div className="bulk-invite-required-columns">
            <strong>Required Column Order:</strong>
            <p>
              email | name | position 
            </p>
          </div> */}

          {/* <p className="bulk-invite-note">
            <strong>Note:</strong> Email is the only required field. If other fields are empty, 
            the system will use static values (User1, User2, etc. for names and xxxxx for numbers).
          </p> */}
        </div>

        {/* File Upload */}
        <div className="bulk-invite-upload-box">
          <Upload className="bulk-invite-upload-icon" />
          <p>Upload your edited Excel file</p>
          <input
            type="file"
            accept=".csv,.xlsx,.xls"
            onChange={handleFileUpload}
            id="excel-file-input"
          />
          <label htmlFor="excel-file-input" className="choose-excel-btn">
            Choose Excel File
          </label>
          <p className="file-support-note">Supported formats: .xlsx, .xls, .csv</p>
        </div>

        {/* Candidates Preview */}
        {candidates.length > 0 && (
          <div className="bulk-invite-summary">
            <h4 className="bulk-invite-summary-title">Candidates ({candidates.length})</h4>
            <div className="bulk-invite-summary-details">
              {candidates.map((c, i) => (
                <p key={i}>
                  <Mail size={14} /> {c.email} — <User size={14} /> {c.name} — <Briefcase size={14} /> {c.position}
                </p>
              ))}
            </div>
          </div>
        )}

        {/* Test Details */}
        {test && (
          <div className="bulk-invite-summary">
            <h4 className="bulk-invite-summary-title">Test Details</h4>
            <div className="bulk-invite-summary-details">
              <p><strong>Duration:</strong> {test.duration} minutes</p>
              <p><strong>Questions:</strong> {test.questions?.length || 0}</p>
              <p><strong>Passing Score:</strong> {test.passingScore}%</p>
            </div>
          </div>
        )}

        {/* Buttons */}
        <div id="bulk-invite-modal-buttons">
          <button onClick={onClose} className="bulk-invite-cancel-button">Cancel</button>
          <button onClick={handleBulkSubmit} className="bulk-invite-submit-button">
            <Send className="bulk-invite-button-icon" /> Send Bulk Invitations
          </button>
        </div>
      </div>
    </div>
  );
};

export default BulkInviteModal;
