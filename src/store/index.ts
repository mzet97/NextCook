import { create } from 'zustand';
import { devtools, persist, subscribeWithSelector, combine } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { temporal } from 'zundo';

// ===== COUNTER STORE COM MÚLTIPLOS MIDDLEWARES =====
interface CounterState {
  count: number;
  step: number;
  history: number[];
  increment: () => void;
  decrement: () => void;
  reset: () => void;
  setStep: (step: number) => void;
  incrementByStep: () => void;
  addToHistory: (value: number) => void;
  clearHistory: () => void;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
}

export const useCounterStore = create<CounterState>()()
  (devtools(
    persist(
      subscribeWithSelector(
        temporal(
          immer((set) => ({
            count: 0,
            step: 1,
            history: [],
            increment: () => set((state) => {
              state.count += 1;
              state.history.push(state.count);
            }),
            decrement: () => set((state) => {
              state.count -= 1;
              state.history.push(state.count);
            }),
            reset: () => set((state) => {
              state.count = 0;
              state.history = [];
            }),
            incrementBy: (amount: number) => set((state) => {
              state.count += amount;
              state.history.push(state.count);
            }),
            setStep: (step: number) => set((state) => {
              state.step = step;
            }),
            incrementByStep: () => set((state) => {
              state.count += state.step;
              state.history.push(state.count);
            }),
            addToHistory: (value: number) => set((state) => {
              state.history.push(value);
            }),
            clearHistory: () => set((state) => {
              state.history = [];
            }),
            undo: () => {
              // Temporal middleware will handle this
            },
            redo: () => {
              // Temporal middleware will handle this
            },
            canUndo: false,
            canRedo: false,
          })),
          {
            limit: 10,
            equality: (a, b) => JSON.stringify(a) === JSON.stringify(b),
          }
        )
      ),
      {
        name: 'counter-storage',
        partialize: (state) => ({ count: state.count, step: state.step }),
      }
    ),
    {
      name: 'counter-store',
    }
  ));

// ===== USER STORE COM SLICES =====
interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'admin' | 'user' | 'guest';
}

