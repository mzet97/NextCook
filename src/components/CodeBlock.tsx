'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { CodeBlockProps } from '@/types';

function CodeBlock({ 
  code, 
  language, 
  title, 
  showLineNumbers = true,
  children 
}: CodeBlockProps & { children?: string }) {
  const [copied, setCopied] = useState(false);
  const t = useTranslations('common');

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(codeContent || '');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  // Usar children se code não estiver definido
  const codeContent = code || children;
  
  // Validação para garantir que temos código para exibir
  if (!codeContent) {
    return (
      <div className="bg-gray-900 dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg p-4">
        <div className="text-gray-400 text-center">
          {t('codeNotAvailable')}
        </div>
      </div>
    );
  }

  const lines = codeContent.split('\n');

  return (
    <div className="bg-gray-900 dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg">
      {/* Header */}
      {title && (
        <div className="flex items-center justify-between px-4 py-2 bg-gray-800 dark:bg-gray-700 border-b border-gray-700 dark:border-gray-600">
          <div className="flex items-center space-x-2">
            <div className="flex space-x-1">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <span className="text-sm font-medium text-gray-300">{title}</span>
            <span className="text-xs text-gray-500 bg-gray-700 px-2 py-1 rounded">
              {language}
            </span>
          </div>
          <button
            onClick={copyToClipboard}
            className="flex items-center space-x-1 text-gray-400 hover:text-white transition-colors duration-200 text-sm"
          >
            {copied ? (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>{t('copied')}</span>
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                <span>{t('copy')}</span>
              </>
            )}
          </button>
        </div>
      )}

      {/* Code Content */}
      <div className="relative">
        <pre className="overflow-x-auto p-4 text-sm">
          <code className="text-gray-100">
            {lines.map((line, index) => (
              <div key={index} className="flex">
                {showLineNumbers && (
                  <span className="select-none text-gray-500 text-right w-8 mr-4 flex-shrink-0">
                    {index + 1}
                  </span>
                )}
                <span className="flex-1">
                  {highlightSyntax(line, language)}
                </span>
              </div>
            ))}
          </code>
        </pre>
        
        {/* Copy button (floating) */}
        {!title && (
          <button
            onClick={copyToClipboard}
            className="absolute top-2 right-2 p-2 bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white rounded transition-colors duration-200"
            title={t('copyCode')}
          >
            {copied ? (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            )}
          </button>
        )}
      </div>
    </div>
  );
}

// Função simples de syntax highlighting
function highlightSyntax(line: string, language: string): React.ReactElement {
  if (!line.trim()) {
    return <span>&nbsp;</span>;
  }

  if (language === 'typescript' || language === 'javascript' || language === 'tsx' || language === 'jsx') {
    const tokens: React.ReactNode[] = [];
    
    // Regex patterns
    const patterns = [
      { regex: /\/\/.*$/g, className: 'text-gray-500 italic' }, // Comments
      { regex: /\b(const|let|var|function|return|if|else|for|while|import|export|from|default|interface|type|class|extends|implements|public|private|protected|static|async|await|try|catch|finally|throw|new|this|super|null|undefined|true|false)\b/g, className: 'text-blue-400' }, // Keywords
      { regex: /(['"`])((?:\\.|(?!\1)[^\\\r\n])*?)\1/g, className: 'text-green-400' }, // Strings
      { regex: /\b\d+(\.\d+)?\b/g, className: 'text-yellow-400' }, // Numbers
      { regex: /<\/?[a-zA-Z][a-zA-Z0-9]*(?:\s[^>]*)?>/g, className: 'text-red-400' }, // JSX tags
    ];
    
    // Find all matches
    const matches: Array<{ start: number; end: number; className: string; text: string }> = [];
    
    patterns.forEach(pattern => {
      const regex = new RegExp(pattern.regex.source, pattern.regex.flags);
      let match;
      while ((match = regex.exec(line)) !== null) {
        matches.push({
          start: match.index,
          end: match.index + match[0].length,
          className: pattern.className,
          text: match[0]
        });
      }
    });
    
    // Sort matches by start position
    matches.sort((a, b) => a.start - b.start);
    
    // Remove overlapping matches (keep the first one)
    const filteredMatches = [];
    for (const match of matches) {
      if (!filteredMatches.some(existing => 
        (match.start >= existing.start && match.start < existing.end) ||
        (match.end > existing.start && match.end <= existing.end)
      )) {
        filteredMatches.push(match);
      }
    }
    
    // Build the result
    let lastIndex = 0;
    filteredMatches.forEach((match, index) => {
      // Add text before the match
      if (match.start > lastIndex) {
        tokens.push(line.substring(lastIndex, match.start));
      }
      
      // Add the highlighted match
      tokens.push(
        <span key={index} className={match.className}>
          {match.text}
        </span>
      );
      
      lastIndex = match.end;
    });
    
    // Add remaining text
    if (lastIndex < line.length) {
      tokens.push(line.substring(lastIndex));
    }
    
    return <span>{tokens.length > 0 ? tokens : line}</span>;
  }
  
  return <span>{line}</span>;
}

// Exports
export default CodeBlock;
export { CodeBlock };