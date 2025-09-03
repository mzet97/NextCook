import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { ThemeStore } from '@/types';

// Store para gerenciamento de tema com persistência
export const useThemeStore = create<ThemeStore>()
  (persist(
    (set, get) => ({
      theme: 'light',
      
      toggleTheme: () => {
        const currentTheme = get().theme;
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        set({ theme: newTheme });
        
        // Aplicar tema ao documento
        if (typeof window !== 'undefined') {
          const root = window.document.documentElement;
          root.classList.remove('light', 'dark');
          root.classList.add(newTheme);
        }
      },
      
      setTheme: (theme: 'light' | 'dark') => {
        set({ theme });
        
        // Aplicar tema ao documento
        if (typeof window !== 'undefined') {
          const root = window.document.documentElement;
          root.classList.remove('light', 'dark');
          root.classList.add(theme);
        }
      }
    }),
    {
      name: 'theme-storage',
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        // Aplicar tema ao carregar da persistência
        if (typeof window !== 'undefined' && state?.theme) {
          const root = window.document.documentElement;
          root.classList.remove('light', 'dark');
          root.classList.add(state.theme);
        }
      }
    }
  ));

// Hook para inicializar o tema no lado do cliente
export const useInitializeTheme = () => {
  const { theme } = useThemeStore();
  
  // Aplicar tema inicial
  if (typeof window !== 'undefined') {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
  }
};