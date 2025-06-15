import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Popup from './Popup';

// Mock the custom hooks
jest.mock('../hooks/useProjects');
jest.mock('../hooks/useNavigation');
jest.mock('../hooks/useOptions');

// Mock the services
jest.mock('../utils/services/ListServices');

// Mock the child components
jest.mock('../components/popup/PopupHeader', () => {
  return function MockPopupHeader({
    onSettingsClick,
  }: {
    onSettingsClick: () => void;
  }) {
    return (
      <div data-testid="popup-header">
        <button onClick={onSettingsClick}>Settings</button>
      </div>
    );
  };
});

jest.mock('../components/popup/ProjectSelector', () => {
  return React.forwardRef(function MockProjectSelector(
    { projectIds, selectedProject, onProjectSelect }: any,
    ref: any
  ) {
    return (
      <div data-testid="project-selector" ref={ref}>
        <select
          value={selectedProject}
          onChange={e => onProjectSelect(e.target.value)}
          data-testid="project-select"
        >
          <option value="">Select project</option>
          {projectIds.map((id: string) => (
            <option key={id} value={id}>
              {id}
            </option>
          ))}
        </select>
      </div>
    );
  });
});

jest.mock('../components/popup/ServiceSelector', () => {
  return React.forwardRef(function MockServiceSelector(
    { services, selectedService, onServiceSelect }: any,
    ref: any
  ) {
    return (
      <div data-testid="service-selector" ref={ref}>
        <select
          value={selectedService?.value || ''}
          onChange={e => {
            const service = services.find(
              (s: any) => s.value === e.target.value
            );
            onServiceSelect(service || null);
          }}
          data-testid="service-select"
        >
          <option value="">Select service</option>
          {services.map((service: any) => (
            <option key={service.value} value={service.value}>
              {service.label}
            </option>
          ))}
        </select>
      </div>
    );
  });
});

jest.mock('../components/popup/NoProjectsMessage', () => {
  return function MockNoProjectsMessage({
    onSettingsClick,
  }: {
    onSettingsClick: () => void;
  }) {
    return (
      <div data-testid="no-projects-message">
        <p>No projects found.</p>
        <button onClick={onSettingsClick}>Add project in settings</button>
      </div>
    );
  };
});

import { useProjects } from '../hooks/useProjects';
import { useNavigation } from '../hooks/useNavigation';
import { useOptions } from '../hooks/useOptions';
import listServices from '../utils/services/ListServices';

const mockUseProjects = useProjects as jest.MockedFunction<typeof useProjects>;
const mockUseNavigation = useNavigation as jest.MockedFunction<
  typeof useNavigation
>;
const mockUseOptions = useOptions as jest.MockedFunction<typeof useOptions>;
const mockListServices = listServices as jest.MockedFunction<
  typeof listServices
>;

