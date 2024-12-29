import React, { useEffect, useState } from 'react';
import listProjects from '../utils/projects/ListProject';
import './Popup.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';

interface Service {
  title: string;
  url: string;
}

const services: Service[] = [
  {
    title: "AI Platform Jobs",
    url: "https://console.cloud.google.com/ai-platform/jobs"
  },
  {
    title: "BigQuery",
    url: "https://console.cloud.google.com/bigquery"
  },
  // 他のサービスも同様に追加
];

const Popup: React.FC = () => {
  const [projectIds, setProjectIds] = useState<string[]>([]);
  const [selectedProject, setSelectedProject] = useState('');
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    const projects = await listProjects();
    setProjectIds(projects);
  };

  const NoProjectsMessage = () => (
    <div className="no-projects-message">
      <p>No projects found.</p>
      <p>
        <button onClick={goToOptions}>
          Please add project in settings
        </button>
      </p>
    </div>
  );

  const handleProjectSelect = (projectId: string) => {
    setSelectedProject(projectId);
  };

  const handleServiceSelect = (service: Service) => {
    setSelectedService(service);
    if (selectedProject) {
      const url = `${service.url}?project=${selectedProject}`;
      window.open(url, '_blank');
    }
  };

  const goToOptions = () => {
    if (chrome.runtime.openOptionsPage) {
      chrome.runtime.openOptionsPage();
    } else {
      window.open(chrome.runtime.getURL('options.html'));
    }
  };

  return (
    <div className="popup-container">
      <div className="header">
        <h1>GCP Selector</h1>
        <button onClick={goToOptions} className="settings-button">
          <FontAwesomeIcon icon={faCog} className="settings-icon" />
          Settings
        </button>
      </div>

      {projectIds.length === 0 ? (
        <NoProjectsMessage />
      ) : (
        <>
          <div className="input-section">
            <label htmlFor="project">Project ID</label>
            <div className="select-wrapper">
              <select
                id="project"
                value={selectedProject}
                onChange={(e) => handleProjectSelect(e.target.value)}
              >
                <option value="">Select project</option>
                {projectIds.map(id => (
                  <option key={id} value={id}>{id}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="service-section">
            <label htmlFor="service">Service</label>
            <div className="select-wrapper">
              <select
                id="service"
                value={selectedService?.title || ''}
                onChange={(e) => {
                  const service = services.find(s => s.title === e.target.value);
                  if (service) handleServiceSelect(service);
                }}
              >
                <option value="">Select service</option>
                {services.map(service => (
                  <option key={service.title} value={service.title}>
                    {service.title}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Popup;