interface UserSlice {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (user: User) => void;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

interface AuthSlice {
  token: string | null;
  isAuthenticated: boolean;
  permissions: string[];
  setToken: (token: string) => void;
  clearToken: () => void;
  addPermission: (permission: string) => void;
  removePermission: (permission: string) => void;
  hasPermission: (permission: string) => boolean;
}

interface PreferencesSlice {
  theme: 'light' | 'dark' | 'system';
  language: 'en' | 'pt' | 'es';
  notifications: boolean;
  autoSave: boolean;
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  setLanguage: (language: 'en' | 'pt' | 'es') => void;
  toggleNotifications: () => void;
  toggleAutoSave: () => void;
}

type AppState = UserSlice & AuthSlice & PreferencesSlice;

const createUserSlice = (set: (fn: (state: AppState) => void) => void): UserSlice => ({
  user: null,
  isLoading: false,
  error: null,
  login: (user: User) => set((state: AppState) => {
    state.user = user;
    state.isLoading = false;
    state.error = null;
  }),
  logout: () => set((state: AppState) => {
    state.user = null;
    state.token = null;
    state.isAuthenticated = false;
    state.permissions = [];
  }),
  updateProfile: (updates: Partial<User>) => set((state: AppState) => {
    if (state.user) {
      Object.assign(state.user, updates);
    }
  }),
  setLoading: (loading: boolean) => set((state: AppState) => {
    state.isLoading = loading;
  }),
  setError: (error: string | null) => set((state: AppState) => {
    state.error = error;
    state.isLoading = false;
  }),
});

const createAuthSlice = (set: (fn: (state: AppState) => void) => void, get: () => AppState): AuthSlice => ({
  token: null,
  isAuthenticated: false,
  permissions: [],
  setToken: (token: string) => set((state: AppState) => {
    state.token = token;
    state.isAuthenticated = true;
  }),
  clearToken: () => set((state: AppState) => {
    state.token = null;
    state.isAuthenticated = false;
    state.permissions = [];
  }),
  addPermission: (permission: string) => set((state: AppState) => {
    if (!state.permissions.includes(permission)) {
      state.permissions.push(permission);
    }
  }),
  removePermission: (permission: string) => set((state: AppState) => {
    state.permissions = state.permissions.filter((p) => p !== permission);
  }),
  hasPermission: (permission: string) => {
    const state = get();
    return state.permissions.includes(permission);
  },
});

const createPreferencesSlice = (set: (fn: (state: AppState) => void) => void): PreferencesSlice => ({
  theme: 'system',
  language: 'en',
  notifications: true,
  autoSave: true,
  setTheme: (theme: 'light' | 'dark' | 'system') => set((state: AppState) => {
    state.theme = theme;
  }),
  setLanguage: (language: 'en' | 'pt' | 'es') => set((state: AppState) => {
    state.language = language;
  }),
  toggleNotifications: () => set((state: AppState) => {
    state.notifications = !state.notifications;
  }),
  toggleAutoSave: () => set((state: AppState) => {
    state.autoSave = !state.autoSave;
  }),
});

export const useAppStore = create<AppState>()()
  (devtools(
    persist(
      subscribeWithSelector(
        immer((set, get) => ({
          ...createUserSlice(set, get),
           ...createAuthSlice(set, get),
           ...createPreferencesSlice(set, get),
        }))
      ),
      {
        name: 'app-storage',
        partialize: (state) => ({
          theme: state.theme,
          language: state.language,
          notifications: state.notifications,
          autoSave: state.autoSave,
          token: state.token,
        }),
      }
    ),
    {
      name: 'app-store',
    }
  ));

// ===== TODO STORE COM COMBINE MIDDLEWARE =====
interface Todo {
  id: string;
  text: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  createdAt: Date;
  updatedAt: Date;
  tags: string[];
}

interface TodoFilters {
  status: 'all' | 'active' | 'completed';
  priority: 'all' | 'low' | 'medium' | 'high';
  tag: string | null;
  search: string;
}

const initialTodos: Todo[] = [];
const initialFilters: TodoFilters = {
  status: 'all',
  priority: 'all',
  tag: null,
  search: '',
};

export const useTodoStore = create()()
  (devtools(
    persist(
      subscribeWithSelector(
        combine(
          {
            todos: initialTodos,
            filters: initialFilters,
          },
          (set, get) => ({
            // Todo actions
            addTodo: (text: string, priority: Todo['priority'] = 'medium') => {
              const newTodo: Todo = {
                id: crypto.randomUUID(),
                text,
                completed: false,
                priority,
                createdAt: new Date(),
                updatedAt: new Date(),
                tags: [],
              };
              set((state) => ({ todos: [...state.todos, newTodo] }));
            },
            
            toggleTodo: (id: string) => {
              set((state) => ({
                todos: state.todos.map((todo) =>
                  todo.id === id
                    ? { ...todo, completed: !todo.completed, updatedAt: new Date() }
                    : todo
                ),
              }));
            },
            
            updateTodo: (id: string, updates: Partial<Todo>) => {
              set((state) => ({
                todos: state.todos.map((todo) =>
                  todo.id === id
                    ? { ...todo, ...updates, updatedAt: new Date() }
                    : todo
                ),
              }));
            },
            
            deleteTodo: (id: string) => {
              set((state) => ({
                todos: state.todos.filter((todo) => todo.id !== id),
              }));
            },
            
            removeTodo: (id: string) => {
              set((state) => ({
                todos: state.todos.filter((todo) => todo.id !== id),
              }));
            },
            
            clearCompleted: () => {
              set((state) => ({
                todos: state.todos.filter((todo) => !todo.completed),
              }));
            },
            
            addTag: (id: string, tag: string) => {
              set((state) => ({
                todos: state.todos.map((todo) =>
                  todo.id === id && !todo.tags.includes(tag)
                    ? { ...todo, tags: [...todo.tags, tag], updatedAt: new Date() }
                    : todo
                ),
              }));
            },
            
            removeTag: (id: string, tag: string) => {
              set((state) => ({
                todos: state.todos.map((todo) =>
                  todo.id === id
                    ? { ...todo, tags: todo.tags.filter((t) => t !== tag), updatedAt: new Date() }
                    : todo
                ),
              }));
            },
            
            // Filter actions
            setStatusFilter: (status: TodoFilters['status']) => {
              set((state) => ({
                filters: { ...state.filters, status },
              }));
            },
            
            setPriorityFilter: (priority: TodoFilters['priority']) => {
              set((state) => ({
                filters: { ...state.filters, priority },
              }));
            },
            
            setTagFilter: (tag: string | null) => {
              set((state) => ({
                filters: { ...state.filters, tag },
              }));
            },
            
            setSearchFilter: (search: string) => {
              set((state) => ({
                filters: { ...state.filters, search },
              }));
            },
            
            clearFilters: () => {
              set({ filters: initialFilters });
            },
            
            // Computed values
            getFilteredTodos: () => {
              const { todos, filters } = get();
              return todos.filter((todo) => {
                // Status filter
                if (filters.status === 'active' && todo.completed) return false;
                if (filters.status === 'completed' && !todo.completed) return false;
                
                // Priority filter
                if (filters.priority !== 'all' && todo.priority !== filters.priority) return false;
                
                // Tag filter
                if (filters.tag && !todo.tags.includes(filters.tag)) return false;
                
                // Search filter
                if (filters.search && !todo.text.toLowerCase().includes(filters.search.toLowerCase())) return false;
                
                return true;
              });
            },
            
            getTodoStats: () => {
              const { todos } = get();
              return {
                total: todos.length,
                completed: todos.filter((todo) => todo.completed).length,
                active: todos.filter((todo) => !todo.completed).length,
                high: todos.filter((todo) => todo.priority === 'high').length,
                medium: todos.filter((todo) => todo.priority === 'medium').length,
                low: todos.filter((todo) => todo.priority === 'low').length,
              };
            },
            
            getAllTags: () => {
              const { todos } = get();
              const allTags = todos.flatMap((todo) => todo.tags);
              return Array.from(new Set(allTags));
            },
          })
        )
      ),
      {
        name: 'todo-storage',
        partialize: (state) => ({ todos: state.todos }),
      }
    ),
    {
      name: 'todo-store',
    }
  ));

// ===== NOTIFICATION STORE =====
interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  duration?: number;
  createdAt: Date;
}

