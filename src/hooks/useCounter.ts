import { useState, useCallback } from 'react';

interface UseCounterOptions {
  min?: number;
  max?: number;
  step?: number;
}

interface UseCounterReturn {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
  set: (value: number) => void;
  canIncrement: boolean;
  canDecrement: boolean;
}

/**
 * Hook personalizado para gerenciar contadores com opções avançadas
 * @param initialValue - Valor inicial do contador
 * @param options - Opções do contador (min, max, step)
 * @returns Objeto com valor atual e funções de controle
 */
export function useCounter(
  initialValue: number = 0,
  options: UseCounterOptions = {}
): UseCounterReturn {
  const { min, max, step = 1 } = options;
  const [count, setCount] = useState(initialValue);

  const increment = useCallback(() => {
    setCount((prev) => {
      const newValue = prev + step;
      return max !== undefined ? Math.min(newValue, max) : newValue;
    });
  }, [step, max]);

  const decrement = useCallback(() => {
    setCount((prev) => {
      const newValue = prev - step;
      return min !== undefined ? Math.max(newValue, min) : newValue;
    });
  }, [step, min]);

  const reset = useCallback(() => {
    setCount(initialValue);
  }, [initialValue]);

  const set = useCallback((value: number) => {
    let newValue = value;
    
    if (min !== undefined) {
      newValue = Math.max(newValue, min);
    }
    
    if (max !== undefined) {
      newValue = Math.min(newValue, max);
    }
    
    setCount(newValue);
  }, [min, max]);

  const canIncrement = max === undefined || count < max;
  const canDecrement = min === undefined || count > min;

  return {
    count,
    increment,
    decrement,
    reset,
    set,
    canIncrement,
    canDecrement,
  };
}

// Exemplo de uso:
// const { count, increment, decrement, reset } = useCounter(0);
// 
// // Com limites
// const { count, increment, decrement, canIncrement, canDecrement } = useCounter(5, {
//   min: 0,
//   max: 10,
//   step: 2
// });