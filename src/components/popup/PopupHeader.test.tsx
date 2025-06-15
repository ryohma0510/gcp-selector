import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PopupHeader from './PopupHeader';

describe('PopupHeader', () => {
  const mockOnSettingsClick = jest.fn();

  beforeEach(() => {
    mockOnSettingsClick.mockClear();
  });

  it('renders the title correctly', () => {
    render(<PopupHeader onSettingsClick={mockOnSettingsClick} />);

    expect(screen.getByText('GCP Selector')).toBeInTheDocument();
  });

  it('renders the settings button with icon and text', () => {
    render(<PopupHeader onSettingsClick={mockOnSettingsClick} />);

    const settingsButton = screen.getByRole('button', { name: /settings/i });
    expect(settingsButton).toBeInTheDocument();
    expect(screen.getByText('Settings')).toBeInTheDocument();
  });

  it('calls onSettingsClick when settings button is clicked', async () => {
    const user = userEvent.setup();
    render(<PopupHeader onSettingsClick={mockOnSettingsClick} />);

    const settingsButton = screen.getByRole('button', { name: /settings/i });
    await user.click(settingsButton);

    expect(mockOnSettingsClick).toHaveBeenCalledTimes(1);
  });

  it('renders with correct CSS classes', () => {
    render(<PopupHeader onSettingsClick={mockOnSettingsClick} />);

    expect(
      screen.getByText('GCP Selector').closest('.header')
    ).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveClass('settings-button');
  });

  it('contains FontAwesome settings icon', () => {
    render(<PopupHeader onSettingsClick={mockOnSettingsClick} />);

    const icon = document.querySelector('.settings-icon');
    expect(icon).toBeInTheDocument();
  });
});
