import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { CounterStore } from '@/types';

// Store básico do contador com persistência
export const useCounterStore = create<CounterStore>()
  (persist(
    (set) => ({
      count: 0,
      
      increment: () => {
        set((state) => ({ count: state.count + 1 }));
      },
      
      decrement: () => {
        set((state) => ({ count: state.count - 1 }));
      },
      
      reset: () => {
        set({ count: 0 });
      }
    }),
    {
      name: 'counter-storage',
      storage: createJSONStorage(() => localStorage),
    }
  ));

// Store com middleware de logging para demonstração
export const useCounterWithLoggingStore = create<CounterStore>()
  (persist(
    (set, get) => ({
      count: 0,
      
      increment: () => {
        const prevCount = get().count;
        set((state) => ({ count: state.count + 1 }));
        console.log('Counter incremented:', { from: prevCount, to: get().count });
      },
      
      decrement: () => {
        const prevCount = get().count;
        set((state) => ({ count: state.count - 1 }));
        console.log('Counter decremented:', { from: prevCount, to: get().count });
      },
      
      reset: () => {
        const prevCount = get().count;
        set({ count: 0 });
        console.log('Counter reset:', { from: prevCount, to: 0 });
      }
    }),
    {
      name: 'counter-with-logging-storage',
      storage: createJSONStorage(() => localStorage),
    }
  ));