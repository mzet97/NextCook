'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SearchResult {
  name: string;
  href: string;
  description: string;
  category: string;
}

interface SearchBarProps {
  isOpen: boolean;
  onClose: () => void;
  searchData: SearchResult[];
}

export default function SearchBar({ isOpen, onClose, searchData }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (query.trim() === '') {
      setResults([]);
      setSelectedIndex(-1);
      return;
    }

    const filtered = searchData.filter(item => 
      item.name.toLowerCase().includes(query.toLowerCase()) ||
      item.description.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 8); // Limit to 8 results

    setResults(filtered);
    setSelectedIndex(-1);
  }, [query, searchData]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => 
        prev < results.length - 1 ? prev + 1 : prev
      );
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
    }

    if (e.key === 'Enter') {
      e.preventDefault();
      if (selectedIndex >= 0 && results[selectedIndex]) {
        router.push(results[selectedIndex].href);
        onClose();
      }
    }
  };

  const handleResultClick = (href: string) => {
    router.push(href);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          className="absolute top-20 left-1/2 transform -translate-x-1/2 w-full max-w-2xl mx-auto px-4"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            {/* Search Input */}
            <div className="flex items-center px-4 py-3 border-b border-gray-200 dark:border-gray-700">
              <Search className="w-5 h-5 text-gray-400 mr-3" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Buscar páginas, hooks, componentes..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none text-lg"
              />
              <button
                onClick={onClose}
                className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Search Results */}
            {results.length > 0 && (
              <div className="max-h-96 overflow-y-auto">
                {results.map((result, index) => (
                  <motion.div
                    key={result.href}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`px-4 py-3 cursor-pointer transition-colors ${
                      index === selectedIndex
                        ? 'bg-blue-50 dark:bg-blue-900/20'
                        : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`}
                    onClick={() => handleResultClick(result.href)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 dark:text-white">
                          {result.name}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          {result.description}
                        </p>
                      </div>
                      <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-full ml-3">
                        {result.category}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* No Results */}
            {query.trim() !== '' && results.length === 0 && (
              <div className="px-4 py-8 text-center">
                <p className="text-gray-500 dark:text-gray-400">
                  Nenhum resultado encontrado para &quot;{query}&quot;
                </p>
              </div>
            )}

            {/* Search Tips */}
            {query.trim() === '' && (
              <div className="px-4 py-6">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                  Dicas de busca:
                </p>
                <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                  <div className="flex items-center">
                    <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-xs mr-2">
                      ↑↓
                    </kbd>
                    <span>Navegar pelos resultados</span>
                  </div>
                  <div className="flex items-center">
                    <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-xs mr-2">
                      Enter
                    </kbd>
                    <span>Abrir página selecionada</span>
                  </div>
                  <div className="flex items-center">
                    <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-xs mr-2">
                      Esc
                    </kbd>
                    <span>Fechar busca</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}