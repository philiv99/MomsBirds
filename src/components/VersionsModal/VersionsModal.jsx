import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { toggleVersionsModal, fetchVersions, fetchVersionsSuccess, fetchVersionsFailure } from '../../redux/actions/index.js';
import versionsService from '../../services/versionsService';
import './VersionsModal.less';

const VersionsModal = ({ 
  showModal, 
  toggleVersionsModal, 
  fetchVersions,
  fetchVersionsSuccess,
  fetchVersionsFailure,
  spaVersion,
  apiVersion,
  databaseSchemaVersion,
  apiReleaseNotes,
  databaseReleaseNotes,
  isLoading,
  error,
  lastFetchTime
}) => {

  const fetchInitiated = useRef(false);

  useEffect(() => {
    if (!showModal) {
      fetchInitiated.current = false;
      return;
    }
    if (!apiVersion && !error && !fetchInitiated.current) {
      fetchInitiated.current = true;
      loadVersions();
    }
  }, [showModal, apiVersion, error]);

  const loadVersions = async () => {
    fetchVersions();
    const result = await versionsService.fetchVersions();
    
    if (result.success) {
      fetchVersionsSuccess(result);
    } else {
      fetchVersionsFailure(new Error(result.error));
    }
  };

  const handleClose = () => {
    toggleVersionsModal();
  };

  const handleRefresh = () => {
    loadVersions();
  };

  const ReleaseNotesList = ({ notes, title }) => {
    if (!notes || notes.length === 0) {
      return <p className="no-notes">No release notes available</p>;
    }

    return (
      <div className="notes-section">
        <h4>{title}</h4>
        <ul className="notes-list">
          {notes.map((note, index) => (
            <li key={`note-${index}`}>
              <span className="note-version">{note.version}</span>
              <span className="note-description">{note.description}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  ReleaseNotesList.propTypes = {
    notes: PropTypes.array,
    title: PropTypes.string.isRequired
  };

  if (!showModal) {
    return null;
  }

  return (
    <div className="versions-modal-overlay" onClick={handleClose}>
      <div className="versions-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Deployment Versions & Release Notes</h2>
          <button className="close-button" onClick={handleClose} title="Close">×</button>
        </div>

        <div className="modal-body">
          {isLoading && (
            <div className="loading-message">
              Loading versions...
            </div>
          )}

          {error && (
            <div className="error-message">
              <p><strong>Unable to fetch version information</strong></p>
              <p>{error}</p>
              <button className="retry-button" onClick={handleRefresh}>Retry</button>
            </div>
          )}

          {!isLoading && !error && (
            <>
              <div className="versions-grid">
                <div className="version-item">
                  <span className="version-label">SPA Version:</span>
                  <span className="version-value">{spaVersion}</span>
                </div>
                <div className="version-item">
                  <span className="version-label">API Version:</span>
                  <span className="version-value">{apiVersion || 'Unknown'}</span>
                </div>
                <div className="version-item">
                  <span className="version-label">Database Schema:</span>
                  <span className="version-value">{databaseSchemaVersion || 'Unknown'}</span>
                </div>
              </div>

              <div className="release-notes-container">
                <ReleaseNotesList notes={apiReleaseNotes} title="API Release Notes" />
                <ReleaseNotesList notes={databaseReleaseNotes} title="Database Release Notes" />
              </div>

              {lastFetchTime && (
                <div className="last-fetch-time">
                  Last updated: {lastFetchTime.toLocaleString()}
                </div>
              )}
            </>
          )}
        </div>

        <div className="modal-footer">
          <button className="refresh-button" onClick={handleRefresh} disabled={isLoading}>
            {isLoading ? 'Loading...' : 'Refresh'}
          </button>
          <button className="close-btn-footer" onClick={handleClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

VersionsModal.propTypes = {
  showModal: PropTypes.bool.isRequired,
  toggleVersionsModal: PropTypes.func.isRequired,
  fetchVersions: PropTypes.func.isRequired,
  fetchVersionsSuccess: PropTypes.func.isRequired,
  fetchVersionsFailure: PropTypes.func.isRequired,
  spaVersion: PropTypes.string,
  apiVersion: PropTypes.string,
  databaseSchemaVersion: PropTypes.string,
  apiReleaseNotes: PropTypes.array,
  databaseReleaseNotes: PropTypes.array,
  isLoading: PropTypes.bool,
  error: PropTypes.string,
  lastFetchTime: PropTypes.instanceOf(Date)
};

const mapStateToProps = appState => ({
  showModal: appState.versions.showModal,
  spaVersion: appState.versions.spaVersion,
  apiVersion: appState.versions.apiVersion,
  databaseSchemaVersion: appState.versions.databaseSchemaVersion,
  apiReleaseNotes: appState.versions.apiReleaseNotes,
  databaseReleaseNotes: appState.versions.databaseReleaseNotes,
  isLoading: appState.versions.isLoading,
  error: appState.versions.error,
  lastFetchTime: appState.versions.lastFetchTime
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    toggleVersionsModal,
    fetchVersions,
    fetchVersionsSuccess,
    fetchVersionsFailure
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(VersionsModal);
