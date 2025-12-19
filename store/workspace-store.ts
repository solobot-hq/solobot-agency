import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface Workspace {
  id: string;
  name: string;
}

interface WorkspaceState {
  activeWorkspace: Workspace | null;
  workspaces: Workspace[];
  isLoading: boolean;
  
  // Actions
  setWorkspaces: (workspaces: Workspace[]) => void;
  setActiveWorkspace: (workspace: Workspace) => void;
  addWorkspace: (name: string) => void;
  hydrateFromClerk: (metadataWorkspaceId?: string) => void;
}

export const useWorkspaceStore = create<WorkspaceState>()(
  persist(
    (set, get) => ({
      activeWorkspace: null,
      workspaces: [],
      isLoading: false,

      setWorkspaces: (workspaces) => {
        set({ workspaces });
      },

      setActiveWorkspace: (workspace) => {
        set({ activeWorkspace: workspace });
      },

      addWorkspace: (name) => {
        const newWorkspace = { 
          id: `ws_${Math.random().toString(36).substr(2, 9)}`, 
          name 
        };
        set((state) => ({
          workspaces: [...state.workspaces, newWorkspace],
          activeWorkspace: newWorkspace // Auto-switch to new
        }));
      },

      hydrateFromClerk: (metadataWorkspaceId) => {
        const { workspaces, activeWorkspace } = get();
        
        // If we have a specific ID from Clerk metadata, try to find it
        if (metadataWorkspaceId) {
          const match = workspaces.find(w => w.id === metadataWorkspaceId);
          if (match && match.id !== activeWorkspace?.id) {
            set({ activeWorkspace: match });
          }
        } 
        // Fallback: if no active workspace set, default to first available
        else if (!activeWorkspace && workspaces.length > 0) {
          set({ activeWorkspace: workspaces[0] });
        }
      }
    }),
    {
      name: 'solobot-workspace-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);