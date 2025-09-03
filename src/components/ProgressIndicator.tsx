'use client';

import { useState, useEffect } from 'react';
import { CheckCircle, Circle, Clock, Star } from 'lucide-react';

interface ProgressItem {
  id: string;
  title: string;
  href: string;
  completed?: boolean;
  difficulty: 'basico' | 'intermediario' | 'avancado';
  category: string;
}

interface ProgressIndicatorProps {
  items: ProgressItem[];
  currentPath?: string;
  className?: string;
}

const difficultyConfig = {
  basico: {
    label: 'Básico',
    color: 'text-green-600 dark:text-green-400',
    bgColor: 'bg-green-100 dark:bg-green-900/30',
    icon: <Circle className="w-4 h-4" />
  },
  intermediario: {
    label: 'Intermediário',
    color: 'text-yellow-600 dark:text-yellow-400',
    bgColor: 'bg-yellow-100 dark:bg-yellow-900/30',
    icon: <Clock className="w-4 h-4" />
  },
  avancado: {
    label: 'Avançado',
    color: 'text-red-600 dark:text-red-400',
    bgColor: 'bg-red-100 dark:bg-red-900/30',
    icon: <Star className="w-4 h-4" />
  }
};

export default function ProgressIndicator({ items, currentPath, className = '' }: ProgressIndicatorProps) {
  const [completedItems, setCompletedItems] = useState<Set<string>>(new Set());
  
  useEffect(() => {
    // Carregar progresso do localStorage
    const saved = localStorage.getItem('cookbook-progress');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setCompletedItems(new Set(parsed));
      } catch (error) {
        console.error('Erro ao carregar progresso:', error);
      }
    }
  }, []);
  
  const toggleCompletion = (itemId: string) => {
    const newCompleted = new Set(completedItems);
    if (newCompleted.has(itemId)) {
      newCompleted.delete(itemId);
    } else {
      newCompleted.add(itemId);
    }
    setCompletedItems(newCompleted);
    
    // Salvar no localStorage
    localStorage.setItem('cookbook-progress', JSON.stringify(Array.from(newCompleted)));
  };
  
  const completedCount = completedItems.size;
  const totalCount = items.length;
  const progressPercentage = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;
  
  const groupedItems = items.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, ProgressItem[]>);
  
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 ${className}`}>
      {/* Header com estatísticas */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            📊 Seu Progresso
          </h3>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {completedCount} de {totalCount} concluídos
          </span>
        </div>
        
        {/* Barra de progresso */}
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-2">
          <div 
            className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        
        <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400">
          <span>0%</span>
          <span className="font-medium">{Math.round(progressPercentage)}%</span>
          <span>100%</span>
        </div>
      </div>
      
      {/* Lista de itens por categoria */}
      <div className="space-y-6">
        {Object.entries(groupedItems).map(([category, categoryItems]) => {
          const categoryCompleted = categoryItems.filter(item => completedItems.has(item.id)).length;
          
          return (
            <div key={category}>
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-gray-900 dark:text-white capitalize">
                  {category}
                </h4>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {categoryCompleted}/{categoryItems.length}
                </span>
              </div>
              
              <div className="space-y-2">
                {categoryItems.map((item) => {
                  const isCompleted = completedItems.has(item.id);
                  const isCurrent = currentPath === item.href;
                  const difficulty = difficultyConfig[item.difficulty];
                  
                  return (
                    <div 
                      key={item.id}
                      className={`flex items-center gap-3 p-3 rounded-lg border transition-all duration-200 ${
                        isCurrent 
                          ? 'border-blue-300 bg-blue-50 dark:border-blue-600 dark:bg-blue-900/20'
                          : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                      }`}
                    >
                      {/* Checkbox de conclusão */}
                      <button
                        onClick={() => toggleCompletion(item.id)}
                        className={`flex-shrink-0 transition-colors ${
                          isCompleted 
                            ? 'text-green-600 dark:text-green-400' 
                            : 'text-gray-400 dark:text-gray-600 hover:text-gray-600 dark:hover:text-gray-400'
                        }`}
                        title={isCompleted ? 'Marcar como não concluído' : 'Marcar como concluído'}
                      >
                        {isCompleted ? (
                          <CheckCircle className="w-5 h-5" />
                        ) : (
                          <Circle className="w-5 h-5" />
                        )}
                      </button>
                      
                      {/* Conteúdo do item */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`text-sm font-medium ${
                            isCompleted 
                              ? 'line-through text-gray-500 dark:text-gray-400'
                              : 'text-gray-900 dark:text-white'
                          }`}>
                            {item.title}
                          </span>
                          {isCurrent && (
                            <span className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs rounded-full">
                              Atual
                            </span>
                          )}
                        </div>
                        
                        {/* Badge de dificuldade */}
                        <div className="flex items-center gap-1">
                          <span className={difficulty.color}>
                            {difficulty.icon}
                          </span>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${difficulty.bgColor} ${difficulty.color}`}>
                            {difficulty.label}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Ações */}
      <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex gap-2">
          <button
            onClick={() => {
              const allIds = items.map(item => item.id);
              setCompletedItems(new Set(allIds));
              localStorage.setItem('cookbook-progress', JSON.stringify(allIds));
            }}
            className="px-3 py-1.5 text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors"
          >
            Marcar Todos
          </button>
          <button
            onClick={() => {
              setCompletedItems(new Set());
              localStorage.setItem('cookbook-progress', JSON.stringify([]));
            }}
            className="px-3 py-1.5 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            Limpar Progresso
          </button>
        </div>
      </div>
    </div>
  );
}

// Hook para usar o progresso
export function useProgress() {
  const [completedItems, setCompletedItems] = useState<Set<string>>(new Set());
  
  useEffect(() => {
    const saved = localStorage.getItem('cookbook-progress');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setCompletedItems(new Set(parsed));
      } catch (error) {
        console.error('Erro ao carregar progresso:', error);
      }
    }
  }, []);
  
  const markAsCompleted = (itemId: string) => {
    const newCompleted = new Set(completedItems);
    newCompleted.add(itemId);
    setCompletedItems(newCompleted);
    localStorage.setItem('cookbook-progress', JSON.stringify(Array.from(newCompleted)));
  };
  
  const markAsIncomplete = (itemId: string) => {
    const newCompleted = new Set(completedItems);
    newCompleted.delete(itemId);
    setCompletedItems(newCompleted);
    localStorage.setItem('cookbook-progress', JSON.stringify(Array.from(newCompleted)));
  };
  
  const isCompleted = (itemId: string) => completedItems.has(itemId);
  
  return {
    completedItems,
    markAsCompleted,
    markAsIncomplete,
    isCompleted,
    completedCount: completedItems.size
  };
}