import { useState, useCallback } from 'react';

type UseToggleReturn = [
  boolean,
  {
    toggle: () => void;
    setTrue: () => void;
    setFalse: () => void;
    setValue: (value: boolean) => void;
  }
];

/**
 * Hook personalizado para gerenciar estados booleanos
 * @param initialValue - Valor inicial (padrão: false)
 * @returns Array com [value, actions] similar ao useState
 */
export function useToggle(initialValue: boolean = false): UseToggleReturn {
  const [value, setValue] = useState<boolean>(initialValue);

  const toggle = useCallback(() => {
    setValue((prev) => !prev);
  }, []);

  const setTrue = useCallback(() => {
    setValue(true);
  }, []);

  const setFalse = useCallback(() => {
    setValue(false);
  }, []);

  const setValueCallback = useCallback((newValue: boolean) => {
    setValue(newValue);
  }, []);

  return [
    value,
    {
      toggle,
      setTrue,
      setFalse,
      setValue: setValueCallback,
    },
  ];
}

// Exemplo de uso:
// const [isOpen, { toggle, setTrue, setFalse }] = useToggle();
// 
// // Alternar estado
// <button onClick={toggle}>Toggle</button>
// 
// // Definir como verdadeiro
// <button onClick={setTrue}>Open</button>
// 
// // Definir como falso
// <button onClick={setFalse}>Close</button>
// 
// // Modal condicional
// {isOpen && <Modal onClose={setFalse} />}