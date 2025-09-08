'use client';

import { useState } from 'react';
import { CodeBlock } from '@/components/CodeBlock';
import { DemoCardStatic } from '@/components/DemoCardStatic';
import { DemoSection } from '@/components/DemoSection';
import { 
  PlayIcon, 
  EyeIcon, 
  DevicePhoneMobileIcon,
  ComputerDesktopIcon,
  CameraIcon,
  BugAntIcon
} from '@heroicons/react/24/outline';

const playwrightFeatures = [
  {
    name: 'Cross-Browser Testing',
    description: 'Testes em Chromium, Firefox e WebKit',
    icon: ComputerDesktopIcon,
    example: `// playwright.config.ts
export default defineConfig({
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});`
  },
  {
    name: 'Mobile Testing',
    description: 'Simulação de dispositivos móveis',
    icon: DevicePhoneMobileIcon,
    example: `// Mobile device testing
test('mobile navigation', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 667 });
  await page.goto('/');
  
  // Test mobile menu
  await page.getByRole('button', { name: /menu/i }).click();
  await expect(page.getByRole('navigation')).toBeVisible();
});`
  },
  {
    name: 'Visual Testing',
    description: 'Screenshots e comparação visual',
    icon: CameraIcon,
    example: `// Visual regression testing
test('visual comparison', async ({ page }) => {
  await page.goto('/dashboard');
  
  // Full page screenshot
  await expect(page).toHaveScreenshot('dashboard.png');
  
  // Element screenshot
  await expect(page.getByTestId('chart')).toHaveScreenshot('chart.png');
});`
  },
  {
    name: 'Auto-waiting',
    description: 'Espera automática por elementos',
    icon: EyeIcon,
    example: `// Auto-waiting for elements
test('auto-wait example', async ({ page }) => {
  await page.goto('/api-data');
  
  // Automatically waits for element to be visible
  await page.getByText('Loading...').waitFor({ state: 'hidden' });
  await expect(page.getByTestId('data-table')).toBeVisible();
  
  // Waits for network request to complete
  await page.getByRole('button', { name: 'Load More' }).click();
  await page.waitForResponse('/api/data?page=2');
});`
  }
];

