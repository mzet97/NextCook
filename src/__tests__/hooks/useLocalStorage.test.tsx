import { renderHook, act } from '@testing-library/react'
import { useLocalStorage } from '@/hooks/useLocalStorage'

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
})

describe('useLocalStorage', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should return initial value when localStorage is empty', () => {
    localStorageMock.getItem.mockReturnValue(null)
    
    const { result } = renderHook(() => useLocalStorage('test-key', 'default-value'))
    
    expect(result.current[0]).toBe('default-value')
    expect(localStorageMock.getItem).toHaveBeenCalledWith('test-key')
  })

  it('should return stored value from localStorage', () => {
    localStorageMock.getItem.mockReturnValue(JSON.stringify('stored-value'))
    
    const { result } = renderHook(() => useLocalStorage('test-key', 'default-value'))
    
    expect(result.current[0]).toBe('stored-value')
  })

  it('should store value in localStorage when setValue is called', () => {
    localStorageMock.getItem.mockReturnValue(null)
    
    const { result } = renderHook(() => useLocalStorage('test-key', 'default-value'))
    
    act(() => {
      result.current[1]('new-value')
    })
    
    expect(result.current[0]).toBe('new-value')
    expect(localStorageMock.setItem).toHaveBeenCalledWith('test-key', JSON.stringify('new-value'))
  })

  it('should handle function updates', () => {
    localStorageMock.getItem.mockReturnValue(JSON.stringify(5))
    
    const { result } = renderHook(() => useLocalStorage('counter', 0))
    
    act(() => {
      result.current[1]((prev: number) => prev + 1)
    })
    
    expect(result.current[0]).toBe(6)
    expect(localStorageMock.setItem).toHaveBeenCalledWith('counter', JSON.stringify(6))
  })

  it('should handle complex objects', () => {
    const complexObject = { name: 'John', age: 30, hobbies: ['reading', 'coding'] }
    localStorageMock.getItem.mockReturnValue(JSON.stringify(complexObject))
    
    const { result } = renderHook(() => useLocalStorage('user', {}))
    
    expect(result.current[0]).toEqual(complexObject)
  })

  it('should handle arrays', () => {
    const arrayValue = [1, 2, 3, 4, 5]
    localStorageMock.getItem.mockReturnValue(JSON.stringify(arrayValue))
    
    const { result } = renderHook(() => useLocalStorage('numbers', []))
    
    expect(result.current[0]).toEqual(arrayValue)
  })

  it('should handle localStorage errors gracefully', () => {
    localStorageMock.getItem.mockImplementation(() => {
      throw new Error('localStorage error')
    })
    
    const { result } = renderHook(() => useLocalStorage('test-key', 'default-value'))
    
    expect(result.current[0]).toBe('default-value')
  })

  it('should handle JSON parse errors gracefully', () => {
    localStorageMock.getItem.mockReturnValue('invalid-json')
    
    const { result } = renderHook(() => useLocalStorage('test-key', 'default-value'))
    
    expect(result.current[0]).toBe('default-value')
  })

  it('should handle setItem errors gracefully', () => {
    localStorageMock.getItem.mockReturnValue(null)
    localStorageMock.setItem.mockImplementation(() => {
      throw new Error('localStorage setItem error')
    })
    
    const { result } = renderHook(() => useLocalStorage('test-key', 'default-value'))
    
    act(() => {
      result.current[1]('new-value')
    })
    
    // Should still update the state even if localStorage fails
    expect(result.current[0]).toBe('new-value')
  })

  it('should work with boolean values', () => {
    localStorageMock.getItem.mockReturnValue(JSON.stringify(true))
    
    const { result } = renderHook(() => useLocalStorage('is-enabled', false))
    
    expect(result.current[0]).toBe(true)
    
    act(() => {
      result.current[1](false)
    })
    
    expect(result.current[0]).toBe(false)
    expect(localStorageMock.setItem).toHaveBeenCalledWith('is-enabled', JSON.stringify(false))
  })

  it('should work with null values', () => {
    localStorageMock.getItem.mockReturnValue(JSON.stringify(null))
    
    const { result } = renderHook(() => useLocalStorage('nullable-value', 'default'))
    
    expect(result.current[0]).toBe(null)
  })
})