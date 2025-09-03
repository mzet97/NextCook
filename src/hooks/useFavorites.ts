'use client';

import { useState, useEffect } from 'react';

export interface FavoriteItem {
  id: string;
  title: string;
  description: string;
  url: string;
  category: string;
  tags: string[];
  addedAt: string;
  collection?: string;
}

export interface FavoriteCollection {
  id: string;
  name: string;
  description: string;
  color: string;
  createdAt: string;
  itemCount: number;
}

const FAVORITES_STORAGE_KEY = 'nextcook-favorites';
const COLLECTIONS_STORAGE_KEY = 'nextcook-collections';

export function useFavorites() {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [collections, setCollections] = useState<FavoriteCollection[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Carregar favoritos do localStorage
  useEffect(() => {
    try {
      const savedFavorites = localStorage.getItem(FAVORITES_STORAGE_KEY);
      const savedCollections = localStorage.getItem(COLLECTIONS_STORAGE_KEY);
      
      if (savedFavorites) {
        setFavorites(JSON.parse(savedFavorites));
      }
      
      if (savedCollections) {
        setCollections(JSON.parse(savedCollections));
      } else {
        // Criar coleção padrão
        const defaultCollection: FavoriteCollection = {
          id: 'default',
          name: 'Geral',
          description: 'Favoritos gerais',
          color: 'blue',
          createdAt: new Date().toISOString(),
          itemCount: 0
        };
        setCollections([defaultCollection]);
      }
    } catch (error) {
      console.error('Erro ao carregar favoritos:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Salvar favoritos no localStorage
  const saveFavorites = (newFavorites: FavoriteItem[]) => {
    try {
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(newFavorites));
      setFavorites(newFavorites);
    } catch (error) {
      console.error('Erro ao salvar favoritos:', error);
    }
  };

  // Salvar coleções no localStorage
  const saveCollections = (newCollections: FavoriteCollection[]) => {
    try {
      localStorage.setItem(COLLECTIONS_STORAGE_KEY, JSON.stringify(newCollections));
      setCollections(newCollections);
    } catch (error) {
      console.error('Erro ao salvar coleções:', error);
    }
  };

  // Adicionar item aos favoritos
  const addFavorite = (item: Omit<FavoriteItem, 'id' | 'addedAt'>) => {
    const newFavorite: FavoriteItem = {
      ...item,
      id: `fav_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      addedAt: new Date().toISOString(),
      collection: item.collection || 'default'
    };

    const newFavorites = [...favorites, newFavorite];
    saveFavorites(newFavorites);

    // Atualizar contador da coleção
    updateCollectionCount(newFavorite.collection || 'default');

    return newFavorite;
  };

  // Remover item dos favoritos
  const removeFavorite = (id: string) => {
    const favoriteToRemove = favorites.find(fav => fav.id === id);
    const newFavorites = favorites.filter(fav => fav.id !== id);
    saveFavorites(newFavorites);

    // Atualizar contador da coleção
    if (favoriteToRemove) {
      updateCollectionCount(favoriteToRemove.collection || 'default');
    }
  };

  // Verificar se item está nos favoritos
  const isFavorite = (url: string) => {
    return favorites.some(fav => fav.url === url);
  };

  // Alternar favorito
  const toggleFavorite = (item: Omit<FavoriteItem, 'id' | 'addedAt'>) => {
    const existingFavorite = favorites.find(fav => fav.url === item.url);
    
    if (existingFavorite) {
      removeFavorite(existingFavorite.id);
      return false;
    } else {
      addFavorite(item);
      return true;
    }
  };

  // Criar nova coleção
  const createCollection = (collection: Omit<FavoriteCollection, 'id' | 'createdAt' | 'itemCount'>) => {
    const newCollection: FavoriteCollection = {
      ...collection,
      id: `col_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString(),
      itemCount: 0
    };

    const newCollections = [...collections, newCollection];
    saveCollections(newCollections);

    return newCollection;
  };

  // Remover coleção
  const removeCollection = (id: string) => {
    if (id === 'default') {
      console.warn('Não é possível remover a coleção padrão');
      return;
    }

    // Mover favoritos da coleção removida para a coleção padrão
    const updatedFavorites = favorites.map(fav => 
      fav.collection === id ? { ...fav, collection: 'default' } : fav
    );
    saveFavorites(updatedFavorites);

    // Remover coleção
    const newCollections = collections.filter(col => col.id !== id);
    saveCollections(newCollections);

    // Atualizar contador da coleção padrão
    updateCollectionCount('default');
  };

  // Atualizar contador de itens da coleção
  const updateCollectionCount = (collectionId: string) => {
    const count = favorites.filter(fav => fav.collection === collectionId).length;
    const updatedCollections = collections.map(col => 
      col.id === collectionId ? { ...col, itemCount: count } : col
    );
    saveCollections(updatedCollections);
  };

  // Mover favorito para outra coleção
  const moveFavoriteToCollection = (favoriteId: string, collectionId: string) => {
    const updatedFavorites = favorites.map(fav => 
      fav.id === favoriteId ? { ...fav, collection: collectionId } : fav
    );
    saveFavorites(updatedFavorites);

    // Atualizar contadores das coleções
    collections.forEach(col => updateCollectionCount(col.id));
  };

  // Obter favoritos por coleção
  const getFavoritesByCollection = (collectionId: string) => {
    return favorites.filter(fav => fav.collection === collectionId);
  };

  // Buscar favoritos
  const searchFavorites = (query: string) => {
    const lowercaseQuery = query.toLowerCase();
    return favorites.filter(fav => 
      fav.title.toLowerCase().includes(lowercaseQuery) ||
      fav.description.toLowerCase().includes(lowercaseQuery) ||
      fav.category.toLowerCase().includes(lowercaseQuery) ||
      fav.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
    );
  };

  // Exportar favoritos
  const exportFavorites = () => {
    const data = {
      favorites,
      collections,
      exportedAt: new Date().toISOString(),
      version: '1.0'
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `nextcook-favorites-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    URL.revokeObjectURL(url);
  };

  // Importar favoritos
  const importFavorites = (file: File): Promise<{ success: boolean; message: string }> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target?.result as string);
          
          if (data.favorites && Array.isArray(data.favorites)) {
            // Mesclar favoritos existentes com os importados
            const existingUrls = new Set(favorites.map(fav => fav.url));
            const newFavorites = data.favorites.filter((fav: FavoriteItem) => !existingUrls.has(fav.url));
            
            saveFavorites([...favorites, ...newFavorites]);
            
            if (data.collections && Array.isArray(data.collections)) {
              const existingCollectionIds = new Set(collections.map(col => col.id));
              const newCollections = data.collections.filter((col: FavoriteCollection) => 
                !existingCollectionIds.has(col.id)
              );
              
              saveCollections([...collections, ...newCollections]);
            }
            
            resolve({ 
              success: true, 
              message: `${newFavorites.length} novos favoritos importados com sucesso!` 
            });
          } else {
            resolve({ 
              success: false, 
              message: 'Formato de arquivo inválido' 
            });
          }
        } catch {
          resolve({ 
            success: false, 
            message: 'Erro ao processar arquivo' 
          });
        }
      };
      
      reader.readAsText(file);
    });
  };

  // Limpar todos os favoritos
  const clearAllFavorites = () => {
    saveFavorites([]);
    // Resetar contadores das coleções
    const resetCollections = collections.map(col => ({ ...col, itemCount: 0 }));
    saveCollections(resetCollections);
  };

  return {
    favorites,
    collections,
    isLoading,
    addFavorite,
    removeFavorite,
    isFavorite,
    toggleFavorite,
    createCollection,
    removeCollection,
    moveFavoriteToCollection,
    getFavoritesByCollection,
    searchFavorites,
    exportFavorites,
    importFavorites,
    clearAllFavorites,
    stats: {
      totalFavorites: favorites.length,
      totalCollections: collections.length,
      favoritesByCategory: favorites.reduce((acc, fav) => {
        acc[fav.category] = (acc[fav.category] || 0) + 1;
        return acc;
      }, {} as Record<string, number>)
    }
  };
}