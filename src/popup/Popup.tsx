import React, { useState, useRef, useEffect } from 'react';
import './Popup.css';
import listServices from '../utils/services/ListServices';
import PopupHeader from '../components/popup/PopupHeader';
import ProjectSelector from '../components/popup/ProjectSelector';
import ServiceSelector from '../components/popup/ServiceSelector';
import NoProjectsMessage from '../components/popup/NoProjectsMessage';
import { SelectOption } from '../types/SelectOption';
import { useProjects } from '../hooks/useProjects';
import { useNavigation } from '../hooks/useNavigation';
import { useOptions } from '../hooks/useOptions';

const Popup: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState('');
  const [selectedService, setSelectedService] = useState<SelectOption | null>(null);
  const serviceSelectRef = useRef<any>(null);
  const projectSelectRef = useRef<any>(null);

  const { projectIds } = useProjects();
  const { openGcpUrl } = useNavigation();
  const { goToOptions } = useOptions();

  const services = listServices().map(service => ({ value: service.url, label: service.label }));

  useEffect(() => {
    requestAnimationFrame(() => {
      projectSelectRef.current?.focus();
    });
  }, []);

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
      openGcpUrl(service, selectedProject);
    }
  };

  return (
    <div className="popup-container">
      <PopupHeader onSettingsClick={goToOptions} />

      {projectIds.length === 0 ? (
        <NoProjectsMessage onSettingsClick={goToOptions} />
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
