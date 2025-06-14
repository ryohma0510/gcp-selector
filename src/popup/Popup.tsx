import React, { useEffect, useState, useRef } from 'react';
import listProjects from '../utils/projects/ListProject';
import './Popup.css';
import listServices from '../utils/services/ListServices';
import PopupHeader from '../components/popup/PopupHeader';
import ProjectSelector from '../components/popup/ProjectSelector';
import ServiceSelector from '../components/popup/ServiceSelector';

type SelectOption = {
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
      <PopupHeader onSettingsClick={goToOptions} />

      {projectIds.length === 0 ? (
        <NoProjectsMessage />
      ) : (
        <>
          <ProjectSelector
            ref={projectSelectRef}
            projectIds={projectIds}
            selectedProject={selectedProject}
            onProjectSelect={handleProjectSelect}
          />

          <ServiceSelector
            ref={serviceSelectRef}
            services={services}
            selectedService={selectedService}
            onServiceSelect={handleServiceSelect}
          />
        </>
      )}
    </div>
  );
};

export default Popup;
