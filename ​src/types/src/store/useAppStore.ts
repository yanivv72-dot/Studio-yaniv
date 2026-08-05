import { create } from 'zustand';
import { Project } from '../types';

interface AppState {
  projects: Project[];
  currentProject: Project | null;
  isUnsaved: boolean;
  activeScreen: 'home' | 'workspace';
  setCurrentProject: (project: Project | null) => void;
  updateCurrentProject: (updates: Partial<Project>) => void;
  createNewProject: () => void;
  setActiveScreen: (screen: 'home' | 'workspace') => void;
  setUnsaved: (status: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
  projects: [],
  currentProject: null,
  isUnsaved: false,
  activeScreen: 'home',

  setCurrentProject: (project) => set({ currentProject: project, activeScreen: project ? 'workspace' : 'home' }),

  updateCurrentProject: (updates) =>
    set((state) => {
      if (!state.currentProject) return {};
      const updated = { ...state.currentProject, ...updates, updatedAt: Date.now() };
      return { currentProject: updated, isUnsaved: true };
    }),

  createNewProject: () => {
    const newProj: Project = {
      id: crypto.randomUUID(),
      name: `פרויקט חדש ${new Date().toLocaleTimeString('he-IL')}`,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      prompt: '',
      mediaUrl: null,
      mediaType: null,
      aiResultUrl: null,
    };
    set({ currentProject: newProj, activeScreen: 'workspace', isUnsaved: true });
  },

  setActiveScreen: (screen) => set({ activeScreen: screen }),
  setUnsaved: (status) => set({ isUnsaved: status }),
}));
