import React, { useEffect, useState } from 'react';
import './Option.css';

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
      <div className="input-section">
        <label>
          <input
            className="project-input"
            value={newProjectId}
            onChange={(e) => setNewProjectId(e.target.value)}
            placeholder="Project ID"
          />
        </label>
        <button className="add-button" onClick={saveOptions}>Add</button>
      </div>

      <div className="table-container">
        <table className="project-table">
          <thead>
            <tr>
              <th>project_id</th>
              <th>action</th>
            </tr>
          </thead>
          <tbody>
            {projectIds.map((projectId) => (
              <tr key={projectId}>
                <td>{projectId}</td>
                <td>
                  <button className="delete-button" onClick={() => deleteProject(projectId)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Option;
