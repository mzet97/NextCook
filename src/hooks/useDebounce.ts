import { useState, useEffect } from 'react';

/**
 * Hook personalizado para debounce de valores
 * Útil para otimizar performance em buscas e inputs
 * @param value - Valor a ser debounced
 * @param delay - Delay em milissegundos (padrão: 500ms)
 * @returns Valor debounced
 */
export function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Definir timeout para atualizar o valor debounced
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup: cancelar timeout se value ou delay mudarem
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

/**
 * Hook personalizado para debounce de callbacks
 * @param callback - Função a ser executada
 * @param delay - Delay em milissegundos
 * @param deps - Dependências do callback
 * @returns Função debounced
 */
export function useDebouncedCallback<T extends (...args: unknown[]) => unknown>(
  callback: T,
  delay: number,
  deps: React.DependencyList = []
): T {
  const [debouncedCallback, setDebouncedCallback] = useState<T>(() => callback);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedCallback(() => callback);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [callback, delay, deps]);

  return debouncedCallback;
}

// Exemplo de uso:
// 
// // Debounce de valor (para busca)
// const [searchTerm, setSearchTerm] = useState('');
// const debouncedSearchTerm = useDebounce(searchTerm, 300);
// 
// useEffect(() => {
//   if (debouncedSearchTerm) {
//     // Fazer busca apenas quando o usuário parar de digitar
//     searchAPI(debouncedSearchTerm);
//   }
// }, [debouncedSearchTerm]);
// 
// // Debounce de callback
// const debouncedSave = useDebouncedCallback(
//   (data) => saveToAPI(data),
//   1000
// );