import { forwardRef } from 'react';
import Select from 'react-select';
import Option from '../select/Option';

interface ProjectSelectorProps {
  projectIds: string[];
  selectedProject: string;
  onProjectSelect: (projectId: string) => void;
}

const ProjectSelector = forwardRef<any, ProjectSelectorProps>(
  ({ projectIds, selectedProject, onProjectSelect }, ref) => {
    const handleChange = (newValue: any) => {
      onProjectSelect(newValue?.value);
    };

    return (
      <div className="input-section">
        <label htmlFor="project">Project ID</label>
        <div className="select-wrapper">
          <Select
            ref={ref}
            options={projectIds.map(id => ({ value: id, label: id }))}
            value={selectedProject ? { value: selectedProject, label: selectedProject } : null}
            onChange={handleChange}
            placeholder="Select project"
            components={{ Option }}
          />
        </div>
      </div>
    );
  }
);

ProjectSelector.displayName = 'ProjectSelector';

export default ProjectSelector;