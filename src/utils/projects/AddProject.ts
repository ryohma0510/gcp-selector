import { STORAGE_KEY_PROJECT_IDS } from './Constant';

const addProject = async (projectId: string): Promise<void> => {
  if (!projectId) return;

  const items = await chrome.storage.local.get({ [STORAGE_KEY_PROJECT_IDS]: [] });
  let currentIds = items[STORAGE_KEY_PROJECT_IDS] || [];

  if (currentIds.includes(projectId)) return;

  currentIds.push(projectId);
  await chrome.storage.local.set({ [STORAGE_KEY_PROJECT_IDS]: currentIds });
};

export default addProject;