interface NotificationState {
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id' | 'createdAt'>) => void;
  removeNotification: (id: string) => void;
  clearAll: () => void;
  success: (title: string, message: string, duration?: number) => void;
  error: (title: string, message: string, duration?: number) => void;
  warning: (title: string, message: string, duration?: number) => void;
  info: (title: string, message: string, duration?: number) => void;
}

export const useNotificationStore = create<NotificationState>()()
  (devtools(
    subscribeWithSelector(
      immer((set, get) => ({
        notifications: [],
        
        addNotification: (notification) => {
          const newNotification: Notification = {
            ...notification,
            id: crypto.randomUUID(),
            createdAt: new Date(),
          };
          
          set((state) => {
            state.notifications.push(newNotification);
          });
          
          // Auto remove after duration
          if (notification.duration !== 0) {
            setTimeout(() => {
              get().removeNotification(newNotification.id);
            }, notification.duration || 5000);
          }
        },
        
        removeNotification: (id) => {
          set((state) => {
            state.notifications = state.notifications.filter((n) => n.id !== id);
          });
        },
        
        clearAll: () => {
          set((state) => {
            state.notifications = [];
          });
        },
        
        success: (title, message, duration) => {
          get().addNotification({ type: 'success', title, message, duration });
        },
        
        error: (title, message, duration) => {
          get().addNotification({ type: 'error', title, message, duration });
        },
        
        warning: (title, message, duration) => {
          get().addNotification({ type: 'warning', title, message, duration });
        },
        
        info: (title, message, duration) => {
          get().addNotification({ type: 'info', title, message, duration });
        },
      }))
    ),
    {
      name: 'notification-store',
    }
  ));

// ===== STORE SELECTORS =====
// Note: These selectors should be used inside components, not at module level
// Example usage in components:
// const count = useCounterStore((state) => state.count);
// const { increment, decrement, reset } = useCounterStore((state) => ({
//   increment: state.increment,
//   decrement: state.decrement,
//   reset: state.reset,
// }));

// Helper functions for common selectors
export const selectCounterValue = (state: CounterState) => state.count;
export const selectCounterActions = (state: CounterState) => ({
  increment: state.increment,
  decrement: state.decrement,
  reset: state.reset,
});

export const selectUser = (state: AppState) => state.user;
export const selectAuth = (state: AppState) => ({
  isAuthenticated: state.isAuthenticated,
  token: state.token,
  permissions: state.permissions,
});

export const selectPreferences = (state: AppState) => ({
  theme: state.theme,
  language: state.language,
  notifications: state.notifications,
  autoSave: state.autoSave,
});

export const selectTodos = (state: TodoState) => state.getFilteredTodos();
export const selectTodoStats = (state: TodoState) => state.getTodoStats();
export const selectTodoFilters = (state: TodoState) => state.filters;

// ===== STORE SUBSCRIPTIONS =====
// Note: Subscriptions should be set up in components or effects, not at module level
// Example usage in components:
// useEffect(() => {
//   const unsubscribe = useCounterStore.subscribe(
//     (state) => state.count,
//     (count, prevCount) => {
//       console.log('Counter changed from', prevCount, 'to', count);
//     }
//   );
//   return unsubscribe;
// }, []);

const stores = {
  useCounterStore,
  useAppStore,
  useTodoStore,
  useNotificationStore,
};

export default stores;