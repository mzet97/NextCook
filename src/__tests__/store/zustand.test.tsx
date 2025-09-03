import { renderHook, act } from '@testing-library/react'
import { useCounterStore, useAppStore, useTodoStore, useNotificationStore } from '@/store'

// Mock localStorage for persist middleware
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
})

describe('Zustand Stores', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('useCounterStore', () => {
    it('should initialize with default values', () => {
      const { result } = renderHook(() => useCounterStore())
      
      expect(result.current.count).toBe(0)
      expect(result.current.step).toBe(1)
    })

    it('should increment count by step', () => {
      const { result } = renderHook(() => useCounterStore())
      
      act(() => {
        result.current.increment()
      })
      
      expect(result.current.count).toBe(1)
    })

    it('should decrement count by step', () => {
      const { result } = renderHook(() => useCounterStore())
      
      act(() => {
        result.current.increment()
        result.current.decrement()
      })
      
      expect(result.current.count).toBe(0)
    })

    it('should reset count to 0', () => {
      const { result } = renderHook(() => useCounterStore())
      
      act(() => {
        result.current.increment()
        result.current.increment()
        result.current.reset()
      })
      
      expect(result.current.count).toBe(0)
    })

    it('should set custom step', () => {
      const { result } = renderHook(() => useCounterStore())
      
      act(() => {
        result.current.setStep(5)
        result.current.increment()
      })
      
      expect(result.current.count).toBe(5)
      expect(result.current.step).toBe(5)
    })

    it('should handle undo/redo with temporal middleware', () => {
      const { result } = renderHook(() => useCounterStore.temporal.getState())
      const { result: storeResult } = renderHook(() => useCounterStore())
      
      act(() => {
        storeResult.current.increment()
        storeResult.current.increment()
      })
      
      expect(storeResult.current.count).toBe(2)
      
      act(() => {
        result.current.undo()
      })
      
      expect(useCounterStore.getState().count).toBe(1)
      
      act(() => {
        result.current.redo()
      })
      
      expect(useCounterStore.getState().count).toBe(2)
    })
  })

  describe('useAppStore', () => {
    it('should initialize with default user state', () => {
      const { result } = renderHook(() => useAppStore())
      
      expect(result.current.user).toBeNull()
      expect(result.current.isAuthenticated).toBe(false)
    })

    it('should set user and authenticate', () => {
      const { result } = renderHook(() => useAppStore())
      const mockUser = { id: '1', name: 'John Doe', email: 'john@example.com' }
      
      act(() => {
        result.current.setUser(mockUser)
      })
      
      expect(result.current.user).toEqual(mockUser)
      expect(result.current.isAuthenticated).toBe(true)
    })

    it('should logout user', () => {
      const { result } = renderHook(() => useAppStore())
      const mockUser = { id: '1', name: 'John Doe', email: 'john@example.com' }
      
      act(() => {
        result.current.setUser(mockUser)
        result.current.logout()
      })
      
      expect(result.current.user).toBeNull()
      expect(result.current.isAuthenticated).toBe(false)
    })

    it('should update preferences', () => {
      const { result } = renderHook(() => useAppStore())
      
      act(() => {
        result.current.updatePreferences({ theme: 'dark', language: 'pt' })
      })
      
      expect(result.current.preferences.theme).toBe('dark')
      expect(result.current.preferences.language).toBe('pt')
    })
  })

  describe('useTodoStore', () => {
    it('should initialize with empty todos', () => {
      const { result } = renderHook(() => useTodoStore())
      
      expect(result.current.todos).toEqual([])
      expect(result.current.filter).toBe('all')
    })

    it('should add a new todo', () => {
      const { result } = renderHook(() => useTodoStore())
      
      act(() => {
        result.current.addTodo('Test todo')
      })
      
      expect(result.current.todos).toHaveLength(1)
      expect(result.current.todos[0].text).toBe('Test todo')
      expect(result.current.todos[0].completed).toBe(false)
    })

    it('should toggle todo completion', () => {
      const { result } = renderHook(() => useTodoStore())
      
      act(() => {
        result.current.addTodo('Test todo')
      })
      
      const todoId = result.current.todos[0].id
      
      act(() => {
        result.current.toggleTodo(todoId)
      })
      
      expect(result.current.todos[0].completed).toBe(true)
    })

    it('should remove a todo', () => {
      const { result } = renderHook(() => useTodoStore())
      
      act(() => {
        result.current.addTodo('Test todo')
      })
      
      const todoId = result.current.todos[0].id
      
      act(() => {
        result.current.removeTodo(todoId)
      })
      
      expect(result.current.todos).toHaveLength(0)
    })

    it('should filter todos correctly', () => {
      const { result } = renderHook(() => useTodoStore())
      
      act(() => {
        result.current.addTodo('Todo 1')
        result.current.addTodo('Todo 2')
        result.current.toggleTodo(result.current.todos[0].id)
      })
      
      // Test completed filter
      act(() => {
        result.current.setFilter('completed')
      })
      
      expect(result.current.filteredTodos).toHaveLength(1)
      expect(result.current.filteredTodos[0].completed).toBe(true)
      
      // Test active filter
      act(() => {
        result.current.setFilter('active')
      })
      
      expect(result.current.filteredTodos).toHaveLength(1)
      expect(result.current.filteredTodos[0].completed).toBe(false)
    })

    it('should clear completed todos', () => {
      const { result } = renderHook(() => useTodoStore())
      
      act(() => {
        result.current.addTodo('Todo 1')
        result.current.addTodo('Todo 2')
        result.current.toggleTodo(result.current.todos[0].id)
        result.current.clearCompleted()
      })
      
      expect(result.current.todos).toHaveLength(1)
      expect(result.current.todos[0].completed).toBe(false)
    })
  })

  describe('useNotificationStore', () => {
    it('should initialize with empty notifications', () => {
      const { result } = renderHook(() => useNotificationStore())
      
      expect(result.current.notifications).toEqual([])
    })

    it('should add a notification', () => {
      const { result } = renderHook(() => useNotificationStore())
      
      act(() => {
        result.current.addNotification('Test message', 'success')
      })
      
      expect(result.current.notifications).toHaveLength(1)
      expect(result.current.notifications[0].message).toBe('Test message')
      expect(result.current.notifications[0].type).toBe('success')
    })

    it('should remove a notification', () => {
      const { result } = renderHook(() => useNotificationStore())
      
      act(() => {
        result.current.addNotification('Test message', 'info')
      })
      
      const notificationId = result.current.notifications[0].id
      
      act(() => {
        result.current.removeNotification(notificationId)
      })
      
      expect(result.current.notifications).toHaveLength(0)
    })

    it('should clear all notifications', () => {
      const { result } = renderHook(() => useNotificationStore())
      
      act(() => {
        result.current.addNotification('Message 1', 'info')
        result.current.addNotification('Message 2', 'warning')
        result.current.addNotification('Message 3', 'error')
      })
      
      expect(result.current.notifications).toHaveLength(3)
      
      act(() => {
        result.current.clearAll()
      })
      
      expect(result.current.notifications).toHaveLength(0)
    })

    it('should add notifications with different types', () => {
      const { result } = renderHook(() => useNotificationStore())
      
      act(() => {
        result.current.addNotification('Success message', 'success')
        result.current.addNotification('Error message', 'error')
        result.current.addNotification('Warning message', 'warning')
        result.current.addNotification('Info message', 'info')
      })
      
      expect(result.current.notifications).toHaveLength(4)
      expect(result.current.notifications.map(n => n.type)).toEqual(['success', 'error', 'warning', 'info'])
    })
  })
})