describe('Popup', () => {
  const mockOpenGcpUrl = jest.fn();
  const mockGoToOptions = jest.fn();

  const mockServices = [
    { label: 'BigQuery', url: 'https://console.cloud.google.com/bigquery' },
    {
      label: 'Cloud Functions',
      url: 'https://console.cloud.google.com/functions/list',
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();

    mockUseProjects.mockReturnValue({
      projectIds: ['project-1', 'project-2'],
      loading: false,
      refetch: jest.fn(),
    });

    mockUseNavigation.mockReturnValue({
      openGcpUrl: mockOpenGcpUrl,
    });

    mockUseOptions.mockReturnValue({
      goToOptions: mockGoToOptions,
    });

    mockListServices.mockReturnValue(mockServices);
  });

  it('renders popup with projects', () => {
    render(<Popup />);

    expect(screen.getByTestId('popup-header')).toBeInTheDocument();
    expect(screen.getByTestId('project-selector')).toBeInTheDocument();
    expect(screen.getByTestId('service-selector')).toBeInTheDocument();
    expect(screen.queryByTestId('no-projects-message')).not.toBeInTheDocument();
  });

  it('renders no projects message when no projects available', () => {
    mockUseProjects.mockReturnValue({
      projectIds: [],
      loading: false,
      refetch: jest.fn(),
    });

    render(<Popup />);

    expect(screen.getByTestId('popup-header')).toBeInTheDocument();
    expect(screen.getByTestId('no-projects-message')).toBeInTheDocument();
    expect(screen.queryByTestId('project-selector')).not.toBeInTheDocument();
    expect(screen.queryByTestId('service-selector')).not.toBeInTheDocument();
  });

  it('calls goToOptions when settings button in header is clicked', async () => {
    const user = userEvent.setup();
    render(<Popup />);

    const settingsButton = screen.getByText('Settings');
    await user.click(settingsButton);

    expect(mockGoToOptions).toHaveBeenCalledTimes(1);
  });

  it('calls goToOptions when settings button in no projects message is clicked', async () => {
    mockUseProjects.mockReturnValue({
      projectIds: [],
      loading: false,
      refetch: jest.fn(),
    });

    const user = userEvent.setup();
    render(<Popup />);

    const settingsButton = screen.getByText('Add project in settings');
    await user.click(settingsButton);

    expect(mockGoToOptions).toHaveBeenCalledTimes(1);
  });

  it('handles project selection correctly', async () => {
    const user = userEvent.setup();
    render(<Popup />);

    const projectSelect = screen.getByTestId('project-select');
    await user.selectOptions(projectSelect, 'project-1');

    expect(projectSelect).toHaveValue('project-1');
  });

  it('handles service selection and opens GCP URL when both project and service are selected', async () => {
    const user = userEvent.setup();
    render(<Popup />);

    // Select a project first
    const projectSelect = screen.getByTestId('project-select');
    await user.selectOptions(projectSelect, 'project-1');

    // Select a service
    const serviceSelect = screen.getByTestId('service-select');
    await user.selectOptions(
      serviceSelect,
      'https://console.cloud.google.com/bigquery'
    );

    expect(mockOpenGcpUrl).toHaveBeenCalledWith(
      { label: 'BigQuery', value: 'https://console.cloud.google.com/bigquery' },
      'project-1'
    );
  });

  it('does not open GCP URL when service is selected but no project is selected', async () => {
    const user = userEvent.setup();
    render(<Popup />);

    // Select a service without selecting a project
    const serviceSelect = screen.getByTestId('service-select');
    await user.selectOptions(
      serviceSelect,
      'https://console.cloud.google.com/bigquery'
    );

    expect(mockOpenGcpUrl).not.toHaveBeenCalled();
  });

  it('does not open GCP URL when null service is selected', async () => {
    const user = userEvent.setup();
    render(<Popup />);

    // Select a project first
    const projectSelect = screen.getByTestId('project-select');
    await user.selectOptions(projectSelect, 'project-1');

    // Select empty service option
    const serviceSelect = screen.getByTestId('service-select');
    await user.selectOptions(serviceSelect, '');

    expect(mockOpenGcpUrl).not.toHaveBeenCalled();
  });

  it('maps services from listServices correctly', () => {
    render(<Popup />);

    expect(mockListServices).toHaveBeenCalledTimes(1);

    const serviceSelect = screen.getByTestId('service-select');
    expect(serviceSelect).toBeInTheDocument();

    // Check if services are mapped correctly
    expect(screen.getByText('BigQuery')).toBeInTheDocument();
    expect(screen.getByText('Cloud Functions')).toBeInTheDocument();
  });

  it('has correct container structure', () => {
    const { container } = render(<Popup />);

    const popupContainer = container.querySelector('.popup-container');
    expect(popupContainer).toBeInTheDocument();
    expect(popupContainer).toContainElement(screen.getByTestId('popup-header'));
    expect(popupContainer).toContainElement(
      screen.getByTestId('project-selector')
    );
    expect(popupContainer).toContainElement(
      screen.getByTestId('service-selector')
    );
  });

  it('uses custom hooks correctly', () => {
    render(<Popup />);

    expect(mockUseProjects).toHaveBeenCalledTimes(1);
    expect(mockUseNavigation).toHaveBeenCalledTimes(1);
    expect(mockUseOptions).toHaveBeenCalledTimes(1);
  });
});
