import React from 'react';

interface NoProjectsMessageProps {
  onSettingsClick: () => void;
}

const NoProjectsMessage: React.FC<NoProjectsMessageProps> = ({ onSettingsClick }) => (
  <div className="no-projects-message">
    <p>No projects found.</p>
    <p>
      <button onClick={onSettingsClick}>
        Please add project in settings
      </button>
    </p>
  </div>
);

export default NoProjectsMessage;