import { useState, useEffect } from 'react';
import listProjects from '../utils/projects/ListProject';

export const useProjects = () => {
  const [projectIds, setProjectIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const loadProjects = async () => {
    try {
      setLoading(true);
      const projects = await listProjects();
      setProjectIds(projects);
    } catch (error) {
      console.error('Failed to load projects:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  return {
    projectIds,
    loading,
    refetch: loadProjects
  };
};