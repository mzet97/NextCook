'use client';

import { useState, useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';

interface SearchHistoryItem {
  query: string;
  timestamp: number;
  category?: string;
  level?: string;
}

interface UseSearchHistoryReturn {
  history: SearchHistoryItem[];
  addToHistory: (query: string, category?: string, level?: string) => void;
  removeFromHistory: (query: string) => void;
  clearHistory: () => void;
  getPopularSearches: () => string[];
  getSuggestions: (currentQuery: string) => string[];
}

const MAX_HISTORY_ITEMS = 20;
const STORAGE_KEY = 'nextcook-search-history';

export function useSearchHistory(): UseSearchHistoryReturn {
  const [history, setHistory] = useLocalStorage<SearchHistoryItem[]>(STORAGE_KEY, []);
  const [popularSearches, setPopularSearches] = useState<string[]>([]);

  useEffect(() => {
    // Calcular pesquisas populares baseado na frequência
    const searchCounts = history.reduce((acc, item) => {
      acc[item.query] = (acc[item.query] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const popular = Object.entries(searchCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([query]) => query);

    setPopularSearches(popular);
  }, [history]);

  const addToHistory = (query: string, category?: string, level?: string) => {
    if (!query.trim() || query.length < 2) return;

    const newItem: SearchHistoryItem = {
      query: query.trim(),
      timestamp: Date.now(),
      category,
      level
    };

    setHistory(prev => {
      // Remove duplicatas e adiciona no início
      const filtered = prev.filter(item => item.query !== newItem.query);
      const updated = [newItem, ...filtered];
      
      // Manter apenas os últimos MAX_HISTORY_ITEMS
      return updated.slice(0, MAX_HISTORY_ITEMS);
    });
  };

  const removeFromHistory = (query: string) => {
    setHistory(prev => prev.filter(item => item.query !== query));
  };

  const clearHistory = () => {
    setHistory([]);
  };

  const getPopularSearches = () => {
    return popularSearches;
  };

  const getSuggestions = (currentQuery: string): string[] => {
    if (!currentQuery.trim()) return [];

    const query = currentQuery.toLowerCase();
    
    // Buscar no histórico
    const historyMatches = history
      .filter(item => item.query.toLowerCase().includes(query))
      .map(item => item.query)
      .slice(0, 3);

    // Sugestões predefinidas baseadas em termos comuns
    const commonSuggestions = [
      'react hooks',
      'next.js',
      'typescript',
      'tailwind css',
      'zustand',
      'prisma',
      'authentication',
      'api routes',
      'state management',
      'testing',
      'performance',
      'deployment',
      'forms validation',
      'error handling',
      'middleware',
      'database',
      'styling',
      'components',
      'custom hooks',
      'optimization'
    ];

    const suggestionMatches = commonSuggestions
      .filter(suggestion => 
        suggestion.toLowerCase().includes(query) && 
        !historyMatches.includes(suggestion)
      )
      .slice(0, 5 - historyMatches.length);

    return [...historyMatches, ...suggestionMatches];
  };

  return {
    history,
    addToHistory,
    removeFromHistory,
    clearHistory,
    getPopularSearches,
    getSuggestions
  };
}