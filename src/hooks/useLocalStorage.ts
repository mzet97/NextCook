import { useState } from 'react';

/**
 * Hook personalizado para gerenciar estado no localStorage
 * @param key - Chave do localStorage
 * @param initialValue - Valor inicial se não existir no localStorage
 * @returns [value, setValue] - Valor atual e função para atualizar
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((val: T) => T)) => void] {
  // Estado para armazenar o valor
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }
    try {
      // Obter do localStorage por chave
      const item = window.localStorage.getItem(key);
      // Parse do JSON armazenado ou retorna initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // Se erro, retorna initialValue
      console.log(error);
      return initialValue;
    }
  });

  // Função para definir valor
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Permite que value seja uma função para que tenhamos a mesma API do useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      // Salva no estado
      setStoredValue(valueToStore);
      // Salva no localStorage
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      // Um erro mais avançado de tratamento seria implementar aqui
      console.log(error);
    }
  };

  return [storedValue, setValue];
}

// Exemplo de uso:
// const [name, setName] = useLocalStorage('name', 'Bob');
// const [todos, setTodos] = useLocalStorage('todos', []);