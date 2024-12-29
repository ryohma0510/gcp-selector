import React, { useEffect, useState } from 'react';
import listProjects from '../utils/projects/ListProject';
import './Popup.css';

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
      <h1 className="title">GCP Selector</h1>

      <div className="input-section">
        <label htmlFor="project">Project ID</label>
        <select
          id="project"
          value={selectedProject}
          onChange={(e) => handleProjectSelect(e.target.value)}
        >
          <option value="">Select Project</option>
          {projectIds.map(id => (
            <option key={id} value={id}>{id}</option>
          ))}
        </select>

        <button onClick={goToOptions} className="options-button">
          Project Settings
        </button>
      </div>

      <div className="service-section">
        <label htmlFor="service">Service</label>
        <select
          id="service"
          value={selectedService?.title || ''}
          onChange={(e) => {
            const service = services.find(s => s.title === e.target.value);
            if (service) handleServiceSelect(service);
          }}
        >
          <option value="">Select Service</option>
          {services.map(service => (
            <option key={service.title} value={service.title}>
              {service.title}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Popup;
