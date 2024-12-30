import React, { useEffect, useState, useRef } from 'react';
import listProjects from '../utils/projects/ListProject';
import './Popup.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import Select from 'react-select';
import Option from '../components/select/Option';
import Service from '../types/Service';
import listServices from '../utils/services/ListServices';

interface SelectOption {
  value: string;
  label: string;
}

const Popup: React.FC = () => {
  const [projectIds, setProjectIds] = useState<string[]>([]);
  const [selectedProject, setSelectedProject] = useState('');
  const [selectedService, setSelectedService] = useState<SelectOption | null>(null);
  const serviceSelectRef = useRef<any>(null);
  const projectSelectRef = useRef<any>(null);
  const services = listServices().map(service => ({ value: service.url, label: service.label }));

  useEffect(() => {
    loadProjects();
    requestAnimationFrame(() => {
      projectSelectRef.current?.focus();
    });
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
    requestAnimationFrame(() => {
      serviceSelectRef.current?.focus();
    });
  };

  const handleServiceSelect = (service: SelectOption | null) => {
    if (!service) {
      return;
    }

    setSelectedService(service);
    if (selectedProject && service) {
      const url = `${service.value}?project=${selectedProject}`;
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
              <Select
                ref={projectSelectRef}
                options={projectIds.map(id => ({ value: id, label: id }))}
                value={selectedProject ? { value: selectedProject, label: selectedProject } : null}
                onChange={(newValue) => handleProjectSelect((newValue as { value: string })?.value)}
                placeholder="Select project"
                components={{ Option }}
              />
            </div>
          </div>

          <div className="service-section">
            <label htmlFor="service">Service</label>
            <div className="select-wrapper">
              <Select
                ref={serviceSelectRef}
                options={services}
                value={selectedService}
                onChange={handleServiceSelect}
                placeholder="Select service"
                components={{ Option }}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Popup;
