import React, { useEffect, useState } from 'react';

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
    <div>
      <label>
        Project ID:
        <input
          value={newProjectId}
          onChange={(e) => setNewProjectId(e.target.value)}
        />
      </label>
      <button onClick={saveOptions}>Add</button>

      <div>
        <table>
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
                  <button onClick={() => deleteProject(projectId)}>
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
