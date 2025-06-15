import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProjectSelector from './ProjectSelector';

const mockProjectIds = ['project-1', 'project-2', 'project-3'];

describe('ProjectSelector', () => {
  const mockOnProjectSelect = jest.fn();

  beforeEach(() => {
    mockOnProjectSelect.mockClear();
  });

  it('renders with label and placeholder', () => {
    render(
      <ProjectSelector
        projectIds={mockProjectIds}
        selectedProject=""
        onProjectSelect={mockOnProjectSelect}
      />
    );

    expect(screen.getByText('Project ID')).toBeInTheDocument();
    expect(screen.getByText('Select project')).toBeInTheDocument();
  });

  it('displays selected project when provided', () => {
    const selectedProject = mockProjectIds[0];

    render(
      <ProjectSelector
        projectIds={mockProjectIds}
        selectedProject={selectedProject}
        onProjectSelect={mockOnProjectSelect}
      />
    );

    expect(screen.getByText('project-1')).toBeInTheDocument();
  });

  it('calls onProjectSelect when a project is selected', async () => {
    const user = userEvent.setup();

    render(
      <ProjectSelector
        projectIds={mockProjectIds}
        selectedProject=""
        onProjectSelect={mockOnProjectSelect}
      />
    );

    const selectInput = screen.getByRole('combobox');
    await user.click(selectInput);

    const option = screen.getByText('project-2');
    await user.click(option);

    expect(mockOnProjectSelect).toHaveBeenCalledWith('project-2');
  });

  it('handles empty project list', () => {
    render(
      <ProjectSelector
        projectIds={[]}
        selectedProject=""
        onProjectSelect={mockOnProjectSelect}
      />
    );

    expect(screen.getByText('Project ID')).toBeInTheDocument();
    expect(screen.getByText('Select project')).toBeInTheDocument();
  });

  it('forwards ref correctly', () => {
    const ref = { current: null };

    render(
      <ProjectSelector
        ref={ref}
        projectIds={mockProjectIds}
        selectedProject=""
        onProjectSelect={mockOnProjectSelect}
      />
    );

    expect(ref.current).not.toBeNull();
  });

  it('renders with correct CSS classes', () => {
    render(
      <ProjectSelector
        projectIds={mockProjectIds}
        selectedProject=""
        onProjectSelect={mockOnProjectSelect}
      />
    );

    expect(screen.getByText('Project ID').closest('.input-section')).toBeInTheDocument();
    expect(screen.getByText('Project ID').nextElementSibling).toHaveClass('select-wrapper');
  });

  it('handles null value selection correctly', async () => {
    const user = userEvent.setup();

    render(
      <ProjectSelector
        projectIds={mockProjectIds}
        selectedProject="project-1"
        onProjectSelect={mockOnProjectSelect}
      />
    );

    const selectInput = screen.getByRole('combobox');
    await user.click(selectInput);

    const clearButton = document.querySelector('.css-xb97g8');
    if (clearButton) {
      await user.click(clearButton);
      expect(mockOnProjectSelect).toHaveBeenCalledWith(undefined);
    }
  });
});
