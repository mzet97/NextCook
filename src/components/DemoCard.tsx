import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { DemoCardProps } from '@/types';

function DemoCard({ title, description, icon, href, color }: DemoCardProps) {
  const t = useTranslations('common');
  const colorClasses = {
    blue: 'from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700',
    green: 'from-green-500 to-green-600 hover:from-green-600 hover:to-green-700',
    purple: 'from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700',
    pink: 'from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700',
    indigo: 'from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700',
    yellow: 'from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700',
  };

  const borderClasses = {
    blue: 'border-blue-200 dark:border-blue-800 hover:border-blue-300 dark:hover:border-blue-700',
    green: 'border-green-200 dark:border-green-800 hover:border-green-300 dark:hover:border-green-700',
    purple: 'border-purple-200 dark:border-purple-800 hover:border-purple-300 dark:hover:border-purple-700',
    pink: 'border-pink-200 dark:border-pink-800 hover:border-pink-300 dark:hover:border-pink-700',
    indigo: 'border-indigo-200 dark:border-indigo-800 hover:border-indigo-300 dark:hover:border-indigo-700',
    yellow: 'border-yellow-200 dark:border-yellow-800 hover:border-yellow-300 dark:hover:border-yellow-700',
  };

  return (
    <Link href={href} className="group block">
      <div className={`card border-2 transition-all duration-300 hover:scale-105 hover:shadow-xl ${borderClasses[color as keyof typeof borderClasses] || borderClasses.blue}`}>
        {/* Icon with gradient background */}
        <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${colorClasses[color as keyof typeof colorClasses] || colorClasses.blue} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
          <span className="text-2xl text-white">{icon}</span>
        </div>
        
        {/* Content */}
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
            {title}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
            {description}
          </p>
        </div>
        
        {/* Arrow indicator */}
        <div className="mt-4 flex items-center text-blue-600 dark:text-blue-400 text-sm font-medium group-hover:translate-x-1 transition-transform duration-200">
          <span>{t('explore')}</span>
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  );
}

// Exports
export default DemoCard;
export { DemoCard };