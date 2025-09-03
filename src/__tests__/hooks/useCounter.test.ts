import { renderHook, act } from '@testing-library/react';
import { useCounter } from '@/hooks/useCounter';

describe('useCounter Hook', () => {
  it('should initialize with default value of 0', () => {
    const { result } = renderHook(() => useCounter());
    
    expect(result.current.count).toBe(0);
  });

  it('should initialize with custom initial value', () => {
    const initialValue = 10;
    const { result } = renderHook(() => useCounter(initialValue));
    
    expect(result.current.count).toBe(initialValue);
  });

  it('should increment count', () => {
    const { result } = renderHook(() => useCounter());
    
    act(() => {
      result.current.increment();
    });
    
    expect(result.current.count).toBe(1);
  });

  it('should decrement count', () => {
    const { result } = renderHook(() => useCounter(5));
    
    act(() => {
      result.current.decrement();
    });
    
    expect(result.current.count).toBe(4);
  });

  it('should reset count to initial value', () => {
    const initialValue = 10;
    const { result } = renderHook(() => useCounter(initialValue));
    
    // Change the count
    act(() => {
      result.current.increment();
      result.current.increment();
    });
    
    expect(result.current.count).toBe(12);
    
    // Reset
    act(() => {
      result.current.reset();
    });
    
    expect(result.current.count).toBe(initialValue);
  });

  it('should set count to specific value', () => {
    const { result } = renderHook(() => useCounter());
    const newValue = 42;
    
    act(() => {
      result.current.setValue(newValue);
    });
    
    expect(result.current.count).toBe(newValue);
  });

  it('should handle multiple operations', () => {
    const { result } = renderHook(() => useCounter(0));
    
    act(() => {
      result.current.increment(); // 1
      result.current.increment(); // 2
      result.current.decrement(); // 1
      result.current.setValue(10); // 10
      result.current.increment(); // 11
    });
    
    expect(result.current.count).toBe(11);
  });
});