import { SelectOption } from '../types/SelectOption';

export const useNavigation = () => {
  const openGcpUrl = (service: SelectOption, projectId: string) => {
    const url = `${service.value}?project=${projectId}`;
    window.open(url, '_blank');
  };

  return {
    openGcpUrl,
  };
};

