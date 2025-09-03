import { create } from 'zustand';
import { devtools, persist, subscribeWithSelector } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import type { StateCreator } from 'zustand';

// ===== SIMPLE COUNTER STORE =====
interface CounterState {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
}

export const useCounterStore = create<CounterState>()(
  devtools(
    persist(
      (set) => ({
        count: 0,
        increment: () => set((state) => ({ count: state.count + 1 })),
        decrement: () => set((state) => ({ count: state.count - 1 })),
        reset: () => set({ count: 0 }),
      }),
      {
        name: 'counter-storage',
      }
    ),
    {
      name: 'counter-store',
    }
  )
);

// ===== SIMPLE USER STORE =====
interface User {
  id: string;
  name: string;
  email: string;
}

interface UserState {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
}

export const useUserStore = create<UserState>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        isAuthenticated: false,
        login: (user: User) => set({ user, isAuthenticated: true }),
        logout: () => set({ user: null, isAuthenticated: false }),
      }),
      {
        name: 'user-storage',
      }
    ),
    {
      name: 'user-store',
    }
  )
);

// ===== SIMPLE TODO STORE =====
interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

interface TodoState {
  todos: Todo[];
  addTodo: (text: string) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  clearCompleted: () => void;
}

// Usando immer para mutações mais simples e seguras
const todoStore: StateCreator<TodoState, [], [], TodoState> = (set) => ({
  todos: [],
  addTodo: (text: string) => {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text,
      completed: false,
    };
    set((state) => ({ todos: [...state.todos, newTodo] }));
  },
  toggleTodo: (id: string) => {
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      ),
    }));
  },
  deleteTodo: (id: string) => {
    set((state) => ({
      todos: state.todos.filter((todo) => todo.id !== id),
    }));
  },
  clearCompleted: () => {
    set((state) => ({
      todos: state.todos.filter((todo) => !todo.completed),
    }));
  },
});

export const useTodoStore = create<TodoState>()(
  devtools(
    persist(
      subscribeWithSelector(
        immer(todoStore)
      ),
      {
        name: 'todo-storage',
        version: 1, // Versioning para migrations
      }
    ),
    {
      name: 'todo-store',
    }
  )
);

// ===== SIMPLE NOTIFICATION STORE =====
interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
}

interface NotificationState {
  notifications: Notification[];
  addNotification: (type: Notification['type'], message: string) => void;
  removeNotification: (id: string) => void;
  clearAll: () => void;
}

export const useNotificationStore = create<NotificationState>()(
  devtools(
    (set) => ({
      notifications: [],
      addNotification: (type: Notification['type'], message: string) => {
        const notification: Notification = {
          id: crypto.randomUUID(),
          type,
          message,
        };
        set((state) => ({
          notifications: [...state.notifications, notification],
        }));
        
        // Auto remove after 5 seconds
        setTimeout(() => {
          set((state) => ({
            notifications: state.notifications.filter((n) => n.id !== notification.id),
          }));
        }, 5000);
      },
      removeNotification: (id: string) => {
        set((state) => ({
          notifications: state.notifications.filter((n) => n.id !== id),
        }));
      },
      clearAll: () => {
        set({ notifications: [] });
      },
    }),
    {
      name: 'notification-store',
    }
  )
);