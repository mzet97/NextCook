import { useState, useEffect, useCallback } from 'react';

interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

interface FetchOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: Record<string, string>;
  body?: unknown;
}

/**
 * Hook personalizado para fazer requisições HTTP
 * @param url - URL para fazer a requisição
 * @param options - Opções da requisição (método, headers, body)
 * @returns Estado da requisição com data, loading e error
 */
export function useFetch<T = unknown>(
  url: string,
  options?: FetchOptions
): FetchState<T> & { refetch: () => void } {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(url, {
        method: options?.method || 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
        body: options?.body ? JSON.stringify(options.body) : undefined,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
    } finally {
      setLoading(false);
    }
  }, [url, options?.method, options?.body, options?.headers]);

  useEffect(() => {
    if (url) {
      fetchData();
    }
  }, [fetchData, url]);

  const refetch = () => {
    fetchData();
  };

  return { data, loading, error, refetch };
}

// Exemplo de uso:
// const { data, loading, error, refetch } = useFetch('/api/users');
// const { data, loading, error } = useFetch('/api/users', {
//   method: 'POST',
//   body: { name: 'John', email: 'john@example.com' }
// });