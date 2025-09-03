'use client';

import { useState, useMemo } from 'react';
import { 
  Heart, 
  Search, 
  Filter, 
  Download, 
  Upload, 
  Trash2, 
  Plus, 
  Grid, 
  List, 
  Star,
  Calendar,
  Tag,
  Folder,
  MoreVertical,
  Edit,
  Move,
  ExternalLink
} from 'lucide-react';
import Link from 'next/link';
import { useFavorites, FavoriteItem, FavoriteCollection } from '@/hooks/useFavorites';
import { toast } from 'sonner';
import Breadcrumbs from '@/components/Breadcrumbs';

export default function FavoritesPage() {
  const {
    favorites,
    collections,
    isLoading,
    removeFavorite,
    createCollection,
    removeCollection,
    moveFavoriteToCollection,
    getFavoritesByCollection,
    searchFavorites,
    exportFavorites,
    importFavorites,
    clearAllFavorites,
    stats
  } = useFavorites();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCollection, setSelectedCollection] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'recent' | 'title' | 'category'>('recent');
  const [showCreateCollection, setShowCreateCollection] = useState(false);
  const [newCollectionName, setNewCollectionName] = useState('');
  const [newCollectionDescription, setNewCollectionDescription] = useState('');
  const [selectedColor, setSelectedColor] = useState('blue');

  // Filtrar e ordenar favoritos
  const filteredFavorites = useMemo(() => {
    let result = favorites;

    // Filtrar por busca
    if (searchQuery) {
      result = searchFavorites(searchQuery);
    }

    // Filtrar por coleção
    if (selectedCollection !== 'all') {
      result = result.filter(fav => fav.collection === selectedCollection);
    }

    // Ordenar
    result.sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'category':
          return a.category.localeCompare(b.category);
        case 'recent':
        default:
          return new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime();
      }
    });

    return result;
  }, [favorites, searchQuery, selectedCollection, sortBy, searchFavorites]);

  // Cores disponíveis para coleções
  const colors = [
    { name: 'blue', class: 'bg-blue-100 text-blue-700 border-blue-200' },
    { name: 'green', class: 'bg-green-100 text-green-700 border-green-200' },
    { name: 'purple', class: 'bg-purple-100 text-purple-700 border-purple-200' },
    { name: 'red', class: 'bg-red-100 text-red-700 border-red-200' },
    { name: 'yellow', class: 'bg-yellow-100 text-yellow-700 border-yellow-200' },
    { name: 'indigo', class: 'bg-indigo-100 text-indigo-700 border-indigo-200' }
  ];

  const handleCreateCollection = () => {
    if (!newCollectionName.trim()) {
      toast.error('Nome da coleção é obrigatório');
      return;
    }

    createCollection({
      name: newCollectionName,
      description: newCollectionDescription,
      color: selectedColor
    });

    setNewCollectionName('');
    setNewCollectionDescription('');
    setSelectedColor('blue');
    setShowCreateCollection(false);
    toast.success('Coleção criada com sucesso!');
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    importFavorites(file).then(result => {
      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    });

    // Reset input
    event.target.value = '';
  };

  const handleRemoveFavorite = (id: string, title: string) => {
    removeFavorite(id);
    toast.success(`"${title}" removido dos favoritos`);
  };

  const getCollectionColor = (colorName: string) => {
    return colors.find(c => c.name === colorName)?.class || colors[0].class;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando favoritos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs />
        
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <Heart className="w-8 h-8 text-red-500" />
                Meus Favoritos
              </h1>
              <p className="text-gray-600 mt-2">
                Gerencie seus conteúdos favoritos e organize em coleções
              </p>
            </div>
            
            {/* Actions */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowCreateCollection(true)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Nova Coleção
              </button>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={exportFavorites}
                  className="inline-flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  title="Exportar favoritos"
                >
                  <Download className="w-4 h-4" />
                </button>
                
                <label className="inline-flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                  <Upload className="w-4 h-4" />
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleImport}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total de Favoritos</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalFavorites}</p>
                </div>
                <Heart className="w-8 h-8 text-red-500" />
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Coleções</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalCollections}</p>
                </div>
                <Folder className="w-8 h-8 text-blue-500" />
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Categorias</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {Object.keys(stats.favoritesByCategory).length}
                  </p>
                </div>
                <Tag className="w-8 h-8 text-green-500" />
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Adicionados Hoje</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {favorites.filter(fav => 
                      new Date(fav.addedAt).toDateString() === new Date().toDateString()
                    ).length}
                  </p>
                </div>
                <Calendar className="w-8 h-8 text-purple-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar favoritos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Collection Filter */}
            <div className="lg:w-48">
              <select
                value={selectedCollection}
                onChange={(e) => setSelectedCollection(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">Todas as Coleções</option>
                {collections.map(collection => (
                  <option key={collection.id} value={collection.id}>
                    {collection.name} ({collection.itemCount})
                  </option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div className="lg:w-40">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'recent' | 'title' | 'category')}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="recent">Mais Recentes</option>
                <option value="title">Título A-Z</option>
                <option value="category">Categoria</option>
              </select>
            </div>

            {/* View Mode */}
            <div className="flex border border-gray-300 rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-2 ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-3 py-2 ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Collections */}
        {collections.length > 1 && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Coleções</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {collections.map(collection => (
                <div
                  key={collection.id}
                  className={`p-4 rounded-lg border cursor-pointer transition-all hover:shadow-md ${
                    selectedCollection === collection.id
                      ? getCollectionColor(collection.color)
                      : 'bg-white border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedCollection(collection.id)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">{collection.name}</h3>
                    {collection.id !== 'default' && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          removeCollection(collection.id);
                          toast.success('Coleção removida');
                        }}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{collection.description}</p>
                  <p className="text-xs text-gray-500">{collection.itemCount} itens</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Favorites Grid/List */}
        {filteredFavorites.length === 0 ? (
          <div className="text-center py-12">
            <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {searchQuery ? 'Nenhum favorito encontrado' : 'Nenhum favorito ainda'}
            </h3>
            <p className="text-gray-600 mb-6">
              {searchQuery 
                ? 'Tente ajustar sua busca ou filtros'
                : 'Comece adicionando conteúdos aos seus favoritos'
              }
            </p>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Limpar Busca
              </button>
            )}
          </div>
        ) : (
          <div className={`
            ${viewMode === 'grid' 
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' 
              : 'space-y-4'
            }
          `}>
            {filteredFavorites.map(favorite => (
              <FavoriteCard
                key={favorite.id}
                favorite={favorite}
                viewMode={viewMode}
                collections={collections}
                onRemove={handleRemoveFavorite}
                onMove={moveFavoriteToCollection}
              />
            ))}
          </div>
        )}

        {/* Create Collection Modal */}
        {showCreateCollection && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Nova Coleção</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nome da Coleção
                  </label>
                  <input
                    type="text"
                    value={newCollectionName}
                    onChange={(e) => setNewCollectionName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Ex: Tutoriais React"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Descrição (opcional)
                  </label>
                  <textarea
                    value={newCollectionDescription}
                    onChange={(e) => setNewCollectionDescription(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={3}
                    placeholder="Descrição da coleção..."
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cor
                  </label>
                  <div className="flex gap-2">
                    {colors.map(color => (
                      <button
                        key={color.name}
                        onClick={() => setSelectedColor(color.name)}
                        className={`w-8 h-8 rounded-full border-2 ${
                          selectedColor === color.name ? 'border-gray-900' : 'border-gray-300'
                        } ${color.class}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setShowCreateCollection(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleCreateCollection}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Criar Coleção
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Componente do Card de Favorito
interface FavoriteCardProps {
  favorite: FavoriteItem;
  viewMode: 'grid' | 'list';
  collections: FavoriteCollection[];
  onRemove: (id: string, title: string) => void;
  onMove: (favoriteId: string, collectionId: string) => void;
}

function FavoriteCard({ favorite, viewMode, collections, onRemove, onMove }: FavoriteCardProps) {
  const [showMoveMenu, setShowMoveMenu] = useState(false);
  
  const currentCollection = collections.find(col => col.id === favorite.collection);
  
  if (viewMode === 'list') {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-2">
              <Link
                href={favorite.url}
                className="text-lg font-medium text-gray-900 hover:text-blue-600 transition-colors truncate"
              >
                {favorite.title}
              </Link>
              <ExternalLink className="w-4 h-4 text-gray-400 flex-shrink-0" />
            </div>
            
            <p className="text-gray-600 text-sm mb-2 line-clamp-2">{favorite.description}</p>
            
            <div className="flex items-center gap-4 text-xs text-gray-500">
              <span className="bg-gray-100 px-2 py-1 rounded">{favorite.category}</span>
              {currentCollection && (
                <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded">
                  {currentCollection.name}
                </span>
              )}
              <span>{new Date(favorite.addedAt).toLocaleDateString()}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2 ml-4">
            <div className="relative">
              <button
                onClick={() => setShowMoveMenu(!showMoveMenu)}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <MoreVertical className="w-4 h-4" />
              </button>
              
              {showMoveMenu && (
                <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-48">
                  <div className="p-2">
                    <p className="text-xs text-gray-500 mb-2">Mover para:</p>
                    {collections.map(collection => (
                      <button
                        key={collection.id}
                        onClick={() => {
                          onMove(favorite.id, collection.id);
                          setShowMoveMenu(false);
                          toast.success(`Movido para "${collection.name}"`);
                        }}
                        disabled={collection.id === favorite.collection}
                        className={`w-full text-left px-3 py-2 text-sm rounded hover:bg-gray-50 transition-colors ${
                          collection.id === favorite.collection ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700'
                        }`}
                      >
                        {collection.name}
                      </button>
                    ))}
                  </div>
                  <div className="border-t border-gray-200 p-2">
                    <button
                      onClick={() => {
                        onRemove(favorite.id, favorite.title);
                        setShowMoveMenu(false);
                      }}
                      className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded transition-colors"
                    >
                      Remover
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0">
          <Link
            href={favorite.url}
            className="text-lg font-medium text-gray-900 hover:text-blue-600 transition-colors line-clamp-2 mb-2 block"
          >
            {favorite.title}
          </Link>
        </div>
        
        <div className="relative ml-2">
          <button
            onClick={() => setShowMoveMenu(!showMoveMenu)}
            className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <MoreVertical className="w-4 h-4" />
          </button>
          
          {showMoveMenu && (
            <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-48">
              <div className="p-2">
                <p className="text-xs text-gray-500 mb-2">Mover para:</p>
                {collections.map(collection => (
                  <button
                    key={collection.id}
                    onClick={() => {
                      onMove(favorite.id, collection.id);
                      setShowMoveMenu(false);
                      toast.success(`Movido para "${collection.name}"`);
                    }}
                    disabled={collection.id === favorite.collection}
                    className={`w-full text-left px-3 py-2 text-sm rounded hover:bg-gray-50 transition-colors ${
                      collection.id === favorite.collection ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700'
                    }`}
                  >
                    {collection.name}
                  </button>
                ))}
              </div>
              <div className="border-t border-gray-200 p-2">
                <button
                  onClick={() => {
                    onRemove(favorite.id, favorite.title);
                    setShowMoveMenu(false);
                  }}
                  className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded transition-colors"
                >
                  Remover
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <p className="text-gray-600 text-sm mb-4 line-clamp-3">{favorite.description}</p>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
            {favorite.category}
          </span>
          {currentCollection && (
            <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">
              {currentCollection.name}
            </span>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500">
            {new Date(favorite.addedAt).toLocaleDateString()}
          </span>
          <Link
            href={favorite.url}
            className="text-blue-600 hover:text-blue-700 transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
          </Link>
        </div>
      </div>
      
      {favorite.tags.length > 0 && (
        <div className="mt-3 pt-3 border-t border-gray-100">
          <div className="flex flex-wrap gap-1">
            {favorite.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="bg-gray-50 text-gray-600 px-2 py-1 rounded text-xs"
              >
                #{tag}
              </span>
            ))}
            {favorite.tags.length > 3 && (
              <span className="text-gray-400 text-xs">+{favorite.tags.length - 3}</span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}