import React, { useEffect, useState } from 'react';
import './Option.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const Option: React.FC = () => {
  const [projectIds, setProjectIds] = useState<string[]>([]);
  const [newProjectId, setNewProjectId] = useState('');

  useEffect(() => {
    restoreOptions();
  }, []);

  const restoreOptions = () => {
    chrome.storage.local.get({ storageKeyProjectIDs: [] }, (items) => {
      setProjectIds(items.storageKeyProjectIDs);
    });
  };

  const saveOptions = () => {
    if (!newProjectId) return;

    chrome.storage.local.get('storageKeyProjectIDs', (data) => {
      let currentIds = data.storageKeyProjectIDs || [];
      if (!currentIds.includes(newProjectId)) {
        currentIds.push(newProjectId);
      }

      chrome.storage.local.set({
        storageKeyProjectIDs: currentIds.sort()
      }, () => {
        setProjectIds(currentIds);
        setNewProjectId('');
      });
    });
  };

  const deleteProject = (deleteProjectId: string) => {
    chrome.storage.local.get('storageKeyProjectIDs', (data) => {
      let currentIds = data.storageKeyProjectIDs || [];
      const filteredIds = currentIds.filter((id: string) => id !== deleteProjectId);

      chrome.storage.local.set({
        storageKeyProjectIDs: filteredIds
      }, () => {
        setProjectIds(filteredIds);
      });
    });
  };

  return (
    <div className="option-container">
      <h1 className="title">Project Manager</h1>

      <div className="input-section">
        <input
          className="project-input"
          value={newProjectId}
          onChange={(e) => setNewProjectId(e.target.value)}
          placeholder="Enter Project ID"
        />
        <button className="add-button" onClick={saveOptions}>Add Project</button>
      </div>

      <div className="project-list">
        <div className="list-header">
          <span>Project ID</span>
          <span>Action</span>
        </div>
        {projectIds.map((projectId) => (
          <div key={projectId} className="project-item">
            <span>{projectId}</span>
            <button className="delete-button" onClick={() => deleteProject(projectId)}>
              <FontAwesomeIcon icon={faTrash} className="trash-icon" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Option;
