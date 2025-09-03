'use client';

import { useState } from 'react';
import { Heart, Loader2 } from 'lucide-react';
import { useFavorites, FavoriteItem } from '@/hooks/useFavorites';
import { toast } from 'sonner';

interface FavoriteButtonProps {
  item: Omit<FavoriteItem, 'id' | 'addedAt'>;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'outline' | 'ghost';
  showLabel?: boolean;
  className?: string;
}

export default function FavoriteButton({
  item,
  size = 'md',
  variant = 'default',
  showLabel = false,
  className = ''
}: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite, isLoading } = useFavorites();
  const [isToggling, setIsToggling] = useState(false);
  
  const favorited = isFavorite(item.url);

  const handleToggle = async () => {
    if (isLoading || isToggling) return;
    
    setIsToggling(true);
    
    try {
      const added = toggleFavorite(item);
      
      if (added) {
        toast.success('Adicionado aos favoritos!', {
          description: item.title,
          duration: 2000
        });
      } else {
        toast.success('Removido dos favoritos', {
          description: item.title,
          duration: 2000
        });
      }
    } catch {
      toast.error('Erro ao atualizar favoritos');
    } finally {
      setIsToggling(false);
    }
  };

  // Tamanhos
  const sizeClasses = {
    sm: 'w-6 h-6 p-1',
    md: 'w-8 h-8 p-1.5',
    lg: 'w-10 h-10 p-2'
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  // Variantes
  const variantClasses = {
    default: favorited
      ? 'bg-red-100 text-red-600 hover:bg-red-200 border border-red-200'
      : 'bg-gray-100 text-gray-600 hover:bg-gray-200 border border-gray-200',
    outline: favorited
      ? 'border-2 border-red-500 text-red-600 hover:bg-red-50'
      : 'border-2 border-gray-300 text-gray-600 hover:bg-gray-50',
    ghost: favorited
      ? 'text-red-600 hover:bg-red-50'
      : 'text-gray-600 hover:bg-gray-100'
  };

  const baseClasses = `
    inline-flex items-center justify-center
    rounded-lg transition-all duration-200
    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
    ${sizeClasses[size]}
    ${variantClasses[variant]}
    ${className}
  `;

  if (showLabel) {
    return (
      <button
        onClick={handleToggle}
        disabled={isLoading || isToggling}
        className={`
          ${baseClasses}
          px-3 py-2 gap-2 w-auto h-auto
          ${size === 'sm' ? 'text-sm' : size === 'lg' ? 'text-lg' : 'text-base'}
        `}
        title={favorited ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
      >
        {isToggling ? (
          <Loader2 className={`${iconSizes[size]} animate-spin`} />
        ) : (
          <Heart 
            className={`${iconSizes[size]} ${favorited ? 'fill-current' : ''}`} 
          />
        )}
        {favorited ? 'Favoritado' : 'Favoritar'}
      </button>
    );
  }

  return (
    <button
      onClick={handleToggle}
      disabled={isLoading || isToggling}
      className={baseClasses}
      title={favorited ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
    >
      {isToggling ? (
        <Loader2 className={`${iconSizes[size]} animate-spin`} />
      ) : (
        <Heart 
          className={`${iconSizes[size]} ${favorited ? 'fill-current' : ''}`} 
        />
      )}
    </button>
  );
}

// Componente de contador de favoritos
export function FavoriteCounter({ className = '' }: { className?: string }) {
  const { stats } = useFavorites();
  
  return (
    <div className={`inline-flex items-center gap-1 text-sm text-gray-600 ${className}`}>
      <Heart className="w-4 h-4" />
      <span>{stats.totalFavorites}</span>
    </div>
  );
}

// Componente de badge de favorito
export function FavoriteBadge({ 
  item, 
  className = '' 
}: { 
  item: Omit<FavoriteItem, 'id' | 'addedAt'>;
  className?: string;
}) {
  const { isFavorite } = useFavorites();
  
  if (!isFavorite(item.url)) return null;
  
  return (
    <div className={`
      inline-flex items-center gap-1 px-2 py-1 
      bg-red-100 text-red-700 text-xs font-medium 
      rounded-full border border-red-200
      ${className}
    `}>
      <Heart className="w-3 h-3 fill-current" />
      Favorito
    </div>
  );
}