const testExamples = [
  {
    title: 'Teste de Navegação',
    description: 'Testando fluxos de navegação entre páginas',
    code: `import { test, expect } from '@playwright/test';

test.describe('Navigation Flow', () => {
  test('should navigate through main sections', async ({ page }) => {
    await page.goto('/');
    
    // Test homepage
    await expect(page).toHaveTitle(/React Hook Next/);
    await expect(page.getByRole('heading', { name: /React Hook Next/i })).toBeVisible();
    
    // Navigate to Hooks section
    await page.getByRole('link', { name: /hooks/i }).first().click();
    await expect(page).toHaveURL(/\/hooks/);
    await expect(page.getByRole('heading', { name: /React Hooks/i })).toBeVisible();
    
    // Navigate to specific hook
    await page.getByRole('link', { name: /useState/i }).click();
    await expect(page).toHaveURL(/\/hooks\/use-state/);
    
    // Test interactive demo
    const incrementButton = page.getByRole('button', { name: /increment/i });
    await incrementButton.click();
    await expect(page.getByText('Count: 1')).toBeVisible();
    
    // Navigate back using browser back button
    await page.goBack();
    await expect(page).toHaveURL(/\/hooks$/);
  });
  
  test('should handle 404 pages', async ({ page }) => {
    await page.goto('/non-existent-page');
    await expect(page.getByText('404')).toBeVisible();
    await expect(page.getByText('Page Not Found')).toBeVisible();
    
    // Test return home link
    await page.getByRole('link', { name: /home/i }).click();
    await expect(page).toHaveURL('/');
  });
});`
  },
  {
    title: 'Teste de Formulários',
    description: 'Testando validação e submissão de formulários',
    code: `import { test, expect } from '@playwright/test';

test.describe('Form Testing', () => {
  test('should validate form inputs', async ({ page }) => {
    await page.goto('/forms/react-hook-form');
    
    // Test form validation
    const submitButton = page.getByRole('button', { name: /submit/i });
    await submitButton.click();
    
    // Check for validation errors
    await expect(page.getByText('Name is required')).toBeVisible();
    await expect(page.getByText('Email is required')).toBeVisible();
    
    // Fill form with valid data
    await page.getByLabel('Name').fill('John Doe');
    await page.getByLabel('Email').fill('john@example.com');
    await page.getByLabel('Age').fill('25');
    
    // Submit form
    await submitButton.click();
    
    // Check success message
    await expect(page.getByText('Form submitted successfully')).toBeVisible();
  });
  
  test('should handle file upload', async ({ page }) => {
    await page.goto('/forms/file-upload');
    
    // Upload file
    const fileInput = page.getByLabel('Upload file');
    await fileInput.setInputFiles({
      name: 'test.txt',
      mimeType: 'text/plain',
      buffer: Buffer.from('Hello World')
    });
    
    // Verify file upload
    await expect(page.getByText('test.txt')).toBeVisible();
    await expect(page.getByText('11 bytes')).toBeVisible();
    
    // Submit form
    await page.getByRole('button', { name: /upload/i }).click();
    await expect(page.getByText('File uploaded successfully')).toBeVisible();
  });
});`
  },
  {
    title: 'Teste de API e Estado',
    description: 'Testando integração com APIs e gerenciamento de estado',
    code: `import { test, expect } from '@playwright/test';

test.describe('API Integration', () => {
  test('should load and display data from API', async ({ page }) => {
    // Mock API response
    await page.route('/api/users', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([
          { id: 1, name: 'John Doe', email: 'john@example.com' },
          { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
        ])
      });
    });
    
    await page.goto('/users');
    
    // Wait for data to load
    await expect(page.getByTestId('loading')).toBeHidden();
    
    // Verify data display
    await expect(page.getByText('John Doe')).toBeVisible();
    await expect(page.getByText('jane@example.com')).toBeVisible();
    
    // Test search functionality
    await page.getByPlaceholder('Search users...').fill('John');
    await expect(page.getByText('John Doe')).toBeVisible();
    await expect(page.getByText('Jane Smith')).toBeHidden();
  });
  
  test('should handle API errors gracefully', async ({ page }) => {
    // Mock API error
    await page.route('/api/users', async route => {
      await route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Internal Server Error' })
      });
    });
    
    await page.goto('/users');
    
    // Verify error handling
    await expect(page.getByText('Failed to load users')).toBeVisible();
    await expect(page.getByRole('button', { name: /retry/i })).toBeVisible();
    
    // Test retry functionality
    await page.route('/api/users', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([{ id: 1, name: 'John Doe' }])
      });
    });
    
    await page.getByRole('button', { name: /retry/i }).click();
    await expect(page.getByText('John Doe')).toBeVisible();
  });
});`
  },
  {
    title: 'Teste de Performance',
    description: 'Testando métricas de performance e carregamento',
    code: `import { test, expect } from '@playwright/test';

test.describe('Performance Testing', () => {
  test('should meet performance benchmarks', async ({ page }) => {
    // Start performance monitoring
    await page.goto('/', { waitUntil: 'networkidle' });
    
    // Measure page load time
    const performanceMetrics = await page.evaluate(() => {
      const navigation = performance.getEntriesByType('navigation')[0];
      return {
        loadTime: navigation.loadEventEnd - navigation.loadEventStart,
        domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
        firstPaint: performance.getEntriesByName('first-paint')[0]?.startTime || 0
      };
    });
    
    // Assert performance thresholds
    expect(performanceMetrics.loadTime).toBeLessThan(3000); // 3 seconds
    expect(performanceMetrics.domContentLoaded).toBeLessThan(2000); // 2 seconds
    
    // Test Core Web Vitals
    const webVitals = await page.evaluate(() => {
      return new Promise((resolve) => {
        new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const vitals = {};
          
          entries.forEach((entry) => {
            if (entry.name === 'LCP') vitals.lcp = entry.value;
            if (entry.name === 'FID') vitals.fid = entry.value;
            if (entry.name === 'CLS') vitals.cls = entry.value;
          });
          
          resolve(vitals);
        }).observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] });
        
        // Fallback timeout
        setTimeout(() => resolve({}), 5000);
      });
    });
    
    // Assert Web Vitals thresholds
    if (webVitals.lcp) expect(webVitals.lcp).toBeLessThan(2500);
    if (webVitals.fid) expect(webVitals.fid).toBeLessThan(100);
    if (webVitals.cls) expect(webVitals.cls).toBeLessThan(0.1);
  });
  
  test('should handle large datasets efficiently', async ({ page }) => {
    await page.goto('/performance/large-list');
    
    // Measure rendering time for large list
    const startTime = Date.now();
    await page.getByTestId('large-list').waitFor();
    const renderTime = Date.now() - startTime;
    
    expect(renderTime).toBeLessThan(1000); // Should render in under 1 second
    
    // Test virtual scrolling
    await page.getByTestId('large-list').scroll({ top: 10000 });
    await expect(page.getByText('Item 500')).toBeVisible();
    
    // Verify memory usage doesn't grow excessively
    const memoryUsage = await page.evaluate(() => {
      return (performance as any).memory?.usedJSHeapSize || 0;
    });
    
    expect(memoryUsage).toBeLessThan(50 * 1024 * 1024); // Less than 50MB
  });
});`
  }
];

