'use client';

import { useState } from 'react';
import Link from 'next/link';
import CodeBlock from '@/components/CodeBlock';
import DemoSection from '@/components/DemoSection';

const codeExamples = {
  basicStructure: `// Estrutura de pastas para Parallel Routes:
// app/
//   dashboard/
//     layout.tsx
//     page.tsx
//     @analytics/
//       page.tsx
//       loading.tsx
//       error.tsx
//     @team/
//       page.tsx
//       loading.tsx
//     @notifications/
//       page.tsx
//       error.tsx
//     default.tsx`,

  dashboardLayout: `// app/dashboard/layout.tsx
export default function DashboardLayout({
  children,
  analytics,
  team,
  notifications,
}: {
  children: React.ReactNode;
  analytics: React.ReactNode;
  team: React.ReactNode;
  notifications: React.ReactNode;
}) {
  return (
    <div className="dashboard-layout">
      <div className="main-content">
        {children}
      </div>
      
      <div className="sidebar">
        <div className="analytics-section">
          {analytics}
        </div>
        
        <div className="team-section">
          {team}
        </div>
        
        <div className="notifications-section">
          {notifications}
        </div>
      </div>
    </div>
  );
}`,

  analyticsSlot: `// app/dashboard/@analytics/page.tsx
export default function Analytics() {
  return (
    <div className="analytics-widget">
      <h2>Analytics</h2>
      <div className="metrics">
        <div className="metric">
          <span className="value">1,234</span>
          <span className="label">Visitors</span>
        </div>
        <div className="metric">
          <span className="value">89%</span>
          <span className="label">Conversion</span>
        </div>
      </div>
    </div>
  );
}`,

  teamSlot: `// app/dashboard/@team/page.tsx
export default function Team() {
  const teamMembers = [
    { name: 'João Silva', role: 'Developer', status: 'online' },
    { name: 'Maria Santos', role: 'Designer', status: 'away' },
    { name: 'Pedro Costa', role: 'Manager', status: 'offline' },
  ];

  return (
    <div className="team-widget">
      <h2>Team Status</h2>
      <div className="team-list">
        {teamMembers.map((member) => (
          <div key={member.name} className="team-member">
            <div className={\`status-indicator \${member.status}\`} />
            <div>
              <div className="name">{member.name}</div>
              <div className="role">{member.role}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}`,

  notificationsSlot: `// app/dashboard/@notifications/page.tsx
export default function Notifications() {
  const notifications = [
    { id: 1, message: 'New user registered', time: '2 min ago', type: 'info' },
    { id: 2, message: 'Server maintenance scheduled', time: '1 hour ago', type: 'warning' },
    { id: 3, message: 'Backup completed successfully', time: '3 hours ago', type: 'success' },
  ];

  return (
    <div className="notifications-widget">
      <h2>Notifications</h2>
      <div className="notifications-list">
        {notifications.map((notification) => (
          <div key={notification.id} className={\`notification \${notification.type}\`}>
            <div className="message">{notification.message}</div>
            <div className="time">{notification.time}</div>
          </div>
        ))}
      </div>
    </div>
  );
}`,

  defaultPage: `// app/dashboard/default.tsx
// Fallback para slots que não têm página correspondente
export default function Default() {
  return (
    <div className="default-slot">
      <p>Conteúdo padrão para este slot</p>
    </div>
  );
}`,

  loadingStates: `// app/dashboard/@analytics/loading.tsx
export default function AnalyticsLoading() {
  return (
    <div className="analytics-loading">
      <div className="skeleton-metric">
        <div className="skeleton-value" />
        <div className="skeleton-label" />
      </div>
      <div className="skeleton-metric">
        <div className="skeleton-value" />
        <div className="skeleton-label" />
      </div>
    </div>
  );
}

// app/dashboard/@team/loading.tsx
export default function TeamLoading() {
  return (
    <div className="team-loading">
      {[1, 2, 3].map((i) => (
        <div key={i} className="skeleton-member">
          <div className="skeleton-avatar" />
          <div className="skeleton-info">
            <div className="skeleton-name" />
            <div className="skeleton-role" />
          </div>
        </div>
      ))}
    </div>
  );
}`,

  errorBoundaries: `// app/dashboard/@analytics/error.tsx
'use client';

export default function AnalyticsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="analytics-error">
      <h3>Erro ao carregar analytics</h3>
      <p>{error.message}</p>
      <button onClick={reset}>Tentar novamente</button>
    </div>
  );
}

// app/dashboard/@notifications/error.tsx
'use client';

export default function NotificationsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="notifications-error">
      <h3>Erro ao carregar notificações</h3>
      <button onClick={reset}>Recarregar</button>
    </div>
  );
}`,

  conditionalSlots: `// app/dashboard/layout.tsx - Renderização Condicional
export default function DashboardLayout({
  children,
  analytics,
  team,
  notifications,
}: {
  children: React.ReactNode;
  analytics: React.ReactNode;
  team: React.ReactNode;
  notifications: React.ReactNode;
}) {
  const [showAnalytics, setShowAnalytics] = useState(true);
  const [showTeam, setShowTeam] = useState(true);
  const [showNotifications, setShowNotifications] = useState(true);

  return (
    <div className="dashboard-layout">
      <div className="controls">
        <button onClick={() => setShowAnalytics(!showAnalytics)}>
          Toggle Analytics
        </button>
        <button onClick={() => setShowTeam(!showTeam)}>
          Toggle Team
        </button>
        <button onClick={() => setShowNotifications(!showNotifications)}>
          Toggle Notifications
        </button>
      </div>
      
      <div className="main-content">
        {children}
      </div>
      
      <div className="sidebar">
        {showAnalytics && (
          <div className="analytics-section">
            {analytics}
          </div>
        )}
        
        {showTeam && (
          <div className="team-section">
            {team}
          </div>
        )}
        
        {showNotifications && (
          <div className="notifications-section">
            {notifications}
          </div>
        )}
      </div>
    </div>
  );
}`,

  nestedParallel: `// Parallel Routes Aninhadas:
// app/
//   dashboard/
//     [team]/
//       layout.tsx
//       page.tsx
//       @overview/
//         page.tsx
//       @members/
//         page.tsx
//       @projects/
//         page.tsx

// app/dashboard/[team]/layout.tsx
export default function TeamLayout({
  children,
  overview,
  members,
  projects,
  params,
}: {
  children: React.ReactNode;
  overview: React.ReactNode;
  members: React.ReactNode;
  projects: React.ReactNode;
  params: { team: string };
}) {
  return (
    <div className="team-dashboard">
      <h1>Team: {params.team}</h1>
      
      <div className="team-grid">
        <div className="overview-section">
          {overview}
        </div>
        
        <div className="members-section">
          {members}
        </div>
        
        <div className="projects-section">
          {projects}
        </div>
        
        <div className="main-content">
          {children}
        </div>
      </div>
    </div>
  );
}`
};

