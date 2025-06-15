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
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      setError(null);
      const projects = await listProjects();
      setProjectIds(projects);
    } catch {
      setError('Failed to load projects');
    }
  };

  const handleSave = async () => {
    if (!newProjectId.trim()) {
      setError('Please enter a Project ID');
      return;
    }

    try {
      setError(null);
      await addProject(newProjectId);
      await loadProjects();
      setNewProjectId('');
    } catch {
      setError('Failed to add project');
    }
  };

  const handleDelete = async (deleteProjectId: string) => {
    try {
      setError(null);
      await deleteProject(deleteProjectId);
      await loadProjects();
    } catch {
      setError('Failed to delete project');
    }
  };

  return (
    <div className="option-container">
      <h1 className="title">Project Manager</h1>

      {error && <div className="error-message">{error}</div>}

      <div className="input-section">
        <input
          className="project-input"
          value={newProjectId}
          onChange={e => setNewProjectId(e.target.value)}
          placeholder="Enter Project ID"
        />
        <button className="add-button" onClick={handleSave}>
          Add Project
        </button>
      </div>

      <div className="project-list">
        <div className="list-header">
          <span>Project ID</span>
          <span>Action</span>
        </div>
        {projectIds.sort().map(projectId => (
          <div key={projectId} className="project-item">
            <span>{projectId}</span>
            <button
              className="delete-button"
              onClick={() => handleDelete(projectId)}
            >
              <FontAwesomeIcon icon={faTrash} className="trash-icon" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Option;
