import { forwardRef } from 'react';
import Select from 'react-select';
import Option from '../select/Option';
import { SelectOption } from '../../types/SelectOption';

interface ServiceSelectorProps {
  services: SelectOption[];
  selectedService: SelectOption | null;
  onServiceSelect: (service: SelectOption | null) => void;
}

const ServiceSelector = forwardRef<React.ComponentRef<typeof Select>, ServiceSelectorProps>(
  ({ services, selectedService, onServiceSelect }, ref) => {
    return (
      <div className="service-section">
        <label htmlFor="service">Service</label>
        <div className="select-wrapper">
          <Select
            ref={ref}
            options={services}
            value={selectedService}
            onChange={onServiceSelect}
            placeholder="Select service"
            components={{ Option }}
          />
        </div>
      </div>
    );
  }
);

ServiceSelector.displayName = 'ServiceSelector';

export default ServiceSelector;
