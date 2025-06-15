import { STORAGE_KEY_PROJECT_IDS } from './Constant';

const listProjects = async (): Promise<string[]> => {
  const items = await chrome.storage.local.get({ [STORAGE_KEY_PROJECT_IDS]: [] });
  console.log(items);
  return items[STORAGE_KEY_PROJECT_IDS] || [];
};

export default listProjects;