const benefits = [
  {
    title: 'Renderização Independente',
    description: 'Cada slot pode ter seu próprio loading e error state',
    icon: '🔄',
    color: 'blue'
  },
  {
    title: 'Layouts Complexos',
    description: 'Crie layouts sofisticados com múltiplas seções',
    icon: '🏗️',
    color: 'green'
  },
  {
    title: 'Performance',
    description: 'Carregamento paralelo de diferentes seções',
    icon: '⚡',
    color: 'yellow'
  },
  {
    title: 'Flexibilidade',
    description: 'Renderização condicional de slots',
    icon: '🎛️',
    color: 'purple'
  }
];

function DashboardDemo() {
  const [activeSlots, setActiveSlots] = useState({
    analytics: true,
    team: true,
    notifications: true
  });
  
  const [loadingStates, setLoadingStates] = useState({
    analytics: false,
    team: false,
    notifications: false
  });
  
  const [errorStates, setErrorStates] = useState({
    analytics: false,
    team: false,
    notifications: false
  });

  const toggleSlot = (slot: keyof typeof activeSlots) => {
    setActiveSlots(prev => ({ ...prev, [slot]: !prev[slot] }));
  };
  
  const toggleLoading = (slot: keyof typeof loadingStates) => {
    setLoadingStates(prev => ({ ...prev, [slot]: !prev[slot] }));
  };
  
  const toggleError = (slot: keyof typeof errorStates) => {
    setErrorStates(prev => ({ ...prev, [slot]: !prev[slot] }));
  };

  const renderSlotContent = (slot: string) => {
    if (!activeSlots[slot as keyof typeof activeSlots]) {
      return (
        <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg text-center text-gray-500 dark:text-gray-400">
          Slot desabilitado
        </div>
      );
    }
    
    if (errorStates[slot as keyof typeof errorStates]) {
      return (
        <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <h3 className="text-red-800 dark:text-red-200 font-semibold mb-2">Erro no {slot}</h3>
          <p className="text-red-600 dark:text-red-300 text-sm mb-3">Falha ao carregar dados</p>
          <button 
            onClick={() => toggleError(slot as keyof typeof errorStates)}
            className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700"
          >
            Tentar novamente
          </button>
        </div>
      );
    }
    
    if (loadingStates[slot as keyof typeof loadingStates]) {
      return (
        <div className="p-4 space-y-3">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-1/2 mb-2"></div>
            <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-2/3"></div>
          </div>
        </div>
      );
    }

    switch (slot) {
      case 'analytics':
        return (
          <div className="p-4">
            <h3 className="font-semibold text-gray-800 dark:text-white mb-3">Analytics</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">1,234</div>
                <div className="text-sm text-blue-500 dark:text-blue-300">Visitors</div>
              </div>
              <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">89%</div>
                <div className="text-sm text-green-500 dark:text-green-300">Conversion</div>
              </div>
            </div>
          </div>
        );
        
      case 'team':
        return (
          <div className="p-4">
            <h3 className="font-semibold text-gray-800 dark:text-white mb-3">Team Status</h3>
            <div className="space-y-2">
              {[
                { name: 'João Silva', status: 'online', color: 'green' },
                { name: 'Maria Santos', status: 'away', color: 'yellow' },
                { name: 'Pedro Costa', status: 'offline', color: 'gray' }
              ].map((member) => (
                <div key={member.name} className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full bg-${member.color}-500`}></div>
                  <span className="text-sm text-gray-700 dark:text-gray-300">{member.name}</span>
                </div>
              ))}
            </div>
          </div>
        );
        
      case 'notifications':
        return (
          <div className="p-4">
            <h3 className="font-semibold text-gray-800 dark:text-white mb-3">Notifications</h3>
            <div className="space-y-2">
              {[
                { message: 'New user registered', time: '2 min ago', type: 'info' },
                { message: 'Server maintenance', time: '1 hour ago', type: 'warning' },
                { message: 'Backup completed', time: '3 hours ago', type: 'success' }
              ].map((notification, index) => (
                <div key={index} className="text-xs">
                  <div className="text-gray-700 dark:text-gray-300">{notification.message}</div>
                  <div className="text-gray-500 dark:text-gray-400">{notification.time}</div>
                </div>
              ))}
            </div>
          </div>
        );
        
      default:
        return <div>Conteúdo do slot</div>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Controles */}
      <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
          Controles do Dashboard
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.keys(activeSlots).map((slot) => (
            <div key={slot} className="space-y-2">
              <h4 className="font-medium text-gray-700 dark:text-gray-300 capitalize">
                {slot}
              </h4>
              
              <div className="space-y-1">
                <button
                  onClick={() => toggleSlot(slot as keyof typeof activeSlots)}
                  className={`w-full px-3 py-1 rounded text-sm transition-colors ${
                    activeSlots[slot as keyof typeof activeSlots]
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  {activeSlots[slot as keyof typeof activeSlots] ? 'Ativo' : 'Inativo'}
                </button>
                
                <button
                  onClick={() => toggleLoading(slot as keyof typeof loadingStates)}
                  disabled={!activeSlots[slot as keyof typeof activeSlots]}
                  className={`w-full px-3 py-1 rounded text-sm transition-colors ${
                    loadingStates[slot as keyof typeof loadingStates]
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                  } disabled:opacity-50`}
                >
                  {loadingStates[slot as keyof typeof loadingStates] ? 'Loading' : 'Normal'}
                </button>
                
                <button
                  onClick={() => toggleError(slot as keyof typeof errorStates)}
                  disabled={!activeSlots[slot as keyof typeof activeSlots]}
                  className={`w-full px-3 py-1 rounded text-sm transition-colors ${
                    errorStates[slot as keyof typeof errorStates]
                      ? 'bg-red-500 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                  } disabled:opacity-50`}
                >
                  {errorStates[slot as keyof typeof errorStates] ? 'Error' : 'Normal'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Dashboard Simulado */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
        <div className="bg-gray-100 dark:bg-gray-700 px-4 py-2 border-b border-gray-200 dark:border-gray-600">
          <h3 className="font-semibold text-gray-800 dark:text-white">Dashboard Layout</h3>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 min-h-[400px]">
          {/* Main Content */}
          <div className="lg:col-span-2 p-6 border-r border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              Main Content (children)
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Este é o conteúdo principal da página, renderizado através do prop children.
            </p>
          </div>
          
          {/* Sidebar com Parallel Routes */}
          <div className="lg:col-span-2 bg-gray-50 dark:bg-gray-900">
            <div className="p-4 space-y-4">
              {/* Analytics Slot */}
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                <div className="bg-blue-50 dark:bg-blue-900/20 px-3 py-2 border-b border-gray-200 dark:border-gray-600">
                  <span className="text-sm font-medium text-blue-700 dark:text-blue-300">@analytics</span>
                </div>
                {renderSlotContent('analytics')}
              </div>
              
              {/* Team Slot */}
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                <div className="bg-green-50 dark:bg-green-900/20 px-3 py-2 border-b border-gray-200 dark:border-gray-600">
                  <span className="text-sm font-medium text-green-700 dark:text-green-300">@team</span>
                </div>
                {renderSlotContent('team')}
              </div>
              
              {/* Notifications Slot */}
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                <div className="bg-purple-50 dark:bg-purple-900/20 px-3 py-2 border-b border-gray-200 dark:border-gray-600">
                  <span className="text-sm font-medium text-purple-700 dark:text-purple-300">@notifications</span>
                </div>
                {renderSlotContent('notifications')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ParallelRoutesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 dark:from-gray-900 dark:to-gray-800 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Parallel Routes
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Renderize múltiplas páginas simultaneamente com a sintaxe @folder
          </p>
        </div>

        <div className="space-y-12">
          {/* Benefícios */}
          <DemoSection
            title="Benefícios das Parallel Routes"
            description="Entenda as vantagens de usar parallel routes em suas aplicações"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit) => (
                <div key={benefit.title} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="text-2xl">{benefit.icon}</div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                      {benefit.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </DemoSection>

          {/* Demo Interativo */}
          <DemoSection
            title="Dashboard Interativo"
            description="Experimente como parallel routes funcionam na prática"
          >
            <DashboardDemo />
          </DemoSection>

          {/* Estrutura Básica */}
          <DemoSection
            title="Estrutura de Pastas"
            description="Como organizar arquivos para parallel routes"
          >
            <CodeBlock
              code={codeExamples.basicStructure}
              language="text"
              filename="Estrutura de Pastas"
            />
          </DemoSection>

          {/* Layout Principal */}
          <DemoSection
            title="Layout com Parallel Routes"
            description="Como receber e renderizar múltiplos slots"
          >
            <CodeBlock
              code={codeExamples.dashboardLayout}
              language="typescript"
              filename="app/dashboard/layout.tsx"
            />
          </DemoSection>

          {/* Slots Individuais */}
          <DemoSection
            title="Analytics Slot"
            description="Exemplo de um slot para métricas e analytics"
          >
            <CodeBlock
              code={codeExamples.analyticsSlot}
              language="typescript"
              filename="app/dashboard/@analytics/page.tsx"
            />
          </DemoSection>

          <DemoSection
            title="Team Slot"
            description="Slot para mostrar status da equipe"
          >
            <CodeBlock
              code={codeExamples.teamSlot}
              language="typescript"
              filename="app/dashboard/@team/page.tsx"
            />
          </DemoSection>

          <DemoSection
            title="Notifications Slot"
            description="Slot para exibir notificações"
          >
            <CodeBlock
              code={codeExamples.notificationsSlot}
              language="typescript"
              filename="app/dashboard/@notifications/page.tsx"
            />
          </DemoSection>

          {/* Estados de Loading */}
          <DemoSection
            title="Loading States Independentes"
            description="Cada slot pode ter seu próprio estado de carregamento"
          >
            <CodeBlock
              code={codeExamples.loadingStates}
              language="typescript"
              filename="Loading States"
            />
          </DemoSection>

          {/* Error Boundaries */}
          <DemoSection
            title="Error Boundaries por Slot"
            description="Tratamento de erro independente para cada slot"
          >
            <CodeBlock
              code={codeExamples.errorBoundaries}
              language="typescript"
              filename="Error Boundaries"
            />
          </DemoSection>

          {/* Default Page */}
          <DemoSection
            title="Página Default"
            description="Fallback para slots sem página correspondente"
          >
            <CodeBlock
              code={codeExamples.defaultPage}
              language="typescript"
              filename="app/dashboard/default.tsx"
            />
          </DemoSection>

          {/* Renderização Condicional */}
          <DemoSection
            title="Renderização Condicional"
            description="Como mostrar/ocultar slots dinamicamente"
          >
            <CodeBlock
              code={codeExamples.conditionalSlots}
              language="typescript"
              filename="Layout com Controles"
            />
          </DemoSection>

          {/* Parallel Routes Aninhadas */}
          <DemoSection
            title="Parallel Routes Aninhadas"
            description="Combine parallel routes com dynamic routes"
          >
            <CodeBlock
              code={codeExamples.nestedParallel}
              language="typescript"
              filename="app/dashboard/[team]/layout.tsx"
            />
          </DemoSection>

          {/* Links de Navegação */}
          <div className="flex justify-between items-center pt-8 border-t border-gray-200 dark:border-gray-700">
            <Link
              href="/nextjs/dynamic-routes"
              className="flex items-center space-x-2 text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 transition-colors"
            >
              <span>← Dynamic Routes</span>
            </Link>
            
            <Link
              href="/nextjs"
              className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
            >
              Voltar ao Next.js
            </Link>
            
            <Link
              href="/nextjs/intercepting-routes"
              className="flex items-center space-x-2 text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 transition-colors"
            >
              <span>Intercepting Routes →</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}