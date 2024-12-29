import React, { useEffect, useState } from 'react';
import listProjects from '../utils/projects/ListProject';
import './Popup.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import Select, { components, OptionProps } from 'react-select';

interface Service {
  label: string;
  value: string;
}

const services: Service[] = [
  {
    label: "AI Platform Jobs",
    value: "https://console.cloud.google.com/ai-platform/jobs"
  },
  {
    label: "BigQuery",
    value: "https://console.cloud.google.com/bigquery"
  },
  // 他のサービスも同様に追加
];

const Option = (props: OptionProps<Service, false>) => {
  const input = props.selectProps.inputValue;
  const label = props.data.label;

  if (input === "") {
    return <components.Option {...props} />;
  }

  const idx = label.toLowerCase().indexOf(input.toLowerCase());

  const styles = {
    highlight: {
      fontWeight: "bold",
      color: "#ee0000"
    }
  };

  return (
    <components.Option {...props}>
      <div>
        <span>{label.slice(0, idx)}</span>
        <span style={styles.highlight}>{label.slice(idx, idx + input.length)}</span>
        <span>{label.slice(idx + input.length)}</span>
      </div>
    </components.Option>
  );
};

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
                options={services}
                value={selectedService}
                onChange={(newValue) => handleServiceSelect(newValue as Service)}
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
