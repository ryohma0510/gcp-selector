import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ServiceSelector from './ServiceSelector';

const mockServices = [
  {
    value: 'https://console.cloud.google.com/compute',
    label: 'Compute Engine',
  },
  { value: 'https://console.cloud.google.com/storage', label: 'Cloud Storage' },
  { value: 'https://console.cloud.google.com/sql', label: 'Cloud SQL' },
];

describe('ServiceSelector', () => {
  const mockOnServiceSelect = jest.fn();

  beforeEach(() => {
    mockOnServiceSelect.mockClear();
  });

  it('renders with label and placeholder', () => {
    render(
      <ServiceSelector
        services={mockServices}
        selectedService={null}
        onServiceSelect={mockOnServiceSelect}
      />
    );

    expect(screen.getByText('Service')).toBeInTheDocument();
    expect(screen.getByText('Select service')).toBeInTheDocument();
  });

  it('displays selected service when provided', () => {
    const selectedService = mockServices[0];

    render(
      <ServiceSelector
        services={mockServices}
        selectedService={selectedService}
        onServiceSelect={mockOnServiceSelect}
      />
    );

    expect(screen.getByText('Compute Engine')).toBeInTheDocument();
  });

  it('calls onServiceSelect when a service is selected', async () => {
    const user = userEvent.setup();

    render(
      <ServiceSelector
        services={mockServices}
        selectedService={null}
        onServiceSelect={mockOnServiceSelect}
      />
    );

    // Click on the select dropdown
    const selectInput = screen.getByRole('combobox');
    await user.click(selectInput);

    // Select an option
    const option = screen.getByText('Cloud Storage');
    await user.click(option);

    expect(mockOnServiceSelect).toHaveBeenCalledWith(
      mockServices[1],
      expect.any(Object)
    );
  });

  it('handles empty services list', () => {
    render(
      <ServiceSelector
        services={[]}
        selectedService={null}
        onServiceSelect={mockOnServiceSelect}
      />
    );

    expect(screen.getByText('Service')).toBeInTheDocument();
    expect(screen.getByText('Select service')).toBeInTheDocument();
  });

  it('forwards ref correctly', () => {
    const ref = { current: null };

    render(
      <ServiceSelector
        ref={ref}
        services={mockServices}
        selectedService={null}
        onServiceSelect={mockOnServiceSelect}
      />
    );

    expect(ref.current).not.toBeNull();
  });

  it('renders with correct CSS classes', () => {
    render(
      <ServiceSelector
        services={mockServices}
        selectedService={null}
        onServiceSelect={mockOnServiceSelect}
      />
    );

    expect(
      screen.getByText('Service').closest('.service-section')
    ).toBeInTheDocument();
    expect(screen.getByText('Service').nextElementSibling).toHaveClass(
      'select-wrapper'
    );
  });
});
