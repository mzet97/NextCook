'use client';

import { useTranslations } from 'next-intl';

export default function FooterContent() {
  const t = useTranslations('footer');
  
  return (
    <div className="text-center text-gray-600 dark:text-gray-400">
      <p className="text-sm">
        {t('copyright')}
      </p>
      <p className="text-xs mt-2">
        {t('technologies')}
      </p>
    </div>
  );
}