import { ReactNode } from 'react';

interface DemoSectionProps {
  title: string;
  description: string;
  children: ReactNode;
}

function DemoSection({ title, description, children }: DemoSectionProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-xl transition-shadow duration-300">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          {title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300">
          {description}
        </p>
      </div>
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );
}

// Exports
export default DemoSection;
export { DemoSection };