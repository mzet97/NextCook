import { renderHook, act } from '@testing-library/react'
import { useToggle } from '@/hooks/useToggle'

describe('useToggle', () => {
  it('should initialize with default value of false', () => {
    const { result } = renderHook(() => useToggle())
    
    expect(result.current[0]).toBe(false)
  })

  it('should initialize with provided initial value', () => {
    const { result } = renderHook(() => useToggle(true))
    
    expect(result.current[0]).toBe(true)
  })

  it('should toggle value from false to true', () => {
    const { result } = renderHook(() => useToggle(false))
    
    act(() => {
      result.current[1]()
    })
    
    expect(result.current[0]).toBe(true)
  })

  it('should toggle value from true to false', () => {
    const { result } = renderHook(() => useToggle(true))
    
    act(() => {
      result.current[1]()
    })
    
    expect(result.current[0]).toBe(false)
  })

  it('should toggle multiple times correctly', () => {
    const { result } = renderHook(() => useToggle(false))
    
    // Initial state
    expect(result.current[0]).toBe(false)
    
    // First toggle
    act(() => {
      result.current[1]()
    })
    expect(result.current[0]).toBe(true)
    
    // Second toggle
    act(() => {
      result.current[1]()
    })
    expect(result.current[0]).toBe(false)
    
    // Third toggle
    act(() => {
      result.current[1]()
    })
    expect(result.current[0]).toBe(true)
  })

  it('should set value to true when setTrue is called', () => {
    const { result } = renderHook(() => useToggle(false))
    
    act(() => {
      result.current[2]()
    })
    
    expect(result.current[0]).toBe(true)
  })

  it('should set value to false when setFalse is called', () => {
    const { result } = renderHook(() => useToggle(true))
    
    act(() => {
      result.current[3]()
    })
    
    expect(result.current[0]).toBe(false)
  })

  it('should keep value true when setTrue is called on already true value', () => {
    const { result } = renderHook(() => useToggle(true))
    
    act(() => {
      result.current[2]()
    })
    
    expect(result.current[0]).toBe(true)
  })

  it('should keep value false when setFalse is called on already false value', () => {
    const { result } = renderHook(() => useToggle(false))
    
    act(() => {
      result.current[3]()
    })
    
    expect(result.current[0]).toBe(false)
  })

  it('should work with all methods in sequence', () => {
    const { result } = renderHook(() => useToggle(false))
    
    // Initial state
    expect(result.current[0]).toBe(false)
    
    // Set to true
    act(() => {
      result.current[2]()
    })
    expect(result.current[0]).toBe(true)
    
    // Toggle to false
    act(() => {
      result.current[1]()
    })
    expect(result.current[0]).toBe(false)
    
    // Toggle to true
    act(() => {
      result.current[1]()
    })
    expect(result.current[0]).toBe(true)
    
    // Set to false
    act(() => {
      result.current[3]()
    })
    expect(result.current[0]).toBe(false)
  })

  it('should return stable function references', () => {
    const { result, rerender } = renderHook(() => useToggle(false))
    
    const [, toggle1, setTrue1, setFalse1] = result.current
    
    rerender()
    
    const [, toggle2, setTrue2, setFalse2] = result.current
    
    expect(toggle1).toBe(toggle2)
    expect(setTrue1).toBe(setTrue2)
    expect(setFalse1).toBe(setFalse2)
  })

  it('should handle rapid toggles', () => {
    const { result } = renderHook(() => useToggle(false))
    
    act(() => {
      // Rapid toggles
      result.current[1]() // true
      result.current[1]() // false
      result.current[1]() // true
      result.current[1]() // false
      result.current[1]() // true
    })
    
    expect(result.current[0]).toBe(true)
  })
})