export default function PlaywrightPage() {
  const [selectedExample, setSelectedExample] = useState(0);
  const [runningTest, setRunningTest] = useState(false);

  const runTestDemo = async () => {
    setRunningTest(true);
    await new Promise(resolve => setTimeout(resolve, 3000));
    setRunningTest(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <PlayIcon className="h-12 w-12 text-purple-600 dark:text-purple-400 mr-4" />
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              Playwright E2E Testing
            </h1>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Framework moderno para testes end-to-end com suporte cross-browser, mobile e visual testing
          </p>
        </div>

        {/* Playwright Features */}
        <DemoSection title="Recursos do Playwright" description="Funcionalidades avançadas para testes E2E">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-1.5 mb-8">
            {playwrightFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <DemoCardStatic key={feature.name} title={feature.name} description={feature.description}>
                  <div className="space-y-4">
                    <Icon className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                    <CodeBlock
                      language="typescript"
                      code={feature.example}
                      maxHeight="200px"
                    />
                  </div>
                </DemoCardStatic>
              );
            })}
          </div>
        </DemoSection>

        {/* Configuration */}
        <DemoSection title="Configuração" description="Setup do Playwright para o projeto">
          <div className="grid md:grid-cols-2 gap-1.5">
            <DemoCardStatic title="playwright.config.ts" description="Configuração principal">
              <CodeBlock
                language="typescript"
                code={`import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
  ],

  webServer: {
    command: 'pnpm dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
});`}
              />
            </DemoCardStatic>

            <DemoCardStatic title="Estrutura de Testes" description="Organização dos arquivos">
              <CodeBlock
                language="bash"
                code={`tests/
├── e2e/
│   ├── homepage.spec.ts
│   ├── navigation.spec.ts
│   ├── forms.spec.ts
│   ├── api-integration.spec.ts
│   └── performance.spec.ts
├── fixtures/
│   ├── test-data.json
│   └── mock-responses.ts
└── utils/
    ├── test-helpers.ts
    └── page-objects.ts

# Executar testes
npm run test:e2e

# Executar com UI
npm run test:e2e:ui

# Executar com browser visível
npm run test:e2e:headed

# Gerar relatório
npx playwright show-report`}
              />
            </DemoCardStatic>
          </div>
        </DemoSection>

        {/* Test Examples */}
        <DemoSection title="Exemplos Práticos" description="Casos de uso reais com Playwright">
          <div className="mb-6">
            <div className="flex flex-wrap gap-2 mb-4">
              {testExamples.map((example, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedExample(index)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedExample === index
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                  }`}
                >
                  {example.title}
                </button>
              ))}
            </div>
            
            <DemoCardStatic 
              title={testExamples[selectedExample].title} 
              description={testExamples[selectedExample].description}
            >
              <CodeBlock
                language="typescript"
                code={testExamples[selectedExample].code}
              />
            </DemoCardStatic>
          </div>
        </DemoSection>

        {/* Test Runner Demo */}
        <DemoSection title="Executar Testes E2E" description="Demonstração do Playwright em ação">
          <DemoCardStatic title="E2E Test Runner" description="Simule a execução de testes end-to-end">
            <div className="space-y-4">
              <button
                onClick={runTestDemo}
                disabled={runningTest}
                className="flex items-center px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <PlayIcon className="h-5 w-5 mr-2" />
                {runningTest ? 'Executando...' : 'Executar Testes E2E'}
              </button>
              
              {runningTest && (
                <div className="bg-black text-green-400 p-4 rounded-lg font-mono text-sm">
                  <div className="animate-pulse">
                    <div>Running 8 tests using 3 workers</div>
                    <div className="mt-2">
                      <div>✓ [chromium] › homepage.spec.ts:3:1 › should load homepage (2.1s)</div>
                      <div>✓ [firefox] › navigation.spec.ts:5:1 › should navigate sections (1.8s)</div>
                      <div>✓ [webkit] › forms.spec.ts:7:1 › should validate form (3.2s)</div>
                      <div>✓ [Mobile Chrome] › responsive.spec.ts:4:1 › mobile layout (2.5s)</div>
                    </div>
                    <div className="mt-2 text-yellow-400">Generating HTML report...</div>
                  </div>
                </div>
              )}
              
              {!runningTest && (
                <div className="bg-black text-green-400 p-4 rounded-lg font-mono text-sm">
                  <div>✓ All tests passed!</div>
                  <div className="mt-2">
                    <div>8 passed (15.6s)</div>
                    <div>✓ [chromium] › 3 tests (6.2s)</div>
                    <div>✓ [firefox] › 2 tests (4.1s)</div>
                    <div>✓ [webkit] › 2 tests (3.8s)</div>
                    <div>✓ [Mobile Chrome] › 1 test (1.5s)</div>
                  </div>
                  <div className="mt-2 text-blue-400">HTML report: playwright-report/index.html</div>
                  <div className="text-yellow-400">Screenshots: test-results/</div>
                </div>
              )}
            </div>
          </DemoCardStatic>
        </DemoSection>

        {/* Browser Support */}
        <DemoSection title="Suporte a Browsers" description="Testes cross-browser automatizados">
          <div className="grid md:grid-cols-3 gap-1.5">
            <DemoCardStatic title="Desktop Browsers" description="Suporte completo para desktop">
              <div className="space-y-3">
                {[
                  { name: 'Chromium', version: '140.0.7339.16', status: '✅' },
                  { name: 'Firefox', version: '141.0', status: '✅' },
                  { name: 'WebKit (Safari)', version: '26.0', status: '✅' },
                  { name: 'Edge', version: 'Latest', status: '✅' }
                ].map((browser) => (
                  <div key={browser.name} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded">
                    <div>
                      <div className="font-medium">{browser.name}</div>
                      <div className="text-sm text-gray-500">{browser.version}</div>
                    </div>
                    <div className="text-lg">{browser.status}</div>
                  </div>
                ))}
              </div>
            </DemoCardStatic>

            <DemoCardStatic title="Mobile Devices" description="Simulação de dispositivos móveis">
              <div className="space-y-3">
                {[
                  { name: 'iPhone 12', viewport: '390×844', status: '✅' },
                  { name: 'Pixel 5', viewport: '393×851', status: '✅' },
                  { name: 'iPad', viewport: '768×1024', status: '✅' },
                  { name: 'Galaxy S21', viewport: '384×854', status: '✅' }
                ].map((device) => (
                  <div key={device.name} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded">
                    <div>
                      <div className="font-medium">{device.name}</div>
                      <div className="text-sm text-gray-500">{device.viewport}</div>
                    </div>
                    <div className="text-lg">{device.status}</div>
                  </div>
                ))}
              </div>
            </DemoCardStatic>

            <DemoCardStatic title="Features Avançadas" description="Recursos especiais do Playwright">
              <div className="space-y-3">
                {[
                  { name: 'Auto-waiting', description: 'Espera automática', status: '✅' },
                  { name: 'Screenshots', description: 'Capturas de tela', status: '✅' },
                  { name: 'Video Recording', description: 'Gravação de vídeo', status: '✅' },
                  { name: 'Network Mocking', description: 'Mock de requisições', status: '✅' }
                ].map((feature) => (
                  <div key={feature.name} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded">
                    <div>
                      <div className="font-medium">{feature.name}</div>
                      <div className="text-sm text-gray-500">{feature.description}</div>
                    </div>
                    <div className="text-lg">{feature.status}</div>
                  </div>
                ))}
              </div>
            </DemoCardStatic>
          </div>
        </DemoSection>
      </div>
    </div>
  );
}