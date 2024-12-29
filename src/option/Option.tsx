import React, { useEffect, useState } from 'react';
import './Option.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import addProject from '../utils/projects/AddProject';
import deleteProject from '../utils/projects/DeleteProject';
import listProjects from '../utils/projects/ListProject';

const Option: React.FC = () => {
  const [projectIds, setProjectIds] = useState<string[]>([]);
  const [newProjectId, setNewProjectId] = useState('');

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    let projectIds = await listProjects();
    setProjectIds(projectIds);
  };

  const handleSave = async () => {
    if (!newProjectId) return;

    await addProject(newProjectId);
    await loadProjects();
    setNewProjectId('');
  };

  const handleDelete = async (deleteProjectId: string) => {
    await deleteProject(deleteProjectId);
    await loadProjects();
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
        <button className="add-button" onClick={handleSave}>Add Project</button>
      </div>

      <div className="project-list">
        <div className="list-header">
          <span>Project ID</span>
          <span>Action</span>
        </div>
        {projectIds.sort().map((projectId) => (
          <div key={projectId} className="project-item">
            <span>{projectId}</span>
            <button className="delete-button" onClick={() => handleDelete(projectId)}>
              <FontAwesomeIcon icon={faTrash} className="trash-icon" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Option;
