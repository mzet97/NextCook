import { renderHook, act } from '@testing-library/react'
import { useCounter } from '@/hooks/useCounter'

describe('useCounter', () => {
  it('should initialize with default value of 0', () => {
    const { result } = renderHook(() => useCounter())
    
    expect(result.current.count).toBe(0)
  })

  it('should initialize with provided initial value', () => {
    const { result } = renderHook(() => useCounter(10))
    
    expect(result.current.count).toBe(10)
  })

  it('should increment count', () => {
    const { result } = renderHook(() => useCounter(5))
    
    act(() => {
      result.current.increment()
    })
    
    expect(result.current.count).toBe(6)
  })

  it('should decrement count', () => {
    const { result } = renderHook(() => useCounter(5))
    
    act(() => {
      result.current.decrement()
    })
    
    expect(result.current.count).toBe(4)
  })

  it('should reset count to initial value', () => {
    const { result } = renderHook(() => useCounter(10))
    
    act(() => {
      result.current.increment()
      result.current.increment()
    })
    
    expect(result.current.count).toBe(12)
    
    act(() => {
      result.current.reset()
    })
    
    expect(result.current.count).toBe(10)
  })

  it('should set count to specific value', () => {
    const { result } = renderHook(() => useCounter(0))
    
    act(() => {
      result.current.setCount(25)
    })
    
    expect(result.current.count).toBe(25)
  })

  it('should increment by custom step', () => {
    const { result } = renderHook(() => useCounter(0))
    
    act(() => {
      result.current.increment(5)
    })
    
    expect(result.current.count).toBe(5)
  })

  it('should decrement by custom step', () => {
    const { result } = renderHook(() => useCounter(10))
    
    act(() => {
      result.current.decrement(3)
    })
    
    expect(result.current.count).toBe(7)
  })

  it('should handle multiple operations', () => {
    const { result } = renderHook(() => useCounter(0))
    
    act(() => {
      result.current.increment(5)
      result.current.decrement(2)
      result.current.increment()
    })
    
    expect(result.current.count).toBe(4)
  })

  it('should work with negative initial values', () => {
    const { result } = renderHook(() => useCounter(-5))
    
    expect(result.current.count).toBe(-5)
    
    act(() => {
      result.current.increment()
    })
    
    expect(result.current.count).toBe(-4)
  })
})