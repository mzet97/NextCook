import { ReactNode } from 'react';
import FavoriteButton from './FavoriteButton';
import { usePathname } from 'next/navigation';

interface DemoCardStaticProps {
  title: string;
  description: string;
  icon?: string;
  color?: string;
  children?: ReactNode;
  category?: string;
  tags?: string[];
  showFavorite?: boolean;
}

function DemoCardStatic({ 
  title, 
  description, 
  icon, 
  color = 'blue', 
  children, 
  category = 'Geral',
  tags = [],
  showFavorite = true 
}: DemoCardStaticProps) {
  const pathname = usePathname();
  const colorClasses = {
    blue: 'from-blue-500 to-blue-600',
    green: 'from-green-500 to-green-600',
    purple: 'from-purple-500 to-purple-600',
    pink: 'from-pink-500 to-pink-600',
    indigo: 'from-indigo-500 to-indigo-600',
    yellow: 'from-yellow-500 to-yellow-600',
  };

  const borderClasses = {
    blue: 'border-blue-200 dark:border-blue-800',
    green: 'border-green-200 dark:border-green-800',
    purple: 'border-purple-200 dark:border-purple-800',
    pink: 'border-pink-200 dark:border-pink-800',
    indigo: 'border-indigo-200 dark:border-indigo-800',
    yellow: 'border-yellow-200 dark:border-yellow-800',
  };

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg border-2 transition-all duration-300 ${borderClasses[color as keyof typeof borderClasses] || borderClasses.blue} relative group`}>
      {/* Favorite Button */}
      {showFavorite && (
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <FavoriteButton
            item={{
              title,
              description,
              url: pathname,
              category,
              tags,
              collection: 'default'
            }}
            size="sm"
            variant="ghost"
          />
        </div>
      )}
      
      {/* Icon with gradient background */}
      {icon && (
        <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${colorClasses[color as keyof typeof colorClasses] || colorClasses.blue} flex items-center justify-center mb-4`}>
          <span className="text-2xl text-white">{icon}</span>
        </div>
      )}
      
      {/* Content */}
      <div className="space-y-2 mb-4">
        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
          {title}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
          {description}
        </p>
      </div>
      
      {/* Children content */}
      {children && (
        <div className="mt-4">
          {children}
        </div>
      )}
    </div>
  );
}

// Exports
export default DemoCardStatic;
export { DemoCardStatic };