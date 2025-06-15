import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';

interface PopupHeaderProps {
  onSettingsClick: () => void;
}

const PopupHeader: React.FC<PopupHeaderProps> = ({ onSettingsClick }) => {
  return (
    <div className="header">
      <h1>GCP Selector</h1>
      <button onClick={onSettingsClick} className="settings-button">
        <FontAwesomeIcon icon={faCog} className="settings-icon" />
        Settings
      </button>
    </div>
  );
};

export default PopupHeader;
