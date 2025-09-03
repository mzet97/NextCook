import { StatsCardProps } from '@/types';

function StatsCard({ title, value, icon, color, trend }: StatsCardProps) {
  const colorClasses = {
    blue: 'text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900',
    green: 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900',
    purple: 'text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-900',
    pink: 'text-pink-600 dark:text-pink-400 bg-pink-100 dark:bg-pink-900',
    indigo: 'text-indigo-600 dark:text-indigo-400 bg-indigo-100 dark:bg-indigo-900',
    yellow: 'text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900',
    red: 'text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900',
  };

  const iconColorClasses = {
    blue: 'text-blue-600 dark:text-blue-400',
    green: 'text-green-600 dark:text-green-400',
    purple: 'text-purple-600 dark:text-purple-400',
    pink: 'text-pink-600 dark:text-pink-400',
    indigo: 'text-indigo-600 dark:text-indigo-400',
    yellow: 'text-yellow-600 dark:text-yellow-400',
    red: 'text-red-600 dark:text-red-400',
  };

  return (
    <div className="card hover:shadow-lg transition-all duration-300">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
            {title}
          </p>
          <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            {typeof value === 'number' ? value.toLocaleString() : value}
          </p>
          
          {/* Trend indicator */}
          {trend && (
            <div className="flex items-center mt-2">
              <div className={`flex items-center text-sm font-medium ${
                trend.isPositive 
                  ? 'text-green-600 dark:text-green-400' 
                  : 'text-red-600 dark:text-red-400'
              }`}>
                <svg 
                  className={`w-4 h-4 mr-1 ${
                    trend.isPositive ? 'rotate-0' : 'rotate-180'
                  }`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M7 17l9.2-9.2M17 17V7H7" 
                  />
                </svg>
                <span>
                  {trend.isPositive ? '+' : ''}{trend.value}%
                </span>
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                vs. último período
              </span>
            </div>
          )}
        </div>
        
        {/* Icon */}
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${colorClasses[color as keyof typeof colorClasses] || colorClasses.blue}`}>
          <span className={`text-xl ${iconColorClasses[color as keyof typeof iconColorClasses] || iconColorClasses.blue}`}>
            {icon}
          </span>
        </div>
      </div>
    </div>
  );
}

// Exports
export default StatsCard;
export { StatsCard };