import { STORAGE_KEY_PROJECT_IDS } from './Constant';
import listProjects from './ListProject';

const deleteProject = async (projectId: string): Promise<void> => {
  if (!projectId) return;

  const projectIds = await listProjects();
  const filteredIds = projectIds.filter((id: string) => id !== projectId);
  await chrome.storage.local.set({ [STORAGE_KEY_PROJECT_IDS]: filteredIds });
};

export default deleteProject;
