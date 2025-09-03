'use client';

import { useState } from 'react';
import { Copy, Check, ExternalLink, BookOpen } from 'lucide-react';
import CodeBlock from './CodeBlock';

interface CodeSnippetProps {
  title: string;
  description: string;
  code: string;
  language: string;
  category?: string;
  difficulty?: 'Básico' | 'Intermediário' | 'Avançado';
  tags?: string[];
  docsUrl?: string;
  usageExample?: string;
  tips?: string[];
  relatedSnippets?: string[];
}

export default function CodeSnippet({
  title,
  description,
  code,
  language,
  category = 'Geral',
  difficulty = 'Básico',
  tags = [],
  docsUrl,
  usageExample,
  tips = [],
  relatedSnippets = []
}: CodeSnippetProps) {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'code' | 'usage' | 'tips'>('code');

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Falha ao copiar código:', err);
    }
  };

  const getDifficultyColor = (level: string) => {
    switch (level) {
      case 'Básico':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'Intermediário':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'Avançado':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              {title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
              {description}
            </p>
          </div>
          
          <div className="flex items-center gap-2 ml-4">
            <button
              onClick={copyToClipboard}
              className="flex items-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm font-medium"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  Copiado!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  Copiar
                </>
              )}
            </button>
            
            {docsUrl && (
              <a
                href={docsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors text-sm font-medium"
              >
                <ExternalLink className="w-4 h-4" />
                Docs
              </a>
            )}
          </div>
        </div>
        
        {/* Tags and Metadata */}
        <div className="flex flex-wrap items-center gap-2">
          <span className={`px-2 py-1 text-xs rounded-full font-medium ${getDifficultyColor(difficulty)}`}>
            {difficulty}
          </span>
          
          <span className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full font-medium">
            {category}
          </span>
          
          <span className="px-2 py-1 text-xs bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 rounded-full font-medium">
            {language}
          </span>
          
          {tags.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 text-xs bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300 rounded-full font-medium"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="flex">
          <button
            onClick={() => setActiveTab('code')}
            className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'code'
                ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            Código
          </button>
          
          {usageExample && (
            <button
              onClick={() => setActiveTab('usage')}
              className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'usage'
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              Como Usar
            </button>
          )}
          
          {tips.length > 0 && (
            <button
              onClick={() => setActiveTab('tips')}
              className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'tips'
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              Dicas
            </button>
          )}
        </nav>
      </div>

      {/* Content */}
      <div className="p-0">
        {activeTab === 'code' && (
          <CodeBlock language={language} code={code} />
        )}
        
        {activeTab === 'usage' && usageExample && (
          <div className="p-6">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              Como usar este código
            </h4>
            <div className="prose dark:prose-invert max-w-none">
              <CodeBlock language={language} code={usageExample} />
            </div>
          </div>
        )}
        
        {activeTab === 'tips' && tips.length > 0 && (
          <div className="p-6">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              💡 Dicas e Melhores Práticas
            </h4>
            <ul className="space-y-3">
              {tips.map((tip, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center text-sm font-medium">
                    {index + 1}
                  </span>
                  <span className="text-gray-700 dark:text-gray-300 text-sm">
                    {tip}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Related Snippets */}
      {relatedSnippets.length > 0 && (
        <div className="p-6 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
          <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
            📚 Snippets Relacionados
          </h4>
          <div className="flex flex-wrap gap-2">
            {relatedSnippets.map((snippet, index) => (
              <span
                key={index}
                className="px-3 py-1 text-xs bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors"
              >
                {snippet}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

CodeSnippet.displayName = 'CodeSnippet';