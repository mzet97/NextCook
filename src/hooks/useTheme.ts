import { useEffect } from 'react';
import { useThemeStore } from '../stores/theme-store';

/**
 * Hook personalizado para gerenciar tema da aplicação
 * Integra com o Zustand store e localStorage
 * @returns Objeto com tema atual e funções para manipular
 */
export function useTheme() {
  const { theme, setTheme, toggleTheme } = useThemeStore();

  // Aplicar tema ao documento
  useEffect(() => {
    const root = document.documentElement;
    
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  // Detectar preferência do sistema
  const getSystemTheme = (): 'light' | 'dark' => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
    }
    return 'light';
  };

  // Definir tema baseado na preferência do sistema
  const setSystemTheme = () => {
    const systemTheme = getSystemTheme();
    setTheme(systemTheme);
  };

  // Verificar se é tema escuro
  const isDark = theme === 'dark';

  // Verificar se é tema claro
  const isLight = theme === 'light';

  return {
    theme,
    isDark,
    isLight,
    setTheme,
    toggleTheme,
    setSystemTheme,
    getSystemTheme,
  };
}

// Exemplo de uso:
// const { theme, isDark, toggleTheme, setTheme } = useTheme();
// 
// // Alternar tema
// <button onClick={toggleTheme}>
//   {isDark ? '☀️' : '🌙'}
// </button>
//
// // Definir tema específico
// <button onClick={() => setTheme('dark')}>Dark Mode</button>